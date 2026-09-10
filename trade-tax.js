(()=>{
  const BASE_TAX=.20;
  const TAX_PER_LEVEL=.02;
  const MAX_TAX=.60;

  function calculateTaxRate(levelA,levelB){
    return Math.min(BASE_TAX+(Math.abs(levelA-levelB)*TAX_PER_LEVEL),MAX_TAX);
  }

  function calculateRequiredSend(agreedPrice,taxRate){
    return Math.ceil(agreedPrice/(1-taxRate));
  }

  function formatTria(value){
    return Number.isFinite(value)?Math.trunc(value).toLocaleString('en-US'):'—';
  }

  const agreedPrice=document.getElementById('agreedPrice');
  const yourLevel=document.getElementById('yourLevel');
  const otherLevel=document.getElementById('otherLevel');
  const output={
    amount:document.getElementById('amountToSend'),
    seller:document.getElementById('sellerReceives'),
    burned:document.getElementById('taxBurned'),
    rate:document.getElementById('taxRate'),
    difference:document.getElementById('levelDifference')
  };

  function wholeNumber(input,allowZero){
    const raw=input.value.trim();
    if(raw==='')return {valid:false,message:'Enter a whole number.'};
    const value=Number(raw);
    if(!Number.isFinite(value)||!Number.isInteger(value))return {valid:false,message:'Use a whole number.'};
    if(value<(allowZero?0:1))return {valid:false,message:allowZero?'Level cannot be negative.':'Enter at least 1 Tria.'};
    return {valid:true,value};
  }

  function setError(input,message){
    document.getElementById(input.getAttribute('aria-describedby').split(' ').at(-1)).textContent=message;
    input.setAttribute('aria-invalid',message?'true':'false');
  }

  function clearResults(rate,difference){
    output.amount.textContent='—';
    output.amount.dataset.empty='true';
    output.seller.textContent='—';
    output.burned.textContent='—';
    output.rate.textContent=Math.round(rate*100)+'%';
    output.difference.textContent=String(difference);
  }

  function update(){
    const price=wholeNumber(agreedPrice,false);
    setError(agreedPrice,price.valid?'':price.message);

    const first=wholeNumber(yourLevel,true);
    const second=wholeNumber(otherLevel,true);
    setError(yourLevel,first.valid?'':first.message);
    setError(otherLevel,second.valid?'':second.message);
    const levelsValid=first.valid&&second.valid;
    const difference=levelsValid?Math.abs(first.value-second.value):0;
    const rate=levelsValid?calculateTaxRate(first.value,second.value):0;

    if(!price.valid||!levelsValid){
      clearResults(rate,difference);
      return;
    }

    const amount=calculateRequiredSend(price.value,rate);
    output.amount.textContent=formatTria(amount);
    output.amount.dataset.empty='false';
    output.seller.textContent=formatTria(price.value)+' Tria';
    output.burned.textContent=formatTria(amount-price.value)+' Tria';
    output.rate.textContent=Math.round(rate*100)+'%';
    output.difference.textContent=String(difference);
  }

  [agreedPrice,yourLevel,otherLevel].forEach(control=>control.addEventListener('input',update));
  document.querySelectorAll('[data-amount]').forEach(button=>button.addEventListener('click',()=>{
    agreedPrice.value=button.dataset.amount;
    update();
    agreedPrice.focus();
  }));
  window.addEventListener('pageshow',update);
  update();
})();
