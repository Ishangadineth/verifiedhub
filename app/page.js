"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import {
    ShieldAlert,
    Search,
    AlertTriangle,
    TrendingUp,
    Globe,
    UserX,
    MessageCircle,
    AlertCircle,
    Zap,
    Bug,
    Cpu,
    ShieldHalf,
    ExternalLink,
    Lock,
    Activity,
    History,
    Shield,
    Gift,
    Wifi,
    Menu,
    X,
    CheckCircle2,
    Terminal,
    Download,
    Phone,
    Share2
} from "lucide-react";

const translations = {
    si: {
        sim: {
            badge: "T20 World Cup - ශ්‍රී ලංකා විශේෂ දීමනාව",
            title: "නොමිලේ 15GB දත්ත ලබාගන්න",
            subtitle: "Dialog, Mobitel, Hutch සහ Airtel පාරිභෝගිකයන් සඳහා පමණයි",
            inputPlaceholder: "ඔබගේ දුරකථන අංකය ඇතුළත් කරන්න (Ex: 07x xxxxxxx)",
            btnNext: "සක්‍රීය කරන්න",
            shareMsg: "ඔබේ දත්ත පැකේජය ලබාගැනීමට පහත පියවර සම්පූර්ණ කරන්න",
            step0: "මෙම පණිවිඩය WhatsApp මිතුරන් 10 දෙනෙකුට හෝ Group 2කට Share කළ යුතුය",
            step1: "ඔබේ ප්‍රගතිය 50% කි! තවත් මිතුරන් 5 දෙනෙකුට හෝ Group 1කට Share කර 100% සම්පූර්ණ කරන්න.",
            step4: "සෑම පියවරක්ම සාර්ථකයි! ඔබගේ 15GB පැකේජය දැන් ලබාගන්න",
            btnShare: "WhatsApp හරහා Share කරන්න",
            btnClaim: "15GB සක්‍රීය කරන්න",
            errorNum: "කරුණාකර නිවැරදි දුරකථන අංකයක් ඇතුළත් කරන්න",
            verifying: "පහිරුව පරීක්ෂා කරමින්...",
            shockTitle: "නතර වන්න! (STOP!)",
            shockMsg: "ඔබ දැන් සිදු කළේ සැබෑ වංචාවකදී සිදුවන ක්‍රියාවලියමයි. මෙලෙස Share කිරීම හරහා ඔබ ඔබගේ මිතුරන්වද මෙවැනි අනතුරු වලට නිරාවරණය කරනවා. මින් බේරෙන්න පහත තොරතුරු හොඳින් කියවන්න.",
            redirecting: "අත්‍යවශ්‍ය තොරතුරු වෙත යොමු කෙරේ..."
        },
        nav: {
            home: "මුල් පිටුව",
            scams: "වංචා වර්ග",
            malware: "Malware",
            sl_safety: "ආයතන",
            attacks: "ප්‍රහාර",
            report: "වාර්තා",
            readMore: "වැඩිදුර දැනගන්න...."
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
            malwareSoftware: { title: "ආසාදිත මෘදුකාංග", desc: "විවිධ පහසුකම් ලබාදෙන බව පවසා ඔබගේ දුරකථනයට හෝ පරිගණකයට Malware ඇතුල් කරන මෘදුකාංග." },
            hacking: { title: "Hacking (පද්ධති හැක් කිරීම)", desc: "ඔබගේ පෞද්ගලික ගිණුම් හෝ පද්ධති වලට අවසරයකින් තොරව ඇතුල් වී දත්ත සොරකම් කිරීම." },
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
            title: "ලංකා‍වේ සිදුවූ",
            titleSpan: "මෑතකාලීන සයිබර් ප්‍රහාර",
            attack1: { title: "Gov.lk දත්ත නැතිවීම (2023)", desc: "රජයේ විද්‍යුත් තැපැල් (Gov.lk) පද්ධතියට එල්ල වූ ප්‍රහාරයකින් දත්ත විශාල ප්‍රමාණයක් ස්ථිරවම විනාශ විය." },
            attack2: { title: "බැංකු SMS වංචා (2024)", desc: "ලංකාවේ ප්‍රධාන බැංකු වල නමින් ව්‍යාජ SMS එවා ගිණුම් වල මුදල් සොරකම් කිරීමේ විශාල රැල්ලක් ඇති විය." },
            attack3: { title: "WhatsApp හයිජැක් (සජීවී)", desc: "ප්‍රසිද්ධ පුද්ගලයින්ගේ සහ සාමාන්‍ය වැසියන්ගේ WhatsApp ගිණුම් දහස් ගණනක් OTP හරහා පාලනයට ගැනීම." },
        },
        mission: {
            title: "අපගේ අරමුණ සහ වගකීම",
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
        sim: {
            badge: "T20 World Cup - Sri Lanka Special Offer",
            title: "Claim Your Free 15GB Data",
            subtitle: "Exclusive for Dialog, Mobitel, Hutch & Airtel users",
            inputPlaceholder: "Enter your phone number (Ex: 07x xxxxxxx)",
            btnNext: "Activate Now",
            shareMsg: "Complete the steps below to claim your data pack",
            step0: "Share this message with 10 friends or 2 Groups on WhatsApp",
            step1: "Progress 50%! Share with 5 more friends or 1 Group to reach 100%",
            step4: "All steps complete! Click below to claim your 15GB",
            btnShare: "Share on WhatsApp",
            btnClaim: "Get 15GB Data Now",
            errorNum: "Please enter a valid phone number",
            verifying: "Verifying your share...",
            shockTitle: "STOP! Access Denied",
            shockMsg: "You just experienced exactly how a real digital scam works. By sharing this, you might have compromised your friends' safety too. Read below to learn how to keep yourself protected.",
            redirecting: "Redirecting to safety information..."
        },
        nav: {
            home: "Home",
            scams: "Scams",
            malware: "Malware",
            sl_safety: "Safety Org",
            attacks: "Cyber Attacks",
            report: "Report",
            readMore: "Read More...."
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
            malwareSoftware: { title: "Infected Software", desc: "Software or apps that bypass security to install malware onto your device." },
            hacking: { title: "Hacking & Intrusions", desc: "Unauthorized access to your private accounts or systems to steal sensitive data." },
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
            spam: { title: "Spam", desc: "Bulk unwanted, often malicious messages via email or SMS." }
        },
        attacks: {
            title: "Recent",
            titleSpan: "SL Cyber Attacks",
            attack1: { title: "Gov.lk Data Loss (2023)", desc: "Ransomware targets government servers leading to permanent loss of thousands of official emails." },
            attack2: { title: "Banking SMS Phishing (2024)", desc: "A massive wave of SMS fraud targeting major SL banks using fake login URLs." },
            attack3: { title: "WhatsApp Hijacking (Live)", desc: "Thousands of Sri Lankan accounts compromised daily through OTP manipulation." },
        },
        mission: {
            title: "Our Mission & Responsibility",
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
        sim: {
            badge: "T20 உலகக் கோப்பை - இலங்கை விசேட சலுகை",
            title: "இலவச 15GB டேட்டாவைப் பெறுங்கள்",
            subtitle: "Dialog, Mobitel, Hutch மற்றும் Airtel வாடிக்கையாளர்களுக்கு மாத்திரம்",
            inputPlaceholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும் (உதாரணம்: 07x xxxxxxx)",
            btnNext: "செயற்படுத்து",
            shareMsg: "உங்கள் டேட்டா பேக்கைப் பெற கீழுள்ள படிநிலைகளை முடிக்கவும்",
            step0: "இந்த செய்தியை WhatsApp இல் 10 நண்பர்கள் அல்லது 2 குழுக்களுக்கு பகிரவும்",
            step1: "உங்கள் முன்னேற்றம் 50%! 100% ஐ அடைய மேலும் 5 நண்பர்கள் அல்லது 1 குழுவுக்குப் பகிரவும்",
            step4: "அனைத்து படிநிலைகளும் முடிந்தது! இப்போது உங்கள் 15GB ஐப் பெற்றுக்கொள்ளுங்கள்",
            btnShare: "WhatsApp இல் பகிரவும்",
            btnClaim: "15GB ஐச் செயல்படுத்தவும்",
            errorNum: "தயவுசெய்து சரியான தொலைபேசி எண்ணை உள்ளிடவும்",
            verifying: "பகிர்வை சரிබලக்கிறது...",
            shockTitle: "நில்லுங்கள்! (STOP!)",
            shockMsg: "ஒரு உண்மையான இணைய மோசடியில் நடக்கும் அதே செயல்முறையைத்தான் நீங்கள் இப்போது செய்தீர்கள். இவ்வாறு பகிரும் மூலம் உங்கள் நண்பர்களையும் நீங்கள் ஆபத்தில் தள்ளுகிறீர்கள். இதிலிருந்து தப்பிக்க கீழுள்ள தகவல்களைத் தெளிவாக வாசிக்கவும்.",
            redirecting: "முக்கிய தகவல்களுக்கு அழைத்துச் செல்லப்படுகிறது..."
        },
        nav: {
            home: "முகப்பு",
            scams: "மோசடி வகைகள்",
            malware: "Malware",
            sl_safety: "நிறுவனங்கள்",
            attacks: "தாක්කුතல்கள்",
            report: "புகார்",
            readMore: "மேலும் அறிய...."
        },
        hero: {
            title: "ඩිජිටල් මෝසඩികളில் இருந்து",
            titleSpan: "எப்போதும் பாதுகாப்பாக இருங்கள்",
            subtitle: "இணைய மோசடிகள், வைரஸ்கள் (Malware) மற்றும் தரவு திருட்டுக்களில் இருந்து தப்பிக்கத் தேவையான அனைத்து தகவல்களையும் இலங்கையில் நடந்த உண்மையான சம்பவங்களையும் இங்கே பாருங்கள்.",
            btn1: "மோසடி வகைகள்",
            btn2: "பாதுகாப்பு படிநிலைகள்"
        },
        threatAlert: {
            title: "අච්චුරුතල් එච්චරක්කෛ",
            subtitle: "நேරඩි කන්කානිප්පු",
            today: "පුදිය මෝසඩි අරික්කෛගල්",
            risk: "ආපාත්තු නිලෛ",
            high: "අධිකම්"
        },
        scamTypes: {
            title: "ඩිජිටල් මෝසඩිකල්",
            titleSpan: "මට්රුම් තිරුට්ටුක්කල්",
            phishing: { title: "Phishing (පෝලි තලංගල්)", desc: "කඩවුච්චොල්ගල් මට්රුම් වංගි විපරංගලෛත් තිරුඩ උරුවාක්කප්පට්ට පෝලි ඉනෛයතලංගල්." },
            whatsapp: { title: "WhatsApp මෝසඩිකල්", desc: "නන්පර් පෝල නඩිත්තු පනම් අල්ලදු OTP කුරියීඩුගලෛක් කේක්කුම් මෝසඩිකල්." },
            promo: { title: "පෝලි විළම්පරංගල්", desc: "පිරපල නිරුවනංගලින් පෙයර්කලෛප් පයන්පடுத்தි පෝලි චලුගෛගල් අල්ලදු පරිචුගලෛ වැලංගුම් මෝසඩිකල්." },
            dataScam: { title: "ඉලවච ඩේට්ටා", desc: "ඉලවච ඩේට්ටා තරුපදාගක් කූරි උංගලෛ ආපත්තාන තලංගලුක්කු අලෛත්තු චෙල්ලුම් මෝසඩිකල්." },
            malwareSoftware: { title: "පාතික්කප්පට්ට මෙන්පොරුට්කල්", desc: "පල්වේරු වචදිගලෛත් තරුපදාගක් කූරි උංගල් චාදනංගළිල් Malware අය් නිරුවුම් මෙන්පොරුට්කල්." },
            hacking: { title: "Hacking (ඌඩුරුවල්)", desc: "උංගල් තනිප්පට්ට කණක්කුක්කල් අල්ලදු අමෛප්පුගලෛ අනුමතියින්රි අනුගි තරවුගලෛත් තිරුඩුතල්." },
            investment: { title: "මුදලීට්ටු මෝසඩිකල්", desc: "පණත්තෛ ඉරට්ටිප්පාක්කුපදාගක් කූරුම් පෝලි Crypto මට්රුම් Online මුදලීට්ටු මෝසඩිකල්." },
            fakeJobs: { title: "පෝලි වේලෛගල්", desc: "වෙළිනාට්ටු අල්ලදු වීට්ටිරුන්ප්පදේ චෙයියුම් වේලෛගලෛත් තරුපදාගක් කූරිප් පනම් පරිත්තල්." }
        },
        malware: {
            title: "Malware & Threat",
            titleSpan: "විළක්කම්",
            virus: { title: "කණිනි වෛරස්", desc: "ඒනෛය මෙන්පොරුට්කලුඩන් ඉනෛන්දු කණිනියෛප් පාතික්කුම් තීංගිලෛක්කුම් කුරියීඩුගල්." },
            worms: { title: "වෝර්ම්ස් (Worms)", desc: "වලෛප්පින්නල්ගල් මූලම් තානාගප් පරවි පාතිප්පෛ ඒර්පடுத்தුම් මෙන්පොරුට්කල්." },
            spyware: { title: "ස්පෛවෙයාර් (Spyware)", desc: "උංගල් තරවුගලෛ ඉරකචියමාගක් කන්කානිත්තුත් තිරුඩුම් මෙන්පොරුට්kල්." },
            adware: { title: "අට්වෙයාර් (Adware)", desc: "තේවෛයට්ට විළම්පරංගලෛක් කාට්ටි කණිනියෛ මන්දමාක්කුම් මෙන්පොරුට්කල්." },
            bots: { title: "Bots & Botnets", desc: "චෛපර් තාක්කුතල්ගළුක්කාග හෙක්කර්කළාල් පයන්පடுத்தප්පඩුම් පාතික්කප්පට්ට කණිනි වලෛප්පින්නල්ගල්." },
            hijacker: { title: "Browser Hijacker", desc: "උංගල් උලවියින් තේඩල් ඉයන්දිරත්තෛ අනුමතියින්රි මාට්රුම් මෙන්පොරුට්කල්." },
            hacker: { title: "හෙක්කර්කල් (Hackers)", desc: "අනුමතියින්රි කණිනි අමෛප්පුක්කුළුක්කුල් නුලෛයුම් නපර්කල්." },
            spam: { title: "ස්පේම් (Spam)", desc: "අළවුක්කු ඇතිගමාග වරුම් තේවෛයට්ට මට්රුම් පාතිප්පාන චෙය්තිගල්." }
        },
        attacks: {
            title: "ඉලංගෛයිල් නඩන්ද",
            titleSpan: "චමීපත්තිය චෛපර් තාක්කුතල්ගල්",
            attack1: { title: "Gov.lk තරවු ඉළප්පු (2023)", desc: "අරච මින්නංචල් අමෛප්පිල් ඒර්පට්ට තාක්කුතලාල් පෙරුමළවිලාන තරවුගල් නිරන්දරමාග අළින්දන." },
            attack2: { title: "වංගි SMS මෝසඩිකල් (2024)", desc: "පිරපල වංගිගලින් පෙයරිල් පෝලි SMS අනුප්පි කණක්කුක්කළිල් ඉරුන්ද පනම් තිරුඩප්පට්ට පෙරිය අළවිලාන මෝසඩි." },
            attack3: { title: "WhatsApp කඩත්තල් (Live)", desc: "පිරපලමානවර්කල් මට්රුම් පොදුමක්කළින් ආයිරක්කණක්කාන WhatsApp කණක්කුක්කල් OTP ඌඩාග කෛප්පත්ටප්පට්ට නිගල්වුගල්." },
        },
        mission: {
            title: "එමදු නෝක්කම් මට්රුම් පොරුප්පු",
            text: "verifiedhub.dpdns.org එන්පදු පොදුච් චේවැයාගප් පරාමරික්කප්පඩුම් ඔරු චුයාධීන තලමාගුම්. චෛපර් තිරුඩර්කළිඩමිරුන්දු උංගලෛප් පාදුකාප්පදුම්, ඉදුපෝන්ර මෝසඩිගළුක්කු නීංගල් මීණ්ඩුම් පලියාගාමල් ඉරුක්ක උංගළුක්කු තෙළිවූට්ටුවදුමේ එමදු ඔරේ නෝක්කමාගුම්. ඉන්ද ඉනෛයතලම් උංගල් එන්ද තගවල්ලෛයම් චේගරික්කදු, ඉදු කල්වි නෝක්කංගළුක්කාග මට්ටුමේ පයන්පடுத்தප්පඩුගිරදු."
        },
        sl_safety: {
            title: "ඉලංගෛ චෛපර්",
            titleSpan: "පාදුකාප්පු නිරුවනංගල්",
            cert: "Sri Lanka CERT|CC - අවචරකාල පතිල් කුළු",
            icta: "ICTA - තගවල් තොළිල්නුට්ප නිරුවනම්",
            slp: "චෛපර් කුට්ටප්පිරිවු (Cyber Crime Division)",
            trcsl: "TRCSL - තොලෛත්තොඩර්පු ඔළුංගුමුරෛ ආණෛයම්"
        },
        footer: {
            desc: "ඉදු ඔරු තන්නර්ව මුයට්චි. උංගල් පාදුකාප්පිට්කාග මාත්තිරමේ ඉදු චෙයල්පඩුගිරදු.",
            copyright: "Verified Hub Collective. ඔරුවරෛ ඔරුවර් පාදුකාප්පෝම්."
        }
    }
};

export default function Home() {
    const [lang, setLang] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Simulator States
    const [isSimActive, setIsSimActive] = useState(true);
    const [simStep, setSimStep] = useState(0); // 0: Input, 1-4: Progress, 5: Claimed
    const [progress, setProgress] = useState(0);
    const [showShock, setShowShock] = useState(false);
    const [phone, setPhone] = useState("");
    const [simError, setSimError] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const heroCardRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("user-lang");
        if (savedLang) setLang(savedLang);
    }, []);

    const selectLanguage = (l) => {
        setLang(l);
        localStorage.setItem("user-lang", l);
        setIsMenuOpen(false);
    };

    const handleSimNext = () => {
        if (phone.length >= 9) {
            setSimStep(1);
            setSimError(false);
        } else {
            setSimError(true);
            setTimeout(() => setSimError(false), 3000);
        }
    };

    const shareMessage = `T20 World Cup Special Offer! Get Free 15GB Data.
T20 ලෝක කුසලාන විශේෂ දීමනාව! නොමිලේ 15GB දත්ත ලබාගන්න.
T20 உலகக் கோப்பை விசேட சலுகை! இலவச 15GB டேட்டாவைப் பெறுங்கள்.

Claim here: https://verifiedhub.dpdns.org`;

    const handleShareClick = () => {
        // Simulation: Open dummy WhatsApp link (using protocol for direct app opening)
        const text = encodeURIComponent(shareMessage);
        window.location.href = `whatsapp://send?text=${text}`;

        setIsSharing(true);

        // Delay to update progress (Using 3 seconds for better UX, can be 180000 for 3 min)
        setTimeout(() => {
            const nextProgress = progress + 50;
            setProgress(nextProgress);
            if (nextProgress >= 100) {
                setSimStep(2); // Using 2 for final step
            } else {
                setSimStep(simStep + 1);
            }
            setIsSharing(false);
        }, 3000);
    };

    const handleClaim = () => {
        setShowShock(true);
        setTimeout(() => {
            setShowShock(false);
            setIsSimActive(false);
            sessionStorage.setItem("sim-completed", "true");
            // Scroll to articles section
            setTimeout(() => {
                const scamsSection = document.getElementById('scams');
                if (scamsSection) scamsSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }, 4000); // 4 seconds as requested
    };

    const handleSmartClick = (e, targetId) => {
        if (e) e.preventDefault();
        window.open("https://www.effectivegatecpm.com/k0bxmce5p?key=2a9fe1baf5a313bb98fb6904b88a41f1", "_blank");
        if (targetId) {
            const element = document.getElementById(targetId.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!lang || isSimActive) return;
        const handleMouseMove = (e) => {
            if (!heroCardRef.current || window.innerWidth < 768) return;
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            heroCardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [lang, isSimActive]);

    if (!mounted) return null;

    const displayLang = lang || 'si';
    const t = translations[displayLang];

    // SCAM SIMULATOR UI
    if (isSimActive) {
        return (
            <div className="promo-full-screen">
                {showShock && (
                    <div className="shock-overlay">
                        <div className="shock-content">
                            <ShieldAlert size={100} color="#ff4d4d" style={{ marginBottom: '2rem' }} />
                            <h1 className="shock-title">{t.sim.shockTitle}</h1>
                            <p className="shock-message">{t.sim.shockMsg}</p>
                            <div className="shock-timer">
                                <Zap size={20} style={{ display: 'inline', marginRight: '10px' }} />
                                {t.sim.redirecting}
                            </div>
                        </div>
                    </div>
                )}

                <div className="promo-container">
                    {/* Popunder site-wide reinforcement */}
                    <Script src="https://pl28687980.effectivegatecpm.com/30/74/0d/30740d84896159eed88e4bbcf948e64b.js" strategy="afterInteractive" />
                    <div className="promo-card fade-in">
                        <div className="promo-badge">{t.sim.badge}</div>
                        <h1 className="promo-title">{t.sim.title}</h1>
                        <p className="promo-subtitle">{t.sim.subtitle}</p>

                        {simStep === 0 ? (
                            <div className="fade-in">
                                <div className="input-container">
                                    <input
                                        type="tel"
                                        className="promo-input"
                                        placeholder={t.sim.inputPlaceholder}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {simError && (
                                        <p className="fade-in" style={{ color: '#ff4d4d', marginTop: '1rem', fontWeight: 'bold' }}>
                                            {t.sim.errorNum}
                                        </p>
                                    )}
                                </div>
                                <button className="whatsapp-share-btn claim-btn" onClick={handleSimNext}>
                                    {t.sim.btnNext} <Zap size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="fade-in">
                                <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>{t.sim.shareMsg}</p>
                                <div className="progress-wrapper">
                                    <div className="progress-status">
                                        {progress === 0 && t.sim.step0}
                                        {progress === 50 && t.sim.step1}
                                        {progress === 100 && t.sim.step4}
                                    </div>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                    </div>

                                    {progress < 100 ? (
                                        isSharing ? (
                                            <div className="verifying-container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(37, 211, 102, 0.1)', borderRadius: '12px', border: '1px dashed #25D366' }}>
                                                <Activity className="spin" size={24} color="#25D366" />
                                                <span style={{ marginLeft: '10px', color: '#25D366', fontWeight: 'bold' }}>{t.sim.verifying}</span>
                                            </div>
                                        ) : (
                                            <button className="whatsapp-share-btn" onClick={handleShareClick}>
                                                <MessageCircle size={24} /> {t.sim.btnShare}
                                            </button>
                                        )
                                    ) : (
                                        <button className="whatsapp-share-btn claim-btn" onClick={handleClaim}>
                                            <CheckCircle2 size={24} /> {t.sim.btnClaim}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="promo-lang-switcher" style={{ marginTop: '1.5rem', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button onClick={() => selectLanguage('si')} className={`mini-lang-btn ${displayLang === 'si' ? 'active' : ''}`}>SI</button>
                            <button onClick={() => selectLanguage('en')} className={`mini-lang-btn ${displayLang === 'en' ? 'active' : ''}`}>EN</button>
                            <button onClick={() => selectLanguage('ta')} className={`mini-lang-btn ${displayLang === 'ta' ? 'active' : ''}`}>TA</button>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.4, textAlign: 'center' }}>
                            &copy; 2026 ICC T20 Promotions Management
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // MAIN WEBSITE CONTENT (Visible after simulation)
    return (
        <>
            <nav suppressHydrationWarning>
                <div className="logo" onClick={(e) => handleSmartClick(e, 'home')} style={{ cursor: 'pointer' }}><span className="gradient-text">Verified</span><span>Hub</span></div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#home" onClick={(e) => handleSmartClick(e, 'home')}>{t.nav.home}</a></li>
                    <li><a href="#scams" onClick={(e) => handleSmartClick(e, 'scams')}>{t.nav.scams}</a></li>
                    <li><a href="#institutions" onClick={(e) => handleSmartClick(e, 'institutions')}>{t.nav.sl_safety}</a></li>
                    <li><a href="#attacks" onClick={(e) => handleSmartClick(e, 'attacks')}>{t.nav.attacks}</a></li>
                    <li><button onClick={() => setLang(null)} className="lang-switch-btn"><Globe size={16} /> {displayLang.toUpperCase()}</button></li>
                </ul>
                <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </nav>

            {/* Banner Ad 728x90 - Top Leaderboard */}
            <div className="ad-container-top" style={{ padding: '1rem 0', display: 'flex', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <div id="ad-target-728x90">
                    <Script
                        id="ad-options-728x90"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.atOptions728x90 = {
                                    'key' : '0255561aa84d3f6ffea292e3c7a0ccd5',
                                    'format' : 'iframe',
                                    'height' : 90,
                                    'width' : 728,
                                    'params' : {}
                                };
                                window.atOptions = window.atOptions728x90;
                            `
                        }}
                    />
                    <Script src="https://www.highperformanceformat.com/0255561aa84d3f6ffea292e3c7a0ccd5/invoke.js" strategy="afterInteractive" />
                </div>
            </div>

            {!isMenuOpen && (
                <button onClick={() => setLang(null)} className="mobile-lang-fab lang-switch-btn">
                    <Globe size={20} /> {displayLang.toUpperCase()}
                </button>
            )}

            <main suppressHydrationWarning>
                {/* Popunder site-wide reinforcement for articles */}
                <Script src="https://pl28687980.effectivegatecpm.com/30/74/0d/30740d84896159eed88e4bbcf948e64b.js" strategy="afterInteractive" />
                <section className="hero" id="home">
                    <div className="hero-content">
                        <h1 className="fade-in">{t.hero.title} <br /><span className="gradient-text">{t.hero.titleSpan}</span></h1>
                        <p className="subtitle fade-in-delay">{t.hero.subtitle}</p>
                        <div className="cta-group fade-in-delay-2">
                            <a href="#scams" className="btn-main" style={{ textDecoration: 'none' }} onClick={(e) => handleSmartClick(e, 'scams')}>{t.hero.btn1}</a>
                            <a href="#attacks" className="btn-secondary" style={{ textDecoration: 'none' }} onClick={(e) => handleSmartClick(e, 'attacks')}>{t.nav.attacks}</a>
                        </div>
                    </div>
                    <div className="hero-image fade-in-delay-3">
                        <div className="glass-card main-card" ref={heroCardRef}>
                            <div className="card-header">
                                <div className="alert-glow"><ShieldAlert size={32} strokeWidth={2} color="white" /></div>
                                <div className="header-text">
                                    <h3>{t.threatAlert.today}</h3>
                                    <p style={{ color: '#ff4d4d', margin: 0 }}>{t.threatAlert.subtitle}</p>
                                </div>
                            </div>
                            <div className="stats" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="stat-item">
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.threatAlert.today}</span>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>1,640+</div>
                                </div>
                                <div className="stat-item" style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.threatAlert.risk}</span>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff4d4d' }}>{t.threatAlert.high}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="scams" className="features">
                    <h2 className="section-title">{t.scamTypes.title} <span className="gradient-text">{t.scamTypes.titleSpan}</span></h2>
                    <div className="feature-grid">
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><Search className="gradient-text" size={40} /></div><h3>{t.scamTypes.phishing.title}</h3><p>{t.scamTypes.phishing.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><MessageCircle className="gradient-text" size={40} /></div><h3>{t.scamTypes.whatsapp.title}</h3><p>{t.scamTypes.whatsapp.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><Gift className="gradient-text" size={40} /></div><h3>{t.scamTypes.promo.title}</h3><p>{t.scamTypes.promo.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><Wifi className="gradient-text" size={40} /></div><h3>{t.scamTypes.dataScam.title}</h3><p>{t.scamTypes.dataScam.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><Download className="gradient-text" size={40} /></div><h3>{t.scamTypes.malwareSoftware.title}</h3><p>{t.scamTypes.malwareSoftware.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><Terminal className="gradient-text" size={40} /></div><h3>{t.scamTypes.hacking.title}</h3><p>{t.scamTypes.hacking.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><TrendingUp className="gradient-text" size={40} /></div><h3>{t.scamTypes.investment.title}</h3><p>{t.scamTypes.investment.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><div className="icon-box"><AlertCircle className="gradient-text" size={40} /></div><h3>{t.scamTypes.fakeJobs.title}</h3><p>{t.scamTypes.fakeJobs.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                    </div>
                </section>

                <section className="ad-section-rectangle" style={{ padding: '2rem 10%', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Banner Ad 300x250 - Rectangle */}
                    <div id="ad-target-300x250">
                        <Script
                            id="ad-options-300x250"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.atOptions300x250 = {
                                        'key' : 'cee892590aa631fba73ab14a131d9973',
                                        'format' : 'iframe',
                                        'height' : 250,
                                        'width' : 300,
                                        'params' : {}
                                    };
                                    window.atOptions = window.atOptions300x250;
                                `
                            }}
                        />
                        <Script src="https://www.highperformanceformat.com/cee892590aa631fba73ab14a131d9973/invoke.js" strategy="afterInteractive" />
                    </div>

                    <div className="native-ad-wrapper" style={{ flex: '1', minWidth: '300px' }}>
                        <Script
                            async="async"
                            data-cfasync="false"
                            src="https://pl28693612.effectivegatecpm.com/914d0b8f1d36d0a96ccf850e522eb19c/invoke.js"
                            strategy="afterInteractive"
                        />
                        <div id="container-914d0b8f1d36d0a96ccf850e522eb19c" style={{ width: '100%', minHeight: '250px' }}></div>
                    </div>
                </section>

                <section id="malware" className="features" style={{ background: 'rgba(0, 242, 254, 0.03)' }}>
                    <h2 className="section-title">{t.malware.title} <span className="gradient-text">{t.malware.titleSpan}</span></h2>
                    <div className="feature-grid thin">
                        {Object.entries(t.malware).filter(([key]) => !['title', 'titleSpan'].includes(key)).map(([key, item]) => (
                            <div className="feature-card small-pad" key={key} onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Bug size={20} className="gradient-text" /><h4 style={{ margin: 0 }}>{item.title}</h4>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.desc}</p>
                                <span className="read-more-link small">{t.nav.readMore}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="institutions" className="features">
                    <h2 className="section-title">{t.sl_safety.title} <span className="gradient-text">{t.sl_safety.titleSpan}</span></h2>
                    <div className="institution-grid">
                        <div className="glass-card inst-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><ShieldHalf size={24} className="gradient-text" /><p>{t.sl_safety.cert}</p><ExternalLink size={16} className="ext-link" /></div>
                        <div className="glass-card inst-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><Cpu size={24} className="gradient-text" /><p>{t.sl_safety.icta}</p><ExternalLink size={16} className="ext-link" /></div>
                        <div className="glass-card inst-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><Activity size={24} className="gradient-text" /><p>{t.sl_safety.slp}</p><ExternalLink size={16} className="ext-link" /></div>
                        <div className="glass-card inst-card" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><Globe size={24} className="gradient-text" /><p>{t.sl_safety.trcsl}</p><ExternalLink size={16} className="ext-link" /></div>
                    </div>
                </section>

                <section id="attacks" className="features" style={{ background: 'rgba(255, 77, 77, 0.04)', paddingBottom: '8rem' }}>
                    <h2 className="section-title">{t.attacks.title} <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ff4d4d, #f9cb28)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.attacks.titleSpan}</span></h2>
                    <div className="feature-grid thin">
                        <div className="feature-card dark-accent" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><History className="gradient-text" size={32} /><h4>{t.attacks.attack1.title}</h4><p>{t.attacks.attack1.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card dark-accent" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><Shield size={32} className="gradient-text" /><h4>{t.attacks.attack2.title}</h4><p>{t.attacks.attack2.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                        <div className="feature-card dark-accent" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}><AlertTriangle size={32} className="gradient-text" /><h4>{t.attacks.attack3.title}</h4><p>{t.attacks.attack3.desc}</p><span className="read-more-link">{t.nav.readMore}</span></div>
                    </div>

                    <div className="mission-container">
                        <div className="glass-card mission-box fade-in-delay-3" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}>
                            <UserX size={54} className="gradient-text" style={{ marginBottom: '1.5rem' }} />
                            <h2 style={{ marginBottom: '1.5rem' }}>{t.mission.title}</h2>
                            <p style={{ opacity: 0.95, lineHeight: '2', fontSize: '1.15rem', fontWeight: '400' }}>
                                {t.mission.text}
                            </p>
                            <span className="read-more-link" style={{ marginTop: "2rem", display: "block" }}>{t.nav.readMore}</span>
                        </div>
                    </div>
                </section>

                {/* Banner Ad 320x50 - Mobile sticky/bottom */}
                <section className="ad-section-mobile" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
                    <div id="ad-target-320x50">
                        <Script
                            id="ad-options-320x50"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.atOptions320x50 = {
                                        'key' : 'f2e63fbc08b4c3d0d87309cb1885d7da',
                                        'format' : 'iframe',
                                        'height' : 50,
                                        'width' : 320,
                                        'params' : {}
                                    };
                                    window.atOptions = window.atOptions320x50;
                                `
                            }}
                        />
                        <Script src="https://www.highperformanceformat.com/f2e63fbc08b4c3d0d87309cb1885d7da/invoke.js" strategy="afterInteractive" />
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-info">
                        <h3 className="logo"><span className="gradient-text">Verified</span>Hub</h3>
                        <p>{t.footer.desc}</p>
                    </div>
                    <div className="footer-nav">
                        <h4>Security Awareness</h4>
                        <ul>
                            <li onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}>Public Warning</li>
                            <li onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}>Report Scam</li>
                            <li onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}>SL Cyber Safety</li>
                        </ul>
                    </div>
                </div>
                <p className="copyright" onClick={(e) => handleSmartClick(e)} style={{ cursor: 'pointer' }}>&copy; 2026 {t.footer.copyright}</p>
            </footer>

            <div className="whatsapp-widget-container fade-in active">
                <div className="chat-label">Share with Friends</div>
                <button
                    className="whatsapp-float-btn"
                    onClick={() => {
                        const text = encodeURIComponent(shareMessage);
                        window.location.href = `whatsapp://send?text=${text}`;
                    }}
                    title="Share on WhatsApp"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                        alt="WhatsApp"
                        width="38"
                        height="38"
                    />
                </button>
            </div>

            <style jsx>{`
        .mobile-toggle { display: none; cursor: pointer; color: white; }
        .institution-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 0 auto; }
        .mission-container { max-width: 900px; margin: 6rem auto 0; padding: 0 1rem; width: 100%; }
        .mission-box { 
          text-align: center; 
          border-radius: 40px; 
          border: 1px solid rgba(0, 242, 254, 0.3); 
          padding: 4rem 2rem; 
          background: rgba(5,5,5,0.6); 
          backdrop-filter: blur(20px);
          max-width: none; 
        }
        
        @media (max-width: 968px) {
            .mobile-toggle { display: block; z-index: 1001; }
            .nav-links {
                position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
                background: #000; flex-direction: column; justify-content: center; align-items: center;
                transform: translateX(100%); transition: 0.4s ease;
                gap: 2rem;
            }
            .nav-links.active { transform: translateX(0); }
            .hero { padding: 4rem 5%; flex-direction: column; text-align: center; }
            h1 { font-size: 2.8rem; }
            .hero-image { justify-content: center; width: 100%; }
        }

        .footer-content { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem; text-align: left; margin-bottom: 4rem; padding: 0 10%; }
        .footer-info { flex: 1; min-width: 200px; }
        .footer-nav { flex: 1; min-width: 150px; }
        .footer-nav ul { list-style: none; margin-top: 1rem; color: var(--text-secondary); line-height: 2; }
        .copyright { border-top: 1px solid var(--glass-border); padding: 2rem 10%; font-size: 0.8rem; opacity: 0.6; text-align: center; }
      `}</style>
        </>
    );
}
