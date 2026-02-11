import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata = {
    title: "Verified Hub | The Ultimate Trust Gateway",
    description: "Verified Hub is your premier destination for authentic connections and verified resources.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Popunder Ad */}
                <Script src="https://pl28687980.effectivegatecpm.com/30/74/0d/30740d84896159eed88e4bbcf948e64b.js" strategy="afterInteractive" />
                {/* Social Bar Ad */}
                <Script src="https://pl28693610.effectivegatecpm.com/cc/e9/8c/cce98c666fbff7eeba175d67f239e387.js" strategy="afterInteractive" />
            </head>
            <body className={`${outfit.variable}`}>
                <div className="glow-bg"></div>
                {children}
            </body>
        </html>
    );
}
