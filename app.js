const collections = ["items","quests","npcs","bosses","races","jobs","codes","updates"];
const labels = {items:"ITEM",quests:"QUEST",npcs:"NPC",bosses:"BOSS",races:"RACE",jobs:"JOB",codes:"CODE",updates:"UPDATE"};
let database = [];

async function loadData(){
  const sets = await Promise.all(collections.map(async name=>{
    const res = await fetch(`data/${name}.json`);
    if(!res.ok) return [];
    const rows = await res.json();
    return rows.map(row=>({...row,_collection:name,_displayName:row.name||row.code||row.id}));
  }));
  database = sets.flat();
  renderPreview();
}

function getDescription(entry){
  return entry.description || entry.notes || entry.status || `${labels[entry._collection] || "ENTRY"} record`;
}

function renderPreview(){
  const box=document.getElementById("entryPreview");
  const realEntries = database.filter(entry => !String(entry.id || "").startsWith("demo-"));
  const previewEntries = (realEntries.length ? realEntries : database).slice(0,4);
  box.innerHTML=previewEntries.map((entry,i)=>`
    <button class="preview-row" data-preview="${i}">
      <span class="preview-icon">${["✦","◇","♙","⚔"][i]||"✦"}</span>
      <span>
        <strong>${escapeHtml(entry._displayName)}</strong>
        <small>${escapeHtml(getDescription(entry))}</small>
      </span>
      <span class="preview-tag">${labels[entry._collection]}</span>
    </button>
  `).join("");
  box.querySelectorAll("[data-preview]").forEach((btn,i)=>btn.addEventListener("click",()=>openEntry(previewEntries[i])));
}

function search(query){
  const q=query.trim().toLowerCase();
  if(!q)return [];
  return database.map(entry=>{
    const rewards=(entry.rewards||[]).flatMap(r=>[r.name,r.item,String(r.amount||r.quantity||"")]);
    const highlights=entry.highlights||[];
    const extra = [entry.tutorialChoice, entry.variantChance, entry.source, entry.status, entry.version, entry.profession, entry.shopName, ...(entry.tags||[]), ...rewards, ...highlights, ...Object.keys(entry.stats||{}), ...Object.values(entry.stats||{}).map(String)];
    const hay=[entry._displayName,getDescription(entry),...extra].filter(Boolean).join(" ").toLowerCase();
    const name=String(entry._displayName||"").toLowerCase();
    let score=0;
    if(name===q)score+=100;
    if(name.startsWith(q))score+=40;
    if(name.includes(q))score+=20;
    if(hay.includes(q))score+=10;
    return {entry,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,12).map(x=>x.entry);
}

const input=document.getElementById("globalSearch");
const results=document.getElementById("searchResults");

function showResults(rows){
  if(!rows.length){
    results.innerHTML=`<div class="result-row"><span><strong>No matches yet.</strong><small>PortalDB is still being populated with verified data.</small></span></div>`;
    results.classList.remove("hidden");
    return;
  }
  results.innerHTML=rows.map((entry,i)=>`
    <button class="result-row" data-result="${i}">
      <span class="result-type">${labels[entry._collection]}</span>
      <span><strong>${escapeHtml(entry._displayName)}</strong><small>${escapeHtml(getDescription(entry))}</small></span>
    </button>
  `).join("");
  results.classList.remove("hidden");
  results.querySelectorAll("[data-result]").forEach((btn,i)=>btn.addEventListener("click",()=>openEntry(rows[i])));
}

input.addEventListener("input",()=>showResults(search(input.value)));
document.getElementById("searchButton").addEventListener("click",()=>showResults(search(input.value)));
document.getElementById("focusSearch").addEventListener("click",()=>input.focus());

document.querySelectorAll("[data-query]").forEach(btn=>btn.addEventListener("click",()=>{
  input.value=btn.dataset.query;
  showResults(search(input.value));
  input.focus();
}));

document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{
  const cat=btn.dataset.category;
  if(collections.includes(cat)){
    const rows=database.filter(x=>x._collection===cat);
    showResults(rows);
    input.value=cat.slice(0,-1);
    input.focus();
  } else {
    input.value="";
    results.innerHTML=`<div class="result-row"><span><strong>${cat[0].toUpperCase()+cat.slice(1)} is planned.</strong><small>This section becomes active after the underlying data model is ready.</small></span></div>`;
    results.classList.remove("hidden");
    input.focus();
  }
}));

function formatStats(stats){
  if(!stats || !Object.keys(stats).length) return "";
  return Object.entries(stats).map(([key,value])=>`${escapeHtml(key)} ${typeof value==="number"&&value>=0?"+":""}${escapeHtml(value)}`).join(" · ");
}

function formatRewards(rewards){
  if(!rewards || !rewards.length) return "";
  const text=rewards.map(r=>`${r.amount||r.quantity||1}× ${r.name||r.item}`).join(" · ");
  return `<div class="meta-box"><small>REWARDS</small><strong>${escapeHtml(text)}</strong></div>`;
}

function openEntry(entry){
  const details = [];
  if(entry.stats) details.push(`<div class="meta-box"><small>STATS</small><strong>${formatStats(entry.stats)}</strong></div>`);
  if(entry.status) details.push(`<div class="meta-box"><small>STATUS</small><strong>${escapeHtml(entry.status)}</strong></div>`);
  if(entry.profession) details.push(`<div class="meta-box"><small>ROLE</small><strong>${escapeHtml(entry.profession)}</strong></div>`);
  if(entry.openHours) details.push(`<div class="meta-box"><small>HOURS</small><strong>${escapeHtml(entry.openHours)}</strong></div>`);
  if(entry.tutorialChoice) details.push(`<div class="meta-box"><small>TUTORIAL CHOICE</small><strong>${escapeHtml(entry.tutorialChoice)}</strong></div>`);
  if(entry.variantChance) details.push(`<div class="meta-box"><small>VARIANT RATE</small><strong>${escapeHtml(entry.variantChance)}</strong></div>`);
  if(entry.rewards) details.push(formatRewards(entry.rewards));
  document.getElementById("dialogContent").innerHTML=`
    <div class="dialog-body">
      <div class="type">${labels[entry._collection]}</div>
      <h2>${escapeHtml(entry._displayName)}</h2>
      <p>${escapeHtml(getDescription(entry))}</p>
      <div class="meta-grid">
        ${entry.confidence ? `<div class="meta-box"><small>CONFIDENCE</small><strong>${escapeHtml(entry.confidence)}</strong></div>` : ""}
        ${entry.version ? `<div class="meta-box"><small>VERSION</small><strong>${escapeHtml(entry.version)}</strong></div>` : ""}
        ${entry.lastVerified ? `<div class="meta-box"><small>LAST VERIFIED</small><strong>${escapeHtml(entry.lastVerified)}</strong></div>` : ""}
        ${details.join("")}
      </div>
      ${entry.highlights?.length ? `<p class="entry-source"><strong>Highlights:</strong> ${escapeHtml(entry.highlights.join(" • "))}</p>` : ""}
      ${entry.source ? `<p class="entry-source"><strong>Source:</strong> ${escapeHtml(entry.source)}</p>` : ""}
    </div>`;
  document.getElementById("entryDialog").showModal();
  results.classList.add("hidden");
}
document.getElementById("dialogClose").addEventListener("click",()=>document.getElementById("entryDialog").close());

document.addEventListener("keydown",e=>{
  if(e.key==="/"&&document.activeElement!==input){e.preventDefault();input.focus()}
  if(e.key==="Escape")results.classList.add("hidden");
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".search-shell")&&!e.target.closest(".search-results")&&!e.target.closest("[data-query]"))results.classList.add("hidden");
});

function escapeHtml(v){
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

loadData().catch(console.error);
