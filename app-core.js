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
      const res = await fetch(`data/${name}.json?v=20260828-two-state-provenance-1`);
      if(!res.ok) return [];
      const rows = await res.json();
      return rows.map(row=>({...row,_collection:name,_displayName:row.name||row.code||row.version||row.id}));
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
    const extra = [entry.tutorialChoice, entry.variantChance, entry.source, entry.status, entry.version, entry.profession, entry.shopName, entry.category, ...(entry.subtype||[]), ...(entry.tags||[]), ...rewards, ...highlights, ...obtain, ...Object.keys(entry.stats||{}), ...Object.values(entry.stats||{}).map(String)];
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
const databaseCategoryDescriptions={npcs:"Merchants, services, shops, quest relationships, and other NPC information.",bosses:"Encounters, mechanics, drops, schedules, and related content.",locations:"Villages, regions, sub-areas, services, and related content.",races:"Races, variants, stat bonuses, and character information.",jobs:"Warrior, Defender, Enchanter, Cleric, and related job information.",skills:"Skills, costs, cooldowns, effects, and related mechanics.",mechanics:"Combat, regeneration, account systems, and gameplay rules.",codes:"Published redemption codes and their rewards.",patches:"Versioned patch notes and gameplay changes.",updates:"Major game updates and feature additions."};

function resetDatabaseBrowser(){
  categoryButtons.forEach(btn=>{btn.classList.remove("is-active");btn.setAttribute("aria-pressed","false");});
  databaseBrowser?.classList.add("hidden");
  if(databaseBrowserResults) databaseBrowserResults.innerHTML="";
}

function renderDatabaseCategory(cat){
  if(!databaseBrowser || !databaseBrowserResults) return;
  const rows=database.filter(entry=>entry._collection===cat);
  if(databaseBrowserTitle) databaseBrowserTitle.textContent=databaseCategoryTitles[cat]||cat;
  if(databaseBrowserDescription) databaseBrowserDescription.textContent=databaseCategoryDescriptions[cat]||"";
  if(databaseBrowserCount){databaseBrowserCount.textContent=rows.length?`${rows.length} ${rows.length===1?"record":"records"}`:"";databaseBrowserCount.classList.toggle("hidden",!rows.length);}
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
  const parts=[item.category,...(Array.isArray(item.subtype)?item.subtype:[])].filter(Boolean);
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
    const hay=[item.name,item.category,item.type,...(item.subtype||[]),item.description,item.status,...(item.tags||[]),...sources,...Object.keys(item.stats||{}),...Object.values(item.stats||{}).map(String)].filter(Boolean).join(" ").toLowerCase();
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
      <p>${escapeHtml(getDescription(entry))}</p>
      <div class="meta-grid">
        ${details.join("")}
      </div>
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
  entryDialog?.classList.toggle("npc-profile-dialog",entry._collection==="npcs");
  if(entry._collection==="npcs"){
    dialog.innerHTML=renderNpcDetail(entry);
    bindNpcDialogLinks(entry);
  }else{
    dialog.innerHTML=renderGenericDetail(entry);
    const sources=normalizeObtain(entry.obtain);
    dialog.querySelectorAll("[data-generic-source]").forEach(btn=>btn.addEventListener("click",()=>{
      const source=sources[Number(btn.dataset.genericSource)];
      const linked=findLinkedEntry(source?.source);
      if(linked) openEntry(linked);
    }));
  }
  if(isDatabasePage&&!entryDialog?.open&&document.activeElement instanceof HTMLElement){
    databaseDialogTrigger=document.activeElement.closest(".search-results")?input:document.activeElement;
  }
  if(entryDialog&&!entryDialog.open) entryDialog.showModal();
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

