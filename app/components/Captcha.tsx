"use client";
import Script from "next/script";
import {useEffect,useRef,useState} from "react";
type API={render:(el:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void};
function api(){return (window as unknown as {turnstile?:API}).turnstile;}
export default function Captcha({onToken}:{onToken:(s:string)=>void}){
 const host=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);const [failed,setFailed]=useState(false);
 useEffect(()=>{if(api())setReady(true);},[]);
 useEffect(()=>{const a=api();if(!ready||!a||!host.current)return;let id:string;try{id=a.render(host.current,{sitekey:"0x4AAAAAAGU3KQLcFZipVwJc",theme:"auto",size:"flexible",callback:(token:string)=>{setFailed(false);onToken(token);},"expired-callback":()=>onToken(""),"error-callback":()=>{onToken("");setFailed(true);},"timeout-callback":()=>onToken("")});}catch{setFailed(true);return;}return()=>{a.remove(id);};},[ready,onToken]);
 return <div style={{width:"100%",minWidth:0,margin:"12px 0"}}><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setReady(true)} onError={()=>setFailed(true)}/><div ref={host}/>{failed&&<p role="status" style={{fontSize:12}}>Não foi possível concluir a verificação de segurança. Recarregue a página e tente novamente.</p>}</div>;
}