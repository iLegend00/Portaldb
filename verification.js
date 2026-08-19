(()=>{
  const states={
    official:{label:'Official confirmed',icon:'✦'},
    ingame:{label:'In-game verified',icon:'✓'},
    community:{label:'Community verified',icon:'◇◇'},
    unverified:{label:'Unverified',icon:'?'}
  };
  let activeMarker=null;
  const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  function typeFor(value){
    const text=String(value||'').toLowerCase();
    if(text.includes('official')) return 'official';
    if(text.includes('in-game')||text.includes('firsthand')) return 'ingame';
    if(text.includes('community')) return 'community';
    return 'unverified';
  }
  function metadata(record={},overrides={}){
    const confidence=overrides.confidence??record.confidence??record.dataStatus??'';
    return {
      type:overrides.type||typeFor(confidence),
      method:overrides.method??confidence,
      source:overrides.source??record.source,
      verifiedDate:overrides.verifiedDate??record.lastVerified,
      gameVersion:overrides.gameVersion??record.version,
      sourceReference:overrides.sourceReference,
      note:overrides.note
    };
  }
  function marker(record={},overrides={}){
    const meta=metadata(record,overrides),state=states[meta.type]||states.unverified;
    const encoded=encodeURIComponent(JSON.stringify(meta));
    return `<button type="button" class="verification-marker verification-${meta.type}" data-verification="${encoded}" aria-label="${esc(state.label)}. Verification details available." aria-expanded="false"><span class="verification-seal" aria-hidden="true">${state.icon}</span></button>`;
  }
  function rows(meta){
    const state=states[meta.type]||states.unverified;
    const values=[
      ['Method',meta.method&&meta.method!==state.label?meta.method:null],
      ['Source',meta.source],
      ['Verified',formatDate(meta.verifiedDate)],
      ['Version',meta.gameVersion],
      ['Reference',meta.sourceReference],
      ['Note',meta.note]
    ].filter(([,value])=>value);
    return `<strong class="verification-popover-title verification-${meta.type}">${state.icon}<span>${esc(state.label)}</span></strong>${values.map(([label,value])=>`<div class="verification-popover-row"><small>${esc(label)}</small><span>${esc(value)}</span></div>`).join('')}`;
  }
  function formatDate(value){
    if(!value) return null;
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
    if(!match) return value;
    return new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(`${value}T00:00:00Z`));
  }
  function popover(){
    let node=document.getElementById('verificationPopover');
    if(!node){node=document.createElement('div');node.id='verificationPopover';node.className='verification-popover';node.setAttribute('role','status');node.hidden=true;document.body.appendChild(node)}
    return node;
  }
  function close(){
    const node=popover();node.hidden=true;activeMarker?.setAttribute('aria-expanded','false');activeMarker=null;
  }
  function open(button){
    if(activeMarker===button)return;
    close();
    let meta;try{meta=JSON.parse(decodeURIComponent(button.dataset.verification))}catch{return}
    const node=popover();node.innerHTML=rows(meta);node.hidden=false;button.setAttribute('aria-expanded','true');activeMarker=button;
    const rect=button.getBoundingClientRect(),width=Math.min(270,window.innerWidth-24),left=Math.max(12,Math.min(window.innerWidth-width-12,rect.left+rect.width/2-width/2));
    node.style.width=`${width}px`;node.style.left=`${left}px`;node.style.top=`${Math.max(12,Math.min(window.innerHeight-node.offsetHeight-12,rect.bottom+8))}px`;
  }
  function legend(){
    let dialog=document.getElementById('verificationLegend');
    if(!dialog){
      dialog=document.createElement('dialog');dialog.id='verificationLegend';dialog.className='verification-legend';
      dialog.innerHTML=`<button class="verification-legend-close" type="button" aria-label="Close verification legend">×</button><span class="panel-kicker">PORTALDB PROVENANCE</span><h2>Verification</h2><p>Hover, focus, or tap a verification seal to inspect its source details.</p><div class="verification-legend-list">${Object.entries(states).map(([type,state])=>`<div><span class="verification-seal verification-${type}" aria-hidden="true">${state.icon}</span><strong>${state.label}</strong></div>`).join('')}</div>`;
      document.body.appendChild(dialog);dialog.querySelector('.verification-legend-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
    }
    return dialog;
  }
  function installLegendControl(){
    const host=document.querySelector('.footer')||document.querySelector('main')||document.body;
    if(document.querySelector('[data-verification-legend]')) return;
    const button=document.createElement('button');button.type='button';button.className='verification-legend-trigger';button.dataset.verificationLegend='';button.textContent='Verification';button.addEventListener('click',()=>legend().showModal());host.appendChild(button);
  }
  document.addEventListener('click',event=>{const button=event.target.closest('[data-verification]');if(button){event.stopPropagation();open(button)}else if(activeMarker&&!event.target.closest('#verificationPopover'))close()});
  document.addEventListener('pointerover',event=>{const button=event.target.closest('[data-verification]');if(button&&matchMedia('(hover:hover)').matches)open(button)});
  document.addEventListener('focus',event=>{const button=event.target.closest?.('[data-verification]');if(button)open(button)},true);
  document.addEventListener('keydown',event=>{
    const button=event.target.closest?.('[data-verification]');
    if(button&&(event.key==='Enter'||event.key===' ')){event.preventDefault();open(button);return}
    if(event.key==='Escape')close();
  });
  window.addEventListener('resize',close);
  document.addEventListener('DOMContentLoaded',installLegendControl);
  window.PortalVerification={states,typeFor,metadata,marker,close};
})();

