import {NextResponse} from "next/server";import {access,userId} from "../../../lib/server";
export const dynamic="force-dynamic";
export async function GET(req:Request){try{const id=await userId(req);if(!id)return NextResponse.json({error:"AUTH"},{status:401});return NextResponse.json(await access(id),{headers:{"Cache-Control":"no-store"}});}catch{return NextResponse.json({error:"QUOTA"},{status:503});}}
