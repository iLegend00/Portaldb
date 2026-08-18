let plannerSchema=null, plannerJobs=[], plannerItems=[], plannerSkills=[];
const plannerState={job:'',stats:{STR:0,VIT:0,AGI:0,DEX:0,INT:0,WIS:0},equipment:{},title:'',skills:Array(8).fill('')};

async function loadPlanner(){
  const [schema,jobs,items,skills]=await Promise.all([
    fetch('data/build-planner-schema.json').then(r=>r.json()),
    fetch('data/jobs.json').then(r=>r.json()),
    fetch('data/items.json').then(r=>r.json()),
    fetch('data/skills.json').then(r=>r.json()).catch(()=>[])
  ]);
  plannerSchema=schema;plannerJobs=jobs;plannerItems=items;plannerSkills=skills;
  renderJobSelect();renderStats();renderEquipment();renderSkills();renderImpact();renderVerification();
}

function renderJobSelect(){
  const sel=document.getElementById('plannerJob');
  sel.innerHTML='<option value="">Choose a job</option>'+plannerJobs.map(j=>`<option value="${esc(j.name)}">${esc(j.name)}</option>`).join('');
  sel.addEventListener('change',()=>{plannerState.job=sel.value;renderImpact();});
}

function renderStats(){
  const root=document.getElementById('statGrid');
  root.innerHTML=plannerSchema.baseStats.map(s=>`<div class="stat-row"><div class="stat-row-top"><strong>${esc(s.name)}</strong><div class="stat-controls"><button data-stat="${esc(s.id)}" data-delta="-1">−</button><span class="stat-value" id="stat-${esc(s.id)}">0</span><button data-stat="${esc(s.id)}" data-delta="1">+</button></div></div><div class="stat-effects">Affects: ${s.effects.map(esc).join(' · ')}</div></div>`).join('');
  root.querySelectorAll('[data-stat]').forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.stat,delta=Number(btn.dataset.delta);plannerState.stats[id]=Math.max(0,(plannerState.stats[id]||0)+delta);
    document.getElementById(`stat-${id}`).textContent=plannerState.stats[id];renderImpact();
  }));
}

function equipmentOptions(slot){
  const normalized=slot.toLowerCase();
  return plannerItems.filter(i=>{
    const text=[i.category,i.type,...(i.subtype||[])].filter(Boolean).join(' ').toLowerCase();
    if(normalized.includes('weapon')) return text.includes('weapon');
    if(normalized.includes('shield')) return text.includes('shield');
    if(normalized.includes('armor')) return text.includes('armor');
    if(normalized.includes('gloves')) return text.includes('glove');
    if(normalized.includes('shoes')) return text.includes('shoe');
    if(normalized.includes('bracelet')) return text.includes('bracelet');
    if(normalized.includes('necklace')) return text.includes('necklace');
    if(normalized.includes('headgear')) return text.includes('headgear');
    return false;
  });
}

function renderEquipment(){
  const root=document.getElementById('equipmentSlots');
  root.innerHTML=plannerSchema.equipmentSlots.map(slot=>{
    const opts=equipmentOptions(slot);
    return `<div class="slot"><span>${esc(slot)}</span><select data-slot="${esc(slot)}"><option value="">Empty</option>${opts.map(i=>`<option value="${esc(i.name)}">${esc(i.name)}</option>`).join('')}</select></div>`;
  }).join('');
  root.querySelectorAll('[data-slot]').forEach(sel=>sel.addEventListener('change',()=>{plannerState.equipment[sel.dataset.slot]=sel.value;renderImpact();}));
  document.getElementById('titleSlot').innerHTML='<option value="">No title equipped</option>';
}

function renderSkills(){
  const root=document.getElementById('skillSlots');
  root.innerHTML=Array.from({length:plannerSchema.skillSlots},(_,i)=>`<select data-skill-slot="${i}"><option value="">Skill ${i+1}: Empty</option>${plannerSkills.map(s=>`<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('')}</select>`).join('');
  root.querySelectorAll('[data-skill-slot]').forEach(sel=>sel.addEventListener('change',()=>plannerState.skills[Number(sel.dataset.skillSlot)]=sel.value));
}

function renderImpact(){
  const root=document.getElementById('impactList');
  const active=plannerSchema.baseStats.filter(s=>plannerState.stats[s.id]>0);
  const impacts=active.map(s=>`<div class="impact"><b>${esc(s.id)} +${plannerState.stats[s.id]}</b><span>Known affected categories: ${s.effects.map(esc).join(', ')}. Exact numerical conversion is not yet verified.</span></div>`);
  const equipped=Object.entries(plannerState.equipment).filter(([,v])=>v).map(([slot,name])=>`<div class="impact"><b>${esc(slot)} — ${esc(name)}</b><span>Equipment selected. Only item stats already stored in PortalDB should be treated as verified.</span></div>`);
  root.innerHTML=(impacts.length||equipped.length)?impacts.concat(equipped).join(''):'<div class="planner-note">Allocate stats or equip verified items to build a planning snapshot. PortalDB will show relationships, not fabricated derived-stat totals.</div>';
}

function renderVerification(){
  document.getElementById('plannerVerification').textContent=`${plannerSchema.confidence} · Last verified ${plannerSchema.lastVerified} · Derived stat formulas: ${plannerSchema.rules.derivedStatCalculation?'enabled':'not verified'}`;
}

function snapshot(){
  const lines=[`Job: ${plannerState.job||'Not selected'}`,'Stats: '+Object.entries(plannerState.stats).map(([k,v])=>`${k} ${v}`).join(' · ')];
  const eq=Object.entries(plannerState.equipment).filter(([,v])=>v);lines.push('Equipment: '+(eq.length?eq.map(([k,v])=>`${k}: ${v}`).join(' | '):'None'));
  const skills=plannerState.skills.filter(Boolean);lines.push('Skills: '+(skills.length?skills.join(', '):'None'));
  lines.push('Note: This snapshot does not calculate unverified derived combat values.');
  document.getElementById('plannerSnapshot').textContent=lines.join('\n');
}

document.getElementById('makeSnapshot')?.addEventListener('click',snapshot);
document.getElementById('resetPlanner')?.addEventListener('click',()=>location.reload());
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
loadPlanner().catch(err=>{document.getElementById('plannerSnapshot').textContent='Build Planner data could not be loaded.';console.error(err)});