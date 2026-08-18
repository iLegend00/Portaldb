const collections = ["items","quests","npcs","bosses"];
const labels = {items:"ITEM",quests:"QUEST",npcs:"NPC",bosses:"BOSS"};
let database = [];

async function loadData(){
  const sets = await Promise.all(collections.map(async name=>{
    const res = await fetch(`data/${name}.json`);
    const rows = await res.json();
    return rows.map(row=>({...row,_collection:name}));
  }));
  database = sets.flat();
  renderPreview();
}

function renderPreview(){
  const box=document.getElementById("entryPreview");
  box.innerHTML=database.slice(0,4).map((entry,i)=>`
    <button class="preview-row" data-preview="${i}">
      <span class="preview-icon">${["⚔","✎","♙","♛"][i]||"✦"}</span>
      <span>
        <strong>${escapeHtml(entry.name)}</strong>
        <small>${escapeHtml(entry.description)}</small>
      </span>
      <span class="preview-tag">${labels[entry._collection]}</span>
    </button>
  `).join("");
  box.querySelectorAll("[data-preview]").forEach((btn,i)=>btn.addEventListener("click",()=>openEntry(database[i])));
}

function search(query){
  const q=query.trim().toLowerCase();
  if(!q)return [];
  return database.map(entry=>{
    const hay=[entry.name,entry.description,...(entry.tags||[])].join(" ").toLowerCase();
    let score=0;
    if(entry.name.toLowerCase()===q)score+=100;
    if(entry.name.toLowerCase().startsWith(q))score+=40;
    if(entry.name.toLowerCase().includes(q))score+=20;
    if(hay.includes(q))score+=10;
    return {entry,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8).map(x=>x.entry);
}

const input=document.getElementById("globalSearch");
const results=document.getElementById("searchResults");

function showResults(rows){
  if(!rows.length){
    results.innerHTML=`<div class="result-row"><span><strong>No matches yet.</strong><small>Only placeholder records exist in v0.2.</small></span></div>`;
    results.classList.remove("hidden");
    return;
  }
  results.innerHTML=rows.map((entry,i)=>`
    <button class="result-row" data-result="${i}">
      <span class="result-type">${labels[entry._collection]}</span>
      <span><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.description)}</small></span>
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

function openEntry(entry){
  document.getElementById("dialogContent").innerHTML=`
    <div class="dialog-body">
      <div class="type">${labels[entry._collection]}</div>
      <h2>${escapeHtml(entry.name)}</h2>
      <p>${escapeHtml(entry.description)}</p>
      <div class="meta-grid">
        <div class="meta-box"><small>CONFIDENCE</small><strong>${escapeHtml(entry.confidence)}</strong></div>
        <div class="meta-box"><small>VERSION</small><strong>${escapeHtml(entry.version)}</strong></div>
        <div class="meta-box"><small>LAST VERIFIED</small><strong>${escapeHtml(entry.lastVerified)}</strong></div>
      </div>
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
