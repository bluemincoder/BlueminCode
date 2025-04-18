import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "BlueminCode",
    description: "Share and run code snippets",
    icons: "/favicon.png",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                    <link rel="apple-touch-icon" href="/favicon.png" />
                </head>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-gray-100 flex flex-col mx-auto`}
                >
                    <ConvexClientProvider>{children}</ConvexClientProvider>

                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}

// https://emkc.org/api/v2/piston/runtimes
