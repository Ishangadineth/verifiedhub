"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";

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
            <nav>
                <div className="logo">
                    <span className="gradient-text">Verified</span>
                    <span>Hub</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact" className="btn-primary-link">Get Started</a></li>
                </ul>
            </nav>

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="fade-in">
                            Verify Your <span className="gradient-text">Digital Presence</span>
                        </h1>
                        <p className="subtitle fade-in-delay">
                            The most secure and elegant way to manage your verified assets and
                            connections. Built for the next generation of the web.
                        </p>
                        <div className="cta-group fade-in-delay-2">
                            <button className="btn-main">Create Your Hub</button>
                            <button className="btn-secondary">Learn More</button>
                        </div>
                    </div>
                    <div className="hero-image fade-in-delay-3">
                        <div className="glass-card main-card" ref={heroCardRef}>
                            <div className="card-header">
                                <div className="check-icon">
                                    <ShieldCheck size={32} strokeWidth={3} />
                                </div>
                                <div className="header-text">
                                    <h3>Official Verification</h3>
                                    <p>Status: Active</p>
                                </div>
                            </div>
                            <div className="stats">
                                <div className="stat-item">
                                    <span>Trust Score</span>
                                    <strong>98.5%</strong>
                                </div>
                                <div className="stat-item">
                                    <span>Verified Assets</span>
                                    <strong>12</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="features">
                    <h2 className="section-title">
                        Why Choose <span className="gradient-text">Verified Hub</span>?
                    </h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="icon-box">
                                <ShieldCheck className="gradient-text" size={40} />
                            </div>
                            <h3>Top-Tier Security</h3>
                            <p>
                                Encryption protocols that keep your data safe and private at
                                all times.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box">
                                <Zap className="gradient-text" size={40} />
                            </div>
                            <h3>Instant Verification</h3>
                            <p>
                                No more waiting. Get verified in seconds with our AI-driven
                                system.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box">
                                <Globe className="gradient-text" size={40} />
                            </div>
                            <h3>Global Integration</h3>
                            <p>
                                Connect your hub with every major platform and social network
                                seamlessly.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 Verified Hub. Created by Ishangadineth.</p>
            </footer>
        </>
    );
}
