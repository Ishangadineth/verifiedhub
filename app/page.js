"use client";

import { useState, useEffect, useRef } from "react";
import {
    ShieldAlert,
    ShieldCheck,
    Search,
    AlertTriangle,
    HandMetal,
    Lock,
    Eye,
    TrendingUp,
    Globe,
    CheckCircle2,
    FileText,
    UserX,
    MessageCircle,
    AlertCircle
} from "lucide-react";

const translations = {
    si: {
        nav: {
            home: "මුල් පිටුව",
            scams: "මංකොල්ල වර්ග",
            prevention: "ආරක්ෂා වීම",
            cases: "අතීත සිදුවීම්",
            report: "දැනුවත් කරන්න"
        },
        hero: {
            title: "ඩිජිටල් මංකොල්ල වලින්",
            titleSpan: "ආරක්ෂා වන්න",
            subtitle: "අන්තර්ජාලය හරහා සිදුකරන වංචාවන් හඳුනා ගැනීමට, දත්ත සොරකම් කිරීම් වලින් වැළකී සිටීමට සහ ඔබේ ඩිජිටල් ජීවිතය සුරක්ෂිත කර ගැනීමට අවශ්‍ය දැනුම මෙතැනින් ලබාගන්න.",
            btn1: "වංචා වර්ග බලන්න",
            btn2: "ආරක්ෂිත පියවර"
        },
        threatAlert: {
            title: "අන්තරායකාරී තත්ත්වය",
            subtitle: "සජීවී නිරීක්ෂණය ක්‍රියාත්මකයි",
            today: "අද වාර්තා වූ වංචා",
            risk: "අවදානම් මට්ටම",
            high: "ඉහළයි"
        },
        scamTypes: {
            title: "ප්‍රධාන ඩිජිටල්",
            titleSpan: "වංචා වර්ග",
            phishing: {
                title: "ව්‍යාජ වෙබ් අඩවි (Phishing)",
                desc: "ඔබේ බැංකු ගිණුම් හෝ සමාජ මාධ්‍ය ගිණුම් වල මුරපද සොරකම් කිරීමට සාදන ලද ව්‍යාජ වෙබ් අඩවි."
            },
            whatsapp: {
                title: "WhatsApp වංචා",
                desc: "යාළුවන් මෙන් පෙනී සිටිමින් හෝ කේත (OTP) ඉල්ලමින් සිදුකරන WhatsApp මංකොල්ල."
            },
            investment: {
                title: "ආයෝජන වංචා",
                desc: "ඉක්මනින් මුදල් දෙගුණ කර දෙන බව පවසන බොරු ආයෝජන සහ Crypto වංචා."
            },
            fakeJobs: {
                title: "ව්‍යාජ රැකියා",
                desc: "විදේශ රැකියා හෝ අමතර ආදායම් මාර්ග ලබාදෙන බව පවසා මුදල් සොරකම් කිරීම."
            }
        },
        checklist: {
            title: "අලුත් අඩවියකට යන්න කලින්",
            titleSpan: "මේවා බලන්න",
            step1: "URL එක නිවැරදිද බලන්න (උදා: google.com වෙනුවට g00gle.com ද?)",
            step2: "Padlock (අගුල) සළකුණ තිබේදැයි බලන්න (HTTPS තිබිය යුතුය).",
            step3: "අනවශ්‍ය ලෙස පෞද්ගලික තොරතුරු ඉල්ලන්නේදැයි සැක කරන්න.",
            step4: "සීමාව ඉක්මවූ දීමනා හෝ තෑගි ගැන ප්‍රවේශමෙන් ක්‍රියා කරන්න.",
            step5: "වෙබ් අඩවියේ පෙනුම සහ අකුරු වල වැරදි ඇත්දැයි බලන්න."
        },
        caseStudies: {
            title: "ලංකාවේ සිදුවූ",
            titleSpan: "සැබෑ සිදුවීම්",
            case1: {
                title: "WhatsApp මුදල් ඉල්ලීම",
                desc: "මිතුරෙකුගේ ගිණුම හැක් කර ඔහු මෙන් පෙනී සිටිමින් හදිසියකට මුදල් ඉල්ලූ සිදුවීමක්."
            },
            case2: {
                title: "ව්‍යාජ බැංකු SMS",
                desc: "බැංකුවෙන් ලැබෙන SMS එකක් ලෙස පෙන්වා link එකක් මගින් සියලුම මුදල් සොරකම් කිරීම."
            }
        },
        footer: {
            desc: "ඩිජිටල් ලෝකය වංචාවන්ගෙන් තොර ආරක්ෂිත තැනක් කිරීමේ අරමුණින් ක්‍රියාත්මක වන ස්වේච්ඡා වැඩසටහනකි.",
            copyright: "Verified Hub. සියලු හිමිකම් ඇවිරිණි. ඔබේ ආරක්ෂාව අපේ ප්‍රමුඛතාවයයි."
        }
    },
    en: {
        nav: {
            home: "Home",
            scams: "Scam Types",
            prevention: "Prevention",
            cases: "Case Studies",
            report: "Report Scam"
        },
        hero: {
            title: "Stay Ahead of",
            titleSpan: "Digital Scams",
            subtitle: "Your shield against the rising tide of online fraud. Learn to identify fake sites, avoid data theft, and secure your digital life.",
            btn1: "Explore Scam Types",
            btn2: "Safety Checklist"
        },
        threatAlert: {
            title: "Threat Alert",
            subtitle: "Real-time Monitoring Active",
            today: "New Scams Today",
            risk: "Risk Level",
            high: "HIGH"
        },
        scamTypes: {
            title: "Common Digital",
            titleSpan: "Scams",
            phishing: {
                title: "Phishing Sites",
                desc: "Fake websites that look exactly like your bank or social media login to steal your credentials."
            },
            whatsapp: {
                title: "WhatsApp Scams",
                desc: "Scams involving taking over accounts or asking for money by pretending to be a friend."
            },
            investment: {
                title: "Investment Fraud",
                desc: "'Get rich quick' schemes and fake crypto platforms promising impossible returns."
            },
            fakeJobs: {
                title: "Fake Job Offers",
                desc: "Scammers promising abroad jobs or high salaries to steal registration fees."
            }
        },
        checklist: {
            title: "Before You Visit",
            titleSpan: "A New Site",
            step1: "Check the URL spelling carefully (e.g., google.com vs g00gle.com).",
            step2: "Look for the Padlock icon (HTTPS) in the address bar.",
            step3: "Be skeptical if the site asks for excessive personal data.",
            step4: "Watch out for too-good-to-be-true offers or prizes.",
            step5: "Check for poor design or multiple spelling errors."
        },
        caseStudies: {
            title: "Real World",
            titleSpan: "Case Studies (SL)",
            case1: {
                title: "WhatsApp Emergency Request",
                desc: "A scammer hacks a contact's profile and asks for urgent money transfers from friends."
            },
            case2: {
                title: "Fake Bank Login SMS",
                desc: "Users receive SMS alerts appearing to be from a bank, leading to fake login pages."
            }
        },
        footer: {
            desc: "A community-driven initiative focused on protecting the digital world from scams.",
            copyright: "Verified Hub. All rights reserved. Your safety is our priority."
        }
    },
    ta: {
        nav: {
            home: "முகப்பு",
            scams: "மோசடி வகைகள்",
            prevention: "தடுப்பு",
            cases: "உதாரணங்கள்",
            report: "புகார் செய்"
        },
        hero: {
            title: "டிஜிட்டல் மோசடிகளில்",
            titleSpan: "இருந்து தற்காத்துக் கொள்ளுங்கள்",
            subtitle: "இணைய மோசடிகளை அடையாளம் காணவும், தரவு திருட்டைத் தவிர்க்கவும் தேவையான அறிவைப் பெறுங்கள்.",
            btn1: "வகைகளை பார்க்க",
            btn2: "பாதுகாப்பு சரிபார்ப்பு"
        },
        threatAlert: {
            title: "அச்சுறுத்தல் எச்சரிக்கை",
            subtitle: "நேரடி கண்காணிப்பு",
            today: "இன்றைய மோசடிகள்",
            risk: "ஆபத்து நிலை",
            high: "அதிகம்"
        },
        scamTypes: {
            title: "பொதுவான டிஜிட்டல்",
            titleSpan: "மோசடிகள்",
            phishing: {
                title: "போலி இணையதளங்கள்",
                desc: "உங்கள் கணக்குகளை திருட உருவாக்கப்பட்ட போலியான இணையதளங்கள்."
            },
            whatsapp: {
                title: "வாட்ஸ்அப் மோசடிகள்",
                desc: "நண்பர்கள் போல நடித்து ஓடிபி (OTP) அல்லது பணம் கேட்கும் மோசடிகள்."
            },
            investment: {
                title: "முதலீட்டு மோசடிகள்",
                desc: "பணத்தை இரட்டிப்பாக்குவதாக கூறும் போலி முதலீட்டுத் திட்டங்கள்."
            },
            fakeJobs: {
                title: "போலி வேலைவாய்ப்புகள்",
                desc: "வெளிநாட்டு வேலைகள் எனக் கூறி பணம் பறிக்கும் மோசடிகள்."
            }
        },
        checklist: {
            title: "புதிய தளத்திற்கு முன்",
            titleSpan: "கவனிக்கவும்",
            step1: "முகவரி (URL) சரியாக உள்ளதா எனப் பார்க்கவும்.",
            step2: "பூட்டு அடையாளம் (HTTPS) உள்ளதா எனப் பார்க்கவும்.",
            step3: "தேவையற்ற தனிப்பட்ட தகவல்களை வழங்க வேண்டாம்.",
            step4: "அளவுக்கு அதிகமான சலுகைகளை சந்தேகிக்கவும்.",
            step5: "தளத்தின் வடிவமைப்பு மற்றும் எழுத்துப் பிழைகளை கவனிக்கவும்."
        },
        caseStudies: {
            title: "இலங்கையில் நடந்த",
            titleSpan: "உண்மைக் கதைகள்",
            case1: {
                title: "வாட்ஸ்அப் அவசர உதவி",
                desc: "நண்பரின் கணக்கை ஹேக் செய்து அவசரமாக பணம் கேட்கும் மோசடி."
            },
            case2: {
                title: "போலி வங்கி எஸ்.எம்.எஸ்",
                desc: "வங்கியிலிருந்து வரும் மெசேஜ் போல காட்டி பணத்தைத் திருடும் லிಂಕ್‌கள்."
            }
        },
        footer: {
            desc: "டிஜிட்டல் உலகைப் பாதுகாக்க மேற்கொள்ளப்படும் ஒரு தன்னார்வ முயற்சி.",
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
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>සෑම පියවරක්ම ආරක්ෂිතව තබන්න <br /><span style={{ fontSize: '0.8rem', opacity: 0.7, fontWeight: 400 }}>Step into Digital Safety</span></h2>
                    <p style={{ textAlign: 'center', marginBottom: '2.5rem', opacity: 0.8 }}>භාෂාව තෝරන්න / Select Language / மொழியைத் தேர்ந்தெடுக்கவும்</p>
                    <div className="lang-btn-group">
                        <button onClick={() => selectLanguage('si')} className="btn-main">සිංහල</button>
                        <button onClick={() => selectLanguage('en')} className="btn-secondary">English</button>
                        <button onClick={() => selectLanguage('ta')} className="btn-secondary">தமிழ்</button>
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
                    <li><a href="#prevention">{t.nav.prevention}</a></li>
                    <li><a href="#cases">{t.nav.cases}</a></li>
                    <li><button onClick={() => setLang(null)} className="lang-switch-btn"><Globe size={16} /> {lang.toUpperCase()}</button></li>
                </ul>
            </nav>

            <main suppressHydrationWarning>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <h1 className="fade-in">
                            {t.hero.title} <span className="gradient-text">{t.hero.titleSpan}</span>
                        </h1>
                        <p className="subtitle fade-in-delay">
                            {t.hero.subtitle}
                        </p>
                        <div className="cta-group fade-in-delay-2">
                            <a href="#scams" className="btn-main" style={{ textDecoration: 'none' }}>{t.hero.btn1}</a>
                            <a href="#prevention" className="btn-secondary" style={{ textDecoration: 'none' }}>{t.hero.btn2}</a>
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

                <section id="prevention" className="prevention-section" style={{ padding: '8rem 10%', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                {lang === 'si' ? 'අඩවියක' : 'Identify'} <span className="gradient-text">{lang === 'si' ? 'විශ්වාසදායී බව බලමු' : 'Safe Sites'}</span>
                            </h2>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1.2rem' }}>
                                <li className="checklist-item"><CheckCircle2 className="accent-icon" size={20} /><span>{t.checklist.step1}</span></li>
                                <li className="checklist-item"><CheckCircle2 className="accent-icon" size={20} /><span>{t.checklist.step2}</span></li>
                                <li className="checklist-item"><CheckCircle2 className="accent-icon" size={20} /><span>{t.checklist.step3}</span></li>
                                <li className="checklist-item"><CheckCircle2 className="accent-icon" size={20} /><span>{t.checklist.step4}</span></li>
                                <li className="checklist-item"><CheckCircle2 className="accent-icon" size={20} /><span>{t.checklist.step5}</span></li>
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px' }} className="glass-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Lock color="#00f2fe" />
                                <h3 style={{ margin: 0 }}>{lang === 'si' ? 'වෙබ් අඩවි පරීක්ෂාව' : 'Site Analyzer'}</h3>
                            </div>
                            <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>අවදානම් සහගත links මෙහි දමා පරීක්ෂා කළ හැක. (Coming Soon)</p>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    disabled
                                    placeholder="Paste URL (e.g. https://...)"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'white'
                                    }}
                                />
                                <button
                                    disabled
                                    style={{
                                        position: 'absolute',
                                        right: '8px',
                                        top: '8px',
                                        background: 'var(--accent-secondary)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '0.4rem 1rem',
                                        opacity: 0.5
                                    }}
                                >
                                    Analyze
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="cases" className="features" style={{ background: 'transparent' }}>
                    <h2 className="section-title">
                        {t.caseStudies.title} <span className="gradient-text">{t.caseStudies.titleSpan}</span>
                    </h2>
                    <div className="feature-grid">
                        <div className="feature-card glass-glow">
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="case-badge">CASE 01</div>
                                <h3 style={{ margin: 0 }}>{t.caseStudies.case1.title}</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }}>{t.caseStudies.case1.desc}</p>
                        </div>
                        <div className="feature-card glass-glow">
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="case-badge">CASE 02</div>
                                <h3 style={{ margin: 0 }}>{t.caseStudies.case2.title}</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }}>{t.caseStudies.case2.desc}</p>
                        </div>
                    </div>
                </section>

                <section className="article-preview">
                    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <UserX size={48} className="gradient-text" style={{ marginBottom: '1rem' }} />
                        <h2>{lang === 'si' ? 'ඔබේ සැඟවුණු ආරක්ෂකයා' : 'Your Anonymous Shield'}</h2>
                        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
                            {lang === 'si'
                                ? 'Verified Hub යනු කිසිදු පෞද්ගලික ලාභයක් බලාපොරොත්තු නොවන, පොදු ජනතාව දැනුවත් කිරීම සඳහා පමණක් ක්‍රියාත්මක වන ස්වාධීන ව්‍යාපෘතියකි. අපගේ එකම අරමුණ ඔබව ඩිජිටල් සොරුන්ගෙන් බේරා ගැනීමයි.'
                                : 'Verified Hub is an independent project initiated for public awareness without any personal profit motive. Our only goal is to protect you from digital predators.'}
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
                        <h4>Social Safety</h4>
                        <ul style={{ listStyle: 'none', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                            <li>Stay Anonymous</li>
                            <li>Report Fraud</li>
                            <li>Community Safety</li>
                        </ul>
                    </div>
                </div>
                <p style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
                    &copy; 2024 {t.footer.copyright}
                </p>
            </footer>

            <style jsx global>{`
        .lang-selector-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: #050505;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lang-modal {
          padding: 3rem;
          max-width: 500px;
          border-radius: 32px;
        }
        .lang-btn-group {
          display: grid;
          gap: 1rem;
        }
        .lang-switch-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        .checklist-item {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .accent-icon {
          color: #00f2fe;
          flex-shrink: 0;
        }
        .case-badge {
          background: rgba(0, 242, 254, 0.1);
          color: #00f2fe;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
        }
        .glass-glow {
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.05);
        }
        .article-preview {
          padding: 8rem 10%;
        }
      `}</style>
        </>
    );
}
