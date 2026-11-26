import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{return ["/","/guia-abnt","/relatorio-com-ia"].map(path=>({url:"https://paperwise-six.vercel.app"+path}));}
