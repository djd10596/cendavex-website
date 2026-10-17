import sys,subprocess,re,pathlib,json,struct
sys.path.insert(0,'node_modules/.vision-python')
import imageio_ffmpeg
ff=imageio_ffmpeg.get_ffmpeg_exe();results=[]
for name in ['vision-film.mp4','hero-loop.mp4','vision-film.webm','hero-loop.webm']:
 path=pathlib.Path('assets')/name
 p=subprocess.run([ff,'-i',str(path)],capture_output=True,text=True)
 meta=p.stderr;duration=re.search(r'Duration: ([\d:.]+)',meta).group(1)
 decode=subprocess.run([ff,'-v','error','-i',str(path),'-f','null','-'],capture_output=True,text=True)
 assert decode.returncode==0 and not decode.stderr,decode.stderr
 assert 'Audio:' not in meta
 entry={'file':str(path),'bytes':path.stat().st_size,'duration':duration,'video':re.search(r'Video: (.*)',meta).group(1),'fullDecode':'pass','audio':'none'}
 if name.endswith('.mp4'):
  data=path.read_bytes();pos=0;atoms=[]
  while pos+8<len(data):
   size,kind=struct.unpack('>I4s',data[pos:pos+8]);atoms.append(kind.decode());pos+=size
   if size<8:break
  assert atoms.index('moov')<atoms.index('mdat');entry['faststart']=True
 results.append(entry)
def frame(t):return subprocess.check_output([ff,'-v','error','-ss',str(t),'-i','assets/hero-loop.mp4','-frames:v','1','-vf','scale=160:90','-f','rawvideo','-pix_fmt','rgb24','-'])
a,b=frame(0),frame(7.958);delta=sum(abs(x-y) for x,y in zip(a,b))/len(a);assert delta<2,delta
results.append({'loopEndpointMeanPixelDifferenceOutOf255':delta})
pathlib.Path('docs/vision/media-validation.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
