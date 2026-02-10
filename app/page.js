"use client";

import { useState, useEffect, useRef } from "react";
import {
    ShieldAlert,
    ShieldCheck,
    Search,
    AlertTriangle,
    TrendingUp,
    Globe,
    CheckCircle2,
    UserX,
    MessageCircle,
    AlertCircle,
    Zap,
    Bug,
    Ghost,
    Cpu,
    ShieldHalf,
    ExternalLink,
    Lock,
    Eye,
    Activity,
    UserCheck
} from "lucide-react";

const translations = {
    si: {
        nav: {
            home: "මුල් පිටුව",
            scams: "මංකොල්ල වර්ග",
            malware: "Malware දැනුම",
            sl_safety: "ලංකාවේ ආරක්ෂාව",
            report: "වාර්තා කරන්න"
        },
        hero: {
            title: "ඩිජිටල් වංචා වලින්",
            titleSpan: "නිරන්තරයෙන් ආරක්ෂා වන්න",
            subtitle: "අන්තර්ජාලය හරහා සිදුවන වංචාවන්, වෛරසයන් (Malware) සහ දත්ත සොරකම් කිරීම් වලින් බේරී සිටීමට අවශ්‍ය සියලුම තොරතුරු එකම තැනකින් ලබාගන්න.",
            btn1: "වංචා වර්ග බලන්න",
            btn2: "ආරක්ෂිත පියවර"
        },
        threatAlert: {
            title: "අන්තරායකාරී තත්ත්වය",
            subtitle: "සජීවී නිරීක්ෂණය ක්‍රියාත්මකයි",
            today: "අලුත් වංචා වාර්තා",
            risk: "අවදානම් මට්ටම",
            high: "ඉහළයි"
        },
        scamTypes: {
            title: "ඩිජිටල් වංචා",
            titleSpan: "සහ මංකොල්ල",
            phishing: {
                title: "Phishing (ව්‍යාජ අඩවි)",
                desc: "ඔබේ Password සහ බැංකු විස්තර සොරකම් කිරීමට සාදන ලද ව්‍යාජ වෙබ් අඩවි."
            },
            whatsapp: {
                title: "WhatsApp වංචා",
                desc: "යාළුවන් මෙන් පෙනී සිටිමින් මුදල් හෝ OTP කේත ඉල්ලා සිටින WhatsApp මංකොල්ල."
            },
            investment: {
                title: "ආයෝජන වංචා",
                desc: "ඉක්මනින් මුදල් දෙගුණ කර දෙන බව පවසන බොරු ආයෝජන සහ Crypto වංචා."
            },
            fakeJobs: {
                title: "ව්‍යාජ රැකියා",
                desc: "විදේශ රැකියා ලබාදෙන බව පවසා මුදල් සොරකම් කිරීම."
            }
        },
        malware: {
            title: "Malware & Threat",
            titleSpan: "Glossary",
            virus: { title: "Computer Virus", desc: "වෙනත් මෘදුකාංග වලට ඇතුල් වී විනාශ කරන හානිකර කේත." },
            worms: { title: "Worms", desc: "ජාලයක් හරහා තනිවම පැතිරී යන වෛරස වර්ගයකි." },
            spyware: { title: "Spyware", desc: "ඔබේ දත්ත රහසින් නිරීක්ෂණය කර සොරකම් කරන මෘදුකාංග." },
            adware: { title: "Adware", desc: "අනවශ්‍ය වෙළඳ දැන්වීම් පෙන්වමින් පරිගණකය අඩපණ කරයි." },
            bots: { title: "Bots & Botnets", desc: "සයිබර් ප්‍රහාර එල්ල කිරීමට හැකර්වරුන් පාවිච්චි කරන මැෂින් ජාල." },
            hijacker: { title: "Browser Hijacker", desc: "ඔබේ Search engine එක හෝ homepage එක බලහත්කාරයෙන් වෙනස් කිරීම." },
            hacker: { title: "Hackers", desc: "ඔබේ අවසරයකින් තොරව පද්ධතිවලට ඇතුල් වන පුද්ගලයින්." },
            spam: { title: "Spam", desc: "විශාල වශයෙන් ලැබෙන අනවශ්‍ය සහ හානිකර ඊමේල් පණිවිඩ." }
        },
        sl_safety: {
            title: "ලංකාවේ සයිබර්",
            titleSpan: "ආරක්ෂක ආයතන",
            cert: "Sri Lanka CERT|CC - පරිගණක හදිසි ප්‍රතිචාර සංසදය",
            icta: "ICTA - ශ්‍රී ලංකා තොරතුරු හා සන්නිවේදන තාක්ෂණ නියෝජිතායතනය",
            slp: "ශ්‍රී ලංකා පොලිස් සයිබර් අපරාධ ඒකකය (Cyber Crime Division)",
            trcsl: "TRCSL - විදුලි සංදේශ නියාමන කොමිෂන් සභාව"
        },
        footer: {
            desc: "මෙය කිසිදු පෞද්ගලික ලාභයකින් තොරව පොදු ජනයා දැනුවත් කිරීම සඳහා පමණක් ක්‍රියාත්මක වන ප්‍රජා සත්කාරයකි.",
            copyright: "Verified Hub. සියලු හිමිකම් ඇවිරිණි. අනන්‍යතාවය සුරැකී ඇත."
        }
    },
    en: {
        nav: {
            home: "Home",
            scams: "Scam Types",
            malware: "Malware Knowledge",
            sl_safety: "SL Institutions",
            report: "Report"
        },
        hero: {
            title: "Stay Protected Against",
            titleSpan: "Digital Fraud",
            subtitle: "Get comprehensive information about online scams, malware, and data theft in one place. Your safety is our mission.",
            btn1: "Explore Scams",
            btn2: "Safety Steps"
        },
        threatAlert: {
            title: "Threat Level",
            subtitle: "Live Monitoring Active",
            today: "New Threats Today",
            risk: "Risk Assessment",
            high: "HIGH"
        },
        scamTypes: {
            title: "Digital Scams",
            titleSpan: "& Fraud",
            phishing: {
                title: "Phishing Sites",
                desc: "Fake websites designed to steal your passwords and banking credentials."
            },
            whatsapp: {
                title: "WhatsApp Scams",
                desc: "Scammers pretending to be contacts asking for money or security codes."
            },
            investment: {
                title: "Investment Fraud",
                desc: "'Get rich quick' schemes and fake crypto platforms."
            },
            fakeJobs: {
                title: "Fake Job Ads",
                desc: "Fraudulent overseas job opportunities asking for upfront fees."
            }
        },
        malware: {
            title: "Malware & Threat",
            titleSpan: "Glossary",
            virus: { title: "Computer Virus", desc: "Malicious code that attaches to software to damage systems." },
            worms: { title: "Worms", desc: "Self-replicating malware that spreads across networks autonomously." },
            spyware: { title: "Spyware", desc: "Software that secretly monitors and steals your private information." },
            adware: { title: "Adware", desc: "Software that automatically displays unwanted advertisements." },
            bots: { title: "Bots & Botnets", desc: "Networks of infected computers used to launch cyber attacks." },
            hijacker: { title: "Browser Hijacker", desc: "Software that modifies web browser settings without permission." },
            hacker: { title: "Hackers", desc: "Individuals who gain unauthorized access to computer systems." },
            spam: { title: "Spam", desc: "Unsolicited, often malicious messages sent in bulk via email/SMS." }
        },
        sl_safety: {
            title: "Sri Lanka Security",
            titleSpan: "Institutions",
            cert: "Sri Lanka CERT|CC - Computer Emergency Readiness Team",
            icta: "ICTA - Information and Communication Technology Agency",
            slp: "Sri Lanka Police - Cyber Crime Division",
            trcsl: "TRCSL - Telecommunications Regulatory Commission"
        },
        footer: {
            desc: "A non-profit community initiative focused on protecting the public from digital threats.",
            copyright: "Verified Hub. All rights reserved. Identity Protected."
        }
    },
    ta: {
        nav: {
            home: "முகப்பு",
            scams: "மோசடி",
            malware: "மால்வேர்",
            sl_safety: "நிறுவனங்கள்",
            report: "புகார்"
        },
        hero: {
            title: "டிஜிட்டல் மோசடிகளில்",
            titleSpan: "இருந்து பாதுகாப்பாக இருங்கள்",
            subtitle: "இணைய மோசடிகள், வைரஸ்கள் மற்றும் தரவு திருட்டு பற்றிய முழுமையான தகவல்களை இங்கே பெறுங்கள்.",
            btn1: "மோசடிகளை பார்க்க",
            btn2: "பாதுகாப்பு පියවර"
        },
        threatAlert: {
            title: "அச்சுறுத்தல் எச்சரிக்கை",
            subtitle: "நேரடி கண்காணிப்பு",
            today: "இன்றைய மோசடிகள்",
            risk: "ஆபத்து நிலை",
            high: "அதிகம்"
        },
        scamTypes: {
            title: "டிஜிட்டல்",
            titleSpan: "மோசடிகள்",
            phishing: {
                title: "பிஷிங் (போலி தளங்கள்)",
                desc: "உங்கள் கடவுச்சொற்களைத் திருட உருவாக்கப்பட்ட போலியான தளங்கள்."
            },
            whatsapp: {
                title: "வாட்ஸ்அப் மோசடிகள்",
                desc: "நண்பர்கள் போல நடித்து ஓடிபி (OTP) கேட்கும் மோசடிகள்."
            },
            investment: {
                title: "முதலீட்டு மோசடிகள்",
                desc: "பணத்தை இரட்டிப்பாக்குவதாக கூறும் போலி முதலீட்டுத் திட்டங்கள்."
            },
            fakeJobs: {
                title: "போலி வேலைகள்",
                desc: "வெளிநாட்டு வேலைகள் எனக் கூறி பணம் பறிக்கும் மோசடிகள்."
            }
        },
        malware: {
            title: "மால்வேர்",
            titleSpan: "விளக்கம்",
            virus: { title: "கணினி வைரஸ்", desc: "கணினியைப் பாதிக்கும் தீங்கிழைக்கும் குறியீடுகள்." },
            worms: { title: "வோர்ම්ஸ் (Worms)", desc: "வலைப்பின்னல்கள் மூலம் தானாகப் பரவும் வைரஸ்கள்." },
            spyware: { title: "ஸ்பைவேர் (Spyware)", desc: "உங்கள் தகவல்களை இரகசியமாகத் திருடும் மென்பொருள்." },
            adware: { title: "அட்வேர் (Adware)", desc: "தேவையற்ற விளம்பரங்களைக் காட்டும் மென்பொருள்." },
            bots: { title: "பாட்கள் (Bots)", desc: "தாக்குதல்களை நடத்தப் பயன்படுத்தப்படும் பாதிக்கப்பட்ட கணினிகள்." },
            hijacker: { title: "உலவி கடத்தல்", desc: "உலவி அமைப்புகளை அனுமதியின்றி மாற்றும் மென்பொருள்." },
            hacker: { title: "ஹேக்கர்கள்", desc: "அனுමதியின்றி கணினிக்குள் நுழையும் நபர்கள்." },
            spam: { title: "ஸ்பேம் (Spam)", desc: "பெருமளவில் வரும் தேவையற்ற செய்திகள்." }
        },
        sl_safety: {
            title: "இலங்கை பாதுகாப்பு",
            titleSpan: "நிறுவனங்கள்",
            cert: "Sri Lanka CERT|CC - கணினி அவசர தயார்நிலை குழு",
            icta: "ICTA - தகவல் மற்றும் தொடர்பு தொழில்நுட்ப நிறுவனம்",
            slp: "இலங்கை போலீஸ் - சைபர் குற்றப்பிரிவு",
            trcsl: "TRCSL - தொலைத்தொடர்பு ஒழுங்குமுறை ஆணைக்குழு"
        },
        footer: {
            desc: "பொதுமக்களைப் பாதுகாப்பதற்கான ஒரு இலவச சமூக சேவை.",
            copyright: "Verified Hub. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
        }
    }
};

export default function Home() {
    const [lang, setLang] = useState(null);
    const heroCardRef = useRef(null);

    useEffect(() => {
        const savedLang = localStorage.getItem("user-lang");
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    const selectLanguage = (l) => {
        setLang(l);
        localStorage.setItem("user-lang", l);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroCardRef.current) return;
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            heroCardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        };

        if (lang) {
            document.addEventListener("mousemove", handleMouseMove);
        }
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [lang]);

    if (!lang) {
        return (
            <div className="lang-selector-overlay">
                <div className="glass-card lang-modal fade-in">
                    <div className="shield-icon-container">
                        <Lock size={48} className="gradient-text" />
                    </div>
                    <h2>තේරීම ආරක්ෂාකාරීව තබන්න <br /><span className="modal-sub">Choose Your Safety Gateway</span></h2>
                    <div className="lang-btn-group">
                        <button onClick={() => selectLanguage('si')} className="btn-main lang-select-btn">සිංහල</button>
                        <button onClick={() => selectLanguage('en')} className="btn-secondary lang-select-btn">English</button>
                        <button onClick={() => selectLanguage('ta')} className="btn-secondary lang-select-btn">தமிழ்</button>
                    </div>
                </div>
            </div>
        );
    }

    const t = translations[lang];

    return (
        <>
            <nav suppressHydrationWarning>
                <div className="logo">
                    <span className="gradient-text">Verified</span>
                    <span>Hub</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">{t.nav.home}</a></li>
                    <li><a href="#scams">{t.nav.scams}</a></li>
                    <li><a href="#malware">{t.nav.malware}</a></li>
                    <li><a href="#institutions">{t.nav.sl_safety}</a></li>
                    <li><button onClick={() => setLang(null)} className="lang-switch-btn"><Globe size={16} /> {lang.toUpperCase()}</button></li>
                </ul>
            </nav>

            <main suppressHydrationWarning>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <h1 className="fade-in">
                            {t.hero.title} <br /><span className="gradient-text">{t.hero.titleSpan}</span>
                        </h1>
                        <p className="subtitle fade-in-delay">
                            {t.hero.subtitle}
                        </p>
                        <div className="cta-group fade-in-delay-2">
                            <a href="#scams" className="btn-main" style={{ textDecoration: 'none' }}>{t.hero.btn1}</a>
                            <a href="#malware" className="btn-secondary" style={{ textDecoration: 'none' }}>{t.nav.malware}</a>
                        </div>
                    </div>
                    <div className="hero-image fade-in-delay-3">
                        <div className="glass-card main-card" ref={heroCardRef}>
                            <div className="card-header">
                                <div className="check-icon" style={{ background: 'linear-gradient(135deg, #ff4d4d, #f9cb28)' }}>
                                    <ShieldAlert size={32} strokeWidth={2} color="white" />
                                </div>
                                <div className="header-text">
                                    <h3>{t.threatAlert.title}</h3>
                                    <p style={{ color: '#ff4d4d' }}>{t.threatAlert.subtitle}</p>
                                </div>
                            </div>
                            <div className="stats">
                                <div className="stat-item">
                                    <span>{t.threatAlert.today}</span>
                                    <strong>1,420+</strong>
                                </div>
                                <div className="stat-item">
                                    <span>{t.threatAlert.risk}</span>
                                    <strong style={{ color: '#ff4d4d' }}>{t.threatAlert.high}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="scams" className="features">
                    <h2 className="section-title">
                        {t.scamTypes.title} <span className="gradient-text">{t.scamTypes.titleSpan}</span>
                    </h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="icon-box"><Search className="gradient-text" size={40} /></div>
                            <h3>{t.scamTypes.phishing.title}</h3>
                            <p>{t.scamTypes.phishing.desc}</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><MessageCircle className="gradient-text" size={40} /></div>
                            <h3>{t.scamTypes.whatsapp.title}</h3>
                            <p>{t.scamTypes.whatsapp.desc}</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><TrendingUp className="gradient-text" size={40} /></div>
                            <h3>{t.scamTypes.investment.title}</h3>
                            <p>{t.scamTypes.investment.desc}</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><AlertCircle className="gradient-text" size={40} /></div>
                            <h3>{t.scamTypes.fakeJobs.title}</h3>
                            <p>{t.scamTypes.fakeJobs.desc}</p>
                        </div>
                    </div>
                </section>

                <section id="malware" className="features" style={{ background: 'rgba(79, 172, 254, 0.05)', borderRadius: '40px', margin: '0 5%' }}>
                    <h2 className="section-title">
                        {t.malware.title} <span className="gradient-text">{t.malware.titleSpan}</span>
                    </h2>
                    <div className="feature-grid thin">
                        {Object.entries(t.malware).filter(([key]) => key !== 'title' && key !== 'titleSpan').map(([key, item]) => (
                            <div className="feature-card small-pad" key={key}>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Bug size={20} className="gradient-text" />
                                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="institutions" className="features">
                    <h2 className="section-title">
                        {t.sl_safety.title} <span className="gradient-text">{t.sl_safety.titleSpan}</span>
                    </h2>
                    <div className="institution-list">
                        <div className="glass-card inst-card">
                            <ShieldHalf size={24} className="gradient-text" />
                            <p>{t.sl_safety.cert}</p>
                            <ExternalLink size={16} className="ext-link" />
                        </div>
                        <div className="glass-card inst-card">
                            <Cpu size={24} className="gradient-text" />
                            <p>{t.sl_safety.icta}</p>
                            <ExternalLink size={16} className="ext-link" />
                        </div>
                        <div className="glass-card inst-card">
                            <Activity size={24} className="gradient-text" />
                            <p>{t.sl_safety.slp}</p>
                            <ExternalLink size={16} className="ext-link" />
                        </div>
                        <div className="glass-card inst-card">
                            <Globe size={24} className="gradient-text" />
                            <p>{t.sl_safety.trcsl}</p>
                            <ExternalLink size={16} className="ext-link" />
                        </div>
                    </div>
                </section>

                <section className="article-preview">
                    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', borderRadius: '40px' }}>
                        <UserX size={48} className="gradient-text" style={{ marginBottom: '1rem' }} />
                        <h2>{lang === 'si' ? 'ඔබේ සැඟවුණු ආරක්ෂකයා' : 'Anonymous Initiative'}</h2>
                        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
                            {lang === 'si'
                                ? 'Verified Hub යනු කිසිදු පෞද්ගලික ලාභයක් බලාපොරොත්තු නොවන, පොදු ජනතාව දැනුවත් කිරීම සඳහා පමණක් ක්‍රියාත්මක වන ස්වාධීන ප්‍රජා සත්කාරයකි. අන්තර්ජාලය සැමට ආරක්ෂිත තැනක් කිරීම අපේ අරමුණයි.'
                                : 'Verified Hub is an independent community initiative for public awareness. We operate without a profit motive to make the internet a safer place for everyone.'}
                        </p>
                    </div>
                </section>
            </main>

            <footer>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', textAlign: 'left', marginBottom: '4rem' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 className="logo"><span className="gradient-text">Verified</span>Hub</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>{t.footer.desc}</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <h4>Security Links</h4>
                        <ul style={{ listStyle: 'none', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Stay Anonymous</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Safety</li>
                        </ul>
                    </div>
                </div>
                <p style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
                    &copy; 2024 {t.footer.copyright}
                </p>
            </footer>

            <style jsx global>{`
        .lang-selector-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: #050505; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .lang-modal {
          padding: 3rem 2rem; width: 100%; max-width: 500px;
          border-radius: 40px; text-align: center;
        }
        .shield-icon-container { margin-bottom: 1.5rem; }
        .modal-sub { fontSize: 0.9rem; opacity: 0.6; fontWeight: 400; }
        .lang-btn-group { display: grid; gap: 1rem; margin-top: 2rem; }
        .lang-select-btn { width: 100%; padding: 1.2rem; border-radius: 20px; font-size: 1.1rem; }
        
        .feature-grid.thin { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
        .small-pad { padding: 1.5rem; }
        
        .institution-list { display: grid; gap: 1.2rem; max-width: 800px; margin: 0 auto; }
        .inst-card { 
          display: flex; align-items: center; gap: 1.5rem; padding: 1.2rem 2rem; 
          border-radius: 20px; transition: 0.3s; cursor: pointer;
        }
        .inst-card:hover { border-color: var(--accent-primary); transform: translateX(10px); }
        .ext-link { margin-left: auto; opacity: 0.3; }
        .inst-card:hover .ext-link { opacity: 1; color: var(--accent-primary); }

        .lang-switch-btn {
          background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
          color: white; padding: 0.5rem 1rem; border-radius: 20px;
          display: flex; align-items: center; gap: 0.5rem; cursor: pointer;
        }

        @media (max-width: 600px) {
          .lang-modal { padding: 2rem 1.5rem; }
          .feature-grid { grid-template-columns: 1fr; }
          .hero h1 { font-size: 2.5rem; }
        }
      `}</style>
        </>
    );
}
