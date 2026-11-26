import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/",disallow:["/api/","/recuperar-senha","/nova-senha"]},sitemap:"https://paperwise-six.vercel.app/sitemap.xml"};}
