const collections = ["items","quests","npcs","bosses","races","jobs","locations","codes","updates","skills","mechanics","patches"];
const labels = {items:"ITEM",quests:"QUEST",npcs:"NPC",bosses:"BOSS",races:"RACE",jobs:"JOB",locations:"LOCATION",codes:"CODE",updates:"UPDATE",skills:"SKILL",mechanics:"MECHANIC",patches:"PATCH",pages:"GUIDE"};
let database = [];
let itemEntries = [];
let npcEntries = [];
const canonicalPages = [{
  id:"guilds-page",name:"Guilds & Arcane Defense",_displayName:"Guilds & Arcane Defense",_collection:"pages",href:"guilds.html",
  description:"Guild creation, Guild rewards, Guild Base information, and all documented Arcane Defense wave rewards.",
  tags:["Guild","Guilds","Guild System","Guild Coin","Guild EXP","Guild Base","Guild Leader","Guild Rewards","Guild Reward System","Arcane Defense","Arcane Defense Rewards","Wave Rewards","Rendall Guild","Guild Creation","Material Offering","Tria Contribution","Simple Bread","Race Reroll","Junkcore","Living Bark","Fossillized Amber","Pants Warden","Shirt Warden"]
}];

async function loadData(){
  const sets = await Promise.all(collections.map(async name=>{
    try{
      const res = await fetch(`data/${name}.json?v=20260831-major-updates-1`);
      if(!res.ok) return [];
      const rows = await res.json();
      return rows.map(row=>({...row,_collection:name,_displayName:row.name||row.title||row.code||row.version||row.id}));
    }catch{
      return [];
    }
  }));
  database = [...sets.flat(),...canonicalPages];
  itemEntries = database.filter(entry=>entry._collection==="items" && !String(entry.id||"").startsWith("demo-"));
  npcEntries = database.filter(entry=>entry._collection==="npcs" && !String(entry.id||"").startsWith("demo-"));
  initItemFinder();
  applyInitialDatabaseCategory();
}

function getDescription(entry){
  return entry.description || entry.notes || entry.status || `${labels[entry._collection] || "ENTRY"} record`;
}

function search(query){
  const q=query.trim().toLowerCase();
  if(!q)return [];
  return database.filter(entry=>!['guild-system','arcane-defense-rewards'].includes(entry.id)).map(entry=>{
    const rewards=(entry.rewards||[]).flatMap(r=>[r.name,r.item,String(r.amount||r.quantity||"")]);
    const highlights=entry.highlights||[];
    const obtain=normalizeObtain(entry.obtain).flatMap(o=>[o.type,o.source,String(o.chancePercent||""),o.time,...(o.weather||[])]);
    const equipment=[entry.tier?`T${entry.tier}`:"",entry.equipmentType,entry.weaponType,entry.armorWeight,entry.slot,entry.handType,...(Array.isArray(entry.requirements)?entry.requirements.flatMap(r=>[r.stat,String(r.value||"")]):[]),...Object.values(entry.rolls||{}).flat().flatMap(r=>[r.stat,String(r.value??""),String(r.min??""),String(r.max??"")]),...(entry.acquisition||[]).flatMap(a=>[a.method,a.source])];
    const extra = [entry.tutorialChoice, entry.variantChance, entry.source, entry.status, entry.version, entry.profession, entry.shopName, entry.category, ...(entry.subtype||[]), ...(entry.tags||[]), ...rewards, ...highlights, ...obtain, ...equipment, ...Object.keys(entry.stats||{}), ...Object.values(entry.stats||{}).map(String)];
    const hay=[entry._displayName,getDescription(entry),...extra].filter(Boolean).join(" ").toLowerCase();
    const name=String(entry._displayName||"").toLowerCase();
    let score=0;
    if(name===q)score+=100;
    if(name.startsWith(q))score+=40;
    if(name.includes(q))score+=20;
    if(hay.includes(q))score+=10;
    return {entry,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,16).map(x=>x.entry);
}

const input=document.getElementById("globalSearch");
const results=document.getElementById("searchResults");
const isDatabasePage=Boolean(document.getElementById("databaseBrowser"));
let databaseDialogTrigger=null;

function showResults(rows){
  if(!results) return;
  if(!rows.length){
    results.innerHTML=isDatabasePage?`<div class="result-row"><span><strong>No matches.</strong></span></div>`:`<div class="result-row"><span><strong>No matches yet.</strong><small>PortalDB is still being expanded.</small></span></div>`;
    results.classList.remove("hidden");
    return;
  }
  results.innerHTML=rows.map((entry,i)=>`
    <button class="result-row" data-result="${i}">
      <span class="result-type">${labels[entry._collection]||"ENTRY"}</span>
      <span><strong>${escapeHtml(entry._displayName)}</strong><small>${escapeHtml(getDescription(entry))}</small></span>
    </button>
  `).join("");
  results.classList.remove("hidden");
  results.querySelectorAll("[data-result]").forEach((btn,i)=>btn.addEventListener("click",()=>openEntry(rows[i])));
}

function hideSearchResults(){
  if(!results) return;
  results.innerHTML="";
  results.classList.add("hidden");
}

if(input){
  input.addEventListener("input",()=>isDatabasePage&&!input.value.trim()?hideSearchResults():showResults(search(input.value)));
  document.getElementById("searchButton")?.addEventListener("click",()=>isDatabasePage&&!input.value.trim()?hideSearchResults():showResults(search(input.value)));
  document.getElementById("focusSearch")?.addEventListener("click",()=>input.focus());
}

document.querySelectorAll("[data-query]").forEach(btn=>btn.addEventListener("click",()=>{
  if(!input) return;
  input.value=btn.dataset.query;
  showResults(search(input.value));
  input.focus();
}));

const categoryButtons=[...document.querySelectorAll("[data-category]")];
const supportedCategoryKeys=new Set(categoryButtons.map(btn=>btn.dataset.category));
const databaseBrowser=document.getElementById("databaseBrowser");
const databaseBrowserTitle=document.getElementById("databaseBrowserTitle");
const databaseBrowserDescription=document.getElementById("databaseBrowserDescription");
const databaseBrowserCount=document.getElementById("databaseBrowserCount");
const databaseBrowserResults=document.getElementById("databaseBrowserResults");
const databaseCategoryTitles={npcs:"NPCs",bosses:"Bosses",locations:"Locations",races:"Races",jobs:"Jobs",skills:"Skills",mechanics:"Mechanics",codes:"Codes",patches:"Patch History",updates:"Updates"};
const databaseCategoryDescriptions={npcs:"Merchants, services, shops, quest relationships, and other NPC information.",bosses:"Encounters, mechanics, drops, schedules, and related content.",locations:"Villages, regions, sub-areas, services, and related content.",races:"Races, variants, stat bonuses, and character information.",jobs:"Warrior, Defender, Enchanter, Cleric, and related job information.",skills:"Skills, costs, cooldowns, effects, and related mechanics.",mechanics:"Combat, regeneration, account systems, and gameplay rules.",codes:"Published redemption codes and their rewards.",patches:"Official patch notes and gameplay changes, newest first.",updates:"Major game updates and feature additions."};

function patchDateValue(entry){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(entry.date||"")) return null;
  const value=Date.parse(`${entry.date}T00:00:00Z`);
  return Number.isNaN(value)?null:value;
}

function patchVersionParts(entry){
  const match=String(entry.version||entry.title||"").match(/v(\d+)\.(\d+)\.(\d+)/i);
  return match?match.slice(1).map(Number):null;
}

function comparePatchVersions(a,b){
  const aParts=patchVersionParts(a);
  const bParts=patchVersionParts(b);
  if(!aParts&&!bParts) return 0;
  if(!aParts) return 1;
  if(!bParts) return -1;
  for(let index=0;index<aParts.length;index++){
    if(aParts[index]!==bParts[index]) return bParts[index]-aParts[index];
  }
  return 0;
}

function sortPatchHistory(rows){
  return rows.map((entry,index)=>({entry,index})).sort((a,b)=>{
    const aDate=patchDateValue(a.entry);
    const bDate=patchDateValue(b.entry);
    if(aDate!==null&&bDate!==null&&aDate!==bDate) return bDate-aDate;
    if(aDate===null&&bDate!==null) return 1;
    if(aDate!==null&&bDate===null) return -1;
    return comparePatchVersions(a.entry,b.entry)||a.index-b.index;
  }).map(item=>item.entry);
}

function sortUpdates(rows){
  return rows.map((entry,index)=>({entry,index})).sort((a,b)=>{
    const aDate=patchDateValue(a.entry);
    const bDate=patchDateValue(b.entry);
    if(aDate!==null&&bDate!==null&&aDate!==bDate) return bDate-aDate;
    if(aDate===null&&bDate!==null) return 1;
    if(aDate!==null&&bDate===null) return -1;
    return a.index-b.index;
  }).map(item=>item.entry);
}

function formatPatchDate(date){
  const value=patchDateValue({date});
  return value===null?"":new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(value);
}

function patchHistorySummary(entry){
  if(entry.description) return entry.description;
  return (entry.highlights||[]).slice(0,2).join(" · ")||"Open the complete patch notes.";
}

function renderPatchHistory(rows){
  const sortedRows=sortPatchHistory(rows);
  const latestIndex=sortedRows.findIndex(entry=>patchDateValue(entry)!==null);
  databaseBrowserResults.innerHTML=sortedRows.length?`<div class="database-patch-list">${sortedRows.map((entry,index)=>{
    const date=formatPatchDate(entry.date);
    const version=entry.version||entry.title||entry._displayName;
    return `<button type="button" class="database-patch-row${index===latestIndex?" database-patch-latest":""}" data-patch-record="${index}"><span class="database-patch-main"><span class="database-patch-heading"><strong class="database-patch-version">${escapeHtml(version)}</strong>${index===latestIndex?'<span class="database-patch-latest-label">Latest</span>':""}</span>${date?`<time class="database-patch-date" datetime="${escapeHtml(entry.date)}">${escapeHtml(date)}</time>`:""}<span class="database-patch-summary">${escapeHtml(patchHistorySummary(entry))}</span></span><span class="database-patch-action">View details →</span></button>`;
  }).join("")}</div>`:`<p class="database-empty-state">No entries available.</p>`;
  databaseBrowserResults.querySelectorAll("[data-patch-record]").forEach((button,index)=>button.addEventListener("click",()=>openEntry(sortedRows[index])));
}

function resetDatabaseBrowser(){
  categoryButtons.forEach(btn=>{btn.classList.remove("is-active");btn.setAttribute("aria-pressed","false");});
  databaseBrowser?.classList.add("hidden");
  if(databaseBrowserResults) databaseBrowserResults.innerHTML="";
}

function renderDatabaseCategory(cat){
  if(!databaseBrowser || !databaseBrowserResults) return;
  const categoryRows=database.filter(entry=>entry._collection===cat);
  const rows=cat==="updates"?sortUpdates(categoryRows):categoryRows;
  if(databaseBrowserTitle) databaseBrowserTitle.textContent=databaseCategoryTitles[cat]||cat;
  if(databaseBrowserDescription) databaseBrowserDescription.textContent=databaseCategoryDescriptions[cat]||"";
  if(databaseBrowserCount){databaseBrowserCount.textContent=rows.length?`${rows.length} ${rows.length===1?"record":"records"}`:"";databaseBrowserCount.classList.toggle("hidden",!rows.length);}
  if(cat==="patches"){
    renderPatchHistory(rows);
    databaseBrowser.classList.remove("hidden");
    return;
  }
  databaseBrowserResults.innerHTML=rows.length?rows.map((entry,index)=>`<button type="button" class="database-record" data-database-record="${index}"><span>${escapeHtml(labels[entry._collection]||"ENTRY")}</span><strong>${escapeHtml(entry._displayName)}</strong><small>${escapeHtml(getDescription(entry))}</small><b class="database-record-action">View details →</b></button>`).join(""):`<p class="database-empty-state">No entries available.</p>`;
  databaseBrowserResults.querySelectorAll("[data-database-record]").forEach((btn,index)=>btn.addEventListener("click",()=>openEntry(rows[index])));
  databaseBrowser.classList.remove("hidden");
}

function revealDatabaseBrowserIfNeeded(){
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(!databaseBrowser) return;
    const rect=databaseBrowser.getBoundingClientRect();
    const viewportHeight=window.innerHeight||document.documentElement.clientHeight;
    const visibleHeight=Math.max(0,Math.min(rect.bottom,viewportHeight)-Math.max(rect.top,0));
    const referenceHeight=Math.min(rect.height,viewportHeight);
    const substantiallyVisible=referenceHeight>0&&visibleHeight>=Math.min(280,referenceHeight*.45);
    if(substantiallyVisible) return;
    const reducedMotion=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    databaseBrowser.scrollIntoView({behavior:reducedMotion?"auto":"smooth",block:"start"});
  }));
}

function activateDatabaseCategory(cat,{syncUrl=false,reveal=false}={}){
  if(!supportedCategoryKeys.has(cat)){
    resetDatabaseBrowser();
    return false;
  }
  categoryButtons.forEach(btn=>{const active=btn.dataset.category===cat;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active));});
  renderDatabaseCategory(cat);
  if(syncUrl){
    const url=new URL(window.location.href);
    url.searchParams.set("category",cat);
    window.history.pushState({category:cat},"",url);
  }
  if(reveal) revealDatabaseBrowserIfNeeded();
  return true;
}

function applyInitialDatabaseCategory(){
  if(!categoryButtons.length) return;
  const category=new URLSearchParams(window.location.search).get("category");
  if(category) activateDatabaseCategory(category);
}

categoryButtons.forEach(btn=>btn.addEventListener("click",()=>{
  activateDatabaseCategory(btn.dataset.category,{syncUrl:true,reveal:true});
}));

window.addEventListener("popstate",()=>{
  if(!categoryButtons.length) return;
  const category=new URLSearchParams(window.location.search).get("category");
  if(!category || !activateDatabaseCategory(category)) resetDatabaseBrowser();
});

function normalizeObtain(value){
  if(!value) return [];
  if(!Array.isArray(value)) return [{type:"source",source:String(value)}];
  return value.map(v=>typeof v==="string"?{type:"source",source:v}:v);
}

function prettyKey(key){
  return String(key)
    .replace(/([a-z])([A-Z])/g,"$1 $2")
    .replace(/percent/ig,"%")
    .replace(/atk/ig,"ATK")
    .replace(/def/ig,"DEF")
    .replace(/mdef/ig,"MDEF")
    .replace(/mp/ig,"MP")
    .replace(/hp/ig,"HP")
    .replace(/^./,m=>m.toUpperCase());
}

function formatStats(stats){
  if(!stats || !Object.keys(stats).length) return "";
  return Object.entries(stats).map(([key,value])=>`${escapeHtml(prettyKey(key))}: ${typeof value==="number"&&value>=0?"+":""}${escapeHtml(value)}`).join(" · ");
}

function formatEffects(effects){
  if(!effects || !Object.keys(effects).length) return "";
  return Object.entries(effects).map(([key,value])=>`${escapeHtml(prettyKey(key))}: ${escapeHtml(value)}`).join(" · ");
}

function formatRewards(rewards){
  if(!rewards || !rewards.length) return "";
  const text=rewards.map(r=>`${r.amount||r.quantity||1}× ${r.name||r.item}`).join(" · ");
  return `<div class="meta-box"><small>REWARDS</small><strong>${escapeHtml(text)}</strong></div>`;
}

function findLinkedEntry(name){
  if(!name) return null;
  const q=String(name).toLowerCase();
  return database.find(e=>String(e._displayName||"").toLowerCase()===q) || null;
}

function sourceLabel(source){
  const type=String(source.type||"source").toUpperCase();
  const chance=source.chancePercent!==undefined?` · ${source.chancePercent}%`:"";
  const time=source.time?` · ${source.time}`:"";
  const weather=source.weather?.length?` · ${source.weather.join(", ")}`:"";
  return source.source?`${type}: ${source.source}${chance}${time}${weather}`:`${type}${chance}${time}${weather}`;
}

function verificationMarker(entry,overrides){
  return window.PortalVerification?.marker(entry,overrides)||"";
}

function renderObtainSources(entry){
  const sources=normalizeObtain(entry.obtain);
  if(!sources.length) return "";
  return sources.map((source,i)=>{
    const linked=findLinkedEntry(source.source);
    return `<button class="finder-source ${linked?"is-linked":""}" data-source-index="${i}">
      <span>${escapeHtml(sourceLabel(source))}</span>${linked?"<b>OPEN ↗</b>":""}
    </button>`;
  }).join("");
}

function itemTypeText(item){
  const parts=[item.category,item.tier?`T${item.tier}`:"",item.equipmentType,item.weaponType||item.armorWeight,...(Array.isArray(item.subtype)?item.subtype:[])].filter(Boolean);
  return parts.join(" · ") || item.type || "Item";
}

function itemPriceText(item){
  const bits=[];
  if(item.buyTria!==undefined) bits.push(`Buy ${Number(item.buyTria).toLocaleString()} Tria`);
  if(item.sellTria!==undefined) bits.push(`Sell ${Number(item.sellTria).toLocaleString()} Tria`);
  return bits.join(" · ");
}

function itemRequirementText(item){
  if(!item.requirements || !Object.keys(item.requirements).length) return "";
  if(Array.isArray(item.requirements)) return item.requirements.map(r=>`${r.stat} ${r.value}${r.permanent?" (permanent)":""}`).join(" · ");
  return Object.entries(item.requirements).map(([k,v])=>`${k} ${v}`).join(" · ");
}

function renderItemCards(rows){
  const box=document.getElementById("itemFinderResults");
  const count=document.getElementById("itemFinderCount");
  if(!box) return;
  if(count) count.textContent=`${rows.length} ${rows.length===1?"item":"items"}`;
  if(!rows.length){
    box.innerHTML=`<div class="finder-empty"><strong>No matching items found.</strong><span>Try a broader search or another category.</span></div>`;
    return;
  }
  box.innerHTML=rows.map((item,i)=>{
    const prices=itemPriceText(item);
    const req=itemRequirementText(item);
    const statLine=formatStats(item.stats);
    const effectLine=formatEffects(item.effects);
    return `<article class="finder-card" data-item-index="${i}">
      <div class="finder-card-top">
        <div><span class="finder-kicker">${escapeHtml(itemTypeText(item))}</span><h3>${escapeHtml(item.name)}</h3></div>
        ${item.status?`<span class="finder-status">${escapeHtml(item.status)}</span>`:""}
      </div>
      ${item.description?`<p>${escapeHtml(item.description)}</p>`:""}
      ${statLine?`<div class="finder-line"><b>Stats</b><span>${statLine}</span></div>`:""}
      ${effectLine?`<div class="finder-line"><b>Effects</b><span>${effectLine}</span></div>`:""}
      ${req?`<div class="finder-line"><b>Requires</b><span>${escapeHtml(req)}</span></div>`:""}
      ${prices?`<div class="finder-line"><b>Value</b><span>${escapeHtml(prices)}</span></div>`:""}
      <div class="finder-sources"><b>Where to get it</b>${renderObtainSources(item)}</div>
      <div class="finder-card-footer">${verificationMarker(item)}<button data-open-item="${i}">Full details</button></div>
    </article>`;
  }).join("");

  box.querySelectorAll("[data-open-item]").forEach(btn=>btn.addEventListener("click",e=>{
    e.stopPropagation();
    openEntry(rows[Number(btn.dataset.openItem)]);
  }));
  box.querySelectorAll(".finder-card").forEach((card,cardIndex)=>{
    const item=rows[cardIndex];
    const sources=normalizeObtain(item.obtain);
    card.querySelectorAll("[data-source-index]").forEach(btn=>btn.addEventListener("click",e=>{
      e.stopPropagation();
      const source=sources[Number(btn.dataset.sourceIndex)];
      const linked=findLinkedEntry(source?.source);
      if(linked) openEntry(linked);
    }));
  });
}

function getItemFilters(){
  const category=document.getElementById("itemFinderCategory")?.value||"all";
  const status=document.getElementById("itemFinderStatus")?.value||"all";
  const query=(document.getElementById("itemFinderSearch")?.value||"").trim().toLowerCase();
  return {category,status,query};
}

function filterItems(){
  const {category,status,query}=getItemFilters();
  const rows=itemEntries.filter(item=>{
    const categoryMatch=category==="all" || String(item.category||item.type||"").toLowerCase()===category.toLowerCase();
    const statusMatch=status==="all" || String(item.status||"").toLowerCase()===status.toLowerCase();
    const sources=normalizeObtain(item.obtain).flatMap(o=>[o.source,o.type,String(o.chancePercent||""),...(o.weather||[])]);
    const equipment=[item.tier?`T${item.tier}`:"",item.equipmentType,item.weaponType,item.armorWeight,item.slot,item.handType,...(Array.isArray(item.requirements)?item.requirements.flatMap(r=>[r.stat,String(r.value||"")]):[]),...Object.values(item.rolls||{}).flat().flatMap(r=>r.stat),...(item.acquisition||[]).flatMap(a=>[a.method,a.source])];
    const hay=[item.name,item.category,item.type,...(item.subtype||[]),item.description,item.status,...(item.tags||[]),...sources,...equipment,...Object.keys(item.stats||{}),...Object.values(item.stats||{}).map(String)].filter(Boolean).join(" ").toLowerCase();
    const queryMatch=!query || hay.includes(query);
    return categoryMatch && statusMatch && queryMatch;
  }).sort((a,b)=>a.name.localeCompare(b.name));
  renderItemCards(rows);
}

function initItemFinder(){
  const category=document.getElementById("itemFinderCategory");
  const status=document.getElementById("itemFinderStatus");
  const searchBox=document.getElementById("itemFinderSearch");
  if(!category||!status||!searchBox) return;

  const categories=[...new Set(itemEntries.map(i=>i.category||i.type).filter(Boolean))].sort();
  category.innerHTML=`<option value="all">All categories</option>`+categories.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
  const statuses=[...new Set(itemEntries.map(i=>i.status).filter(Boolean))].sort();
  status.innerHTML=`<option value="all">All trade states</option>`+statuses.map(s=>`<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");

  searchBox.addEventListener("input",filterItems);
  category.addEventListener("change",filterItems);
  status.addEventListener("change",filterItems);
  document.getElementById("itemFinderClear")?.addEventListener("click",()=>{
    searchBox.value="";category.value="all";status.value="all";filterItems();searchBox.focus();
  });
  filterItems();
}

function npcShopCategories(entry){
  const seen=new Set();
  return [
    ...(entry.shopCategories||[]),
    ...(entry.weaponCategories||[]),
    ...(entry.armorCategories||[])
  ].filter(category=>{
    const key=String(category).trim().toLowerCase();
    if(!key||seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function npcArtKey(name){
  return String(name||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function renderNpcPortrait(entry){
  const name=entry._displayName||entry.name||"NPC";
  const art=window.PORTALDB_NPC_ART?.[npcArtKey(name)];
  if(!art) return "";
  return `<div class="npc-profile-portrait"><img src="${escapeHtml(art)}" alt="Illustration of ${escapeHtml(name)}"><small class="npc-profile-art-note">PortalDB fan illustration</small></div>`;
}

function itemsLinkedToNpc(entry){
  const name=String(entry.name||entry._displayName||"").toLowerCase();
  return itemEntries.filter(item=>normalizeObtain(item.obtain).some(o=>String(o.source||"").toLowerCase()===name));
}

function questReferencesNpc(quest,npcName){
  const q=String(npcName||"").toLowerCase();
  if(!q) return false;
  if((quest.relatedNPCs||[]).some(n=>String(n).toLowerCase()===q)) return true;
  return (quest.parts||[]).some(part=>{
    if((part.relatedNPCs||[]).some(n=>String(n).toLowerCase()===q)) return true;
    return (part.objectives||[]).some(o=>String(o).toLowerCase().includes(q));
  });
}

function questsLinkedToNpc(entry){
  return database.filter(q=>q._collection==="quests" && questReferencesNpc(q,entry.name||entry._displayName));
}

function renderLinkPills(entries,kind){
  if(!entries.length) return "";
  return entries.map((entry,i)=>`<button class="npc-link-card" data-dialog-link-kind="${kind}" data-dialog-link-index="${i}"><span>${escapeHtml(entry._displayName||entry.name)}</span><b aria-hidden="true">Open ↗</b></button>`).join("");
}

function renderNpcDetail(entry){
  const categories=npcShopCategories(entry);
  const linkedItems=itemsLinkedToNpc(entry);
  const linkedQuests=questsLinkedToNpc(entry);
  const location=entry.location||entry.serviceLocation||"";
  const restock=entry.restockIntervalMinutes?`${entry.restockIntervalMinutes} minutes`:"";
  const partTime=(entry.tags||[]).some(tag=>String(tag).toLowerCase()==="part-time job")?"Available":"";
  const quickInfo=[
    entry.profession?`<div class="meta-box"><small>ROLE</small><strong>${escapeHtml(entry.profession)}</strong></div>`:"",
    location?`<div class="meta-box"><small>LOCATION / SERVICE</small><strong>${escapeHtml(location)}</strong></div>`:"",
    entry.openHours||entry.availability?`<div class="meta-box"><small>HOURS</small><strong>${escapeHtml(entry.openHours||entry.availability)}</strong></div>`:"",
    restock?`<div class="meta-box"><small>RESTOCK</small><strong>${escapeHtml(restock)}</strong></div>`:"",
    partTime?`<div class="meta-box"><small>PART-TIME JOB</small><strong>${escapeHtml(partTime)}</strong></div>`:""
  ].filter(Boolean).join("");
  const serviceRows=(entry.services||[]).map(s=>{
    const details=[];
    if(s.inputs?.length) details.push(s.inputs.join(" · "));
    if(s.categories?.length) details.push(s.categories.join(" · "));
    if(s.cost!==undefined&&s.cost!==null) details.push(`${s.cost}${s.currency?` ${s.currency}`:""}`);
    const distinctProvenance=s.confidence&&String(s.confidence)!==String(entry.confidence)?verificationMarker(s):"";
    return `<div class="npc-service-row"><div class="verification-heading"><strong>${escapeHtml(s.name)}</strong>${distinctProvenance}</div>${details.length?`<span>${escapeHtml(details.join(" · "))}</span>`:""}</div>`;
  }).join("");
  const dialogue=(entry.dialogueOptions||[]).map(line=>`<li>${escapeHtml(line)}</li>`).join("");
  const factLabels={locationIntro:"Location",localReferrals:"Local Referrals",portalRumors:"Portal Rumors",familyConnection:"Family Connection"};
  const facts=entry.dialogueFacts?Object.entries(entry.dialogueFacts).map(([k,v])=>{
    const value=Array.isArray(v)?v.join(", "):v;
    return `<div class="npc-fact"><small>${escapeHtml(factLabels[k]||prettyKey(k))}</small><span>${escapeHtml(value)}</span></div>`;
  }).join(""):"";
  const shopServices=categories.length||serviceRows;
  const dialogueInformation=dialogue||facts;
  const connections=linkedItems.length||linkedQuests.length;
  const portrait=renderNpcPortrait(entry);

  return `<div class="dialog-body npc-detail npc-profile">
    <header class="npc-profile-identity ${portrait?"":"npc-profile-no-art"}">
      ${portrait}
      <div class="npc-profile-identity-copy"><div class="type">NPC PROFILE</div><div class="verification-heading"><h2>${escapeHtml(entry._displayName)}</h2>${verificationMarker(entry)}</div>${entry.profession?`<p class="npc-profile-role">${escapeHtml(entry.profession)}</p>`:""}${entry.shopName?`<p class="npc-profile-service-name">${escapeHtml(entry.shopName)}</p>`:""}${entry.description?`<p class="npc-profile-summary">${escapeHtml(entry.description)}</p>`:""}</div>
    </header>
    ${quickInfo?`<section class="npc-profile-section npc-profile-quick-info"><h3>Quick Info</h3><div class="meta-grid npc-meta-grid">${quickInfo}</div></section>`:""}
    ${shopServices?`<section class="npc-profile-section npc-profile-services"><h3>Shop / Services</h3>${categories.length?`<div class="npc-profile-subsection"><h4>Shop Categories</h4><div class="npc-chip-row">${categories.map(c=>`<span>${escapeHtml(c)}</span>`).join("")}</div></div>`:""}${serviceRows?`<div class="npc-profile-subsection npc-profile-service-list"><h4>Services</h4>${serviceRows}</div>`:""}</section>`:""}
    ${dialogueInformation?`<section class="npc-profile-section npc-profile-dialogue"><h3>Dialogue &amp; Information</h3>${dialogue?`<div class="npc-profile-subsection"><h4>Dialogue Options</h4><ol class="npc-dialogue-list">${dialogue}</ol></div>`:""}${facts?`<div class="npc-profile-subsection"><h4>Documented Facts</h4><div class="npc-facts">${facts}</div></div>`:""}</section>`:""}
    ${connections?`<section class="npc-profile-section npc-profile-connections"><h3>Connected Content</h3>${linkedItems.length?`<div class="npc-profile-subsection"><h4>Known Items</h4><div class="npc-link-row">${renderLinkPills(linkedItems,"item")}</div></div>`:""}${linkedQuests.length?`<div class="npc-profile-subsection"><h4>Related Quests</h4><div class="npc-link-row">${renderLinkPills(linkedQuests,"quest")}</div></div>`:""}</section>`:""}
  </div>`;
}

function bindNpcDialogLinks(entry){
  const dialog=document.getElementById("dialogContent");
  if(!dialog) return;
  const linkedItems=itemsLinkedToNpc(entry);
  const linkedQuests=questsLinkedToNpc(entry);
  dialog.querySelectorAll("[data-dialog-link-kind]").forEach(btn=>btn.addEventListener("click",()=>{
    const list=btn.dataset.dialogLinkKind==="item"?linkedItems:linkedQuests;
    const target=list[Number(btn.dataset.dialogLinkIndex)];
    if(target) openEntry(target);
  }));
}

const recordProfileCollections=new Set(["bosses","races","jobs","skills","locations","mechanics","codes","patches","updates"]);

function displayNumber(value){
  return typeof value==="number"?value.toLocaleString():String(value);
}

function recordLabel(key){
  const names={hp:"HP",class:"Job / Class",locationType:"Type",parentLocation:"Parent Location",durationMinutes:"Duration",durationSeconds:"Duration",minimumPlayersForAutoSpawn:"Minimum Players",prizeThresholdDamage:"Prize Threshold",participationDamage:"Participation Threshold",rewardDelivery:"Reward Delivery",disconnectPersistence:"Reconnect Behavior",eventCalendarDisplay:"Event Calendar",normalDrops:"Normal Drops",dropsExp:"EXP Drops",dropsTria:"Tria Drops",basePrizePool:"Base Prize Pool",previousBasePrizePool:"Previous Prize Pool",maxPrizes:"Maximum Prizes",guildExp:"Guild EXP",guildCoin:"Guild Coin",postedDate:"Published",tutorialChoice:"Tutorial Choice",variantChance:"Variant Chance",startingMemberCapacity:"Starting Capacity",maximumUpgradedCapacity:"Maximum Capacity",maximumPercent:"Current Maximum",previousMaximumPercent:"Previous Maximum",currentLevel:"Current Level Cap",previousLevel:"Previous Level Cap",arcaneDefenseWave:"Arcane Defense Wave",guaranteedHitWithinStuds:"Guaranteed Hit Range",distanceBeyondStudsUses3D:"3D Distance Begins After",attackConeDegreesAtAnnouncement:"Attack Cone at Announcement",largeHeightDifferenceMisses:"Large Height Difference Misses"};
  return names[key]||prettyKey(key);
}

function recordValue(value,suffix=""){
  if(typeof value==="boolean") return value?"Yes":"No";
  return `${displayNumber(value)}${suffix}`;
}

function renderRecordHeader(entry){
  return `<header class="record-profile-header"><div class="type">${escapeHtml(labels[entry._collection]||"ENTRY")}</div><div class="verification-heading"><h2>${escapeHtml(entry._displayName)}</h2>${entry._collection==="items"?"":verificationMarker(entry)}</div>${entry.description?`<p class="record-profile-summary">${escapeHtml(entry.description)}</p>`:""}</header>`;
}

function renderRecordQuickInfo(items){
  const cells=items.filter(([,value])=>value!==undefined&&value!==null&&value!=="").map(([label,value])=>`<div class="record-profile-fact"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join("");
  return cells?`<section class="record-profile-section record-profile-quick"><h3>Quick Info</h3><div class="record-profile-facts">${cells}</div></section>`:"";
}

function renderRecordSection(title,body,className=""){
  return body?`<section class="record-profile-section ${className}"><h3>${escapeHtml(title)}</h3>${body}</section>`:"";
}

function renderTextList(values,className="record-profile-list"){
  const rows=(values||[]).filter(value=>value!==undefined&&value!==null&&value!=="");
  return rows.length?`<ul class="${className}">${rows.map(value=>`<li>${escapeHtml(value)}</li>`).join("")}</ul>`:"";
}

function uniqueNames(values){
  const seen=new Set();
  return (values||[]).filter(value=>{const key=String(value).trim().toLowerCase();if(!key||seen.has(key))return false;seen.add(key);return true;});
}

function renderLinkedNames(values){
  const names=uniqueNames(values);
  return names.length?`<div class="record-profile-links">${names.map(name=>findLinkedEntry(name)?`<button class="record-profile-link" data-record-link="${escapeHtml(name)}"><span>${escapeHtml(name)}</span><b aria-hidden="true">Open ↗</b></button>`:`<span class="record-profile-label">${escapeHtml(name)}</span>`).join("")}</div>`:"";
}

function renderRewardMap(rewards){
  if(!rewards||!Object.keys(rewards).length) return "";
  return `<div class="record-reward-list">${Object.entries(rewards).map(([name,quantity])=>`<div><span>${escapeHtml(recordLabel(name))}</span><strong>×${escapeHtml(displayNumber(quantity))}</strong></div>`).join("")}</div>`;
}

function renderRewardEntries(rewards){
  if(!rewards?.length) return "";
  return `<div class="record-reward-list">${rewards.map(reward=>`<div><span>${escapeHtml(reward.name||reward.item)}</span><strong>×${escapeHtml(displayNumber(reward.amount??reward.quantity??1))}</strong></div>`).join("")}</div>`;
}

function rankLabel(rank){
  const value=Number(rank);
  const mod100=value%100;
  const suffix=mod100>=11&&mod100<=13?"th":value%10===1?"st":value%10===2?"nd":value%10===3?"rd":"th";
  return `${value}${suffix} Place`;
}

function renderSimpleFacts(object){
  if(!object) return "";
  const rows=Object.entries(object).filter(([,value])=>["string","number","boolean"].includes(typeof value));
  return rows.length?`<dl class="record-profile-detail-list">${rows.map(([key,value])=>`<div><dt>${escapeHtml(recordLabel(key))}</dt><dd>${escapeHtml(recordValue(value))}</dd></div>`).join("")}</dl>`:"";
}

function renderBossDetail(entry){
  const quick=renderRecordQuickInfo([
    ["Element",entry.element],["HP",entry.hp!==undefined?displayNumber(entry.hp):""],["Location",entry.location],["Duration",entry.durationMinutes!==undefined?`${entry.durationMinutes} minutes`:""],["Schedule",entry.schedule]
  ]);
  const combat=renderTextList(entry.abilities);
  const rewardParts=[];
  if(entry.knownDrops?.length) rewardParts.push(`<div class="record-profile-subsection"><h4>Known Drops</h4>${renderLinkedNames(entry.knownDrops)}</div>`);
  if(entry.possiblePrizes?.length) rewardParts.push(`<div class="record-profile-subsection"><h4>Possible Prizes</h4>${renderTextList(entry.possiblePrizes)}</div>`);
  if(entry.participationRewards) rewardParts.push(`<div class="record-profile-subsection"><h4>Participation Rewards</h4>${renderRewardMap(entry.participationRewards)}</div>`);
  if(entry.topDamageRewards) rewardParts.push(`<div class="record-profile-subsection"><h4>Top Damage Rewards</h4>${renderRewardMap(Object.fromEntries(Object.entries(entry.topDamageRewards).map(([rank,value])=>[rankLabel(rank),value])))}</div>`);
  if(entry.additionalTopDamageMagnifyingGlassRewards) rewardParts.push(`<div class="record-profile-subsection"><h4>Additional Magnifying Glass Rewards</h4>${renderRewardMap(Object.fromEntries(Object.entries(entry.additionalTopDamageMagnifyingGlassRewards).map(([rank,value])=>[rankLabel(rank),value])))}</div>`);
  const eventFacts={minimumPlayersForAutoSpawn:entry.minimumPlayersForAutoSpawn,prizeThresholdDamage:entry.prizeThresholdDamage,participationDamage:entry.participationDamage,basePrizePool:entry.basePrizePool,previousBasePrizePool:entry.previousBasePrizePool,maxPrizes:entry.maxPrizes,rewardDelivery:entry.rewardDelivery,normalDrops:entry.normalDrops,dropsExp:entry.dropsExp,dropsTria:entry.dropsTria};
  const eventNotes=[entry.eventCalendarDisplay,entry.disconnectPersistence,entry.payoutLimit,entry.topDamageMagnifyingGlassDistribution].filter(Boolean);
  const eventBody=`${renderSimpleFacts(eventFacts)}${entry.countsFor?.length?`<div class="record-profile-subsection"><h4>Counts For</h4>${renderTextList(entry.countsFor)}</div>`:""}${eventNotes.length?renderTextList(eventNotes):""}`;
  return `${renderRecordHeader(entry)}${quick}${renderRecordSection("Combat",combat,"record-profile-combat")}${renderRecordSection("Rewards",rewardParts.join(""),"record-profile-rewards")}${renderRecordSection("Event Information",eventBody,"record-profile-event")}`;
}

function renderRaceDetail(entry){
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo([["Stats",entry.stats?formatStats(entry.stats):""],["Tutorial Choice",entry.tutorialChoice],["Variant Chance",entry.variantChance]])}`;
}

function renderJobDetail(entry){return renderRecordHeader(entry)}

function renderSkillDetail(entry){
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo([["Job / Class",entry.class],["Element",entry.element],["Version",entry.version]])}`;
}

function renderLocationDetail(entry){
  const characters=uniqueNames([...(entry.npcs||[]),...(entry.relatedNPCs||[])]);
  const encounters=uniqueNames([...(entry.enemies||[]),...(entry.relatedEnemies||[]),...(entry.bosses||[]),...(entry.relatedBosses||[])]);
  const quests=uniqueNames([...(entry.quests||[]),...(entry.relatedQuests||[])]);
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo([["Type",entry.locationType],["Parent Location",entry.parentLocation]])}${renderRecordSection("Places Within",renderLinkedNames(entry.subLocations))}${renderRecordSection("Related Characters",renderLinkedNames(characters))}${renderRecordSection("Related Encounters",renderLinkedNames(encounters))}${renderRecordSection("Related Quests",renderLinkedNames(quests))}`;
}

function renderMechanicDetail(entry){
  const quickItems=[["Version",entry.version],["Creation NPC",entry.creationNpc],["Creation Cost",entry.creationCost?`${displayNumber(entry.creationCost.amount)} ${entry.creationCost.currency}`:""],["Starting Capacity",entry.startingMemberCapacity],["Maximum Capacity",entry.maximumUpgradedCapacity],["Current Maximum",entry.maximumPercent!==undefined?`${entry.maximumPercent}%`:""],["Previous Maximum",entry.previousMaximumPercent!==undefined?`${entry.previousMaximumPercent}%`:""],["Current Level Cap",entry.currentLevel],["Previous Level Cap",entry.previousLevel],["Duration",entry.durationSeconds!==undefined?`${entry.durationSeconds} seconds`:""],["Started By",entry.startedBy],["Manual Start",entry.manualStart===true?"Required":entry.manualStart===false?"Not required":""]];
  if(entry.arcaneDefense){quickItems.push(["Availability",entry.arcaneDefense.availability],["Started By",entry.arcaneDefense.startedBy],["Manual Start",entry.arcaneDefense.manualStart?"Required":""])}
  const parts=[];
  if(entry.prizePoolAdditions?.length) parts.push(`<div class="record-profile-subsection"><h4>Prize Pool Additions</h4>${renderTextList(entry.prizePoolAdditions.map(item=>`${item.item} — ${item.version}`))}</div>`);
  if(entry.prizePoolRemovals?.length) parts.push(`<div class="record-profile-subsection"><h4>Prize Pool Removals</h4>${renderTextList(entry.prizePoolRemovals.map(item=>`${item.item} — ${item.version}`))}</div>`);
  if(entry.history?.length) parts.push(`<div class="record-profile-subsection"><h4>History</h4>${renderTextList(entry.history.map(item=>`${item.version}: ${item.facts.join(" · ")}`))}</div>`);
  if(entry.activityRewards) parts.push(`<div class="record-profile-subsection"><h4>Activity Rewards</h4><div class="record-mechanic-groups">${Object.entries(entry.activityRewards).map(([key,value])=>{const requirement=typeof value.requirement==="string"?value.requirement:value.requirement?.wording||Object.entries(value.requirement||{}).map(([k,v])=>`${recordLabel(k)}: ${displayNumber(v)}`).join(" · ");return `<article><strong>${escapeHtml(recordLabel(key))}</strong><p>${escapeHtml(requirement)}</p>${renderRewardMap(value.rewards)}</article>`}).join("")}</div></div>`);
  if(entry.guildBase?.use) parts.push(`<div class="record-profile-subsection"><h4>Guild Base</h4>${renderTextList([entry.guildBase.use])}</div>`);
  if(entry.perWaveBaseRewards) parts.push(`<div class="record-profile-subsection"><h4>Per-Wave Base Rewards</h4>${renderRewardMap(entry.perWaveBaseRewards)}</div>`);
  if(entry.waves?.length) parts.push(`<div class="record-profile-subsection"><h4>Wave Rewards</h4><div class="record-wave-list">${entry.waves.map(wave=>`<div><strong>Wave ${escapeHtml(wave.wave)}</strong><span>${escapeHtml(displayNumber(wave.tria))} Tria · ${escapeHtml(wave.reward)}</span></div>`).join("")}</div></div>`);
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo(quickItems)}${renderRecordSection("Details",parts.join(""))}`;
}

function renderCodeDetail(entry){
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo([["Published",entry.postedDate],["Status",entry.status]])}${renderRecordSection("Rewards",renderRewardEntries(entry.rewards))}`;
}

function renderPatchDetail(entry){
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo([["Version",entry.version],["Date",entry.date]])}${renderRecordSection("Changes",renderTextList(entry.highlights))}`;
}

function renderUpdateDetail(entry){
  const changes=entry.changes?.map(change=>Object.entries(change).map(([key,value])=>`${recordLabel(key)}: ${value}`).join(" · "))||[];
  const details=entry.highlights?.length?entry.highlights:changes;
  const body=`${renderTextList(details)}${renderSimpleFacts(entry.rules)}`;
  return `${renderRecordHeader(entry)}${renderRecordQuickInfo([["Type",entry.type],["Version",entry.version],["Date",entry.date]])}${renderRecordSection("Update Details",body)}`;
}

function renderRecordProfile(entry){
  const renderers={bosses:renderBossDetail,races:renderRaceDetail,jobs:renderJobDetail,skills:renderSkillDetail,locations:renderLocationDetail,mechanics:renderMechanicDetail,codes:renderCodeDetail,patches:renderPatchDetail,updates:renderUpdateDetail};
  return `<div class="dialog-body record-profile record-profile-${escapeHtml(entry._collection)}">${renderers[entry._collection](entry)}</div>`;
}

function isStructuredEquipment(entry){
  return entry._collection==="items"&&entry.category==="Equipment"&&entry.rolls;
}

function equipmentValue(value,unit,{signed=true}={}){
  if(typeof value==="string") return value;
  const sign=signed&&Number(value)>0?"+":"";
  return `${sign}${displayNumber(value)}${unit||""}`;
}

function equipmentRange(roll){
  return `${equipmentValue(roll.min,roll.unit)} to ${equipmentValue(roll.max,roll.unit)}`;
}

function renderEquipmentStatRows(rows,{chance=false}={}){
  if(!rows?.length) return "";
  return `<div class="equipment-stat-list">${rows.map(row=>`<div class="equipment-stat-row"><span>${escapeHtml(row.stat)}</span><strong>${escapeHtml(row.min!==undefined?equipmentRange(row):equipmentValue(row.value,row.unit))}</strong>${chance?`<small>${escapeHtml(row.appearanceChancePercent)}% appearance chance</small>`:""}</div>`).join("")}</div>`;
}

function renderEquipmentAcquisition(entry){
  if(!entry.acquisition?.length) return "";
  return `<div class="equipment-acquisition-list">${entry.acquisition.map(source=>`<div><strong>${escapeHtml(source.method)}</strong>${renderLinkedNames([source.source])}${source.chancePercent!==undefined?`<small>${escapeHtml(source.chancePercent)}% ${escapeHtml(source.chanceContext||"")}</small>`:""}</div>`).join("")}</div>`;
}

function renderEquipmentRecipe(entry){
  if(!entry.recipe?.length) return "";
  return `<div class="equipment-recipe">${entry.recipe.map(material=>findLinkedEntry(material.item)?`<button class="equipment-material" data-record-link="${escapeHtml(material.item)}"><span>${escapeHtml(material.item)}</span><strong>×${escapeHtml(material.quantity)}</strong></button>`:`<span class="equipment-material"><span>${escapeHtml(material.item)}</span><strong>×${escapeHtml(material.quantity)}</strong></span>`).join("")}</div>`;
}

function renderEquipmentDetail(entry){
  const subtype=entry.weaponType||entry.armorWeight;
  const requirement=(entry.requirements||[]).map(r=>`${r.value} ${r.stat}${r.permanent?" permanent requirement":""}`).join(" · ");
  const overview=renderRecordQuickInfo([["Tier",`T${entry.tier}`],["Type",entry.equipmentType],["Subtype",subtype],["Slot",entry.slot],["Hands",entry.handType],["Sell Value",entry.sellTria!==undefined?`${displayNumber(entry.sellTria)} Tria`:""]]);
  const header=`<header class="record-profile-header equipment-profile-header"><div class="type">EQUIPMENT</div><div class="verification-heading"><h2>${escapeHtml(entry._displayName)}</h2>${verificationMarker(entry)}</div></header>`;
  const guaranteed=`<div class="equipment-guaranteed"><div><h4>Primary Rolls</h4>${renderEquipmentStatRows(entry.rolls.primary)}</div><div><h4>Fixed Stats</h4>${renderEquipmentStatRows(entry.rolls.fixed)}</div></div>`;
  const bands=[["Common","0–20%"],["Uncommon","20–40%"],["Rare","40–60%"],["Epic","60–80%"],["Legendary","80–100%"]];
  const quality=`<div class="equipment-quality"><div class="equipment-quality-bands">${bands.map(([name,range])=>`<span><strong>${name}</strong><small>${range}</small></span>`).join("")}</div><p>Roll Quality reflects where a variable stat landed within its allowed range.</p><p>Each listed Secondary modifier has its own documented appearance chance.</p></div>`;
  return `<div class="dialog-body record-profile equipment-profile">${header}${overview}${renderRecordSection("Permanent Requirement",`<p class="equipment-requirement">${escapeHtml(requirement)}</p>`)}${renderRecordSection("Guaranteed Stats",guaranteed)}${renderRecordSection("Possible Secondary Rolls",renderEquipmentStatRows(entry.rolls.secondary,{chance:true}))}${renderRecordSection("Roll Quality",quality)}${renderRecordSection("Acquisition",renderEquipmentAcquisition(entry))}${renderRecordSection("Crafting Recipe",renderEquipmentRecipe(entry))}</div>`;
}

function renderGenericDetail(entry){
  const details = [];
  if(entry.stats) details.push(`<div class="meta-box"><small>STATS</small><strong>${formatStats(entry.stats)}</strong></div>`);
  if(entry.effects) details.push(`<div class="meta-box"><small>EFFECTS</small><strong>${formatEffects(entry.effects)}</strong></div>`);
  if(entry.status) details.push(`<div class="meta-box"><small>STATUS</small><strong>${escapeHtml(entry.status)}</strong></div>`);
  if(entry.profession) details.push(`<div class="meta-box"><small>ROLE</small><strong>${escapeHtml(entry.profession)}</strong></div>`);
  if(entry.openHours) details.push(`<div class="meta-box"><small>HOURS</small><strong>${escapeHtml(entry.openHours)}</strong></div>`);
  if(entry.tutorialChoice) details.push(`<div class="meta-box"><small>TUTORIAL CHOICE</small><strong>${escapeHtml(entry.tutorialChoice)}</strong></div>`);
  if(entry.variantChance) details.push(`<div class="meta-box"><small>VARIANT RATE</small><strong>${escapeHtml(entry.variantChance)}</strong></div>`);
  if(entry.rewards) details.push(formatRewards(entry.rewards));
  if(entry.buyTria!==undefined || entry.sellTria!==undefined) details.push(`<div class="meta-box"><small>VALUE</small><strong>${escapeHtml(itemPriceText(entry))}</strong></div>`);
  if(entry.requirements) details.push(`<div class="meta-box"><small>REQUIREMENTS</small><strong>${escapeHtml(itemRequirementText(entry))}</strong></div>`);
  const sources=normalizeObtain(entry.obtain);
  const sourceBlock=sources.length?`<div class="entry-obtain"><strong>Acquisition</strong>${sources.map((s,i)=>{
    const linked=findLinkedEntry(s.source);
    return `<button class="entry-source-link ${linked?"is-linked":""}" data-generic-source="${i}">${escapeHtml(sourceLabel(s))}${linked?" ↗":""}</button>`;
  }).join("")}</div>`:"";
  return `<div class="dialog-body">
      <div class="type">${labels[entry._collection]||"ENTRY"}</div>
      <div class="verification-heading"><h2>${escapeHtml(entry._displayName)}</h2>${entry._collection==="items"?"":verificationMarker(entry)}</div>
      ${entry.description?`<p>${escapeHtml(entry.description)}</p>`:""}
      ${details.length?`<div class="meta-grid">
        ${details.join("")}
      </div>`:""}
      ${sourceBlock}
      ${entry.highlights?.length ? `<p class="entry-source"><strong>Highlights:</strong> ${escapeHtml(entry.highlights.join(" • "))}</p>` : ""}
      ${entry.notes ? `<p class="entry-source"><strong>Notes:</strong> ${escapeHtml(entry.notes)}</p>` : ""}
    </div>`;
}

function openEntry(entry){
  if(entry.href){window.location.href=entry.href;return}
  const dialog=document.getElementById("dialogContent");
  if(!dialog) return;
  const entryDialog=document.getElementById("entryDialog");
  const replacingOpenDialog=Boolean(entryDialog?.open);
  entryDialog?.classList.toggle("npc-profile-dialog",entry._collection==="npcs");
  entryDialog?.classList.toggle("record-profile-dialog",recordProfileCollections.has(entry._collection));
  entryDialog?.classList.toggle("equipment-profile-dialog",isStructuredEquipment(entry));
  if(entry._collection==="npcs"){
    dialog.innerHTML=renderNpcDetail(entry);
    bindNpcDialogLinks(entry);
  }else{
    dialog.innerHTML=isStructuredEquipment(entry)?renderEquipmentDetail(entry):recordProfileCollections.has(entry._collection)?renderRecordProfile(entry):renderGenericDetail(entry);
    const sources=normalizeObtain(entry.obtain);
    dialog.querySelectorAll("[data-generic-source]").forEach(btn=>btn.addEventListener("click",()=>{
      const source=sources[Number(btn.dataset.genericSource)];
      const linked=findLinkedEntry(source?.source);
      if(linked) openEntry(linked);
    }));
    dialog.querySelectorAll("[data-record-link]").forEach(btn=>btn.addEventListener("click",()=>{
      const linked=findLinkedEntry(btn.dataset.recordLink);
      if(linked) openEntry(linked);
    }));
  }
  if(isDatabasePage&&!entryDialog?.open&&document.activeElement instanceof HTMLElement){
    databaseDialogTrigger=document.activeElement.closest(".search-results")?input:document.activeElement;
  }
  if(entryDialog&&!entryDialog.open) entryDialog.showModal();
  else if(replacingOpenDialog) document.getElementById("dialogClose")?.focus();
  results?.classList.add("hidden");
}

document.getElementById("dialogClose")?.addEventListener("click",()=>document.getElementById("entryDialog")?.close());
document.getElementById("entryDialog")?.addEventListener("close",()=>{
  if(isDatabasePage&&databaseDialogTrigger?.isConnected) databaseDialogTrigger.focus();
  databaseDialogTrigger=null;
});

document.addEventListener("keydown",e=>{
  if(e.key==="/"&&input&&document.activeElement!==input){e.preventDefault();input.focus()}
  if(e.key==="Escape"){
    results?.classList.add("hidden");
    const entryDialog=document.getElementById("entryDialog");
    if(isDatabasePage&&entryDialog?.open){e.preventDefault();entryDialog.close();}
  }
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".search-shell")&&!e.target.closest(".search-results")&&!e.target.closest("[data-query]"))results?.classList.add("hidden");
});

function escapeHtml(v){
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

loadData().catch(console.error);
