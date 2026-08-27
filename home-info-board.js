(()=>{
  const container=document.getElementById("portaldbUpdates");
  if(!container) return;

  const escapeHtml=value=>String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const formatDate=value=>{
    const date=new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  };

  fetch("data/portaldb-updates.json?v=20260827-1")
    .then(response=>response.ok ? response.json() : Promise.reject(new Error("PortalDB updates unavailable")))
    .then(entries=>{
      const latest=entries
        .filter(entry=>entry?.title&&entry?.description&&entry?.date)
        .sort((a,b)=>b.date.localeCompare(a.date))
        .slice(0,3);

      container.innerHTML=latest.map(entry=>{
        const content=`<span class="portaldb-update-heading"><b>PORTALDB</b><strong>${escapeHtml(entry.title)}</strong></span><p>${escapeHtml(entry.description)}</p><time datetime="${escapeHtml(entry.date)}">${escapeHtml(formatDate(entry.date))}</time>`;
        return entry.href
          ? `<a class="portaldb-update-note" href="${escapeHtml(entry.href)}">${content}</a>`
          : `<div class="portaldb-update-note">${content}</div>`;
      }).join("");
    })
    .catch(()=>{
      container.innerHTML='<p class="portaldb-updates-empty">Site updates are temporarily unavailable.</p>';
    });
})();
