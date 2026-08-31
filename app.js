(()=>{
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='npc-art.css?v=20260830-npc-profile-3';
  document.head.appendChild(css);
  const npcProfileCss=document.createElement('link');
  npcProfileCss.rel='stylesheet';
  npcProfileCss.href='npc-profile.css?v=20260830-npc-profile-4';
  document.head.appendChild(npcProfileCss);
  const recordProfileCss=document.createElement('link');
  recordProfileCss.rel='stylesheet';
  recordProfileCss.href='record-profile.css?v=20260830-record-profile-pass3-1';
  document.head.appendChild(recordProfileCss);
  const verificationCss=document.createElement('link');
  verificationCss.rel='stylesheet';
  verificationCss.href='verification.css?v=20260828-two-state-provenance-1';
  document.head.appendChild(verificationCss);
  document.write('<script src="verification.js?v=20260828-two-state-provenance-1"><\/script><script src="npc-art.js?v=20260819-all-npcs-1"><\/script><script src="app-core.js?v=20260831-major-updates-1"><\/script>');
})();
