"use client";

import { useEffect, useRef } from "react";
import {
    ShieldAlert,
    ShieldCheck,
    Search,
    AlertTriangle,
    HandMetal,
    Lock,
    Eye,
    TrendingUp,
    ExternalLink
} from "lucide-react";

export default function Home() {
    const heroCardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroCardRef.current) return;
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroCardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        };

        const handleMouseLeave = () => {
            if (!heroCardRef.current) return;
            heroCardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
            heroCardRef.current.style.transition = "all 0.5s ease";
        };

        const handleMouseEnter = () => {
            if (!heroCardRef.current) return;
            heroCardRef.current.style.transition = "none";
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <>
            <nav suppressHydrationWarning>
                <div className="logo">
                    <span className="gradient-text">Verified</span>
                    <span>Hub</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#scams">Scam Types</a></li>
                    <li><a href="#prevention">Prevention</a></li>
                    <li><a href="#report" className="btn-primary-link">Report Scam</a></li>
                </ul>
            </nav>

            <main suppressHydrationWarning>
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="fade-in">
                            Stay Ahead of <span className="gradient-text">Digital Scams</span>
                        </h1>
                        <p className="subtitle fade-in-delay">
                            Your shield against the rising tide of online fraud. Learn to identify fake sites, avoid data theft, and secure your digital life.
                        </p>
                        <div className="cta-group fade-in-delay-2">
                            <button className="btn-main">Explore Scam Types</button>
                            <button className="btn-secondary">Safety Checklist</button>
                        </div>
                    </div>
                    <div className="hero-image fade-in-delay-3">
                        <div className="glass-card main-card" ref={heroCardRef}>
                            <div className="card-header">
                                <div className="check-icon" style={{ background: 'linear-gradient(135deg, #ff4d4d, #f9cb28)' }}>
                                    <ShieldAlert size={32} strokeWidth={2} color="white" />
                                </div>
                                <div className="header-text">
                                    <h3>Threat Alert</h3>
                                    <p style={{ color: '#ff4d4d' }}>Real-time Monitoring Active</p>
                                </div>
                            </div>
                            <div className="stats">
                                <div className="stat-item">
                                    <span>New Scams Today</span>
                                    <strong>1,420+</strong>
                                </div>
                                <div className="stat-item">
                                    <span>Risk Level</span>
                                    <strong style={{ color: '#ff4d4d' }}>HIGH</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="scams" className="features">
                    <h2 className="section-title">
                        Common <span className="gradient-text">Digital Scams</span>
                    </h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="icon-box">
                                <Search className="gradient-text" size={40} />
                            </div>
                            <h3>Phishing Sites</h3>
                            <p>
                                Fake websites that look exactly like your bank or social media login to steal your credentials.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box">
                                <TrendingUp className="gradient-text" size={40} />
                            </div>
                            <h3>Investment Fraud</h3>
                            <p>
                                "Get rich quick" schemes and fake crypto platforms promising impossible returns on your money.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box">
                                <HandMetal className="gradient-text" size={40} />
                            </div>
                            <h3>Social Engineering</h3>
                            <p>
                                Manipulative messages from "friends" or "officials" asking for OTPs or emergency money transfers.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box">
                                <AlertTriangle className="gradient-text" size={40} />
                            </div>
                            <h3>Fake Giveaways</h3>
                            <p>
                                "You won a free iPhone!" ads that lure you into entering personal data or paying "shipping fees."
                            </p>
                        </div>
                    </div>
                </section>

                <section id="prevention" className="prevention-section" style={{ padding: '8rem 10%', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                How to <span className="gradient-text">Protect Yourself</span>
                            </h2>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1.5rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <ShieldCheck size={24} color="#00f2fe" style={{ flexShrink: 0 }} />
                                    <div>
                                        <strong>Check the URL:</strong> Always verify if the website address is spelled correctly (e.g., faceb0ok.com is a scam).
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <Lock size={24} color="#00f2fe" style={{ flexShrink: 0 }} />
                                    <div>
                                        <strong>Enable 2FA:</strong> Two-Factor Authentication is your best defense even if your password is stolen.
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <Eye size={24} color="#00f2fe" style={{ flexShrink: 0 }} />
                                    <div>
                                        <strong>Beware of Urgency:</strong> Scammers always create fake emergencies to make you act without thinking.
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px' }} className="glass-card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Verify a Website</h3>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Paste URL here (e.g. https://...)"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'white'
                                    }}
                                />
                                <button
                                    style={{
                                        position: 'absolute',
                                        right: '8px',
                                        top: '8px',
                                        background: 'var(--accent-primary)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '0.4rem 1rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Analyze
                                </button>
                            </div>
                            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                * Our AI analyzes domain age, SSL status, and community reports.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', textAlign: 'left', marginBottom: '4rem' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 className="logo"><span className="gradient-text">Verified</span>Hub</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Protecting the digital world from scams, one click at a time.</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <h4>Resources</h4>
                        <ul style={{ listStyle: 'none', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Scam Wiki</li>
                            <li>Security Blog</li>
                            <li>Community Forum</li>
                        </ul>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <h4>Contact</h4>
                        <ul style={{ listStyle: 'none', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Help Center</li>
                            <li>Partnerships</li>
                            <li>Press Inquiries</li>
                        </ul>
                    </div>
                </div>
                <p style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                    &copy; 2024 Verified Hub. Created by Ishangadineth. Stay safe online.
                </p>
            </footer>
        </>
    );
}
