import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Paperwise", description: "Gere trabalhos acadêmicos estruturados e formatados em ABNT a partir de um único prompt." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }