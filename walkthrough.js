(()=>{
  const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const slug=value=>String(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const futureFields={walkthroughNotes:'recommended',recommendedStats:'build',recommendedGear:'equipment',recommendedFarm:'farming',optionalTasks:'optional',warnings:'warning',beforeYouContinue:'important',unlockNotes:'unlock',bossPreparation:'boss'};
  let chapters=[],npcs=[],mechanics=[];
  const npcByName=name=>npcs.find(npc=>npc.name.toLowerCase()===String(name).toLowerCase());
  const partNpcNames=(part,chapter)=>{const text=(part.objectives||[]).join(' ').toLowerCase();return [...new Set([...(part.relatedNPCs||[]),...(chapter.relatedNPCs||[]).filter(name=>text.includes(name.toLowerCase()))])]};
  const chapterNpcNames=chapter=>[...new Set(chapter.relatedNPCs||chapter.parts.flatMap(part=>part.relatedNPCs||[]))];
  const rewardText=reward=>{const amount=Number(reward.amount??reward.quantity??1).toLocaleString(),name=esc(reward.name||reward.item||reward.type);return reward.type==='currency'||reward.type==='experience'?`${amount} ${name}`:`${amount}× ${name}`};
  const partId=part=>slug(part.name);
  function documentedUnlocks(chapter){
    if(chapter.chapter===1)return mechanics.filter(row=>row.id==='world-loot-unlock').map(row=>row.description);
    if(chapter.chapter===2)return mechanics.filter(row=>row.id==='quick-slots-chapter-2').map(row=>row.description);
    return [];
  }
  function renderStoredNotes(part){
    const stored=Object.entries(futureFields).filter(([field])=>part[field]);
    if(!stored.length)return '';
    return stored.map(([field,type])=>`<aside class="guide-callout ${type}"><strong>${esc(field.replace(/([A-Z])/g,' $1'))}</strong>${esc(Array.isArray(part[field])?part[field].join(' · '):part[field])}</aside>`).join('');
  }
  function renderPart(part,chapter){
    const names=partNpcNames(part,chapter),locations=part.locations||[];
    return `<article class="guide-part" id="${partId(part)}" data-section-name="${esc(part.name)}"><header class="part-heading"><span class="part-number">${String(part.part).padStart(2,'0')}</span><div><small>Part ${part.part}</small><h3>${esc(part.name)}</h3></div></header>${part.description?`<p class="part-context">${esc(part.description)}</p>`:''}<div class="part-details"><div><section class="guide-block"><h4>What to do</h4><ul class="objective-list">${(part.objectives||[]).map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section><section class="guide-block"><h4>Rewards</h4><div class="reward-list">${(part.rewards||[]).map(reward=>`<span>${rewardText(reward)}</span>`).join('')}</div></section></div><div>${locations.length?`<section class="guide-block"><h4>Key locations</h4><div class="fact-list">${locations.map(name=>`<span>${esc(name)}</span>`).join('')}</div></section>`:''}${names.length?`<section class="guide-block"><h4>Important NPCs</h4><div class="fact-list">${names.map(name=>{const npc=npcByName(name);return `<span>${esc(name)}${npc?.profession?` · ${esc(npc.profession)}`:''}</span>`}).join('')}</div></section>`:''}${renderStoredNotes(part)}</div></div></article>`;
  }
  function renderOverview(chapter){
    const flow=chapter.locationFlow||[],names=chapterNpcNames(chapter),unlocks=documentedUnlocks(chapter);
    return `<div class="chapter-overview"><div class="overview-block"><small>Chapter coverage</small><strong>${chapter.parts.length} parts</strong></div>${flow.length?`<div class="overview-block"><small>Primary route</small><p>${flow.map(esc).join(' → ')}</p></div>`:''}${names.length?`<div class="overview-block"><small>Key NPCs</small><p>${names.map(esc).join(' · ')}</p></div>`:''}${unlocks.length?`<div class="overview-block"><small>Progression unlocks</small><p>${unlocks.map(esc).join(' · ')}</p></div>`:''}</div>`;
  }
  function pagination(chapter,index){
    const previous=chapters[index-1],next=chapters[index+1];
    return `<nav class="chapter-pagination" aria-label="Chapter progression">${previous?`<a href="#chapter-${previous.chapter}"><small>← Previous chapter</small><strong>${esc(previous.name)}</strong></a>`:`<a href="#walkthroughIndex"><small>← Guide navigation</small><strong>Walkthrough Index</strong></a>`}${next?`<a href="#chapter-${next.chapter}"><small>Next chapter →</small><strong>${esc(next.name)}</strong></a>`:`<a href="#walkthroughIndex"><small>Guide navigation</small><strong>Walkthrough Index</strong></a>`}</nav>`;
  }
  function renderChapter(chapter,index){
    const links=chapter.parts.map(part=>`<a href="#${partId(part)}">${String(part.part).padStart(2,'0')} ${esc(part.name)}</a>`).join('');
    return `<section class="guide-chapter" id="chapter-${chapter.chapter}" data-section-name="${esc(chapter.name)}"><header><span class="chapter-kicker">Chapter ${chapter.chapter}</span><div class="chapter-heading"><h2>${esc(chapter.name.replace(/^Chapter \d+:\s*/,''))}</h2>${window.PortalVerification?.marker(chapter)||''}</div><p class="chapter-description">Main-quest progression documented from the in-game quest sequence.</p></header>${renderOverview(chapter)}<nav class="chapter-parts-index" aria-label="${esc(chapter.name)} parts"><strong>Parts in this chapter</strong><div class="chapter-parts-links">${links}</div></nav>${chapter.parts.map(part=>renderPart(part,chapter)).join('')}${pagination(chapter,index)}</section>`;
  }
  function buildIndex(){
    const documented=chapters.map(chapter=>`<section class="index-chapter"><a href="#chapter-${chapter.chapter}"><span>${esc(chapter.name)}</span><em>${chapter.parts.length} parts</em></a><div class="index-parts">${chapter.parts.map(part=>`<a href="#${partId(part)}" data-index-target="${partId(part)}">${String(part.part).padStart(2,'0')} · ${esc(part.name)}</a>`).join('')}</div></section>`).join('');
    document.getElementById('walkthroughIndexBody').innerHTML=documented;
  }
  function populateSelects(){
    const chapterSelect=document.getElementById('chapterSelect'),partSelect=document.getElementById('partSelect');
    chapterSelect.innerHTML='<option value="">Select chapter</option>'+chapters.map(chapter=>`<option value="chapter-${chapter.chapter}">${esc(chapter.name)}</option>`).join('');
    partSelect.innerHTML='<option value="">Select part</option>'+chapters.flatMap(chapter=>[`<optgroup label="${esc(chapter.name)}">`,...chapter.parts.map(part=>`<option value="${partId(part)}">${part.part}. ${esc(part.name)}</option>`),'</optgroup>']).join('');
    for(const select of [chapterSelect,partSelect])select.addEventListener('change',()=>{if(!select.value)return;document.getElementById(select.value)?.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',`#${select.value}`);select.value=''});
  }
  function bindNavigation(){
    document.getElementById('walkthroughIndexBody').addEventListener('click',event=>{if(event.target.closest('a'))document.getElementById('walkthroughIndex').open=false});
    const sections=[...document.querySelectorAll('[data-section-name]')];
    if(!('IntersectionObserver'in window))return;
    const observer=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!visible)return;const id=visible.target.id;document.getElementById('currentSection').textContent=visible.target.dataset.sectionName;document.querySelectorAll('[data-index-target]').forEach(link=>link.classList.toggle('is-active',link.dataset.indexTarget===id))},{rootMargin:'-90px 0px -68% 0px',threshold:[0,.05]});
    sections.forEach(section=>observer.observe(section));
  }
  async function init(){
    const responses=await Promise.all(['quests','npcs','mechanics'].map(name=>fetch(`data/${name}.json?v=20260824-walkthrough-2`)));
    if(responses.some(response=>!response.ok))throw new Error('Walkthrough data could not be loaded.');
    const [quests,npcRows,mechanicRows]=await Promise.all(responses.map(response=>response.json()));npcs=npcRows;mechanics=mechanicRows;
    chapters=quests.filter(quest=>quest.type==='Main Quest Chapter'&&[1,2].includes(quest.chapter)).sort((a,b)=>a.chapter-b.chapter);
    if(chapters.length!==2||chapters[0].parts.length!==5||chapters[1].parts.length!==4)throw new Error('The documented Chapter 1–2 sequence is incomplete.');
    document.getElementById('walkthroughContent').innerHTML=chapters.map(renderChapter).join('');buildIndex();populateSelects();bindNavigation();document.getElementById('walkthroughGuide').hidden=false;document.getElementById('walkthroughStatus').remove();
  }
  init().catch(error=>{const status=document.getElementById('walkthroughStatus');status.classList.add('walkthrough-error');status.textContent=error.message;console.error(error)});
})();

