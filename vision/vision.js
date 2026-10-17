const film=document.querySelector('#film');
if(film){if(matchMedia('(max-width: 650px)').matches)film.poster='/assets/vision-poster-small.webp';document.querySelectorAll('[data-seek]').forEach(a=>a.addEventListener('click',()=>{film.dataset.seek=a.dataset.seek;if(film.readyState)film.currentTime=Number(a.dataset.seek);film.focus();}));film.addEventListener('error',()=>{document.querySelector('#film-note').textContent='Video playback is unavailable. Download the MP4 or read the complete transcript below.';});document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});}
const slides=[...document.querySelectorAll('.slide')];
if(slides.length){let index=0;const prev=document.querySelector('#previous'),next=document.querySelector('#next');function show(n){index=Math.max(0,Math.min(slides.length-1,n));slides.forEach((s,i)=>s.hidden=i!==index);prev.disabled=index===0;next.disabled=index===slides.length-1;document.querySelector('#position').value=`Act ${index+1} of ${slides.length}`;history.replaceState(null,'',`#act-${index+1}`);}prev.onclick=()=>show(index-1);next.onclick=()=>show(index+1);document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SUMMARY'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}});const start=Number(location.hash.replace('#act-',''));if(start)show(start-1);}
// Assign sources only after explicit intent; some WebKit builds sniff preload=none.
document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',async()=>{
 const video=document.getElementById(button.dataset.play);
 if(!video.dataset.loaded){video.querySelectorAll('source[data-src]').forEach(source=>source.src=source.dataset.src);video.dataset.loaded='true';video.load();}
 try{await video.play();if(video===film&&video.textTracks.length&&!video.dataset.captionReady){video.textTracks[0].mode='showing';video.dataset.captionReady='true';}button.hidden=true;}catch{button.textContent='Retry playback ↗';}
}));

if(film)film.addEventListener('loadedmetadata',()=>{if(film.dataset.seek){film.currentTime=Number(film.dataset.seek);delete film.dataset.seek;}});
