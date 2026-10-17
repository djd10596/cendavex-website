/* Original procedural artwork. Canvas painter's algorithm, bounded geometry,
   deterministic still frames and no external graphics/runtime dependencies. */
(() => {
  const canvas = document.querySelector('canvas[data-world]');
  if (!canvas) return;
  const buffer=document.createElement('canvas');
  const present=canvas.getContext('2d',{alpha:false,willReadFrequently:true});
  const ctx=buffer.getContext('2d',{alpha:false,willReadFrequently:true});
  if (!ctx||!present) return; // The locally rendered image remains the complete still scene.
  const world = canvas.dataset.world, hero = canvas.closest('section');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,scale=1,time=0,last=0,raf=0,visible=true,paused=false,mx=0,my=0;
  let detail=true,slowFrames=0;
  let sky=null,geometry=null,scroll=0,tx=0,ty=0,optedIn=false;
  let seed=71;
  const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
  const stars=Array.from({length:350},()=>[random(),random(),random()]);
  const TAU=Math.PI*2;
  const rotate=(p,rx,ry,rz)=>{
    let [x,y,z]=p;let a=y*Math.cos(rx)-z*Math.sin(rx);z=y*Math.sin(rx)+z*Math.cos(rx);y=a;
    a=x*Math.cos(ry)+z*Math.sin(ry);z=-x*Math.sin(ry)+z*Math.cos(ry);x=a;
    return [x*Math.cos(rz)-y*Math.sin(rz),x*Math.sin(rz)+y*Math.cos(rz),z];
  };
  function render(){
    const started=performance.now();
    const mobile=width<760;
    const cx=width*(mobile?.52:.60)+mx*8+scroll*width*.035,cy=height*(mobile?.30:.42)+my*6-scroll*height*.08;
    scale=Math.min(width/(mobile?690:1350),height/800)*(mobile?1.0:1.0);
    const project=p=>{const k=900/(900+p[2]);return[cx+p[0]*scale*k,cy+p[1]*scale*k,k];};
    if(sky)ctx.putImageData(sky,0,0);else{
    ctx.fillStyle='#020711';ctx.fillRect(0,0,width,height);
    const fog=ctx.createRadialGradient(cx,cy,0,cx,cy,610*scale);fog.addColorStop(0,'#12446c');fog.addColorStop(.45,'#081e35');fog.addColorStop(1,'#020711');ctx.fillStyle=fog;ctx.fillRect(0,0,width,height);
    stars.forEach(([x,y,z])=>{ctx.fillStyle=`rgba(157,208,255,${.1+z*.5})`;ctx.fillRect(x*width,y*height, z>.95?2:1,z>.95?2:1);});
    // A receding floor of measured points gives the object real spatial context.
    for(let i=-16;i<=16;i++)for(let j=0;j<25;j++){const p=project([i*48,280,j*55-150]);ctx.fillStyle=`rgba(73,150,217,${.3-j*.009})`;ctx.fillRect(p[0],p[1],1.5*p[2],1.5*p[2]);}
    // Cache only the stationary sky/floor, never the animated engine.
    sky=ctx.getImageData(0,0,buffer.width,buffer.height);
    }
    const faces=geometry?.faces||[];const lines=geometry?.lines||[];const dots=geometry?.dots||[];
    const matrices=[false,true].map(core=>{
      const rx=.66+Math.sin(time*.32)*.13+my*.18+scroll*.7,
        ry=.18+time*(core?-.22:.12)+mx*.24,
        rz=-.30+time*(core?.09:.055)+scroll*.3;
      return [[1,0,0],[0,1,0],[0,0,1]].map(p=>rotate(p,rx,ry,rz));
    });
    const orient=p=>{
      let [x,y,z]=p;
      // Independent shell/core precession and surface waves animate actual geometry.
      const core=x*x+y*y+z*z<21025;
      if(world==='financial') y+=Math.sin(x*.012+z*.009+time*1.3)*18;
      if(world==='systems') y+=Math.sin(time*1.1+y*.018)*9;
      const m=matrices[core?1:0];
      return [x*m[0][0]+y*m[1][0]+z*m[2][0],x*m[0][1]+y*m[1][1]+z*m[2][1],x*m[0][2]+y*m[1][2]+z*m[2][2]];
    };
    function face(points,light,glow=false,cull=false){faces.push({points,light,glow,cull});}
    function line(points,color='#57baff',alpha=.5,size=1){lines.push({points,color,alpha,size});}
    function torus(radius,tube,offset=0,tilt=0){
      const n=detail?72:36,m=detail?8:6;
      const point=(a,b)=>rotate([(radius+tube*Math.cos(b))*Math.cos(a),(radius+tube*Math.cos(b))*Math.sin(a),tube*Math.sin(b)+offset],tilt,0,0);
      for(let i=0;i<n;i++){if(i%10===9)continue;for(let j=0;j<m;j++){
        const a=i/n*TAU,b=j/m*TAU;const light=Math.max(.04,.24+.52*Math.sin(b-.8)+.3*Math.cos(a+1));
        face([point(a,b),point(a+TAU/n*.93,b),point(a+TAU/n*.93,b+TAU/m),point(a,b+TAU/m)],light,j===3||j===8,true);
      }}
      for(const r of [radius-tube-5,radius+tube+5])line(Array.from({length:181},(_,i)=>rotate([r*Math.cos(i/180*TAU),r*Math.sin(i/180*TAU),offset],tilt,0,0)),'#66caff',.7,1.2);
    }
    function sphere(radius){
      const nodes=[],count=detail?160:80;
      for(let i=0;i<count;i++){const y=1-i/(count-1)*2,r=Math.sqrt(1-y*y),a=i*2.39996;nodes.push([Math.cos(a)*r*radius,y*radius,Math.sin(a)*r*radius]);}
      nodes.forEach((p,i)=>{dots.push(p);for(let j=i+1;j<nodes.length;j++){const q=nodes[j];const d=Math.hypot(...p.map((v,k)=>v-q[k]));if(d<radius*.34)line([p,q],'#80c5ff',.25,.6);}});
      for(let k=0;k<7;k++)line(Array.from({length:121},(_,i)=>rotate([radius*Math.cos(i/120*TAU),radius*Math.sin(i/120*TAU),0],k*.44,k*.6,0)),'#7bbdff',.24,.7);
    }
    if(!geometry){
    if(world==='corporate'){
      torus(255,39);torus(187,13,-8,.12);torus(315,7,22,-.08);sphere(126);
      for(let k=0;k<52;k++){const a=k/52*TAU;const r=340+(k%4)*14;line([[r*Math.cos(a),r*Math.sin(a),-8],[(r+24)*Math.cos(a),(r+24)*Math.sin(a),-8]],'#70b9f3',.35,k%4===0?2:1);}
    }else if(world==='ai'){
      sphere(242);torus(282,12,0,.4);
      for(let k=0;k<24;k++){const a=k/24*TAU;line(Array.from({length:80},(_,i)=>{const r=260+i*3;return[r*Math.cos(a+i*.009),r*Math.sin(a+i*.009),Math.sin(i*.05+k)*60];}),'#6c8dff',.2,.7);}
    }else if(world==='financial'){
      const p=(x,z)=>[x*15-330,-35-90*Math.sin(x*.15+z*.2)-30*Math.cos(x*.4-z*.22)-(x/44)*80,z*19-230];
      for(let z=0;z<26;z++)for(let x=0;x<44;x++)face([p(x,z),p(x+1,z),p(x+1,z+1),p(x,z+1)],.25+z/60,(z%5===0));
      for(let z=0;z<26;z+=3)line(Array.from({length:45},(_,x)=>p(x,z)),'#71d7ff',.8,1);
      for(let i=0;i<15;i++){const x=i*44-310;line([[x,110,-40],[x,180,-40]],'#c2f1ff',.8,2);dots.push([x,110,-40]);}
    }else if(world==='systems'){
      for(let level=0;level<6;level++){
        const y=level*63-170,r=180+(level%2)*23;
        const hex=Array.from({length:6},(_,i)=>[Math.cos(i/6*TAU)*r,y,Math.sin(i/6*TAU)*r]);
        for(let i=0;i<6;i++)face([[0,y,0],hex[i],hex[(i+1)%6]],.24+level*.025+(i%3)*.16);for(let i=0;i<6;i++){const a=hex[i],b=hex[(i+1)%6];face([a,b,[b[0],y+18,b[2]],[a[0],y+18,a[2]]],.2+i*.07);line([a,b],'#8fe7ff',.9,2);if(level<5)line([a,[a[0],y+63,a[2]]],'#50a7ce',.35);}
      }sphere(84);
    }else{
      sphere(185);torus(300,9,0,.7);torus(260,5,0,-.8);
      for(let k=0;k<8;k++){const a=k/8*TAU,r=310;const center=[r*Math.cos(a),r*Math.sin(a),Math.sin(a*2)*80];const [x,y,z]=center;face([[x-20,y-20,z],[x+20,y-20,z],[x+20,y+20,z],[x-20,y+20,z]],.8,true);line([[0,0,0],center],'#65cfff',.45);dots.push(center);}
    }
    geometry={faces,lines,dots};
    }
    // Metallic facets, sorted from far to near, with illuminated machine seams.
    faces.map(f=>{const points=f.points.map(orient);return {...f,points,z:points.reduce((v,p)=>v+p[2],0)/points.length};}).sort((a,b)=>b.z-a.z).forEach(f=>{const p=f.points.map(project);if(f.cull&&p.reduce((v,q,i)=>{const n=p[(i+1)%p.length];return v+q[0]*n[1]-n[0]*q[1];},0)>=0)return;ctx.beginPath();p.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();const l=f.light+.1+.04*Math.sin(time*.7+f.z*.004);ctx.fillStyle=f.glow?`rgb(${45+l*90},${110+l*120},${170+l*85})`:`rgb(${8+l*65},${22+l*100},${40+l*135})`;ctx.fill();ctx.strokeStyle=f.glow?'#8ae4ff55':'#8ebbe51c';ctx.lineWidth=.45;if(detail||f.glow)ctx.stroke();});
    lines.forEach(l=>{ctx.beginPath();l.points.map(orient).map(project).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=l.color;ctx.globalAlpha=l.alpha;ctx.lineWidth=l.size*scale;ctx.stroke();});ctx.globalAlpha=1;
    dots.map(orient).sort((a,b)=>b[2]-a[2]).forEach(p=>{const q=project(p);ctx.fillStyle='#c1eeff';ctx.beginPath();ctx.arc(q[0],q[1],Math.max(.6,1.7*q[2]*scale),0,TAU);ctx.fill();});
    // Fine data currents converge on the core; never represent live telemetry.
    ctx.globalCompositeOperation='source-over';
    // Luminous packets follow the same cubic paths as their currents.
    for(let k=0;k<(detail?24:16);k++){
      const side=k%2?1:-1,y=cy+(k-12)*20*scale;
      const p=[[cx+side*width,y],[cx+side*460*scale,y-160*scale],
        [cx+side*300*scale,cy+190*scale],[cx+side*65*scale,cy]];
      ctx.beginPath();ctx.moveTo(...p[0]);ctx.bezierCurveTo(...p[1],...p[2],...p[3]);
      ctx.strokeStyle=`rgba(55,150,245,${k%4===0?.32:.12})`;ctx.lineWidth=k%4===0?1.4:.7;ctx.stroke();
      for(let j=0;j<(detail?3:2);j++){
        const t=(k*.071+time*.24+j/3)%1;
        const at=t=>{const u=1-t;return [0,1].map(d=>u*u*u*p[0][d]+3*u*u*t*p[1][d]+3*u*t*t*p[2][d]+t*t*t*p[3][d]);};
        const q=at(t),tail=at(Math.max(0,t-.025));
        ctx.beginPath();ctx.moveTo(...tail);ctx.lineTo(...q);ctx.strokeStyle='#74ceff';ctx.lineWidth=2*scale;ctx.stroke();
        ctx.beginPath();ctx.arc(...q,2*scale,0,TAU);ctx.fillStyle='#d1f5ff';ctx.fill();
      }
    }
    // Orbiting particles cross in front of and behind the precessing engine.
    for(let i=0;i<(detail?64:40);i++){
      const a=i*2.39996+time*(.25+(i%5)*.04),r=150+(i%7)*32;
      const q=project(orient([r*Math.cos(a),r*Math.sin(a),Math.sin(a*2+i)*100]));
      ctx.globalAlpha=.35+q[2]*.35;ctx.fillStyle='#a1e7ff';ctx.beginPath();
      ctx.arc(q[0],q[1],Math.max(1,2.3*scale*q[2]),0,TAU);ctx.fill();
    }ctx.globalAlpha=1;
    const core=ctx.createRadialGradient(cx,cy,0,cx,cy,95*scale);core.addColorStop(0,`rgba(194,238,255,${.32+Math.sin(time*1.7)*.12})`);core.addColorStop(.14,'#419dff30');core.addColorStop(1,'#006aff00');ctx.fillStyle=core;ctx.fillRect(cx-100*scale,cy-100*scale,200*scale,200*scale);ctx.globalCompositeOperation='source-over';
    present.drawImage(buffer,0,0);
    if(!canvas.parentElement.classList.contains('is-rendered'))canvas.parentElement.classList.add('is-rendered');
    const cost=performance.now()-started;
    if(detail){slowFrames=cost>22?slowFrames+1:0;if(slowFrames>=3){detail=false;geometry=null;requestAnimationFrame(resize);}}
    const stats=canvas.sceneStats||(canvas.sceneStats={frames:0,totalMs:0,maxMs:0});stats.detail=detail?'full':'light';stats.frames++;stats.totalMs+=cost;stats.maxMs=Math.max(stats.maxMs,cost);
  }
  const globallyPaused=()=>document.documentElement.classList.contains('cx-motion-paused');
  let mediaReduced=reduce.matches;
  function syncPreference(){if(mediaReduced!==reduce.matches){mediaReduced=reduce.matches;optedIn=false;}}
  const reduced=()=>reduce.matches&&!optedIn;
  const active=()=>{syncPreference();return visible&&!document.hidden&&!paused&&!reduced()&&!globallyPaused();};
  const button=document.createElement('button');button.type='button';button.className='cinema-motion';
  const status=document.createElement('span');status.className='cinema-status';status.setAttribute('role','status');
  hero.append(button,status);
  function updateControls(){
    const stopped=paused||globallyPaused()||reduced();
    button.textContent=reduced()?'Enable scene motion':stopped?'Resume scene':'Pause scene';
    button.setAttribute('aria-pressed',String(stopped));
    status.textContent=reduced()?'Reduced motion · still scene':globallyPaused()?'Motion paused · saved preference':paused?'Scene paused':document.hidden||!visible?'Motion suspended · out of view':optedIn&&reduce.matches?'Motion active · enabled by you':'Motion active';
  }
  function frame(now){raf=0;if(!active()){updateControls();return;}
    // Cap at 30fps desktop / 24fps mobile; no catch-up burst after suspension.
    if(now-last>=1000/(width<760?24:30)){
      time+=Math.min((now-last)/1000,.08);last=now;
      mx+=(tx-mx)*.14;my+=(ty-my)*.14;
      scroll+=(Math.max(0,Math.min(1,scrollY/height))-scroll)*.12;
      render();
    }raf=requestAnimationFrame(frame);
  }
  function schedule(){syncPreference();updateControls();if(active()&&!raf){last=performance.now();raf=requestAnimationFrame(frame);}else if(!active()&&raf){cancelAnimationFrame(raf);raf=0;}}
  function resize(){const header=document.querySelector('.brand-bar');hero.style.setProperty('--scene-header',`${header.getBoundingClientRect().height}px`);const r=hero.getBoundingClientRect();const dpr=Math.min(devicePixelRatio||1,detail?(r.width<760?1.25:1):.65);if(width===r.width&&height===r.height&&canvas.width===Math.round(r.width*dpr))return;width=r.width;height=r.height;sky=null;buffer.width=canvas.width=Math.round(width*dpr);buffer.height=canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);render();schedule();}
  button.addEventListener('click',()=>{
    if(reduced()){optedIn=true;paused=false;}
    else if(paused||globallyPaused()){paused=false;}
    else paused=true;
    if(globallyPaused()){
      // Use the existing owner of the persistent global preference.
      document.querySelector('.site-footer .cx-pulse-toggle,.cx-foot .cx-pulse-toggle')?.click();
    }
    schedule();
  });
  hero.addEventListener('pointermove',e=>{if(!active())return;const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/width-.5;ty=(e.clientY-r.top)/height-.5;},{passive:true});
  hero.addEventListener('pointerleave',()=>{tx=ty=0;},{passive:true});
  const resizer=new ResizeObserver(resize);resizer.observe(hero);resizer.observe(document.querySelector('.brand-bar'));
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:0}).observe(hero);
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',schedule);
  const preferenceChanged=()=>{syncPreference();schedule();};
  if(reduce.addEventListener)reduce.addEventListener('change',preferenceChanged);else reduce.addListener(preferenceChanged);
})();
