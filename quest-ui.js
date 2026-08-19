let portalQuestChapters=[];
let portalRelationshipEnhancerReady=false;

async function initQuestUI(){
  const root=document.getElementById('questContent');
  if(!root) return;
  try{
    await ensureEnemyData();
    installRelationshipEnhancer();
    const res=await fetch('data/quests.json');
    if(!res.ok) throw new Error('quests.json unavailable');
    portalQuestChapters=(await res.json()).filter(q=>q.type==='Main Quest Chapter');
    renderQuestTabs();
    renderQuestChapter(portalQuestChapters[0]?.id);
  }catch(err){
    root.innerHTML='<div class="quest-empty">Quest data could not be loaded.</div>';
    console.error(err);
  }
}

async function ensureEnemyData(){
  try{
    const res=await fetch('data/enemies.json');
    if(!res.ok) return;
    const enemies=(await res.json()).map(row=>({...row,_collection:'enemies',_displayName:row.name||row.id}));
    let attempts=0;
    while((typeof database==='undefined' || !Array.isArray(database) || !database.length) && attempts<50){
      await new Promise(resolve=>setTimeout(resolve,20));
      attempts++;
    }
    if(typeof database!=='undefined' && Array.isArray(database)){
      const existing=new Set(database.map(e=>`${e._collection}:${e.id}`));
      enemies.forEach(enemy=>{if(!existing.has(`enemies:${enemy.id}`)) database.push(enemy)});
      if(typeof collections!=='undefined' && Array.isArray(collections) && !collections.includes('enemies')) collections.push('enemies');
      if(typeof labels!=='undefined') labels.enemies='ENEMY';
      window.database=database;
    }
    if(typeof openEntry==='function') window.openEntry=openEntry;
  }catch(err){
    console.warn('Enemy relationship data unavailable',err);
  }
}

function installRelationshipEnhancer(){
  if(portalRelationshipEnhancerReady || typeof openEntry!=='function') return;
  portalRelationshipEnhancerReady=true;
  const originalOpenEntry=openEntry;
  openEntry=function(entry){
    originalOpenEntry(entry);
    appendRelationshipPanel(entry);
  };
  window.openEntry=openEntry;
  if(typeof database!=='undefined') window.database=database;
}

function appendRelationshipPanel(entry){
  const host=document.querySelector('#dialogContent .dialog-body');
  if(!host||!entry) return;
  host.querySelector('.relationship-panel')?.remove();
  const rows=[];
  const links=[];

  if(entry.hp!==undefined) rows.push(['HP',Number(entry.hp).toLocaleString()]);
  if(entry.element) rows.push(['Element',entry.element]);
  if(entry.schedule) rows.push(['Schedule',entry.schedule]);
  if(entry.location) rows.push(['Location',entry.location]);
  if(entry.parentLocation) rows.push(['Parent location',entry.parentLocation]);
  if(entry.abilities?.length) rows.push(['Abilities',entry.abilities.join(' · ')]);
  if(entry.shopName) rows.push(['Shop / Service',entry.shopName]);
  if(entry.restock) rows.push(['Restock',entry.restock]);

  normalizeDropLinks(entry.knownDrops).forEach(drop=>{
    links.push({name:drop.name,label:`Drop: ${drop.name}${drop.chancePercent!==undefined?` · ${drop.chancePercent}%`:''}`});
  });
  (entry.relatedQuests||[]).forEach(name=>links.push({name,label:`Quest: ${name}`}));
  (entry.relatedNPCs||entry.npcs||[]).forEach(name=>links.push({name,label:`NPC: ${name}`}));
  (entry.relatedEnemies||[]).forEach(name=>links.push({name,label:`Enemy: ${name}`}));
  (entry.locations||[]).forEach(name=>links.push({name,label:`Location: ${name}`}));
  (entry.subLocations||[]).forEach(name=>links.push({name,label:`Sub-location: ${name}`}));
  if(entry.parentLocation) links.push({name:entry.parentLocation,label:`Parent: ${entry.parentLocation}`});

  if(!rows.length && !links.length) return;
  const panel=document.createElement('section');
  panel.className='relationship-panel';
  panel.innerHTML=`<div class="relationship-title">CONNECTED DATA</div>
    ${rows.length?`<div class="relationship-facts">${rows.map(([k,v])=>`<div><small>${escapeQuest(k)}</small><strong>${escapeQuest(v)}</strong></div>`).join('')}</div>`:''}
    ${links.length?`<div class="relationship-links">${links.map((link,i)=>`<button data-rel-index="${i}">${escapeQuest(link.label)} ↗</button>`).join('')}</div>`:''}`;
  host.appendChild(panel);
  panel.querySelectorAll('[data-rel-index]').forEach(btn=>btn.addEventListener('click',()=>navigateToEntity(links[Number(btn.dataset.relIndex)].name)));
}

function normalizeDropLinks(value){
  if(!Array.isArray(value)) return [];
  return value.map(v=>typeof v==='string'?{name:v}:{name:v.item||v.name,chancePercent:v.chancePercent}).filter(v=>v.name);
}

function navigateToEntity(name){
  const match=findPortalEntry(name);
  if(match && typeof openEntry==='function'){
    openEntry(match);
    return;
  }
  const search=document.getElementById('globalSearch');
  if(search){
    document.getElementById('entryDialog')?.close();
    search.value=name;
    search.scrollIntoView({behavior:'smooth',block:'center'});
    search.dispatchEvent(new Event('input'));
  }
}

function findPortalEntry(name){
  if(typeof database==='undefined'||!Array.isArray(database)) return null;
  const q=String(name||'').toLowerCase();
  return database.find(e=>String(e._displayName||e.name||'').toLowerCase()===q)||null;
}

function renderQuestTabs(){
  const tabs=document.getElementById('questTabs');
  const count=document.getElementById('questCount');
  if(!tabs) return;
  if(count) count.textContent=`${portalQuestChapters.length} main chapters documented`;
  tabs.innerHTML=portalQuestChapters.map((chapter,i)=>`<button class="quest-tab ${i===0?'active':''}" data-quest-tab="${escapeQuest(chapter.id)}">Chapter ${chapter.chapter}</button>`).join('');
  tabs.querySelectorAll('[data-quest-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    tabs.querySelectorAll('.quest-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderQuestChapter(btn.dataset.questTab);
  }));
}

function renderQuestChapter(id){
  const root=document.getElementById('questContent');
  const chapter=portalQuestChapters.find(q=>q.id===id);
  if(!root||!chapter) return;
  const partial=String(chapter.dataStatus||'').toLowerCase().includes('partial');
  const flow=chapter.locationFlow?.length?`<div class="quest-flow"><strong>Location flow:</strong><div class="quest-flow-links">${chapter.locationFlow.map((name,i)=>`${i?' <span>→</span> ':''}${linkButton(name,'Location')}`).join('')}</div></div>`:'';
  const related=[];
  (chapter.relatedNPCs||[]).forEach(n=>related.push(linkButton(n,'NPC')));
  (chapter.relatedEnemies||[]).forEach(n=>related.push(linkButton(n,'Enemy')));
  root.innerHTML=`<div class="quest-chapter">
    <div class="quest-chapter-head">
      <div><span class="panel-kicker">MAIN QUEST · CHAPTER ${escapeQuest(chapter.chapter)}</span><div class="verification-heading"><h3>${escapeQuest(chapter.name)}</h3>${questVerificationMarker(chapter)}</div><div class="quest-meta-line">${partial?'<span class="quest-chip partial">PARTIAL DATA</span>':''}${chapter.startingLocation?`<span class="quest-chip">Starts: ${escapeQuest(chapter.startingLocation)}</span>`:''}${chapter.endingLocation?`<span class="quest-chip">Ends: ${escapeQuest(chapter.endingLocation)}</span>`:''}<span class="quest-chip">${escapeQuest(chapter.partCount||chapter.parts?.length||0)} parts</span></div>${flow}${related.length?`<div class="quest-links">${related.join('')}</div>`:''}</div>
    </div>
    <div class="quest-parts">${(chapter.parts||[]).map(part=>renderQuestPart(part,chapter)).join('')}</div>
    ${chapter.futureChaptersShown?.length?`<div class="future-chapters"><strong>Shown in game as Coming Soon</strong><div class="future-list">${chapter.futureChaptersShown.map(x=>`<span>${escapeQuest(x)}</span>`).join('')}</div></div>`:''}
  </div>`;
  wireQuestLinks(root);
}

function renderQuestPart(part,chapter){
  const missing=Boolean(part.dataStatus && (!part.objectives?.length && !part.objectivesVisible?.length));
  const partial=Boolean(part.dataStatus && !missing);
  const objectives=part.objectives?.length?part.objectives:(part.objectivesVisible||[]);
  const locations=part.locations?.length?part.locations:[];
  const related=[];
  (part.relatedNPCs||[]).forEach(n=>related.push(linkButton(n,'NPC')));
  (part.relatedEnemies||[]).forEach(n=>related.push(linkButton(n,'Enemy')));
  locations.forEach(n=>related.push(linkButton(n,'Location')));
  return `<article class="quest-part ${missing?'missing':''}">
    <div class="quest-part-header"><div class="quest-part-title"><span class="quest-part-number">${escapeQuest(part.part)}</span><div><div class="verification-heading"><h4>${escapeQuest(part.name)}</h4>${questVerificationMarker(chapter,missing||partial?{type:'unverified',method:part.dataStatus||'Incomplete capture'}:{})}</div><small>${missing?'Awaiting screenshots':partial?'Partially verified':'Captured in game'}</small></div></div>${part.dataStatus?`<span class="quest-chip ${missing||partial?'partial':''}">${escapeQuest(part.dataStatus)}</span>`:''}</div>
    <div class="quest-part-body">
      <div class="quest-block"><strong>Objectives</strong>${objectives.length?`<div class="quest-objectives">${objectives.map(o=>`<div class="quest-objective">${escapeQuest(o)}</div>`).join('')}</div>`:`<div class="quest-note">Objectives are not stored yet. PortalDB is intentionally leaving this blank until the missing in-game screenshots are supplied.</div>`}${part.description?`<div class="quest-note" style="margin-top:12px;border-style:solid;border-color:rgba(255,255,255,.07);color:#bdb0c2">${escapeQuest(part.description)}</div>`:''}</div>
      <div class="quest-block"><strong>Rewards</strong>${part.rewards?.length?`<div class="quest-rewards">${part.rewards.map(r=>`<span class="quest-reward">${escapeQuest(r.amount||r.quantity||1)}× ${escapeQuest(r.name||r.item||r.type)}</span>`).join('')}</div>`:`<div class="quest-note">Rewards are not stored yet.</div>`}${related.length?`<div class="quest-links">${related.join('')}</div>`:''}</div>
    </div>
  </article>`;
}

function questVerificationMarker(record,overrides={}){
  return window.PortalVerification?.marker(record,overrides)||'';
}

function linkButton(name,type){
  return `<button class="quest-link" data-quest-link="${escapeQuestAttr(name)}">${escapeQuest(type)}: ${escapeQuest(name)} ↗</button>`;
}

function wireQuestLinks(root){
  root.querySelectorAll('[data-quest-link]').forEach(btn=>btn.addEventListener('click',()=>navigateToEntity(btn.dataset.questLink)));
}

function escapeQuest(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function escapeQuestAttr(v){return escapeQuest(v)}

document.addEventListener('DOMContentLoaded',initQuestUI);

