(()=>{
  const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const futureFields=['walkthroughNotes','recommendedStats','recommendedGear','recommendedFarm','optionalTasks','warnings','beforeYouContinue','unlockNotes','bossPreparation'];
  let npcs=[];
  const npcByName=name=>npcs.find(npc=>npc.name.toLowerCase()===String(name).toLowerCase());
  function partNpcNames(part,chapter){
    const objectiveText=(part.objectives||[]).join(' ').toLowerCase();
    return [...new Set([...(part.relatedNPCs||[]),...(chapter.relatedNPCs||[]).filter(name=>objectiveText.includes(name.toLowerCase()))])];
  }
  function partLocations(part){return part.locations||[]}
  function renderRewards(rewards=[]){return rewards.length?rewards.map(reward=>{const amount=Number(reward.amount??reward.quantity??1).toLocaleString(),name=esc(reward.name||reward.item||reward.type);return `<span>${reward.type==='currency'||reward.type==='experience'?`${amount} ${name}`:`${amount}× ${name}`}</span>`}).join(''):'<span>Rewards not stored</span>'}
  function verifiedContext(part,chapter){
    const related=partNpcNames(part,chapter),locations=partLocations(part);
    if(!related.length&&!locations.length)return '<p>No additional NPC or location context is stored for this step yet.</p>';
    return `${locations.length?`<p><strong>Key locations</strong>${locations.map(esc).join(' · ')}</p>`:''}${related.length?`<p><strong>Important NPCs</strong>${related.map(name=>{const npc=npcByName(name);return `${esc(name)} — ${esc(npc?.profession||'Role not stored')}`}).join(' · ')}</p>`:''}`;
  }
  function progressionNotes(part){
    const stored=futureFields.filter(field=>part[field]);
    if(!stored.length)return '<div class="pending-note">PortalDB progression and optimization notes for this step are still being verified.</div>';
    return stored.map(field=>`<div class="pending-note"><strong>${esc(field.replace(/([A-Z])/g,' $1'))}</strong><br>${esc(Array.isArray(part[field])?part[field].join(' · '):part[field])}</div>`).join('');
  }
  function renderPart(part,chapter){
    const context=part.description||'No additional progression context has been verified for this step yet.';
    return `<article class="walkthrough-step" id="${esc(part.id)}"><header class="step-heading"><span class="step-number">${part.part}</span><div><small>Part ${part.part}</small><h3>${esc(part.name)}</h3></div></header><p class="step-context">${esc(context)}</p><div class="step-grid"><div><section class="step-panel"><h4>Objectives</h4><ul class="objective-list">${(part.objectives||[]).map(objective=>`<li>${esc(objective)}</li>`).join('')}</ul></section><section class="step-panel" style="margin-top:15px"><h4>Rewards</h4><div class="reward-list">${renderRewards(part.rewards)}</div></section></div><aside class="step-aside"><section><h4>Verified relationships</h4><div class="verified-context">${verifiedContext(part,chapter)}</div></section><section><h4>PortalDB notes</h4>${progressionNotes(part)}</section></aside></div></article>`;
  }
  function chapterNpcs(chapter){return [...new Set((chapter.relatedNPCs||chapter.parts.flatMap(part=>part.relatedNPCs||[])))];}
  function renderChapter(chapter){
    const flow=(chapter.locationFlow||[]).map((location,index)=>`${index?'<i>→</i>':''}<span>${esc(location)}</span>`).join('');
    const npcNames=chapterNpcs(chapter);
    return `<section class="walkthrough-chapter" id="chapter-${chapter.chapter}" aria-labelledby="chapter-${chapter.chapter}-title"><header class="walkthrough-chapter-head"><span class="panel-kicker">MAIN QUEST · CHAPTER ${chapter.chapter}</span><div class="walkthrough-title-row"><h2 id="chapter-${chapter.chapter}-title">${esc(chapter.name)}</h2>${window.PortalVerification?.marker(chapter)||''}</div><p>${chapter.parts.length} verified parts${npcNames.length?` · Referenced NPCs: ${npcNames.map(esc).join(', ')}`:''}</p>${flow?`<div class="location-flow" aria-label="Chapter location flow">${flow}</div>`:''}</header><div class="walkthrough-steps">${chapter.parts.map(part=>renderPart(part,chapter)).join('')}</div></section>`;
  }
  async function init(){
    const [questResponse,npcResponse]=await Promise.all([fetch('data/quests.json?v=20260824-walkthrough-1'),fetch('data/npcs.json?v=20260824-walkthrough-1')]);
    if(!questResponse.ok||!npcResponse.ok)throw new Error('Verified walkthrough data could not be loaded.');
    const quests=await questResponse.json();npcs=await npcResponse.json();
    const chapters=quests.filter(quest=>quest.type==='Main Quest Chapter'&&(quest.chapter===1||quest.chapter===2)).sort((a,b)=>a.chapter-b.chapter);
    if(chapters.length!==2||chapters[0].parts.length!==5||chapters[1].parts.length!==4)throw new Error('The verified Chapter 1–2 sequence is incomplete.');
    const root=document.getElementById('walkthroughChapters');root.innerHTML=chapters.map(renderChapter).join('');root.hidden=false;document.getElementById('walkthroughStatus').remove();
  }
  init().catch(error=>{const status=document.getElementById('walkthroughStatus');status.classList.add('walkthrough-error');status.textContent=error.message;console.error(error)});
})();
