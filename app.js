(()=>{
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='npc-art.css';
  document.head.appendChild(css);
  document.write('<script src="npc-art.js"><\/script><script src="app-core.js"><\/script><script src="npc-art-ui.js"><\/script>');
})();
