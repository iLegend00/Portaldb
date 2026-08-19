let craftRecipes=[];

async function initCrafting(){
  const status=document.getElementById('craftStatus');
  const selector=document.getElementById('craftRecipe');
  try{
    const res=await fetch('data/crafting.json');
    if(!res.ok) throw new Error('crafting.json unavailable');
    craftRecipes=await res.json();
    renderRecipeOptions();
    renderCraftState();
    if(status) status.textContent=craftRecipes.length?`${craftRecipes.length} verified recipes`:'0 verified recipes';
  }catch(err){
    if(status) status.textContent='Crafting data unavailable';
    document.getElementById('craftContent').innerHTML='<div class="craft-empty"><strong>Crafting data could not be loaded.</strong><p>The calculator is built to fail closed rather than display guessed recipe information.</p></div>';
    console.error(err);
  }
}

function renderRecipeOptions(){
  const selector=document.getElementById('craftRecipe');
  if(!selector) return;
  if(!craftRecipes.length){
    selector.innerHTML='<option value="">No verified recipes yet</option>';
    selector.disabled=true;
    return;
  }
  selector.disabled=false;
  selector.innerHTML='<option value="">Choose a verified recipe…</option>'+craftRecipes.map(r=>`<option value="${escAttr(r.id)}">${esc(r.name||r.outputItem)}</option>`).join('');
}

function getQuantity(){
  const input=document.getElementById('craftQuantity');
  return Math.max(1,Number(input?.value)||1);
}

function renderCraftState(){
  const root=document.getElementById('craftContent');
  const id=document.getElementById('craftRecipe')?.value;
  if(!root) return;
  if(!craftRecipes.length){
    root.innerHTML='<div class="craft-empty"><strong>Calculator ready. Recipes still need verification.</strong><p>We have verified that Eren provides Craft Equipment at Iron and Ember with Weapons and Armor categories, but exact recipe ingredients, quantities, costs, and unlock requirements have not yet been captured. PortalDB will not fabricate them.</p></div>';
    return;
  }
  if(!id){
    root.innerHTML='<div class="craft-empty"><strong>Select a verified recipe.</strong><p>Direct and expanded material totals will appear here.</p></div>';
    return;
  }
  const recipe=craftRecipes.find(r=>r.id===id);
  if(!recipe) return;
  renderRecipe(recipe,getQuantity());
}

function renderRecipe(recipe,qty){
  const root=document.getElementById('craftContent');
  const outputPerCraft=Math.max(1,Number(recipe.outputQuantity)||1);
  const crafts=Math.ceil(qty/outputPerCraft);
  const direct=(recipe.requirements||[]).map(r=>({item:r.item,quantity:(Number(r.quantity)||0)*crafts}));
  const totals=expandRequirements(recipe,crafts,new Set());
  const costs=(recipe.currencyCosts||[]).map(c=>({currency:c.currency,amount:(Number(c.amount)||0)*crafts}));
  root.innerHTML=`<div class="craft-grid">
    <section class="craft-panel"><h3>Direct requirements</h3>${direct.length?direct.map(x=>craftLine(x.item,x.quantity)).join(''):'<div class="craft-note">No direct requirements recorded.</div>'}</section>
    <section class="craft-panel"><h3>Total expanded requirements</h3>${totals.length?totals.map(x=>craftLine(x.item,x.quantity)).join(''):'<div class="craft-note">No expandable materials recorded.</div>'}</section>
    <section class="craft-panel"><h3>Crafting cost</h3>${costs.length?costs.map(x=>craftLine(x.currency,x.amount)).join(''):'<div class="craft-note">No currency cost recorded.</div>'}</section>
    <section class="craft-panel"><h3>Recipe details</h3>
      ${craftLine('Output',`${crafts*outputPerCraft}× ${recipe.outputItem||recipe.name}`)}
      ${recipe.station?craftLine('Station',recipe.station):''}
      ${recipe.location?craftLine('Location',recipe.location):''}
      ${recipe.category?craftLine('Category',recipe.category):''}
      <div class="craft-meta">${window.PortalVerification?.marker(recipe)||''}</div>
    </section>
  </div>${recipe.notes?`<div class="craft-note">${esc(recipe.notes)}</div>`:''}`;
}

function expandRequirements(recipe,multiplier,seen){
  const totals=new Map();
  for(const req of recipe.requirements||[]){
    const amount=(Number(req.quantity)||0)*multiplier;
    const child=craftRecipes.find(r=>String(r.outputItem||r.name).toLowerCase()===String(req.item).toLowerCase());
    if(child && !seen.has(child.id)){
      const next=new Set(seen);next.add(recipe.id);next.add(child.id);
      const childMultiplier=amount/Math.max(1,Number(child.outputQuantity)||1);
      for(const row of expandRequirements(child,childMultiplier,next)) totals.set(row.item,(totals.get(row.item)||0)+row.quantity);
    }else{
      totals.set(req.item,(totals.get(req.item)||0)+amount);
    }
  }
  return [...totals.entries()].map(([item,quantity])=>({item,quantity}));
}

function craftLine(label,value){return `<div class="craft-line"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`}
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function escAttr(v){return esc(v)}

document.getElementById('craftRecipe')?.addEventListener('change',renderCraftState);
document.getElementById('craftQuantity')?.addEventListener('input',renderCraftState);
document.getElementById('craftReset')?.addEventListener('click',()=>{const s=document.getElementById('craftRecipe');const q=document.getElementById('craftQuantity');if(s)s.value='';if(q)q.value='1';renderCraftState();});
document.addEventListener('DOMContentLoaded',initCrafting);

