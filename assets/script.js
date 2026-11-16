const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));}

const countdown=document.querySelector('#wedding-countdown');
if(countdown){
  const target=new Date(countdown.dataset.target).getTime();
  let countdownTimer;
  const updateCountdown=()=>{
    const remaining=target-Date.now();
    if(remaining<=0){countdown.innerHTML='<p class="countdown-complete">Today, our forever begins.</p>';window.clearInterval(countdownTimer);return;}
    const units={days:Math.floor(remaining/86400000),hours:Math.floor(remaining/3600000)%24,minutes:Math.floor(remaining/60000)%60,seconds:Math.floor(remaining/1000)%60};
    Object.entries(units).forEach(([unit,value])=>{const output=countdown.querySelector(`[data-unit="${unit}"]`);if(output)output.textContent=String(value).padStart(2,'0');});
  };
  countdownTimer=window.setInterval(updateCountdown,1000);
  updateCountdown();
}
