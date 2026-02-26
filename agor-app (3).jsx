import { useState, useRef, useCallback, useEffect } from "react";

const LOGO = "data:image/jpeg;base64,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";

function useFont() {
  useEffect(() => {
    if (document.getElementById("agor-font")) return;
    const l = document.createElement("link");
    l.id = "agor-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
    const s = document.createElement("style");
    s.id = "agor-kf";
    s.textContent = `
      @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(16,185,129,.5)}50%{box-shadow:0 0 20px rgba(16,185,129,.8)}}
      @keyframes shimmer{0%{opacity:0.3;transform:translateX(-100%)}50%{opacity:0.7}100%{opacity:0.3;transform:translateX(100%)}}
    `;
    document.head.appendChild(s);
  }, []);
}

const DARK={bg:"#0a0f1e",surface:"#111827",card:"#141d2e",text:"#f1f5f9",muted:"#64748b",border:"rgba(255,255,255,0.07)",border2:"rgba(255,255,255,0.12)",green:"#10b981",amber:"#f59e0b",red:"#ef4444",accent:"#3b82f6",inpBorder:"rgba(255,255,255,0.12)",subtleBg:"rgba(255,255,255,0.03)"};
const LIGHT={bg:"#f4f7ff",surface:"#ffffff",card:"#ffffff",text:"#0f172a",muted:"#94a3b8",border:"rgba(0,0,0,0.06)",border2:"rgba(0,0,0,0.1)",green:"#059669",amber:"#d97706",red:"#dc2626",accent:"#2563eb",inpBorder:"rgba(0,0,0,0.12)",subtleBg:"rgba(0,0,0,0.02)"};

const S={
  card:(c)=>({background:c.card,border:`1px solid ${c.border}`,borderRadius:16,padding:22}),
  inp:(c)=>({background:c.surface,border:`1.5px solid ${c.inpBorder}`,borderRadius:10,color:c.text,fontFamily:"DM Sans,system-ui,sans-serif",fontSize:14,padding:"12px 14px",width:"100%",outline:"none"}),
  btnP:()=>({background:"linear-gradient(135deg,#3b82f6,#06b6d4)",color:"white",border:"none",borderRadius:10,fontFamily:"DM Sans,system-ui,sans-serif",fontWeight:600,cursor:"pointer"}),
  btnG:(c)=>({background:"transparent",border:`1.5px solid ${c.border2}`,color:c.muted,borderRadius:10,fontFamily:"DM Sans,system-ui,sans-serif",fontWeight:500,cursor:"pointer"}),
  tag:(role,c)=>({fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:600,background:role==="admin"?"rgba(59,130,246,0.12)":role==="technician"?"rgba(245,158,11,0.12)":"rgba(16,185,129,0.12)",color:role==="admin"?c.accent:role==="technician"?c.amber:c.green}),
};

const T={
  he:{dir:"rtl",appName:"מערכת שליטה חכמה",username:"שם משתמש",password:"סיסמה",loginBtn:"כניסה",logout:"יציאה",programs:"תוכניות מהירות",save:"שמור",cancel:"ביטול",controls:"שליטה בבמה",lowerManual:"הורדה",stop:"עצור",raise:"הרמה",setDepth:"עומק יעד",goToDepth:"רד לעומק",settings:"הגדרות",language:"שפה",theme:"מראה",light:"בהיר",dark:"כהה",tutorial:"הדרכה",tutorialTitle:"מדריך למשתמש",admin:"מנהל",technician:"טכנאי",user:"משתמש",userManagement:"ניהול משתמשים",addUser:"משתמש חדש",role:"תפקיד",stageId:"מס׳ במה",plcConnect:"חיבור PLC",indicators:"נורות סטטוס",connected:"מחובר",disconnected:"מנותק",connecting:"מתחבר...",connect:"התחבר",disconnect:"נתק",safetyTitle:"אישור בטיחות",safetyCheck1:"אני בקשר עין עם הבמה ומנטר אותה",safetyCheck2:"אין אנשים או חפצים על הבמה ובמים",confirm:"אשר והפעל",doubleClickHint:"לחץ פעמיים",lowering:"יורדת",raising:"עולה",stopped:"עצרה",idle:"מוכן",history:"פעולות אחרונות",time:"שעה",action:"פעולה",operator:"מפעיל",noHistory:"אין פעולות",addVideo:"הוסף סרטון",videoUrl:"קישור",videoTitle:"שם הסרטון",editPrograms:"ערוך",plcIpAddress:"כתובת IP",modbusPort:"פורט",fullName:"שם מלא",stageIdOpt:"מס׳ במה (אופציונלי)",noVideos:"אין סרטונים",previous:"הקודם",next:"הבא",controlTab:"בקרה",usersTab:"משתמשים",loweringTo:"יורד ל-",completeTutorial:"סיים הדרכה",completed:"הושלם",deleteUser:"הסר",tips:"טיפים",safetyRulesConfirm:"קראתי את כל כללי הבטיחות ואני מתחייב/ת לפעול על פיהם",mustConfirmSafety:"יש לאשר את כללי הבטיחות",singleClick:"לחיצה אחת",meter:"מ׳",loweringActive:"מוריד...",raisingActive:"מעלה..."},
  en:{dir:"ltr",appName:"Smart Stage Control",username:"Username",password:"Password",loginBtn:"Sign In",logout:"Sign Out",programs:"Quick Programs",save:"Save",cancel:"Cancel",controls:"Stage Control",lowerManual:"Lower",stop:"Stop",raise:"Raise",setDepth:"Target Depth",goToDepth:"Go to Depth",settings:"Settings",language:"Language",theme:"Appearance",light:"Light",dark:"Dark",tutorial:"Tutorial",tutorialTitle:"User Guide",admin:"Admin",technician:"Technician",user:"User",userManagement:"User Management",addUser:"New User",role:"Role",stageId:"Stage No.",plcConnect:"PLC Connection",indicators:"Status Lights",connected:"Connected",disconnected:"Disconnected",connecting:"Connecting...",connect:"Connect",disconnect:"Disconnect",safetyTitle:"Safety Confirmation",safetyCheck1:"I have visual contact with the stage",safetyCheck2:"No people or objects on stage or in water",confirm:"Confirm & Activate",doubleClickHint:"Double-click",lowering:"Lowering",raising:"Raising",stopped:"Stopped",idle:"Ready",history:"Recent Activity",time:"Time",action:"Action",operator:"Operator",noHistory:"No activity",addVideo:"Add Video",videoUrl:"URL",videoTitle:"Video Title",editPrograms:"Edit",plcIpAddress:"IP Address",modbusPort:"Port",fullName:"Full Name",stageIdOpt:"Stage ID (optional)",noVideos:"No videos yet",previous:"Previous",next:"Next",controlTab:"Control",usersTab:"Users",loweringTo:"Going to ",completeTutorial:"Complete Tutorial",completed:"Completed",deleteUser:"Remove",tips:"Tips",safetyRulesConfirm:"I have read all safety rules and commit to following them",mustConfirmSafety:"Please confirm safety rules",singleClick:"Single click",meter:"m",loweringActive:"Lowering...",raisingActive:"Raising..."},
};

const STEPS={
  he:[
    {title:"ברוכים הבאים",emoji:"👋",content:"מערכת AGOR מאפשרת שליטה מדויקת ובטוחה על גובה הבמה ההידראולית. כל פעולה מתועדת וההפעלה דורשת אישור כפול.",tips:["כל פעולה נרשמת עם שם המפעיל","דאבל קליק נדרש לכל הפעלה","לחיצה אחת על עצור תמיד עובדת","פנה למנהל לקבלת חשבון"]},
    {title:"כללי בטיחות",emoji:"🛡️",requireConfirm:true,content:"לפני כל הפעלה יש לאשר שני תנאי בטיחות.",tips:["קשר עין ישיר לפני ובמהלך","אין אנשים על הבמה או במים","לחץ עצור מיידית בחירום","הפעלה ע\"י מבוגר מוסמך בלבד"]},
    {title:"הורדה ידנית",emoji:"⬇️",content:"דאבל קליק על הורדה מתחיל ירידה רציפה עד שתלחץ עצור.",tips:["שתי לחיצות מהירות","אחרי הראשונה הכפתור יהבהב","עקוב אחר מד העומק"]},
    {title:"עומק יעד",emoji:"🎯",content:"הזן עומק 0–2.5 מטר ולחץ דאבל קליק. הבמה תרד ותעצור בדיוק.",tips:["0.0 עד 2.5 מטר","ניתן להזין עשרוניות: 1.25","עצירה אוטומטית"]},
    {title:"תוכניות מהירות",emoji:"📋",content:"5 תוכניות שמורות לעומקים נפוצים. דאבל קליק מפעיל ישירות.",tips:["המנהל עורך שמות ועומקים","גם תוכניות דורשות דאבל קליק"]},
    {title:"הרמה",emoji:"⬆️",content:"דאבל קליק על הרמה מעלה את הבמה. תמיד עשה זאת בסיום.",tips:["תמיד הרם בסיום","וודא הגעה לעומק 0"]},
  ],
  en:[
    {title:"Welcome",emoji:"👋",content:"AGOR gives precise, safe control over the hydraulic stage. All actions are logged and every activation requires double confirmation.",tips:["Every action is logged","Double-click required","Single press Stop always works"]},
    {title:"Safety Rules",emoji:"🛡️",requireConfirm:true,content:"Before every activation, confirm two safety conditions.",tips:["Visual contact before and during","No people on stage or in water","Press Stop immediately in emergencies"]},
    {title:"Manual Lowering",emoji:"⬇️",content:"Double-click Lower to begin continuous descent until you press Stop.",tips:["Two quick clicks","Button flashes after first click"]},
    {title:"Target Depth",emoji:"🎯",content:"Enter a depth 0–2.5m then double-click. Stage stops precisely at target.",tips:["0.0 to 2.5 meters","Auto-stops at target"]},
    {title:"Quick Programs",emoji:"📋",content:"5 saved programs for common depths. Double-click to activate.",tips:["Admin edits names and depths","Programs also need double-click"]},
    {title:"Raising",emoji:"⬆️",content:"Double-click Raise to bring the stage back to surface.",tips:["Always raise at end of session","Confirm depth reaches 0"]},
  ]
};

const INIT_USERS=[
  {id:1,username:"admin",password:"admin123",role:"admin",stageId:null,name:"מנהל ראשי"},
  {id:2,username:"tech1",password:"tech123",role:"technician",stageId:null,name:"טכנאי 1"},
  {id:3,username:"user1",password:"user123",role:"user",stageId:1,name:"משתמש בריכה 1"},
  {id:4,username:"user2",password:"user456",role:"user",stageId:2,name:"משתמש בריכה 2"},
];
const INIT_PROGS=[
  {id:1,name:"שחייה חופשית",depth:0.5},
  {id:2,name:"לימוד שחייה",depth:1.0},
  {id:3,name:"אימון כושר",depth:1.5},
  {id:4,name:"בית ספר",depth:2.0},
  {id:5,name:"עומק מלא",depth:2.5},
];
const MAX_D=2.5;

function Tick(){return(<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}

function Checkbox({checked,onToggle,c}){
  return(<div onClick={onToggle} style={{width:22,height:22,borderRadius:6,flexShrink:0,cursor:"pointer",border:`1.5px solid ${checked?c.green:c.border2}`,background:checked?c.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>{checked&&<Tick/>}</div>);
}

function SafetyModal({t,c,onConfirm,onCancel}){
  const [v1,setV1]=useState(false),[v2,setV2]=useState(false);
  const ok=v1&&v2;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(10px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{animation:"fadeUp .3s ease both",background:c.card,border:`1px solid ${c.border2}`,borderRadius:20,padding:28,maxWidth:440,width:"100%",direction:t.dir,boxShadow:"0 32px 80px rgba(0,0,0,0.6)",fontFamily:"DM Sans,system-ui,sans-serif"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <div style={{width:38,height:38,borderRadius:10,background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>🛡️</div>
          <div style={{fontWeight:700,fontSize:16,color:c.text}}>{t.safetyTitle}</div>
        </div>
        <p style={{fontSize:12,color:c.muted,marginBottom:18,paddingInlineStart:50,lineHeight:1.6}}>{t.dir==="rtl"?"אשר שני התנאים לפני ההפעלה":"Confirm both conditions before activating"}</p>
        {[[v1,()=>setV1(x=>!x),t.safetyCheck1],[v2,()=>setV2(x=>!x),t.safetyCheck2]].map(([val,toggle,label],i)=>(
          <div key={i} onClick={toggle} style={{display:"flex",alignItems:"flex-start",gap:13,border:`1.5px solid ${val?c.green:c.border2}`,borderRadius:10,padding:14,marginBottom:10,cursor:"pointer",background:val?"rgba(16,185,129,0.05)":"transparent",transition:"all 0.2s"}}>
            <Checkbox checked={val} onToggle={toggle} c={c}/>
            <span style={{color:c.text,lineHeight:1.65,fontSize:13,fontWeight:val?500:400}}>{label}</span>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:18}}>
          <button onClick={onCancel} style={{...S.btnG(c),flex:1,padding:"11px",fontSize:13}}>{t.cancel}</button>
          <button onClick={onConfirm} disabled={!ok} style={{...S.btnP(),flex:2,padding:"11px",fontSize:13,opacity:ok?1:0.35,cursor:ok?"pointer":"not-allowed"}}>{t.confirm}</button>
        </div>
      </div>
    </div>
  );
}

function DblBtn({children,onClick,bg="linear-gradient(135deg,#3b82f6,#06b6d4)",glow="rgba(59,130,246,0.35)",disabled=false,hint,style:sx={}}){
  const clicks=useRef(0),timer=useRef(null);
  const [flash,setFlash]=useState(false);
  const handle=()=>{
    if(disabled)return;
    clicks.current++;
    setFlash(true);setTimeout(()=>setFlash(false),200);
    if(timer.current)clearTimeout(timer.current);
    if(clicks.current>=2){clicks.current=0;onClick();}
    else timer.current=setTimeout(()=>{clicks.current=0;},700);
  };
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,...sx}}>
      <button onClick={handle} disabled={disabled} style={{width:"100%",padding:"13px 10px",borderRadius:13,border:"none",fontFamily:"DM Sans,system-ui,sans-serif",background:disabled?"rgba(255,255,255,0.05)":bg,color:disabled?"#475569":"white",fontWeight:600,fontSize:14,cursor:disabled?"not-allowed":"pointer",boxShadow:disabled?"none":`0 6px 18px ${glow}`,transform:flash&&!disabled?"scale(0.95)":"scale(1)",opacity:disabled?0.45:1,transition:"transform 0.15s,box-shadow 0.2s"}}>
        {children}
      </button>
      {hint&&<span style={{fontSize:10,color:"#94a3b8"}}>{hint}</span>}
    </div>
  );
}

function Pool({depth,status}){
  const H=220,pct=depth/MAX_D,platformTop=pct*(H-32);
  const sc=status==="lowering"?"#3b82f6":status==="raising"?"#10b981":status==="stopped"?"#f59e0b":"rgba(200,220,255,0.7)";
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
      <div style={{position:"relative",width:130,height:H,border:"3px solid #1a6fa8",borderRadius:"6px 6px 14px 14px",overflow:"hidden",background:"linear-gradient(180deg,#1a8fd1 0%,#0e6eac 40%,#0a5a94 100%)",boxShadow:"inset 0 0 30px rgba(0,80,160,0.5), 0 6px 24px rgba(0,80,160,0.4)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:8,background:"linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.35),rgba(255,255,255,0.05))",animation:"shimmer 3s ease infinite"}}/>
        <div style={{position:"absolute",top:10,left:18,width:22,height:4,background:"rgba(255,255,255,0.1)",borderRadius:"50%",transform:"rotate(-12deg)"}}/>
        <div style={{position:"absolute",top:28,right:20,width:14,height:3,background:"rgba(255,255,255,0.07)",borderRadius:"50%",transform:"rotate(8deg)"}}/>
        {[0.5,1.0,1.5,2.0,2.5].map(d=>(
          <div key={d} style={{position:"absolute",left:0,right:0,top:(d/MAX_D)*H,borderTop:"1px dashed rgba(255,255,255,0.18)",display:"flex",alignItems:"center",paddingInlineStart:4}}>
            <span style={{fontSize:8,color:"rgba(255,255,255,0.55)",fontFamily:"DM Mono,monospace",fontWeight:600}}>{d}m</span>
          </div>
        ))}
        <div style={{position:"absolute",left:14,width:7,top:platformTop+30,bottom:0,background:"linear-gradient(90deg,#c8d6e5,#ffffff,#b8c8d8)",borderRadius:"2px 2px 0 0",boxShadow:"0 0 6px rgba(255,255,255,0.3)",transition:"top 0.4s linear"}}/>
        <div style={{position:"absolute",right:14,width:7,top:platformTop+30,bottom:0,background:"linear-gradient(90deg,#c8d6e5,#ffffff,#b8c8d8)",borderRadius:"2px 2px 0 0",boxShadow:"0 0 6px rgba(255,255,255,0.3)",transition:"top 0.4s linear"}}/>
        <div style={{position:"absolute",left:6,right:6,top:platformTop,height:30,background:"linear-gradient(180deg,#f8fafc,#e2e8f0,#cbd5e1)",borderRadius:5,boxShadow:"0 4px 14px rgba(0,0,0,0.35),0 0 10px rgba(255,255,255,0.5)",transition:"top 0.4s linear",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          {[0,1,2,3,4].map(i=>(<div key={i} style={{width:2,height:16,background:"rgba(100,140,180,0.35)",borderRadius:1}}/>))}
        </div>
        <div style={{position:"absolute",bottom:6,left:0,right:0,textAlign:"center"}}>
          <span style={{fontFamily:"DM Mono,monospace",fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.95)",textShadow:"0 0 8px rgba(0,100,200,0.8),0 1px 3px rgba(0,0,0,0.5)"}}>{depth.toFixed(2)}m</span>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 12px",borderRadius:20,background:"rgba(0,0,0,0.04)",border:`1px solid ${sc}44`}}>
        {status!=="idle"&&<div style={{width:6,height:6,borderRadius:"50%",background:sc,animation:"pulse 1s infinite",flexShrink:0}}/>}
        <span style={{fontSize:11,fontWeight:600,color:sc}}>{status==="lowering"?"יורד":status==="raising"?"עולה":status==="stopped"?"עצר":"מוכן"}</span>
      </div>
    </div>
  );
}

export default function App(){
  const [lang,setLang]=useState("he");
  const [theme,setTheme]=useState("light");
  const [user,setUser]=useState(null);
  const [users,setUsers]=useState(INIT_USERS);
  const [progs,setProgs]=useState(INIT_PROGS);
  const [videos,setVideos]=useState([]);
  const [hist,setHist]=useState([]);
  const [tab,setTab]=useState("control");
  const [safety,setSafety]=useState(null);
  const [depth,setDepth]=useState(0);
  const [targetD,setTargetD]=useState("");
  const [status,setStatus]=useState("idle");
  const [editProgs,setEditProgs]=useState(false);
  const [tutStep,setTutStep]=useState(0);
  const [tutDone,setTutDone]=useState(false);
  const [tutSafe,setTutSafe]=useState(false);
  const [loginF,setLoginF]=useState({username:"",password:""});
  const [loginErr,setLoginErr]=useState("");
  const [addVid,setAddVid]=useState(false);
  const [newVid,setNewVid]=useState({title:"",url:""});
  const [addingU,setAddingU]=useState(false);
  const [newU,setNewU]=useState({username:"",password:"",role:"user",stageId:"",name:""});
  const [plc,setPlc]=useState({connected:false,connecting:false,ip:"192.168.1.100",port:"502",type:"LIYAN",ind:{}});
  const mv=useRef(null);

  useFont();

  const t=T[lang],c=theme==="dark"?DARK:LIGHT;
  const isAdmin=user?.role==="admin",isTech=user?.role==="technician";
  const ff="DM Sans,system-ui,sans-serif";

  const stopMv=useCallback(()=>{if(mv.current){clearInterval(mv.current);mv.current=null;}setStatus(p=>p!=="idle"?"stopped":"idle");},[]);
  const addLog=useCallback((action,u)=>{setHist(p=>[{time:new Date().toLocaleTimeString("he-IL"),action,operator:u?.name||"—"},...p.slice(0,199)]);},[]);
  const lower=useCallback((to,u)=>{
    if(mv.current)clearInterval(mv.current);
    setStatus("lowering");addLog((to!=null?t.loweringTo+to+"m":t.lowering),u);
    mv.current=setInterval(()=>{setDepth(prev=>{const target=to??MAX_D,next=Math.min(prev+0.015,target);if(next>=target){clearInterval(mv.current);mv.current=null;setStatus("idle");}return next;});},50);
  },[t,addLog]);
  const raise=useCallback((u)=>{
    if(mv.current)clearInterval(mv.current);
    setStatus("raising");addLog(t.raising,u);
    mv.current=setInterval(()=>{setDepth(prev=>{const next=Math.max(prev-0.015,0);if(next<=0){clearInterval(mv.current);mv.current=null;setStatus("idle");}return next;});},50);
  },[t,addLog]);
  const reqSafety=cb=>setSafety(()=>cb);

  function handleLogin(){
    const u=users.find(x=>x.username===loginF.username&&x.password===loginF.password);
    if(u){setUser(u);setLoginErr("");}else setLoginErr(lang==="he"?"שם משתמש או סיסמה שגויים":"Invalid credentials");
  }

  const logoFilter=theme==="dark"?"invert(1)":"none";

  if(!user)return(
    <div style={{minHeight:"100vh",background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:ff,padding:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)",top:-200,right:-200,pointerEvents:"none"}}/>
      <div style={{animation:"fadeUp .3s ease both",width:"100%",maxWidth:390,direction:t.dir}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{width:74,height:74,borderRadius:22,background:c.card,border:`1px solid ${c.border2}`,margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.12)"}}>
            <img src={LOGO} alt="AGOR" style={{width:48,height:48,objectFit:"contain"}}/>
          </div>
          <div style={{fontSize:25,fontWeight:700,color:c.text,letterSpacing:"-0.02em"}}>AGOR</div>
          <div style={{fontSize:13,color:c.muted,marginTop:3}}>{t.appName}</div>
        </div>
        <div style={{background:c.card,border:`1px solid ${c.border2}`,borderRadius:20,padding:24,boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}}>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input placeholder={t.username} value={loginF.username} onChange={e=>setLoginF(p=>({...p,username:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{...S.inp(c)}}/>
            <input type="password" placeholder={t.password} value={loginF.password} onChange={e=>setLoginF(p=>({...p,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{...S.inp(c)}}/>
            {loginErr&&<div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:8,padding:"9px 13px",color:c.red,fontSize:12,textAlign:"center"}}>{loginErr}</div>}
            <button onClick={handleLogin} style={{...S.btnP(),padding:"13px",fontSize:14,marginTop:2}}>{t.loginBtn}</button>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:7,marginTop:16}}>
          {["he","en"].map(l=>(<button key={l} onClick={()=>setLang(l)} style={{...S.btnG(c),padding:"6px 13px",fontSize:12,background:lang===l?c.card:"transparent",color:lang===l?c.text:c.muted}}>{l==="he"?"עברית":"English"}</button>))}
          <button onClick={()=>setTheme(v=>v==="dark"?"light":"dark")} style={{...S.btnG(c),padding:"6px 10px",fontSize:13}}>{theme==="dark"?"☀️":"🌙"}</button>
        </div>
      </div>
    </div>
  );

  const tabs=[
    {id:"control",label:t.controlTab,icon:"🎛"},
    ...(isAdmin||isTech?[{id:"plc",label:"PLC",icon:"🔌"}]:[]),
    ...(isAdmin||isTech?[{id:"history",label:t.history,icon:"📋"}]:[]),
    ...(isAdmin?[{id:"users",label:t.usersTab,icon:"👥"}]:[]),
    {id:"tutorial",label:t.tutorial,icon:"📖"},
    {id:"settings",label:t.settings,icon:"⚙️"},
  ];

  return(
    <div style={{minHeight:"100vh",background:c.bg,color:c.text,direction:t.dir,fontFamily:ff}}>
      {safety&&<SafetyModal t={t} c={c} onConfirm={()=>{safety();setSafety(null);}} onCancel={()=>setSafety(null)}/>}

      <header style={{background:c.card,borderBottom:`1px solid ${c.border}`,padding:"0 18px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src={LOGO} alt="AGOR" style={{height:26,width:"auto",objectFit:"contain"}}/>
          <div style={{height:16,width:1,background:c.border2}}/>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:7,height:7,borderRadius:"50%",flexShrink:0,background:plc.connected?c.green:"#94a3b8",boxShadow:plc.connected?`0 0 8px ${c.green}`:"none"}}/>
            <span style={{fontSize:11,color:c.muted}}>{plc.connected?t.connected:t.disconnected}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{textAlign:t.dir==="rtl"?"left":"right"}}>
            <div style={{fontSize:13,fontWeight:600,color:c.text}}>{user.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:5,justifyContent:t.dir==="rtl"?"flex-start":"flex-end",marginTop:2}}>
              <span style={{...S.tag(user.role,c)}}>{user.role==="admin"?t.admin:user.role==="technician"?t.technician:t.user}</span>
              {user.stageId&&<span style={{fontSize:10,color:c.muted}}>{t.dir==="rtl"?"במה":"Stage"} {user.stageId}</span>}
            </div>
          </div>
          <button onClick={()=>{setUser(null);stopMv();setStatus("idle");setDepth(0);}} style={{...S.btnG(c),padding:"5px 11px",fontSize:12}}>{t.logout}</button>
        </div>
      </header>

      <nav style={{background:theme==="dark"?"#0f172a":"#f0f4ff",borderBottom:`1px solid ${c.border}`,padding:"7px 14px",display:"flex",gap:3,overflowX:"auto"}}>
        {tabs.map(tb=>(<button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"8px 14px",borderRadius:9,border:"none",fontFamily:ff,fontWeight:500,cursor:"pointer",fontSize:13,whiteSpace:"nowrap",transition:"all 0.2s",background:tab===tb.id?"linear-gradient(135deg,#3b82f6,#06b6d4)":"transparent",color:tab===tb.id?"white":c.muted,boxShadow:tab===tb.id?"0 4px 14px rgba(59,130,246,0.3)":"none"}}><span style={{marginInlineEnd:5}}>{tb.icon}</span>{tb.label}</button>))}
      </nav>

      <main style={{animation:"fadeUp .3s ease both",padding:"20px 16px",maxWidth:960,margin:"0 auto"}}>

        {tab==="control"&&(
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
              <div style={{...S.card(c),display:"flex",flexDirection:"column",alignItems:"center",padding:16}}>
                <Pool depth={depth} status={status}/>
              </div>
            </div>
            <div style={{flex:1,minWidth:280,display:"flex",flexDirection:"column",gap:12}}>
              <div style={S.card(c)}>
                <div style={{fontSize:10,fontWeight:600,color:c.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:12}}>{t.controls}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,alignItems:"start"}}>
                  <DblBtn bg="linear-gradient(135deg,#1d4ed8,#0ea5e9)" glow="rgba(29,78,216,0.4)" hint={t.doubleClickHint} onClick={()=>reqSafety(()=>lower(null,user))}>
                    <div style={{fontSize:16,marginBottom:1}}>⬇</div><div style={{fontSize:13}}>{t.lowerManual}</div>
                  </DblBtn>
                  <div style={{display:"flex",flexDirection:"column",gap:4}}>
                    <button onClick={()=>{stopMv();addLog(t.stopped,user);}} style={{width:"100%",padding:"13px 8px",borderRadius:13,border:`1.5px solid ${c.amber}`,background:"rgba(245,158,11,0.07)",color:c.amber,fontFamily:ff,fontWeight:600,fontSize:13,cursor:"pointer"}}>
                      <div style={{fontSize:14,marginBottom:1}}>⏹</div><div>{t.stop}</div>
                    </button>
                    <span style={{fontSize:10,color:c.muted,textAlign:"center"}}>{t.singleClick}</span>
                  </div>
                  <DblBtn bg="linear-gradient(135deg,#065f46,#10b981)" glow="rgba(6,95,70,0.4)" hint={t.doubleClickHint} onClick={()=>reqSafety(()=>raise(user))}>
                    <div style={{fontSize:16,marginBottom:1}}>⬆</div><div style={{fontSize:13}}>{t.raise}</div>
                  </DblBtn>
                </div>
              </div>
              <div style={S.card(c)}>
                <div style={{fontSize:10,fontWeight:600,color:c.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:12}}>{t.setDepth}</div>
                <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                  <input type="number" min="0" max={MAX_D} step="0.1" placeholder={"0.0 – 2.5 "+t.meter} value={targetD} onChange={e=>setTargetD(e.target.value)} style={{...S.inp(c),flex:1}}/>
                  <div style={{minWidth:118}}>
                    <DblBtn bg="linear-gradient(135deg,#6d28d9,#8b5cf6)" glow="rgba(109,40,217,0.4)" hint={t.doubleClickHint} disabled={!targetD||isNaN(parseFloat(targetD))||parseFloat(targetD)<0||parseFloat(targetD)>MAX_D} onClick={()=>{const d=parseFloat(targetD);reqSafety(()=>lower(d,user));}}>{t.goToDepth}</DblBtn>
                  </div>
                </div>
              </div>
              <div style={S.card(c)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:600,color:c.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>{t.programs}</div>
                  {isAdmin&&<button onClick={()=>setEditProgs(true)} style={{...S.btnG(c),padding:"4px 10px",fontSize:11}}>{t.editPrograms}</button>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {progs.map(p=>(<div key={p.id} onDoubleClick={()=>reqSafety(()=>lower(p.depth,user))} style={{background:"linear-gradient(135deg,rgba(59,130,246,0.08),rgba(6,182,212,0.04))",border:"1px solid rgba(59,130,246,0.15)",borderRadius:13,padding:14,cursor:"pointer"}}>
                    <div style={{fontWeight:600,fontSize:12,color:c.text,marginBottom:4}}>{p.name}</div>
                    <div style={{display:"flex",alignItems:"baseline",gap:2,marginBottom:3}}><span style={{fontFamily:"DM Mono,monospace",fontSize:18,fontWeight:500,color:c.accent}}>{p.depth}</span><span style={{fontSize:11,color:c.muted}}>{t.meter}</span></div>
                    <div style={{fontSize:9,color:c.muted}}>{t.doubleClickHint}</div>
                  </div>))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==="plc"&&(isAdmin||isTech)&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={S.card(c)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div><div style={{fontWeight:700,fontSize:15,color:c.text}}>{t.plcConnect}</div><div style={{fontSize:11,color:c.muted,marginTop:2}}>Modbus TCP/IP</div></div>
                <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,background:plc.connected?"rgba(16,185,129,0.09)":"rgba(239,68,68,0.07)",border:`1px solid ${plc.connected?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.16)"}`}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:plc.connected?c.green:c.red,boxShadow:plc.connected?`0 0 8px ${c.green}`:"none"}}/>
                  <span style={{fontSize:12,fontWeight:600,color:plc.connected?c.green:c.red}}>{plc.connecting?t.connecting:plc.connected?t.connected:t.disconnected}</span>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <select value={plc.type} onChange={e=>setPlc(p=>({...p,type:e.target.value}))} disabled={plc.connected} style={{...S.inp(c)}}>
                  <option value="LIYAN">LIYAN Ex1n32MR (Modbus TCP)</option>
                  <option value="INOVANCE">INOVANCE (Modbus TCP)</option>
                  <option value="ESP32">ESP32 (WiFi/MQTT)</option>
                </select>
                <div style={{display:"grid",gridTemplateColumns:"1fr 88px",gap:8}}>
                  <input placeholder={t.plcIpAddress} value={plc.ip} onChange={e=>setPlc(p=>({...p,ip:e.target.value}))} disabled={plc.connected} style={{...S.inp(c)}}/>
                  <input placeholder={t.modbusPort} value={plc.port} onChange={e=>setPlc(p=>({...p,port:e.target.value}))} disabled={plc.connected} style={{...S.inp(c)}}/>
                </div>
                <button onClick={plc.connected?()=>setPlc(p=>({...p,connected:false,ind:{}})):()=>{setPlc(p=>({...p,connecting:true}));setTimeout(()=>setPlc(p=>({...p,connecting:false,connected:true,ind:{Q0:false,Q1:false,Q2:true,I0:false,I1:true,I2:true}})),2000);}} style={{...S.btnP(),padding:"11px",background:plc.connected?"linear-gradient(135deg,#b91c1c,#ef4444)":undefined}}>
                  {plc.connected?t.disconnect:plc.connecting?t.connecting:t.connect}
                </button>
              </div>
            </div>
            {plc.connected&&(
              <div style={{...S.card(c),animation:"fadeUp .3s ease both"}}>
                <div style={{fontWeight:700,marginBottom:12,color:c.text}}>{t.indicators}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
                  {[["Q0","מנוע ירידה","Lower Motor"],["Q1","מנוע עלייה","Raise Motor"],["Q2","נעילה","Lock"],["I0","חיישן תחתית","Bottom Sensor"],["I1","חיישן עליון","Top Sensor"],["I2","חיישן עומק","Depth Sensor"]].map(([id,lbHe,lbEn])=>(
                    <div key={id} style={{padding:"12px 10px",borderRadius:11,background:c.subtleBg,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:plc.ind[id]?c.green:"#cbd5e1",boxShadow:plc.ind[id]?`0 0 8px ${c.green}`:"none"}}/>
                      <div style={{fontSize:11,fontWeight:700,fontFamily:"DM Mono,monospace",color:c.text}}>{id}</div>
                      <div style={{fontSize:10,color:c.muted,textAlign:"center"}}>{lang==="he"?lbHe:lbEn}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="history"&&(isAdmin||isTech)&&(
          <div style={{...S.card(c),padding:0,overflow:"hidden"}}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${c.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:700,color:c.text}}>{t.history}</div>
              {hist.length>0&&<span style={{fontSize:11,color:c.muted}}>{hist.length} {lang==="he"?"רשומות":"records"}</span>}
            </div>
            {hist.length===0?<div style={{padding:48,textAlign:"center",color:c.muted}}><div style={{fontSize:30,marginBottom:8}}>📋</div>{t.noHistory}</div>
            :<div style={{overflowY:"auto",maxHeight:500}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{background:c.subtleBg}}>{[t.time,t.action,t.operator].map(h=>(<th key={h} style={{padding:"9px 16px",textAlign:t.dir==="rtl"?"right":"left",color:c.muted,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:"0.04em"}}>{h}</th>))}</tr></thead>
                <tbody>{hist.map((item,i)=>(<tr key={i} style={{borderTop:`1px solid ${c.border}`}}><td style={{padding:"10px 16px",color:c.muted,fontFamily:"DM Mono,monospace",fontSize:12,whiteSpace:"nowrap"}}>{item.time}</td><td style={{padding:"10px 16px",fontWeight:500,color:c.text}}>{item.action}</td><td style={{padding:"10px 16px",color:c.accent,fontWeight:500}}>{item.operator}</td></tr>))}</tbody>
              </table>
            </div>}
          </div>
        )}

        {tab==="users"&&isAdmin&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><h2 style={{fontSize:18,fontWeight:700,letterSpacing:"-0.01em",color:c.text}}>{t.userManagement}</h2><div style={{fontSize:11,color:c.muted,marginTop:2}}>{users.length} {lang==="he"?"משתמשים":"users"}</div></div>
              <button onClick={()=>setAddingU(true)} style={{...S.btnP(),padding:"9px 16px",fontSize:12}}>+ {t.addUser}</button>
            </div>
            {addingU&&(
              <div style={{animation:"fadeUp .3s ease both",...S.card(c),border:"1px solid rgba(59,130,246,0.25)"}}>
                <div style={{fontWeight:700,marginBottom:13,fontSize:14,color:c.text}}>{t.addUser}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  {[[newU.name,v=>setNewU(p=>({...p,name:v})),t.fullName],[newU.username,v=>setNewU(p=>({...p,username:v})),t.username],[newU.password,v=>setNewU(p=>({...p,password:v})),t.password],[newU.stageId,v=>setNewU(p=>({...p,stageId:v})),t.stageIdOpt]].map(([val,set,ph],i)=>(<input key={i} placeholder={ph} value={val} onChange={e=>set(e.target.value)} style={{...S.inp(c)}}/>))}
                </div>
                <select value={newU.role} onChange={e=>setNewU(p=>({...p,role:e.target.value}))} style={{...S.inp(c),marginBottom:12}}>
                  <option value="user">{t.user}</option><option value="technician">{t.technician}</option>
                </select>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>{if(newU.username&&newU.password&&newU.name){setUsers(p=>[...p,{...newU,id:Date.now(),stageId:newU.stageId||null}]);setNewU({username:"",password:"",role:"user",stageId:"",name:""});setAddingU(false);}}} style={{...S.btnP(),padding:"9px 20px"}}>{t.save}</button>
                  <button onClick={()=>setAddingU(false)} style={{...S.btnG(c),padding:"9px 20px"}}>{t.cancel}</button>
                </div>
              </div>
            )}
            <div style={{...S.card(c),padding:0,overflow:"hidden"}}>
              <div style={{overflowY:"auto",maxHeight:520}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr style={{background:c.subtleBg}}>{[lang==="he"?"שם מלא":"Full Name",t.username,t.role,t.stageId,""].map((h,i)=>(<th key={i} style={{padding:"9px 16px",textAlign:t.dir==="rtl"?"right":"left",color:c.muted,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:"0.04em",whiteSpace:"nowrap"}}>{h}</th>))}</tr></thead>
                  <tbody>{users.map(u=>(<tr key={u.id} style={{borderTop:`1px solid ${c.border}`}}><td style={{padding:"12px 16px",fontWeight:600,color:c.text}}>{u.name}</td><td style={{padding:"12px 16px",fontFamily:"DM Mono,monospace",fontSize:12,color:c.muted}}>{u.username}</td><td style={{padding:"12px 16px"}}><span style={{...S.tag(u.role,c)}}>{u.role==="admin"?t.admin:u.role==="technician"?t.technician:t.user}</span></td><td style={{padding:"12px 16px",color:c.muted,textAlign:"center",fontFamily:"DM Mono,monospace",fontSize:12}}>{u.stageId??"-"}</td><td style={{padding:"12px 16px",textAlign:"center"}}>{u.role!=="admin"&&(<button onClick={()=>{if(window.confirm((lang==="he"?"למחוק את ":"Delete ")+u.name+"?"))setUsers(p=>p.filter(x=>x.id!==u.id));}} style={{...S.btnG(c),padding:"4px 10px",fontSize:11,color:c.red,borderColor:"rgba(239,68,68,0.25)"}}>{t.deleteUser}</button>)}</td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab==="tutorial"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><h2 style={{fontSize:18,fontWeight:700,letterSpacing:"-0.01em",color:c.text}}>{t.tutorialTitle}</h2><div style={{fontSize:11,color:c.muted,marginTop:2}}>{tutStep+1} / {STEPS[lang].length}</div></div>
              {tutDone&&<span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,padding:"4px 10px",borderRadius:20,background:"rgba(16,185,129,0.09)",color:c.green,fontWeight:600,border:"1px solid rgba(16,185,129,0.18)"}}>✓ {t.completed}</span>}
            </div>
            <div style={{display:"flex",alignItems:"center",paddingBottom:4}}>
              {STEPS[lang].map((_,i)=>(<div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
                <button onClick={()=>setTutStep(i)} style={{width:32,height:32,borderRadius:"50%",border:"none",fontFamily:ff,fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:tutStep===i?"linear-gradient(135deg,#3b82f6,#06b6d4)":i<tutStep?c.green:c.subtleBg,color:i<=tutStep?"white":c.muted}}>{i<tutStep?<Tick/>:i+1}</button>
                {i<STEPS[lang].length-1&&<div style={{width:18,height:2,background:i<tutStep?c.green:c.subtleBg}}/>}
              </div>))}
            </div>
            <div key={tutStep} style={{...S.card(c),animation:"fadeUp .3s ease both"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:13}}>
                <div style={{width:44,height:44,borderRadius:12,flexShrink:0,background:"linear-gradient(135deg,rgba(59,130,246,0.12),rgba(6,182,212,0.06))",border:"1px solid rgba(59,130,246,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{STEPS[lang][tutStep].emoji}</div>
                <div style={{fontWeight:700,fontSize:18,color:c.text}}>{STEPS[lang][tutStep].title}</div>
              </div>
              <p style={{color:c.muted,lineHeight:1.8,fontSize:14,marginBottom:16}}>{STEPS[lang][tutStep].content}</p>
              {STEPS[lang][tutStep].tips&&(
                <div style={{background:c.subtleBg,borderRadius:11,padding:14,marginBottom:16,border:`1px solid ${c.border}`}}>
                  <div style={{fontWeight:700,fontSize:11,color:c.amber,marginBottom:9,textTransform:"uppercase",letterSpacing:"0.05em"}}>💡 {t.tips}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {STEPS[lang][tutStep].tips.map((tip,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:c.muted,lineHeight:1.6}}><div style={{width:16,height:16,borderRadius:5,background:"rgba(59,130,246,0.1)",color:c.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div><span>{tip}</span></div>))}
                  </div>
                </div>
              )}
              {STEPS[lang][tutStep].requireConfirm&&(
                <div onClick={()=>setTutSafe(v=>!v)} style={{display:"flex",alignItems:"flex-start",gap:13,border:`1.5px solid ${tutSafe?c.green:c.border2}`,borderRadius:10,padding:14,marginBottom:13,cursor:"pointer",background:tutSafe?"rgba(16,185,129,0.05)":"transparent",transition:"all 0.2s"}}>
                  <Checkbox checked={tutSafe} onToggle={()=>setTutSafe(v=>!v)} c={c}/>
                  <span style={{fontSize:13,fontWeight:500,color:c.text,lineHeight:1.65}}>{t.safetyRulesConfirm}</span>
                </div>
              )}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button disabled={tutStep===0} onClick={()=>setTutStep(p=>p-1)} style={{...S.btnG(c),padding:"9px 18px",opacity:tutStep===0?0.35:1,cursor:tutStep===0?"not-allowed":"pointer"}}>{t.previous}</button>
                {tutStep<STEPS[lang].length-1
                  ?<button disabled={!!(STEPS[lang][tutStep].requireConfirm&&!tutSafe)} onClick={()=>setTutStep(p=>p+1)} style={{...S.btnP(),padding:"9px 18px",opacity:STEPS[lang][tutStep].requireConfirm&&!tutSafe?0.35:1,cursor:STEPS[lang][tutStep].requireConfirm&&!tutSafe?"not-allowed":"pointer"}}>{t.next}</button>
                  :<button onClick={()=>setTutDone(true)} style={{...S.btnP(),padding:"9px 20px",background:"linear-gradient(135deg,#065f46,#10b981)",boxShadow:"0 6px 18px rgba(5,150,105,0.3)"}}>✓ {t.completeTutorial}</button>
                }
                {STEPS[lang][tutStep].requireConfirm&&!tutSafe&&<span style={{fontSize:11,color:c.red}}>{t.mustConfirmSafety}</span>}
              </div>
            </div>
            <div style={S.card(c)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}>
                <div style={{fontWeight:700,color:c.text}}>{lang==="he"?"סרטוני הדרכה":"Tutorial Videos"}</div>
                {isAdmin&&<button onClick={()=>setAddVid(true)} style={{...S.btnG(c),padding:"4px 10px",fontSize:11}}>+ {t.addVideo}</button>}
              </div>
              {addVid&&(
                <div style={{animation:"fadeUp .3s ease both",background:c.subtleBg,borderRadius:10,padding:13,marginBottom:13,display:"flex",flexDirection:"column",gap:8}}>
                  <input placeholder={t.videoTitle} value={newVid.title} onChange={e=>setNewVid(p=>({...p,title:e.target.value}))} style={{...S.inp(c)}}/>
                  <input placeholder={t.videoUrl} value={newVid.url} onChange={e=>setNewVid(p=>({...p,url:e.target.value}))} style={{...S.inp(c)}}/>
                  <div style={{display:"flex",gap:7}}>
                    <button onClick={()=>{if(newVid.title&&newVid.url){setVideos(p=>[...p,{...newVid,id:Date.now()}]);setNewVid({title:"",url:""});setAddVid(false);}}} style={{...S.btnP(),padding:"8px 15px"}}>{t.save}</button>
                    <button onClick={()=>setAddVid(false)} style={{...S.btnG(c),padding:"8px 15px"}}>{t.cancel}</button>
                  </div>
                </div>
              )}
              {videos.length===0?<div style={{color:c.muted,textAlign:"center",padding:"16px 0",fontSize:13}}><div style={{fontSize:26,marginBottom:6}}>🎬</div>{t.noVideos}</div>
              :<div style={{display:"flex",flexDirection:"column",gap:7}}>{videos.map(v=>(<a key={v.id} href={v.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,padding:"12px 13px",borderRadius:10,background:c.subtleBg,textDecoration:"none",color:c.text,border:`1px solid ${c.border}`}}><div style={{width:32,height:32,borderRadius:8,background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>▶</div><span style={{fontWeight:500,fontSize:13}}>{v.title}</span></a>))}</div>}
            </div>
          </div>
        )}

        {tab==="settings"&&(
          <div style={{maxWidth:400,display:"flex",flexDirection:"column",gap:12}}>
            <h2 style={{fontSize:18,fontWeight:700,color:c.text}}>{t.settings}</h2>
            {[[t.language,[["he","🇮🇱 עברית"],["en","🇺🇸 English"]],lang,setLang],[t.theme,[["dark","🌙 "+t.dark],["light","☀️ "+t.light]],theme,setTheme]].map(([lbl,opts,val,setter])=>(
              <div key={lbl} style={S.card(c)}>
                <div style={{fontSize:10,fontWeight:600,color:c.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:12}}>{lbl}</div>
                <div style={{display:"flex",gap:8}}>
                  {opts.map(([v,label])=>(<button key={v} onClick={()=>setter(v)} style={{flex:1,padding:"11px",borderRadius:11,fontFamily:ff,border:`1.5px solid ${val===v?c.accent:c.border2}`,background:val===v?"rgba(59,130,246,0.08)":"transparent",color:val===v?c.accent:c.muted,fontWeight:600,cursor:"pointer",fontSize:13}}>{label}</button>))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editProgs&&isAdmin&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{animation:"fadeUp .3s ease both",...S.card(c),borderRadius:18,padding:24,width:"100%",maxWidth:400,border:`1px solid ${c.border2}`,direction:t.dir,boxShadow:"0 24px 48px rgba(0,0,0,0.15)"}}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16,color:c.text}}>{t.editPrograms}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {progs.map(p=>(<div key={p.id} style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={p.name} onChange={e=>setProgs(ps=>ps.map(pr=>pr.id===p.id?{...pr,name:e.target.value}:pr))} style={{...S.inp(c),flex:2}}/>
                <input type="number" min="0" max={MAX_D} step="0.1" value={p.depth} onChange={e=>setProgs(ps=>ps.map(pr=>pr.id===p.id?{...pr,depth:parseFloat(e.target.value)||0}:pr))} style={{...S.inp(c),width:75}}/>
                <span style={{color:c.muted,fontSize:11,flexShrink:0}}>{t.meter}</span>
              </div>))}
            </div>
            <button onClick={()=>setEditProgs(false)} style={{...S.btnP(),marginTop:16,width:"100%",padding:"11px",fontSize:13}}>{t.save}</button>
          </div>
        </div>
      )}
    </div>
  );
}
