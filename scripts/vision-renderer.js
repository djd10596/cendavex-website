/* Original deterministic 3D motion artwork. No external assets or runtime services. */
window.renderVision=async function(t,loop=false){
 const c=document.querySelector('canvas'),g=c.getContext('2d'),W=c.width,H=c.height;const scale=W/1280;g.save();g.scale(scale,scale);
 if(loop)t=4-4*Math.cos(t/8*Math.PI*2);
 const w=1280,h=720,i=Math.min(9,Math.floor(t/8.4)),u=(t%8.4)/8.4,s=window.scenes[i];
 let bg=g.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#02060e');bg.addColorStop(.6,'#07182b');bg.addColorStop(1,'#020610');g.fillStyle=bg;g.fillRect(0,0,w,h);
 const cx=loop?640:900,cy=350,rot=t*.15;let glow=g.createRadialGradient(cx,cy,0,cx,cy,440);glow.addColorStop(0,'#19649366');glow.addColorStop(.45,'#113c6422');glow.addColorStop(1,'#00000000');g.fillStyle=glow;g.fillRect(0,0,w,h);
 const project=(x,y,z)=>{
 if(!loop){
 if(i===0){let k=.12+.88*Math.min(1,t/7);x*=k;y*=k;z*=k;}
 if(i===2){let k=1+.13*Math.sin(y*.025+t);x*=k;z*=k;}
 if(i===3){y*=.35;x*=1.12;z*=1.12;}
 if(i===4){const k=210/Math.max(Math.abs(x),Math.abs(y),Math.abs(z),1);x*=k*.8;y*=k*.8;z*=k*.8;}
 if(i===5){x*=1.2;y*=.65;}
 if(i===6){y=y*.3+Math.sin(x*.018+t*.7)*55;z*=.7;x*=1.35;}
 if(i===7){let k=1+.2*Math.cos(Math.atan2(z,x)*6);x*=k;y*=.8;z*=k;}
 if(i===8){y*=1.2;x*=.8;z*=.8;}
 if(i===9){x*=1.13;y*=1.13;z*=1.13;}
 }
 let a=x*Math.cos(rot)+z*Math.sin(rot),b=-x*Math.sin(rot)+z*Math.cos(rot);let Y=y*Math.cos(.35)+b*Math.sin(.35),Z=-y*Math.sin(.35)+b*Math.cos(.35);const p=600/(650+Z);return [cx+a*p,cy+Y*p,Z,p]};
 // Orbital meridians woven from individual luminous filaments.
 g.lineWidth=.7;for(let ring=0;ring<22;ring++){let lat=(ring/21)*Math.PI;g.beginPath();for(let j=0;j<=100;j++){let a=j/100*Math.PI*2;let r=210+Math.sin(a*3+t*.5+ring*.3)*9;let p=project(r*Math.sin(lat)*Math.cos(a),r*Math.cos(lat),r*Math.sin(lat)*Math.sin(a));g.strokeStyle=`rgba(87,177,239,${.12+ring/100})`;j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);}g.stroke();}
 for(let m=0;m<18;m++){g.beginPath();for(let j=0;j<=70;j++){let a=j/70*Math.PI,b=m/18*Math.PI*2;let p=project(215*Math.sin(a)*Math.cos(b),215*Math.cos(a),215*Math.sin(a)*Math.sin(b));j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);}g.strokeStyle='#4c94cd55';g.stroke();}
 // Deep starfield, orbiting evidence packets and projected construction lines.
 for(let n=0;n<160;n++){let x=((Math.sin(n*127.1)*43758.5453)%1+1)%1*w,y=((Math.sin(n*311.7)*13527.1)%1+1)%1*h;g.fillStyle=`rgba(155,207,249,${.1+.3*(.5+.5*Math.sin(t+n))})`;g.fillRect(x,y,n%7===0?2:1,1);}
 for(let n=0;n<6;n++){let a=n*Math.PI/3+t*.18;let p=project(320*Math.cos(a),75*Math.sin(a*2),320*Math.sin(a));g.strokeStyle='#7fcaff44';g.beginPath();g.moveTo(cx,cy);g.lineTo(p[0],p[1]);g.stroke();g.fillStyle='#c3e8ff';g.shadowColor='#4faeff';g.shadowBlur=16;g.beginPath();g.arc(p[0],p[1],4*p[3],0,7);g.fill();g.shadowBlur=0;if(i===3&&!loop){g.font='10px Arial';g.fillStyle='#d6eaff';g.fillText(['PLAN','BUILD','TEST','SECURE','VERIFY','REVIEW'][n],p[0]+12,p[1]-9);}}
 for(let n=0;n<80;n++){let a=n*2.39996+t*.12,z=1-2*(n+.5)/80,r=Math.sqrt(1-z*z);let p=project(216*r*Math.cos(a),216*z,216*r*Math.sin(a));g.fillStyle=p[2]<0?'#c2e8ff':'#397aa5';g.beginPath();g.arc(p[0],p[1],p[2]<0?1.9:1,0,7);g.fill();}
 // Scene-specific physical architecture, four division beacons and evidence planes.
 if(!loop && [4,5,6,8].includes(i)){
 g.lineWidth=1;
 for(let n=0;n<(i===5?4:9);n++){
 const bx=760+(n%3)*88,by=210+Math.floor(n/3)*110;
 if(i===5){const angle=n*Math.PI/2+t*.08;const px=cx+260*Math.cos(angle),py=cy+140*Math.sin(angle);g.strokeStyle='#86cfff88';g.strokeRect(px-50,py-20,100,40);g.fillStyle='#d1eaff';g.font='11px monospace';g.textAlign='center';g.fillText(['FINANCIAL','AI','SYSTEMS','INDUSTRIES'][n],px,py+4);g.textAlign='left';}
 else{g.strokeStyle='#69bfff44';let ht=i===8?70+n%3*45:50;g.beginPath();g.moveTo(bx,by);g.lineTo(bx+55,by-22);g.lineTo(bx+55,by-22-ht);g.lineTo(bx,by-ht);g.closePath();g.stroke();g.fillStyle='#17487522';g.fill();g.beginPath();g.moveTo(bx+55,by-22-ht);g.lineTo(bx+80,by-ht-10);g.lineTo(bx+25,by-ht+12);g.lineTo(bx,by-ht);g.stroke();}
 }
 }
 // Anamorphic optical bloom.
 let beam=g.createLinearGradient(0,cy,w,cy);beam.addColorStop(0,'#70bbff00');beam.addColorStop(.7,'#75caff44');beam.addColorStop(1,'#70bbff00');g.fillStyle=beam;g.fillRect(0,cy,w,1);g.fillStyle='#bde5ff';g.shadowColor='#46b9ff';g.shadowBlur=35;g.beginPath();g.arc(cx,cy,8+2*Math.sin(t),0,7);g.fill();g.shadowBlur=0;
 if(!loop){let fade=Math.min(1,u*8,(1-u)*9);g.globalAlpha=Math.max(0,fade);let shade=g.createLinearGradient(0,0,950,0);shade.addColorStop(0,'#020810fa');shade.addColorStop(.6,'#020810bb');shade.addColorStop(1,'#02081000');g.fillStyle=shade;g.fillRect(0,0,1000,h);
 g.fillStyle='#99caff';g.font='12px monospace';g.fillText(s[0],65,118);g.fillStyle='#edf6ff';g.font=(i===1?'44':'51')+'px Arial';const wrap=(str,max)=>{let out=[],line='';for(const word of str.split(' ')){if(g.measureText(line+word).width>max&&line){out.push(line.trim());line='';}line+=word+' ';}out.push(line.trim());return out;};let lines=wrap(s[1],650);lines.forEach((l,j)=>g.fillText(l,62,252+j*61));g.fillStyle='#a9d3f4';g.font='24px Arial';let y=282+lines.length*61;wrap(s[2],650).forEach((l,j)=>g.fillText(l,65,y+j*35));
 g.font='12px Arial';g.fillStyle='#b4c8db';wrap(s[3],1090).forEach((l,j)=>g.fillText(l,65,626+j*20));g.globalAlpha=1;g.strokeStyle='#28465f';g.beginPath();g.moveTo(65,660);g.lineTo(1215,660);g.stroke();g.fillStyle='#a4c6e0';g.font='10px monospace';g.fillText('CENDAVEX TECHNOLOGIES / THE AWAKENING',65,687);g.fillText(String(i+1).padStart(2,'0')+' / 10',1165,687);
 if((i===1||i===9)&&window.logo){g.globalAlpha=fade;g.drawImage(window.logo,i===9?1020:1070,40,i===9?185:130,i===9?185:130);g.globalAlpha=1;}
 }if(!loop&&(t<1.3||t>82.7)){g.globalAlpha=1;g.fillStyle='rgba(0,0,0,'+(t<1.3?1-t/1.3:(t-82.7)/1.3)+')';g.fillRect(0,0,w,h);}g.restore();return c.toDataURL('image/jpeg',.92).split(',')[1];
};
