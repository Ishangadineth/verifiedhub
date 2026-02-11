import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata = {
    title: "Verified Hub | Stay Safe from Digital Scams",
    description: "Your official guide to identifying and preventing online scams, malware, and digital fraud in Sri Lanka.",
    openGraph: {
        title: "Verified Hub | Protect Yourself Online",
        description: "Identify fake promotions, SMS scams, and cyber threats before they strike. Stay informed, stay safe.",
        url: "https://verifiedhub.dpdns.org",
        siteName: "Verified Hub",
        images: [
            {
                url: "https://cdn-icons-png.flaticon.com/512/7594/7594918.png", // A more professional security/shield logo
                width: 512,
                height: 512,
            },
        ],
        locale: "en_LK",
        type: "website",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Popunder Ad */}
                <Script src="https://pl28687980.effectivegatecpm.com/30/74/0d/30740d84896159eed88e4bbcf948e64b.js" strategy="afterInteractive" />
                {/* Social Bar Ad */}
                <Script src="https://pl28693610.effectivegatecpm.com/cc/e9/8c/cce98c666fbff7eeba175d67f239e387.js" strategy="afterInteractive" />

                {/* Google Analytics */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID-HERE" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-YOUR-ID-HERE');
                    `}
                </Script>
            </head>
            <body className={`${outfit.variable}`}>
                <div className="glow-bg"></div>
                {children}
            </body>
        </html>
    );
}
