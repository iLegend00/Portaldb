(()=>{
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='npc-art.css';
  document.head.appendChild(css);
  const verificationCss=document.createElement('link');
  verificationCss.rel='stylesheet';
  verificationCss.href='verification.css?v=20260828-two-state-provenance-1';
  document.head.appendChild(verificationCss);
  document.write('<script src="verification.js?v=20260828-two-state-provenance-1"><\/script><script src="npc-art.js?v=20260819-all-npcs-1"><\/script><script src="app-core.js?v=20260828-provenance-granularity-1"><\/script><script src="npc-art-ui.js?v=20260824-provenance-1"><\/script>');
})();
