export type Lang="pt"|"en"|"es";
export type Details={authors:string;institution:string;teacher:string;subject:string;city:string;year:string;style:string};
export type Section={heading:string;paragraphs:string[]};
export type Report={details?:Partial<Details>;title:string;abstract?:string;keywords?:string[];kind?:"academic"|"technical";sections:Section[];references:string[];notes:string[]};
export type Figure={data:string;caption:string;width:number;height:number;type:"png"|"jpg"};
export const blank:Details={authors:"",institution:"",teacher:"",subject:"",city:"",year:new Date().getFullYear().toString(),style:""};
export function validReport(v:unknown):v is Report {if(!v||typeof v!=="object")return false;const x=v as Report;return typeof x.title==="string"&&x.title.length<=250&&Array.isArray(x.sections)&&x.sections.length>0&&x.sections.length<=20&&x.sections.every(s=>s&&typeof s.heading==="string"&&Array.isArray(s.paragraphs)&&s.paragraphs.every(p=>typeof p==="string"))&&Array.isArray(x.references)&&x.references.every(s=>typeof s==="string")&&Array.isArray(x.notes)&&x.notes.every(s=>typeof s==="string");}
