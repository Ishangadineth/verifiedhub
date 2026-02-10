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
    History,
    Shield,
    Gift,
    Wifi
} from "lucide-react";

const translations = {
    si: {
        nav: {
            home: "මුල් පිටුව",
            scams: "වංචා වර්ග",
            malware: "Malware දැනුම",
            sl_safety: "ආරක්ෂක ආයතන",
            attacks: "සයිබර් ප්‍රහාර",
            report: "වාර්තා කරන්න"
        },
        hero: {
            title: "ඩිජිටල් වංචා වලින්",
            titleSpan: "නිරන්තරයෙන් ආරක්ෂා වන්න",
            subtitle: "අන්තර්ජාලය හරහා සිදුවන වංචාවන්, වෛරසයන් (Malware) සහ දත්ත සොරකම් කිරීම් වලින් බේරී සිටීමට අවශ්‍ය සියලුම තොරතුරු සහ ලංකාවේ සැබෑ සිදුවීම් මෙතැනින් බලන්න.",
            btn1: "වංචා වර්ග",
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
            phishing: { title: "Phishing (ව්‍යාජ අඩවි)", desc: "Password සහ බැංකු විස්තර සොරකම් කිරීමට සාදන ලද ව්‍යාජ වෙබ් අඩවි." },
            whatsapp: { title: "WhatsApp වංචා", desc: "හිතවතෙකු මෙන් පෙනී සිටිමින් මුදල් හෝ OTP කේත ඉල්ලා සිටින වංචා." },
            promo: { title: "ව්‍යාජ ප්‍රවර්ධන", desc: "ප්‍රසිද්ධ සමාගම් වල නම් භාවිතා කර ව්‍යාජ දීමනා හෝ තෑගි ලබාදෙන බව පවසන වංචා." },
            dataScam: { title: "නිදහස් Mobile Data", desc: "නොමිලේ Data ලබාදෙන බව පවසා ඔබව අනාරක්ෂිත වෙබ් අඩවි වෙත යොමු කරන වංචා." },
            investment: { title: "ආයෝජන වංචා", desc: "මුදල් ද්විගුණ කර දෙන බව පවසන බොරු Crypto සහ Online ආයෝජන වංචා." },
            fakeJobs: { title: "ව්‍යාජ රැකියා", desc: "විදේශ හෝ නිවසේ සිට කරන රැකියා ලබාදෙන බව පවසා මුදල් සොරකම් කිරීම." }
        },
        malware: {
            title: "Malware & Threat",
            titleSpan: "Glossary",
            virus: { title: "Computer Virus", desc: "වෙනත් මෘදුකාංග වලට ඇතුල් වී පද්ධති වලට හානි කරන කේත." },
            worms: { title: "Worms", desc: "ජාලයක් හරහා තනිවම පැතිරී යන හානිකර මෘදුකාංග වර්ගයකි." },
            spyware: { title: "Spyware", desc: "ඔබේ දත්ත රහසින් නිරීක්ෂණය කර සොරකම් කරන මෘදුකාංග." },
            adware: { title: "Adware", desc: "අනවශ්‍ය වෙළඳ දැන්වීම් පෙන්වමින් පද්ධතිය අඩපණ කරන මෘදුකාංග." },
            bots: { title: "Bots & Botnets", desc: "සයිබර් ප්‍රහාර සඳහා හැකර්වරුන් පාවිච්චි කරන ආසාදිත පරිගණක ජාල." },
            hijacker: { title: "Browser Hijacker", desc: "ඔබේ browser එකේ search engine එක වෙනස් කරන මෘදුකාංග." },
            hacker: { title: "Hackers", desc: "අවසරයකින් තොරව පද්ධතිවලට ඇතුල් වන පුද්ගලයින්." },
            spam: { title: "Spam", desc: "විශාල වශයෙන් එවන කරදරකාරී සහ හානිකර පණිවිඩ." }
        },
        attacks: {
            title: "ලංකාවේ සිදුවූ",
            titleSpan: "මෑතකාලීන සයිබර් ප්‍රහාර",
            attack1: { title: "Gov.lk දත්ත නැතිවීම (2023)", desc: "රජයේ විද්‍යුත් තැපැල් (Gov.lk) පද්ධතියට එල්ල වූ ප්‍රහාරයකින් දත්ත විශාල ප්‍රමාණයක් ස්ථිරවම විනාශ විය." },
            attack2: { title: "බැංකු SMS වංචා (2024)", desc: "ලංකාවේ ප්‍රධාන බැංකු වල නමින් ව්‍යාජ SMS එවා ගිණුම් වල මුදල් සොරකම් කිරීමේ විශාල රැල්ලක් ඇති විය." },
            attack3: { title: "WhatsApp හයිජැක් (සජීවී)", desc: "ප්‍රසිද්ධ පුද්ගලයින්ගේ සහ සාමාන්‍ය වැසියන්ගේ WhatsApp ගිණුම් දහස් ගණනක් OTP හරහා පාලනයට ගැනීම." },
        },
        mission: {
            text: "verifiedhub.dpdns.org යනු මහජන සේවයක් ලෙස පවත්වාගෙන යන ස්වාධීන අඩවියකි. අපගේ එකම අරමුණ ඔබව සයිබර් සොරුන්ගෙන් ආරක්ෂා කිරීම හා ඔබ නැවත මෙවැනි දේවල් වලට හසුනොවන ලෙස දැනුවත් කිරීමයි. මෙම වෙබ් අඩවියෙන් ඔබේ කිසිදු තොරතුරක් එක් රැස් කරනොගන්නා අතර හුදෙක් ඔබව දැනුවත් කිරීමට පමණක් මෙය යොදාගනී."
        },
        sl_safety: {
            title: "ලංකාවේ සයිබර්",
            titleSpan: "ආරක්ෂක ආයතන",
            cert: "Sri Lanka CERT|CC - හදිසි ප්‍රතිචාර සංසදය",
            icta: "ICTA - තොරතුරු තාක්ෂණ නියෝජිතායතනය",
            slp: "සයිබර් අපරාධ ඒකකය (Cyber Crime Division)",
            trcsl: "TRCSL - විදුලි සංදේශ නියාමන කොමිෂන් සභාව"
        },
        footer: {
            desc: "මෙය ස්වේච්ඡා ව්‍යාපෘතියකි. ඔබගේ ආරක්ෂාව වෙනුවෙන් පමණක් ක්‍රියාත්මක වේ.",
            copyright: "Verified Hub Collective. ඔවුනොවුන් ආරක්ෂා කරමු."
        }
    },
    en: {
        nav: {
            home: "Home",
            scams: "Scams",
            malware: "Malware",
            sl_safety: "Safety Org",
            attacks: "Cyber Attacks",
            report: "Report"
        },
        hero: {
            title: "Stay Protected Against",
            titleSpan: "Digital Fraud",
            subtitle: "Get information about online scams, malware, and real-world cyber attacks in Sri Lanka to safeguard your digital presence.",
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
            phishing: { title: "Phishing Sites", desc: "Fake websites designed to steal passwords and personal credentials." },
            whatsapp: { title: "WhatsApp Scams", desc: "Scammers pretending to be friends asking for money or security codes." },
            promo: { title: "Fake Brand Promos", desc: "Using famous company names to offer fake gifts, vouchers or prizes." },
            dataScam: { title: "Free Mobile Data", desc: "Fake sites promising free data packs but directing to malicious sites." },
            investment: { title: "Investment Fraud", desc: "'Get rich quick' crypto schemes and fake investment portals." },
            fakeJobs: { title: "Fake Jobs", desc: "Overseas job offers used to lure people into paying upfront fees." }
        },
        malware: {
            title: "Malware & Threat",
            titleSpan: "Glossary",
            virus: { title: "Computer Virus", desc: "Malicious code that attaches to software to damage systems." },
            worms: { title: "Worms", desc: "Self-replicating malware that spreads autonomously across networks." },
            spyware: { title: "Spyware", desc: "Software that secretly monitors and steals your private data." },
            adware: { title: "Adware", desc: "Software that automatically displays unwanted advertisements." },
            bots: { title: "Bots & Botnets", desc: "Networks of infected computers used for cyber attacks." },
            hijacker: { title: "Browser Hijacker", desc: "Software that modifies web browser settings without permission." },
            hacker: { title: "Hackers", desc: "Individuals who gain unauthorized access to computer systems." },
            spam: { title: "Spam", desc: "Bulk unwanted, often malicious messages sent via email or SMS." }
        },
        attacks: {
            title: "Recent",
            titleSpan: "SL Cyber Attacks",
            attack1: { title: "Gov.lk Data Loss (2023)", desc: "Ransomware targets government servers leading to permanent loss of thousands of official emails." },
            attack2: { title: "Banking SMS Phishing (2024)", desc: "A massive wave of SMS fraud targeting major SL banks using fake login URLs." },
            attack3: { title: "WhatsApp Hijacking (Live)", desc: "Thousands of Sri Lankan accounts compromised daily through OTP manipulation." },
        },
        mission: {
            text: "verifiedhub.dpdns.org is an independent site maintained as a public service. Our sole purpose is to protect you from cyber thieves and educate you to prevent falling victim to such scams again. This website does not collect any of your information and is used solely for educational purposes."
        },
        sl_safety: {
            title: "Sri Lanka Security",
            titleSpan: "Institutions",
            cert: "Sri Lanka CERT|CC - Emergency Response",
            icta: "ICTA - Technology Agency",
            slp: "Cyber Crime Division (Police)",
            trcsl: "TRCSL - Regulation Commission"
        },
        footer: {
            desc: "An anonymous community initiative for public safety.",
            copyright: "Verified Hub Collective. Protect one another."
        }
    },
    ta: {
        nav: {
            home: "முகப்பு",
            scams: "மோசடி",
            malware: "மால்வேர்",
            sl_safety: "நிறுவனங்கள்",
            attacks: "தாக்குதல்கள்",
            report: "புகார்"
        },
        hero: {
            title: "ඩිජිටල් மோசடிகளில்",
            titleSpan: "இருந்து பாதுகாப்பாக இருங்கள்",
            subtitle: "இலங்கையில் நடந்த இணைய மோசடிகள், வைரஸ்கள் மற்றும் தரவு திருட்டு பற்றிய முழுமையான தகவல்கள் இங்கே.",
            btn1: "மோசඩிகள்",
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
            title: "டிජිටල්",
            titleSpan: "மோசடிகள்",
            phishing: { title: "பிஷிங் (Phishing)", desc: "உங்கள் கடவுச்சொற்களைத் திருட உருவாக்கப்பட்ட போலியான தளங்கள்." },
            whatsapp: { title: "வாட்ஸ்அப் மோசடி", desc: "நண்பர்கள் போல நடித்து ஓடிபி (OTP) க்காக பணம் கேட்கும் மோசடிகள்." },
            promo: { title: "போலி விளம்பரங்கள்", desc: "பிரபலமான நிறுவனங்களின் பெயர்களைப் பயன்படுத்தி போலி சலுகைகளை வழங்குகிறார்கள்." },
            dataScam: { title: "இலவச டேட்டா", desc: "இலவச டேட்டா தருவதாகக் கூறி உங்களை ஆபத்தான தளங்களுக்கு அழைத்துச் செல்லும் மோசடி." },
            investment: { title: "முதலீட்டு மோசடி", desc: "பණத்தை இரட்டிப்பாக்குவதாகக் கூறி ஏமாற்றும் திட்டங்கள்." },
            fakeJobs: { title: "போலி வேலைகள்", desc: "வெளிநாட்டு வேலை எனக் கூறி பணம் பறிக்கும் மோசடிகள்." }
        },
        malware: {
            title: "மால்வேர்",
            titleSpan: "விளக்கம்",
            virus: { title: "கணினி வைரஸ்", desc: "கணினியைப் பாதிக்கும் தீங்கிழைக்கும் குறியீடுகள்." },
            worms: { title: "வோர்ම්ஸ் (Worms)", desc: "வலைப்பின்னல்கள் மூலம் தானாகப் பரவும் வைரஸ்கள்." },
            spyware: { title: "ஸ்பைவேர்", desc: "உங்கள் தகவல்களைத் திருடும் மென்பொருள்." },
            adware: { title: "அட்வேர்", desc: "தேவையற்ற விளம்பரங்களைக் காட்டும் மென்பொருள்." },
            bots: { title: "பாட்கள் (Bots)", desc: "தாக்குதல்களை நடத்தப் பயன்படுத்தப்படும் கணினிகள்." },
            hijacker: { title: "உலவி கடத்தல்", desc: "உலவி அமைப்புகளை மாற்றும் மென்பொருள்." },
            hacker: { title: "ஹேக்கர்கள்", desc: "அனுமதியின்றி கணினிக்குள் நுழையும் நபர்கள்." },
            spam: { title: "ஸ்பேம் (Spam)", desc: "பெருமளவில் வரும் தேவையற்ற செய்திகள்." }
        },
        attacks: {
            title: "இலங்கையில்",
            titleSpan: "நடந்த தாக்குதல்கள்",
            attack1: { title: "Gov.lk தரவு இழப்பு", desc: "அரசு மின்னஞ்சல் அமைப்பில் ஏற்பட்ட தாக்குதலால் தரவுகள் திருடப்பட்டன." },
            attack2: { title: "வங்கி எஸ்.எம்.எஸ்", desc: "வங்கிப் பெயரில் வரும் போலியான எஸ்.எம்.எஸ் மூலம் பணம் திருடுதல்." },
            attack3: { title: "வாட்ஸ்அප් හෑක්", desc: "ஓடிபி (OTP) மூலம் வாட்ஸ்அப் கணக்குகள் திருடப்படும் நிகழ்வுகள்." },
        },
        mission: {
            text: "verifiedhub.dpdns.org என்பது பொதுச் சேவையாகப் பராமரிக்கப்படும் ஒரு சுயாதீன தளமாகும். சைபர் திருடர்களிடமிருந்து உங்களைப் பாதுகாப்பதும், இதுபோன்ற மோசடிகளுக்கு நீங்கள் மீண்டும் பலியாகாமல் இருக்க உங்களுக்குக் கற்பிப்பதும் எங்களின் ஒரே நோக்கமாகும். இந்த இணையதளம் உங்கள் தகவல்களைச் சேகரிக்காது மற்றும் கல்வி நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்படுகிறது."
        },
        sl_safety: {
            title: "இலங்கை பாதுகாப்பு",
            titleSpan: "நிறுவனங்கள்",
            cert: "Sri Lanka CERT|CC",
            icta: "ICTA - தொழில்நுட்ப நிறுவனம்",
            slp: "சைபர் குற்றப்பிரிவு",
            trcsl: "TRCSL - ஒழுங்குமுறை ஆணைக்குழு"
        },
        footer: {
            desc: "தன்னார்ව சமூக சேவை. உங்கள் பாதுகாப்பு எமது இலக்கு.",
            copyright: "Verified Hub Collective. ஒருவரை ஒருவர் பாதுகாப்போம்."
        }
    }
};

export default function Home() {
    const [lang, setLang] = useState(null);
    const [mounted, setMounted] = useState(false);
    const heroCardRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("user-lang");
        if (savedLang) setLang(savedLang);
    }, []);

    const selectLanguage = (l) => {
        setLang(l);
        localStorage.setItem("user-lang", l);
    };

    useEffect(() => {
        if (!lang) return;
        const handleMouseMove = (e) => {
            if (!heroCardRef.current) return;
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            heroCardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [lang]);

    if (!mounted) return null;

    if (!lang) {
        return (
            <div className="lang-selector-overlay">
                <div className="lang-modal fade-in">
                    <div className="shield-icon-container">
                        <Lock size={60} className="glow-icon" />
                    </div>
                    <h2 className="modal-title">ඩිජිටල් ආරක්ෂාව තහවුරු කරන්න</h2>
                    <p className="modal-desc">Secure Your Digital Presence / உங்களின் பாதுகாப்பை உறுதிப்படுத்துங்கள்</p>
                    <div className="lang-grid-container">
                        <button onClick={() => selectLanguage('si')} className="lang-btn main-l">සිංහල</button>
                        <button onClick={() => selectLanguage('en')} className="lang-btn">English</button>
                        <button onClick={() => selectLanguage('ta')} className="lang-btn">தமிழ்</button>
                    </div>
                    <div className="modal-footer-text">Verified Hub • Anonymous Public Safety Initiative</div>
                </div>
            </div>
        );
    }

    const t = translations[lang];

    return (
        <>
            <nav suppressHydrationWarning>
                <div className="logo"><span className="gradient-text">Verified</span><span>Hub</span></div>
                <ul className="nav-links">
                    <li><a href="#home">{t.nav.home}</a></li>
                    <li><a href="#scams">{t.nav.scams}</a></li>
                    <li><a href="#attacks">{t.nav.attacks}</a></li>
                    <li><a href="#institutions">{t.nav.sl_safety}</a></li>
                    <li><button onClick={() => setLang(null)} className="lang-switch-btn"><Globe size={16} /> {lang.toUpperCase()}</button></li>
                </ul>
            </nav>

            {/* Mobile Lang FAB */}
            <button onClick={() => setLang(null)} className="mobile-lang-fab lang-switch-btn" style={{ padding: '0.8rem 1.2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <Globe size={20} /> {lang.toUpperCase()}
            </button>

            <main suppressHydrationWarning>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <h1 className="fade-in">{t.hero.title} <br /><span className="gradient-text">{t.hero.titleSpan}</span></h1>
                        <p className="subtitle fade-in-delay">{t.hero.subtitle}</p>
                        <div className="cta-group fade-in-delay-2">
                            <a href="#scams" className="btn-main" style={{ textDecoration: 'none' }}>{t.hero.btn1}</a>
                            <a href="#attacks" className="btn-secondary" style={{ textDecoration: 'none' }}>{t.nav.attacks}</a>
                        </div>
                    </div>
                    <div className="hero-image fade-in-delay-3">
                        <div className="glass-card main-card" ref={heroCardRef}>
                            <div className="card-header">
                                <div className="alert-glow"><ShieldAlert size={32} strokeWidth={2} color="white" /></div>
                                <div className="header-text">
                                    <h3>{t.threatAlert.today}</h3>
                                    <p style={{ color: '#ff4d4d' }}>{t.threatAlert.subtitle}</p>
                                </div>
                            </div>
                            <div className="stats">
                                <div className="stat-item"><span>{t.threatAlert.today}</span><strong>1,640+</strong></div>
                                <div className="stat-item"><span>{t.threatAlert.risk}</span><strong style={{ color: '#ff4d4d' }}>{t.threatAlert.high}</strong></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="scams" className="features">
                    <h2 className="section-title">{t.scamTypes.title} <span className="gradient-text">{t.scamTypes.titleSpan}</span></h2>
                    <div className="feature-grid">
                        <div className="feature-card"><div className="icon-box"><Search className="gradient-text" size={40} /></div><h3>{t.scamTypes.phishing.title}</h3><p>{t.scamTypes.phishing.desc}</p></div>
                        <div className="feature-card"><div className="icon-box"><MessageCircle className="gradient-text" size={40} /></div><h3>{t.scamTypes.whatsapp.title}</h3><p>{t.scamTypes.whatsapp.desc}</p></div>
                        <div className="feature-card"><div className="icon-box"><Gift className="gradient-text" size={40} /></div><h3>{t.scamTypes.promo.title}</h3><p>{t.scamTypes.promo.desc}</p></div>
                        <div className="feature-card"><div className="icon-box"><Wifi className="gradient-text" size={40} /></div><h3>{t.scamTypes.dataScam.title}</h3><p>{t.scamTypes.dataScam.desc}</p></div>
                        <div className="feature-card"><div className="icon-box"><TrendingUp className="gradient-text" size={40} /></div><h3>{t.scamTypes.investment.title}</h3><p>{t.scamTypes.investment.desc}</p></div>
                        <div className="feature-card"><div className="icon-box"><AlertCircle className="gradient-text" size={40} /></div><h3>{t.scamTypes.fakeJobs.title}</h3><p>{t.scamTypes.fakeJobs.desc}</p></div>
                    </div>
                </section>

                <section id="attacks" className="features" style={{ background: 'rgba(255, 77, 77, 0.03)' }}>
                    <h2 className="section-title">{t.attacks.title} <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ff4d4d, #f9cb28)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.attacks.titleSpan}</span></h2>
                    <div className="feature-grid thin">
                        <div className="feature-card dark-accent"><History className="gradient-text" size={32} /><h4>{t.attacks.attack1.title}</h4><p>{t.attacks.attack1.desc}</p></div>
                        <div className="feature-card dark-accent"><Shield size={32} className="gradient-text" /><h4>{t.attacks.attack2.title}</h4><p>{t.attacks.attack2.desc}</p></div>
                        <div className="feature-card dark-accent"><AlertTriangle size={32} className="gradient-text" /><h4>{t.attacks.attack3.title}</h4><p>{t.attacks.attack3.desc}</p></div>
                    </div>

                    {/* Mission Statement at bottom of Attacks section */}
                    <div className="glass-card" style={{ maxWidth: '900px', margin: '4rem auto 0', textAlign: 'center', borderRadius: '40px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
                        <UserX size={48} className="gradient-text" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ marginBottom: '1.5rem' }}>{lang === 'si' ? 'අපගේ අරමුණ සහ වගකීම' : 'Our Mission & Responsibility'}</h2>
                        <p style={{ opacity: 0.95, lineHeight: '1.9', fontSize: '1.1rem', fontWeight: '400' }}>
                            {t.mission.text}
                        </p>
                    </div>
                </section>

                <section id="malware" className="features" style={{ background: 'rgba(0, 242, 254, 0.03)' }}>
                    <h2 className="section-title">{t.malware.title} <span className="gradient-text">{t.malware.titleSpan}</span></h2>
                    <div className="feature-grid thin">
                        {Object.entries(t.malware).filter(([key]) => !['title', 'titleSpan'].includes(key)).map(([key, item]) => (
                            <div className="feature-card small-pad" key={key}>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Bug size={20} className="gradient-text" /><h4 style={{ margin: 0 }}>{item.title}</h4>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="institutions" className="features">
                    <h2 className="section-title">{t.sl_safety.title} <span className="gradient-text">{t.sl_safety.titleSpan}</span></h2>
                    <div className="institution-list">
                        <div className="glass-card inst-card"><ShieldHalf size={24} className="gradient-text" /><p>{t.sl_safety.cert}</p><ExternalLink size={16} className="ext-link" /></div>
                        <div className="glass-card inst-card"><Cpu size={24} className="gradient-text" /><p>{t.sl_safety.icta}</p><ExternalLink size={16} className="ext-link" /></div>
                        <div className="glass-card inst-card"><Activity size={24} className="gradient-text" /><p>{t.sl_safety.slp}</p><ExternalLink size={16} className="ext-link" /></div>
                        <div className="glass-card inst-card"><Globe size={24} className="gradient-text" /><p>{t.sl_safety.trcsl}</p><ExternalLink size={16} className="ext-link" /></div>
                    </div>
                </section>
            </main>

            <footer>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', textAlign: 'left', marginBottom: '4rem' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}><h3 className="logo"><span className="gradient-text">Verified</span>Hub</h3><p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>{t.footer.desc}</p></div>
                    <div style={{ flex: 1, minWidth: '150px' }}><h4>Security Awareness</h4><ul style={{ listStyle: 'none', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '2' }}><li>Public Warning</li><li>Report Scam</li><li>SL Cyber Safety</li></ul></div>
                </div>
                <p style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>&copy; 2026 {t.footer.copyright}</p>
            </footer>
        </>
    );
}
