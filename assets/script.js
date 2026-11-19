const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuButton&&nav){
  const setMenuOpen=open=>{
    nav.classList.toggle('open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    menuButton.textContent=open?'×':'☰';
  };
  menuButton.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuOpen(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenuOpen(false);});
}

const countdown=document.querySelector('#wedding-countdown');
if(countdown){
  const target=new Date(countdown.dataset.target).getTime();
  let countdownTimer;
  const updateCountdown=()=>{
    const remaining=target-Date.now();
    if(remaining<=0){countdown.innerHTML='<p class="countdown-complete">Today, Itishree and Bikram begin forever.</p>';window.clearInterval(countdownTimer);return;}
    const units={days:Math.floor(remaining/86400000),hours:Math.floor(remaining/3600000)%24,minutes:Math.floor(remaining/60000)%60,seconds:Math.floor(remaining/1000)%60};
    Object.entries(units).forEach(([unit,value])=>{const output=countdown.querySelector(`[data-unit="${unit}"]`);if(output)output.textContent=String(value).padStart(2,'0');});
  };
  countdownTimer=window.setInterval(updateCountdown,1000);
  updateCountdown();
}

const landmarkCarousel=document.querySelector('.landmark-carousel');
if(landmarkCarousel){
  const landmarks=[
    {name:'Lingaraj & Bindu Sagar',image:'assets/lingaraj-bindu.jpg',alt:'Lingaraj Temple and Bindu Sagar',note:'An ancient temple skyline meets the sacred waters of Bindu Sagar in the heart of the old city.'},
    {name:'Mukteswar Temple',image:'assets/mukteswar.jpg',alt:'Mukteswar Temple and its carved stone gateway',note:'Its ornate torana makes this compact shrine one of the city’s most distinctive Kalinga temples.'},
    {name:'Dhauli Shanti Stupa',image:'assets/dhauli.jpg',alt:'White peace stupa at Dhauli',note:'A hilltop place of peace, remembered alongside Ashokan rock edicts and the story of Kalinga.'},
    {name:'Udayagiri & Khandagiri',image:'assets/udayagiri-khandagiri.jpg',alt:'Ancient rock-cut caves at Udayagiri and Khandagiri',note:'Rock-cut caves preserve a remarkable chapter of Jain heritage just beyond the city centre.'},
    {name:'Kalinga Stadium',image:'assets/kalinga-stadium.jpg',alt:'Blue hockey turf at Kalinga Stadium',note:'The modern city comes alive beneath the lights of Bhubaneswar’s celebrated hockey arena.'},
    {name:'Rajarani Temple',image:'assets/rajarani.jpg',alt:'Illustrated spire of Rajarani Temple',note:'A sculptural sandstone temple admired for its finely carved forms and calm garden setting.'},
    {name:'Ananta Vasudeva Temple',image:'assets/ananta-vasudeva.jpg',alt:'Illustrated temple form of Ananta Vasudeva',note:'A Vaishnavite shrine near Bindu Sagar, with a history and traditions all its own.'},
    {name:'Kala Bhoomi',image:'assets/kalabhoomi.jpg',alt:'Illustrated craft museum pavilion at Kala Bhoomi',note:'A living museum celebrating Odisha’s craft traditions, materials and makers.'},
    {name:'Nandankanan',image:'assets/nandankanan.jpg',alt:'Illustrated green landscape at Nandankanan',note:'A green escape on the edge of the capital, known for its zoological park and botanical gardens.'}
  ];
  const image=landmarkCarousel.querySelector('#landmark-image');
  const count=landmarkCarousel.querySelector('#landmark-count');
  const title=landmarkCarousel.querySelector('#landmark-title');
  const note=landmarkCarousel.querySelector('#landmark-note');
  const source=landmarkCarousel.querySelector('#landmark-source');
  const dots=landmarkCarousel.querySelector('.landmark-dots');
  let activeLandmark=0;
  const renderLandmark=index=>{
    activeLandmark=(index+landmarks.length)%landmarks.length;
    const item=landmarks[activeLandmark];
    image.src=item.image; image.alt=item.alt;
    count.textContent=String(activeLandmark+1).padStart(2,'0')+' / '+String(landmarks.length).padStart(2,'0')+' · BHUBANESWAR';
    title.textContent=item.name; note.textContent=item.note;
    source.textContent='City note '+String(activeLandmark+1).padStart(2,'0')+' · Odisha Tourism ↗';
    dots.querySelectorAll('button').forEach((dot,dotIndex)=>{
      dot.setAttribute('aria-current',String(dotIndex===activeLandmark));
    });
  };
  landmarks.forEach((item,index)=>{
    const dot=document.createElement('button');
    dot.className='landmark-dot'; dot.type='button';
    dot.setAttribute('aria-label','Show '+item.name); dot.setAttribute('aria-current',String(index===0));
    dot.addEventListener('click',()=>renderLandmark(index)); dots.append(dot);
  });
  landmarkCarousel.querySelectorAll('[data-landmark-step]').forEach(button=>button.addEventListener('click',()=>renderLandmark(activeLandmark+Number(button.dataset.landmarkStep))));
  landmarkCarousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();renderLandmark(activeLandmark-1);}
    if(event.key==='ArrowRight'){event.preventDefault();renderLandmark(activeLandmark+1);}
  });
}

const scrollTopButton=document.getElementById('scroll-top');
if(scrollTopButton){
  const updateScrollTop=()=>scrollTopButton.classList.toggle('is-visible',window.scrollY>360);
  window.addEventListener('scroll',updateScrollTop,{passive:true});
  updateScrollTop();
  scrollTopButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
}

const musicButton=document.getElementById('music-toggle');
if(musicButton){
  let player=null;
  let soundEnabled=false;
  const songId='WkpOC04Z7Y0';
  const updateMusicButton=()=>{
    musicButton.classList.toggle('is-muted',!soundEnabled);
    musicButton.setAttribute('aria-pressed',String(soundEnabled));
    const label=soundEnabled?'Mute wedding music':'Turn wedding music on';
    musicButton.setAttribute('aria-label',label); musicButton.title=label;
  };
  musicButton.addEventListener('click',()=>{
    soundEnabled=!soundEnabled; updateMusicButton();
    if(player){
      if(soundEnabled)player.unMute();else player.mute();
      player.setVolume(soundEnabled?70:0); player.playVideo();
    }
  });
  window.onYouTubeIframeAPIReady=()=>{
    player=new YT.Player('music-player',{
      height:'200',width:'200',videoId:songId,
      playerVars:{autoplay:1,controls:0,disablekb:1,enablejsapi:1,loop:1,playlist:songId,playsinline:1,origin:location.origin},
      events:{
        onReady:event=>{event.target.setVolume(70);if(soundEnabled)event.target.unMute();else event.target.mute();event.target.playVideo();},
        onStateChange:event=>{if(event.data===YT.PlayerState.ENDED)event.target.playVideo();}
      }
    });
  };
  const youtubeApi=document.createElement('script');
  youtubeApi.src='https://www.youtube.com/iframe_api'; youtubeApi.async=true;
  document.head.append(youtubeApi);
  updateMusicButton();
}
