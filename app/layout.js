import { Outfit } from "next/font/google";
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
            <body className={`${outfit.variable}`}>
                <div className="glow-bg"></div>
                {children}
            </body>
        </html>
    );
}
