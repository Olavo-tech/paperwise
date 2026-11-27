import "server-only";
export async function aiRequest(request:unknown,plan:"free"|"pro"|"moderation",timeout:number):Promise<Response>{
const payload=request as Record<string,unknown>;
const prefix=plan==="pro"?"AI_PRO":plan==="moderation"?"AI_MODERATION":"AI_FREE";
const provider=process.env[prefix+"_PROVIDER"]||"groq";
const alternatives:{name:string,url:string,key:string|undefined,model:string|undefined}[]=[
{name:"groq",url:"https://api.groq.com/openai/v1/chat/completions",key:process.env.GROQ_API_KEY,model:undefined},
{name:"openrouter",url:"https://openrouter.ai/api/v1/chat/completions",key:process.env.OPENROUTER_API_KEY,model:process.env[prefix+"_MODEL"]}
];
const configured=alternatives.find(p=>p.name===provider);
if(!configured?.key|| (provider!=="groq"&&!configured.model))return new Response(null,{status:503});
if(provider==="openrouter"&&!configured.model?.endsWith(":free"))return new Response(null,{status:503});
const body={...payload,model:configured.model||process.env[prefix+"_MODEL"]||payload.model};
if(provider!=="groq")delete (body as Record<string,unknown>).reasoning_effort;
return fetch(configured.url,{method:"POST",headers:{Authorization:"Bearer "+configured.key,"Content-Type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(timeout)});
}
