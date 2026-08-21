(()=>{
  const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const formatKey=key=>String(key).replace(/([a-z])([A-Z])/g,'$1 $2').replace(/^./,c=>c.toUpperCase());
  const rewardName=key=>({guildExp:'Guild EXP',guildCoin:'Guild Coin',tria:'Tria',additionalReward:'Additional reward'}[key]||formatKey(key));
  const rewardValue=(key,value)=>typeof value==='number'?`${value.toLocaleString()} ${rewardName(key)}`:`${esc(value)} ${rewardName(key)}`;
  let waves=[];
  function activityCard(title,item){
    const requirement=typeof item.requirement==='string'?item.requirement:item.requirement.materials?`Offer ${item.requirement.materials} Materials`:item.requirement.wording;
    return `<article class="reward-card"><small>CONFIRMED ACTIVITY</small><h3>${esc(title)}</h3><dl><dt>Requirement</dt><dd>${esc(requirement)}</dd><dt>Rewards</dt><dd class="reward-pills">${Object.entries(item.rewards).map(([key,value])=>`<span>${rewardValue(key,value)}</span>`).join('')}</dd></dl></article>`;
  }
  function renderWaves(query=''){
    const q=query.trim().toLowerCase();
    const rows=waves.filter(row=>!q||String(row.wave)===q||row.reward.toLowerCase().includes(q));
    document.getElementById('waveRows').innerHTML=rows.map(row=>`<tr class="${row.wave%10===0?'wave-emphasis':''}"><td>${row.wave}</td><td>${row.tria.toLocaleString()}</td><td>${esc(row.reward)}</td></tr>`).join('');
    document.getElementById('waveEmpty').hidden=rows.length>0;
  }
  async function init(){
    const [mechanicsResponse,bossesResponse]=await Promise.all([fetch('data/mechanics.json?v=20260820-guild-rewards-1'),fetch('data/bosses.json?v=20260820-guild-rewards-1')]);
    if(!mechanicsResponse.ok||!bossesResponse.ok)throw new Error('Guild data could not be loaded.');
    const [mechanics,bosses]=await Promise.all([mechanicsResponse.json(),bossesResponse.json()]);
    const guild=mechanics.find(record=>record.id==='guild-system');
    const defense=mechanics.find(record=>record.id==='arcane-defense-rewards');
    const lycaros=bosses.find(record=>record.id==='lycaros');
    if(!guild||!defense||!lycaros)throw new Error('Canonical Guild records are incomplete.');
    document.getElementById('guildVerification').innerHTML=window.PortalVerification.marker(guild,{source:'Official Discord announcements by Swaroff [PRTL], 2026-08-20'});
    document.getElementById('creationGrid').innerHTML=`<article class="ledger-card"><small>CREATE A GUILD</small><strong>${esc(guild.creationNpc)}</strong><p>NPC · Cost: ${guild.creationCost.amount.toLocaleString()} ${esc(guild.creationCost.currency)}</p></article><article class="ledger-card"><small>MEMBER CAPACITY</small><strong>${guild.startingMemberCapacity} → ${guild.maximumUpgradedCapacity}</strong><p>Starting capacity → Maximum upgraded capacity</p></article><article class="ledger-card"><small>ARCANE DEFENSE</small><strong>${esc(guild.arcaneDefense.availability)}</strong><p>Must be manually started by the ${esc(guild.arcaneDefense.startedBy)}.</p></article>`;
    const labels={materialOffering:'Material Offering',dailyTriaContribution:'Daily Tria Contribution',arcaneDefenseWave:'Arcane Defense Wave',lycarosQualifiedMember:'Lycaros Guild Activity'};
    document.getElementById('activityGrid').innerHTML=Object.entries(guild.activityRewards).map(([key,item])=>activityCard(labels[key]||formatKey(key),item)).join('');
    document.getElementById('baseContent').innerHTML='<ul><li>Guild members can donate decorations.</li><li>'+esc(guild.guildBase.use)+'</li></ul>';
    document.getElementById('defenseOverview').innerHTML=`<div class="defense-fact"><small>AVAILABILITY</small><strong>${esc(guild.arcaneDefense.availability)}</strong></div><div class="defense-fact"><small>STARTED BY</small><strong>${esc(defense.startedBy)} · Manual start</strong></div><div class="defense-fact"><small>EACH COMPLETED WAVE</small><strong>${defense.perWaveBaseRewards.guildExp} Guild EXP · ${defense.perWaveBaseRewards.guildCoin} Guild Coin · Wave-specific Tria and additional reward</strong></div>`;
    waves=defense.waves;
    renderWaves();
    const p=lycaros.participationRewards;
    document.getElementById('lycarosContent').innerHTML=`<article class="lycaros-card"><h3>Individual qualified participation rewards</h3><ul><li>${p['Magnifying Glass']} Magnifying Glass</li><li>${p['Goblin Coin']} Goblin Coin</li><li>${p.Tria.toLocaleString()} Tria</li><li>${p['Guild EXP']} Guild EXP</li></ul></article><article class="lycaros-card"><h3>Guild reward-system context</h3><ul><li>${esc(guild.activityRewards.lycarosQualifiedMember.requirement)}</li><li>${guild.activityRewards.lycarosQualifiedMember.rewards.guildExp} Guild EXP</li></ul></article>`;
    document.getElementById('guildLoading').remove();document.getElementById('guildContent').hidden=false;
    document.getElementById('waveFilter').addEventListener('input',event=>renderWaves(event.target.value));
  }
  init().catch(error=>{const node=document.getElementById('guildLoading');node.classList.add('guild-error');node.textContent=error.message;console.error(error)});
})();
