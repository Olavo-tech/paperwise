import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{return ["/","/guia-abnt","/relatorio-com-ia","/upgrade"].map(path=>({url:"https://paperwise-six.vercel.app"+path}));}
