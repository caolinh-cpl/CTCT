import React from 'react';
import {AbsoluteFill, Composition, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const ink = '#252039';
const colors = ['#ff9855', '#b1a3e8', '#fff4d6', '#777c99', '#f6b7c8'];
const Cat: React.FC<{color:string; index:number; fighting:boolean}> = ({color,index,fighting}) => {
 const f=useCurrentFrame();
 const swipe=fighting ? Math.sin(f*1.2+index*2)*35 : 0;
 return <svg viewBox="0 0 300 360" width="300" height="360" style={{overflow:'visible'}}>
  <g stroke={ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
   <path d="M210 265 Q310 255 260 185" fill="none" stroke={color} strokeWidth="28"/>
   <ellipse cx="150" cy="260" rx="72" ry="78" fill={color}/>
   <ellipse cx="150" cy="278" rx="38" ry="43" fill="#fff4df" stroke="none"/>
   <ellipse cx="107" cy="325" rx="30" ry="18" fill={color}/><ellipse cx="194" cy="325" rx="30" ry="18" fill={color}/>
   <g transform={`rotate(${swipe} 85 225)`}><path d="M95 241 Q45 222 49 175" fill="none" stroke={color} strokeWidth="32"/><circle cx="49" cy="175" r="22" fill={color}/></g>
   <g transform={`rotate(${-swipe} 215 225)`}><path d="M207 241 Q252 220 248 175" fill="none" stroke={color} strokeWidth="32"/><circle cx="248" cy="175" r="22" fill={color}/></g>
   <path d="M65 131 L56 35 L119 77 Q150 62 181 77 L245 35 L235 133 Q260 209 150 219 Q40 209 65 131Z" fill={color}/>
   <path d="M75 61 L82 111 L107 87 M224 61 L218 111 L193 87" fill="#f48fa4" stroke="none"/>
   <path d="M96 131 L124 142 M177 142 L204 131"/>
   <ellipse cx="112" cy="155" rx="6" ry="12" fill={ink} stroke="none"/><ellipse cx="189" cy="155" rx="6" ry="12" fill={ink} stroke="none"/>
   <path d="M140 174 L160 174 L150 183Z" fill="#ed7e94" strokeWidth="4"/>
   <path d="M150 185 Q137 204 125 191 M150 185 Q163 204 175 191" fill="none" strokeWidth="5"/>
   <path d="M90 177 L34 165 M89 190 L30 194 M211 177 L266 165 M212 190 L269 194" strokeWidth="5"/>
   {index===0 && <path d="M133 82 L143 106 M160 82 L158 106" fill="none" strokeWidth="8"/>}
  </g>
 </svg>;
};
const Fighter:React.FC<{index:number}> = ({index})=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const t=f/fps;
 const entrance=spring({frame:f-index*3,fps,config:{damping:13,stiffness:110}});
 const active=t>1.35&&t<4.15;
 const settle=spring({frame:f-4.15*fps,fps,config:{damping:13}});
 const angle=index*Math.PI*2/5-Math.PI/2 + (active?(t-1.35)*5:0);
 const radius=active?225+35*Math.sin(f*.6+index):340;
 const x=active?540+Math.cos(angle)*radius: interpolate(settle,[0,1],[540+Math.cos(index*Math.PI*2/5-Math.PI/2)*340,200+index*170]);
 const y=active?990+Math.sin(angle)*radius*.73:interpolate(settle,[0,1],[940+Math.sin(index*Math.PI*2/5-Math.PI/2)*260,1150+(index%2)*35]);
 return <div style={{position:'absolute',left:x-150,top:y-180,scale:entrance*(active?.86:.92),rotate:`${active?Math.sin(f*.5+index)*40:(1-settle)*Math.cos(index*2)*13}deg`,opacity:entrance,translate:`0px ${(1-entrance)*650}px`}}><Cat color={colors[index]} index={index} fighting={active}/></div>;
};
export const CatChaos:React.FC = ()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const t=f/fps;
 const impact=t>1.4&&t<4.15;
 return <AbsoluteFill style={{background:'#ffe9a8',fontFamily:'Arial Black, Arial, sans-serif',color:ink,overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:'radial-gradient(#dcab60 2px, transparent 2px)',backgroundSize:'24px 24px',opacity:.24}}/>
  <div style={{position:'absolute',width:1080,height:1080,borderRadius:'50%',background:'#ffb65f',top:460,left:0,scale:1+.025*Math.sin(f*.15)}}/>
  <div style={{position:'absolute',top:180,width:'100%',textAlign:'center',fontSize:29,letterSpacing:10,fontWeight:900}}>FIVE CATS. ZERO CHILL.</div>
  <div style={{position:'absolute',top:270,width:'100%',textAlign:'center',fontWeight:950,fontSize:155,lineHeight:.86,letterSpacing:-9,rotate:`${Math.sin(f*.12)*1.5}deg`,scale:spring({frame:f,fps,config:{damping:12}})}}>CAT<br/><span style={{color:'#ed574a',WebkitTextStroke:`4px ${ink}`,textShadow:`8px 9px 0 ${ink}`}}>CHAOS</span></div>
  <div style={{position:'absolute',left:150,top:1370,width:780,height:65,borderRadius:'50%',background:'#ad6935',opacity:.16}}/>
  <Fighter index={0}/><Fighter index={1}/><Fighter index={2}/><Fighter index={3}/><Fighter index={4}/>
  {impact && <>
   <svg width="1080" height="1920" style={{position:'absolute',pointerEvents:'none'}}>
    {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6+f*.03;return <path key={i} d={`M${540+Math.cos(a)*390} ${990+Math.sin(a)*320} l${Math.cos(a)*70} ${Math.sin(a)*70}`} stroke={ink} strokeWidth="7" strokeLinecap="round" opacity=".6"/>;})}
    {Array.from({length:9},(_,i)=><ellipse key={i} cx={540+Math.cos(i*2+f*.16)*150} cy={1010+Math.sin(i*2+f*.16)*100} rx={100+Math.sin(f*.3+i)*15} ry="75" fill="#fff6df" stroke={ink} strokeWidth="5"/>)}
   </svg>
   <div style={{position:'absolute',top:900,left:350,rotate:`${Math.sin(f*.5)*12}deg`,fontSize:100,fontStyle:'italic',fontWeight:900,color:'#ed574a',WebkitTextStroke:`3px ${ink}`}}>{Math.floor(f/10)%2?'POW!':'MEOW!'}</div>
  </>}
  <div style={{position:'absolute',top:1540,width:'100%',textAlign:'center',fontSize:47,fontWeight:900,letterSpacing:1,opacity:interpolate(f,[4.3*fps,4.65*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>THE PAW-BRAWL BEGINS.</div>
  <div style={{position:'absolute',bottom:185,left:420,width:240,height:7,borderRadius:8,background:ink,opacity:.8}}/>
 </AbsoluteFill>;
};
export const RemotionRoot:React.FC=()=> <Composition id="CatChaos" component={CatChaos} durationInFrames={180} fps={30} width={1080} height={1920}/>;
