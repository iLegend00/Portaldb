(()=>{
  const keyFor=name=>String(name||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

  function apply(){
    const profile=document.querySelector("#dialogContent .npc-profile");
    if(!profile) return;
    const portrait=profile.querySelector(".npc-profile-portrait");
    if(!portrait||portrait.querySelector("img")) return;
    const name=profile.querySelector("h2")?.textContent?.trim();
    const art=window.PORTALDB_NPC_ART?.[keyFor(name)];
    if(!art){profile.classList.add("npc-profile-no-art");return;}

    const image=document.createElement("img");
    image.src=art;
    image.alt=`Fan illustration of ${name}`;
    const attribution=document.createElement("small");
    attribution.className="npc-profile-art-note";
    attribution.textContent="PortalDB fan illustration";
    portrait.append(image,attribution);
  }

  const target=document.getElementById("dialogContent");
  if(target){new MutationObserver(apply).observe(target,{childList:true,subtree:true});apply();}
})();

