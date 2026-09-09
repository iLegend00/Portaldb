(()=>{
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

  const gameUpdates=document.getElementById("gameUpdates");
  if(gameUpdates){
    const dateValue=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||"")) ? Date.parse(`${value}T00:00:00Z`) : Number.NEGATIVE_INFINITY;
    const versionParts=value=>String(value||"").match(/^v?(\d+)\.(\d+)\.(\d+)$/i)?.slice(1).map(Number)||[];
    const comparePatches=(a,b)=>{
      const dateDifference=dateValue(b.date)-dateValue(a.date);
      if(dateDifference) return dateDifference;
      const aVersion=versionParts(a.version);
      const bVersion=versionParts(b.version);
      for(let index=0;index<3;index+=1){
        const difference=(bVersion[index]??-1)-(aVersion[index]??-1);
        if(difference) return difference;
      }
      return String(a.id||a.title||"").localeCompare(String(b.id||b.title||""));
    };

    fetch("data/patches.json?v=20260909-patches-1")
      .then(response=>response.ok ? response.json() : Promise.reject(new Error("Patch history unavailable")))
      .then(entries=>{
        const latest=entries
          .filter(entry=>entry?.title&&entry?.date&&Array.isArray(entry.highlights))
          .sort(comparePatches)
          .slice(0,2);

        gameUpdates.innerHTML=latest.map(entry=>{
          const summary=entry.summary||entry.highlights.slice(0,2).join(" · ");
          const version=String(entry.version||"").replace(/^v/i,"");
          return `<div class="update-note"><span class="note-art">${escapeHtml(version)}</span><div><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(summary)}</p><small>${escapeHtml(formatDate(entry.date))}</small></div></div>`;
        }).join("");
      })
      .catch(()=>{
        gameUpdates.innerHTML='<p class="portaldb-updates-empty">Patch updates are temporarily unavailable.</p>';
      });
  }

  const container=document.getElementById("portaldbUpdates");
  if(!container) return;

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
