let portalQuestChapters=[];

async function initQuestUI(){
  const root=document.getElementById('questContent');
  if(!root) return;
  try{
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
  const flow=chapter.locationFlow?.length?`<div class="quest-flow"><strong>Location flow:</strong> ${chapter.locationFlow.map(escapeQuest).join(' → ')}</div>`:'';
  const related=[];
  (chapter.relatedNPCs||[]).forEach(n=>related.push(linkButton(n,'NPC')));
  (chapter.relatedEnemies||[]).forEach(n=>related.push(linkButton(n,'Enemy')));
  root.innerHTML=`<div class="quest-chapter">
    <div class="quest-chapter-head">
      <div><span class="panel-kicker">MAIN QUEST · CHAPTER ${escapeQuest(chapter.chapter)}</span><h3>${escapeQuest(chapter.name)}</h3><div class="quest-meta-line"><span class="quest-chip ${partial?'partial':'verified'}">${partial?'PARTIAL DATA':'IN-GAME VERIFIED'}</span>${chapter.startingLocation?`<span class="quest-chip">Starts: ${escapeQuest(chapter.startingLocation)}</span>`:''}${chapter.endingLocation?`<span class="quest-chip">Ends: ${escapeQuest(chapter.endingLocation)}</span>`:''}<span class="quest-chip">${escapeQuest(chapter.partCount||chapter.parts?.length||0)} parts</span></div>${flow}${related.length?`<div class="quest-links">${related.join('')}</div>`:''}</div>
      <div class="quest-meta-line"><span class="quest-chip">Verified ${escapeQuest(chapter.lastVerified||'unknown')}</span></div>
    </div>
    <div class="quest-parts">${(chapter.parts||[]).map(renderQuestPart).join('')}</div>
    ${chapter.futureChaptersShown?.length?`<div class="future-chapters"><strong>Shown in game as Coming Soon</strong><div class="future-list">${chapter.futureChaptersShown.map(x=>`<span>${escapeQuest(x)}</span>`).join('')}</div></div>`:''}
  </div>`;
  wireQuestLinks(root);
}

function renderQuestPart(part){
  const missing=Boolean(part.dataStatus && (!part.objectives?.length && !part.objectivesVisible?.length));
  const partial=Boolean(part.dataStatus && !missing);
  const objectives=part.objectives?.length?part.objectives:(part.objectivesVisible||[]);
  const locations=part.locations?.length?part.locations:[];
  const related=[];
  (part.relatedNPCs||[]).forEach(n=>related.push(linkButton(n,'NPC')));
  locations.forEach(n=>related.push(linkButton(n,'Location')));
  return `<article class="quest-part ${missing?'missing':''}">
    <div class="quest-part-header"><div class="quest-part-title"><span class="quest-part-number">${escapeQuest(part.part)}</span><div><h4>${escapeQuest(part.name)}</h4><small>${missing?'Awaiting screenshots':partial?'Partially verified':'Verified from screenshots'}</small></div></div>${part.dataStatus?`<span class="quest-chip ${missing||partial?'partial':''}">${escapeQuest(part.dataStatus)}</span>`:''}</div>
    <div class="quest-part-body">
      <div class="quest-block"><strong>Objectives</strong>${objectives.length?`<div class="quest-objectives">${objectives.map(o=>`<div class="quest-objective">${escapeQuest(o)}</div>`).join('')}</div>`:`<div class="quest-note">Objectives are not stored yet. PortalDB is intentionally leaving this blank until the missing in-game screenshots are supplied.</div>`}${part.description?`<div class="quest-note" style="margin-top:12px;border-style:solid;border-color:rgba(255,255,255,.07);color:#bdb0c2">${escapeQuest(part.description)}</div>`:''}</div>
      <div class="quest-block"><strong>Rewards</strong>${part.rewards?.length?`<div class="quest-rewards">${part.rewards.map(r=>`<span class="quest-reward">${escapeQuest(r.amount||r.quantity||1)}× ${escapeQuest(r.name||r.item||r.type)}</span>`).join('')}</div>`:`<div class="quest-note">Rewards are not stored yet.</div>`}${related.length?`<div class="quest-links">${related.join('')}</div>`:''}</div>
    </div>
  </article>`;
}

function linkButton(name,type){
  return `<button class="quest-link" data-quest-link="${escapeQuestAttr(name)}">${escapeQuest(type)}: ${escapeQuest(name)} ↗</button>`;
}

function wireQuestLinks(root){
  root.querySelectorAll('[data-quest-link]').forEach(btn=>btn.addEventListener('click',()=>{
    const name=btn.dataset.questLink;
    const match=window.database?.find?.(e=>String(e._displayName||'').toLowerCase()===String(name).toLowerCase());
    if(match && typeof window.openEntry==='function') window.openEntry(match);
    else{
      const search=document.getElementById('globalSearch');
      if(search){search.value=name;search.scrollIntoView({behavior:'smooth',block:'center'});search.dispatchEvent(new Event('input'));}
    }
  }));
}

function escapeQuest(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function escapeQuestAttr(v){return escapeQuest(v)}

document.addEventListener('DOMContentLoaded',initQuestUI);
