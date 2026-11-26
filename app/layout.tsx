import type { Metadata,Viewport } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Paperwise — Seu trabalho, pronto mais rápido",description:"Gere rascunhos acadêmicos estruturados e formatados em ABNT a partir de um único prompt.",manifest:"/manifest.webmanifest",icons:{icon:"/icon.svg"}};
export const viewport:Viewport={themeColor:"#111a0e",width:"device-width",initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>;}
