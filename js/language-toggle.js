/* Doron Amsterdam Tours: language toggle.
   Swaps every [data-i18n] element's text between English and Hebrew,
   flips the document direction to RTL for Hebrew, and remembers the
   visitor's choice in localStorage. */

(function () {
  "use strict";

  var STORAGE_KEY = "doron-site-lang";

  var translations = {
    en: {
      "meta.title": "Doron Amsterdam Tours: Canal walks, day trips & tickets",
      "meta.description": "Private and small-group Amsterdam tours and countryside day trips, planned and personally guided by Doron.",
      "nav.skip": "Skip to content",
      "brand.sub": "Amsterdam Tours",
      "nav.packages": "Tour Packages",
      "nav.about": "About Doron",
      "nav.contact": "Contact",

      "hero.eyebrow": "Private & small-group tours since 2013",
      "hero.title": "Amsterdam, guided the way locals live it",
      "hero.sub": "Canal walks and countryside day trips, planned and personally guided by Doron, who loves this city as much as you're about to.",
      "hero.cta1": "See tour packages",
      "hero.cta2": "WhatsApp Doron",
      "hero.imgAlt": "Watercolor illustration of colorful canal houses along an Amsterdam canal.",

      "trust.years": "years guiding travelers",
      "trust.travelers": "travelers welcomed",
      "trust.rating": "average tour rating",
      "trust.languages": "languages spoken on tour",

      "packages.eyebrow": "Tour packages",
      "packages.title": "Three ways to see Holland with Doron",
      "packages.lead": "Every route is walked and re-walked before it reaches a guest, with small-group energy and room to wander.",
      "packages.perPerson": "per person",
      "packages.cta": "View details",
      "packages.p1.badge": "4–5 hours",
      "packages.p1.title": "Volendam & Zaanse Schans",
      "packages.p1.desc": "Hotel pickup at 09:00 for shopping time in the fishing village of Volendam, then Zaanse Schans for the wooden shoe and cheese workshops, a small chocolate museum, and an optional windmill visit.",
      "packages.p1.price": "€65",
      "packages.p1.imgAlt": "A wide Dutch lake with a wooded island and a small tour boat on the water.",
      "packages.p2.badge": "Full day",
      "packages.p2.title": "Batavia Stad & Volendam",
      "packages.p2.desc": "Hotel pickup at 09:00 for two hours of VIP outlet shopping at Batavia Stad (an extra 10% off), then on to Volendam for a cheese-farm tasting, wooden shoe-making, dress-up photos and smoked herring.",
      "packages.p2.price": "€85",
      "packages.p2.imgAlt": "A quiet tree-lined canal running through a Dutch neighbourhood park.",
      "packages.p3.badge": "Max. 4 people",
      "packages.p3.title": "Giethoorn & Volendam",
      "packages.p3.desc": "Hotel pickup at 09:00 to walk through Giethoorn and hear the story behind this small, magical village, then on to Volendam for a full tour, a cheese and wooden shoe experience, and return by around 18:00.",
      "packages.p3.price": "€120",
      "packages.p3.imgAlt": "A small group riding a boat down a narrow canal lined with reeds and trees.",


      "about.eyebrow": "About Doron",
      "about.title": "A local by birth, a guide by passion",
      "about.p1": "I was born in Amsterdam, a city that sparked my lifelong passion for history, culture, and meeting people from around the world.",
      "about.p2": "In 2016, after completing a tour guide seminar, I made one of the best decisions of my life: becoming a professional tourist guide. Since then, I've been proud to combine my love of teaching with my passion for sharing the stories, history, and hidden gems of this beautiful city.",
      "about.p3": "Whether you're visiting Amsterdam for the first time or returning to discover something new, I'd love to show you the city and the country through the eyes of a local. Book a tour with me, and let's create an unforgettable experience together!",
      "about.imgAlt": "Doron at the wheel of a small tour boat on a sunny canal.",
      "about.stat1": "years as a licensed guide",
      "about.stat2": "personally guided by Doron",
      "about.stat3": "languages on tour",

      "gallery.caption": "Slow evenings by the water are part of the plan too. Not every stop needs an itinerary.",
      "gallery.imgAlt": "Two travelers sitting on a bench, looking out over a calm Dutch lake at dusk.",

      "testimonials.eyebrow": "From recent guests",
      "testimonials.title": "What it's like to travel with Doron",
      "testimonials.q1": "Doron knew exactly when to talk and when to just let us look around. It felt like being shown the city by someone who actually lives here.",
      "testimonials.a1": "Noa, family trip",
      "testimonials.q2": "Booked the countryside day trip on a whim and it ended up being the highlight of the whole week. Small group, relaxed pace, great stories.",
      "testimonials.a2": "Michael, solo traveler",
      "testimonials.q3": "Doron planned our whole three days and was easy to reach the entire time: quick replies, clear plans, zero stress.",
      "testimonials.a3": "Talia & Ron, anniversary trip",

      "footer.contactTitle": "Get in touch",
      "footer.hours": "Office hours: Mon–Fri, 10:00–18:00",
      "footer.whatsapp": "Message Doron on WhatsApp",
      "footer.exploreTitle": "Explore",
      "footer.copyright": "© 2026 Doron Amsterdam Tours. All rights reserved."
    },

    he: {
      "meta.title": "דורון טיולי אמסטרדם: סיורי תעלות, טיולי יום וכרטיסים",
      "meta.description": "סיורים פרטיים וקבוצות קטנות באמסטרדם וטיולי יום בכפרים ההולנדיים, בתכנון ובהדרכה אישית של דורון.",
      "nav.skip": "דלג לתוכן",
      "brand.sub": "טיולי אמסטרדם",
      "nav.packages": "חבילות טיולים",
      "nav.about": "אודות דורון",
      "nav.contact": "צור קשר",

      "hero.eyebrow": "סיורים פרטיים וקבוצות קטנות משנת 2013",
      "hero.title": "אמסטרדם, בדיוק כמו שהתושבים המקומיים חיים אותה",
      "hero.sub": "סיורי תעלות וטיולי יום בכפרים ההולנדיים, בתכנון ובהדרכה אישית של דורון, שאוהב את העיר הזו לא פחות מכם.",
      "hero.cta1": "לחבילות הטיולים",
      "hero.cta2": "וואטסאפ לדורון",
      "hero.imgAlt": "איור בצבעי מים של בתי תעלה צבעוניים לאורך תעלה באמסטרדם.",

      "trust.years": "שנות הדרכה למטיילים",
      "trust.travelers": "מטיילים שכבר טיילו איתנו",
      "trust.rating": "דירוג ממוצע לסיור",
      "trust.languages": "שפות דיבור בסיורים",

      "packages.eyebrow": "חבילות טיולים",
      "packages.title": "שלוש דרכים לראות את הולנד עם דורון",
      "packages.lead": "כל מסלול נבדק ונבדק שוב לפני שהוא מגיע למטייל, עם אנרגיה קבוצתית קטנה ומקום לשוטט בו.",
      "packages.perPerson": "לאדם",
      "packages.cta": "לפרטי הטיול",
      "packages.p1.badge": "4–5 שעות",
      "packages.p1.title": "וולנדם וזאנסה סכאנס",
      "packages.p1.desc": "איסוף מהמלון בשעה 09:00, זמן קניות בכפר הדייגים וולנדם, ולאחר מכן זאנסה סכאנס עם סדנת הקלשונים והגבינה, מוזיאון שוקולד קטן וביקור אופציונלי בטחנת רוח.",
      "packages.p1.price": "€65",
      "packages.p1.imgAlt": "אגם הולנדי רחב עם אי מיוער וסירת טיולים קטנה על המים.",
      "packages.p2.badge": "יום מלא",
      "packages.p2.title": "בטאביה סטאד ווולנדם",
      "packages.p2.desc": "איסוף מהמלון בשעה 09:00 לשעתיים של קניות VIP באאוטלט בטאביה סטאד (10% הנחה נוספת), ולאחר מכן וולנדם עם טעימות בחוות גבינה, הכנת קלשונים מעץ, תמונות בתלבושת הולנדית ודג מלוח מעושן.",
      "packages.p2.price": "€85",
      "packages.p2.imgAlt": "תעלה שקטה עטופת עצים החוצה פארק שכונתי הולנדי.",
      "packages.p3.badge": "מקסימום 4 אנשים",
      "packages.p3.title": "חיטהורן ווולנדם",
      "packages.p3.desc": "איסוף מהמלון בשעה 09:00 להליכה רגלית בחיטהורן ולשמיעת הסיפור של הכפר הקטן והקסום הזה, ולאחר מכן וולנדם עם סיור מלא, חוויית גבינה וקלשונים מעץ, וחזרה למלון בסביבות השעה 18:00.",
      "packages.p3.price": "€120",
      "packages.p3.imgAlt": "קבוצה קטנה שטה בסירה בתעלה צרה עטורת קנים ועצים.",


      "about.eyebrow": "אודות דורון",
      "about.title": "מקומי מלידה, מדריך מתשוקה",
      "about.p1": "נולדתי באמסטרדם, עיר שהצתה בי תשוקה לכל החיים להיסטוריה, לתרבות ולהכרת אנשים מכל רחבי העולם.",
      "about.p2": "בשנת 2016, לאחר שסיימתי סמינר להכשרת מדריכי טיולים, קיבלתי אחת ההחלטות הטובות בחיי: להפוך למדריך תיירים מקצועי. מאז, אני גאה לשלב בין האהבה שלי להוראה לבין התשוקה שלי לשתף בסיפורים, בהיסטוריה ובפינות הנסתרות של העיר היפה הזו.",
      "about.p3": "בין אם אתם מבקרים באמסטרדם בפעם הראשונה או חוזרים כדי לגלות משהו חדש, אשמח להראות לכם את העיר ואת המדינה דרך העיניים של מקומי. הזמינו סיור איתי, ובואו ניצור יחד חוויה בלתי נשכחת!",
      "about.imgAlt": "דורון מאחורי ההגה של סירת טיולים קטנה בתעלה שטופת שמש.",
      "about.stat1": "שנות ניסיון כמדריך מוסמך",
      "about.stat2": "בהדרכה אישית של דורון",
      "about.stat3": "שפות בסיורים",

      "gallery.caption": "גם ערבים נינוחים ליד המים הם חלק מהתוכנית. לא כל עצירה חייבת מסלול.",
      "gallery.imgAlt": "שני מטיילים יושבים על ספסל ומביטים אל אגם הולנדי רגוע בשעת בין ערביים.",

      "testimonials.eyebrow": "ממטיילים אחרונים",
      "testimonials.title": "איך זה מרגיש לטייל עם דורון",
      "testimonials.q1": "דורון ידע בדיוק מתי לדבר ומתי פשוט לתת לנו להסתכל סביב. הרגשנו שמישהו שבאמת גר כאן מראה לנו את העיר.",
      "testimonials.a1": "נועה, טיול משפחתי",
      "testimonials.q2": "הזמנו את טיול הכפרים בלי לתכנן מראש והוא הפך לשיא של כל השבוע. קבוצה קטנה, קצב נינוח, סיפורים מעולים.",
      "testimonials.a2": "מיכאל, מטייל יחיד",
      "testimonials.q3": "דורון תכנן לנו את כל שלושת הימים והיה זמין לאורך כל הדרך: תשובות מהירות, תוכניות ברורות, אפס לחץ.",
      "testimonials.a3": "טליה ורון, טיול לרגל יום נישואין",

      "footer.contactTitle": "צרו קשר",
      "footer.hours": "שעות פעילות המשרד: ימי ב'–ו', 10:00–18:00",
      "footer.whatsapp": "שלחו לנו הודעה בוואטסאפ",
      "footer.exploreTitle": "ניווט מהיר",
      "footer.copyright": "© 2026 דורון טיולי אמסטרדם. כל הזכויות שמורות."
    }
  };

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.en;

    document.documentElement.lang = lang === "he" ? "he" : "en";
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";

    // Swap every element carrying a translation key.
    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      var value = dict[key];
      if (value === undefined) return;

      // Elements that need to update an attribute (e.g. meta description)
      // are flagged with data-i18n-attr="content|placeholder|aria-label".
      var attr = node.getAttribute("data-i18n-attr");
      if (attr) {
        node.setAttribute(attr, value);
      } else {
        node.textContent = value;
      }
    });

    // Update the toggle button's own labels: it always shows the
    // language you're currently in, and the language you'd switch to.
    var currentLabel = document.querySelector('[data-lang-label="current"]');
    var targetLabel = document.querySelector('[data-lang-label="target"]');
    if (currentLabel && targetLabel) {
      if (lang === "he") {
        currentLabel.textContent = "עב";
        targetLabel.textContent = "EN";
      } else {
        currentLabel.textContent = "EN";
        targetLabel.textContent = "עב";
      }
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // localStorage may be unavailable (privacy mode, etc.); fail silently.
    }
  }

  function getInitialLanguage() {
    var stored;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      stored = null;
    }
    if (stored === "en" || stored === "he") return stored;

    // Fall back to the browser's preferred language on first visit.
    var browserLang = (navigator.language || "en").toLowerCase();
    return browserLang.indexOf("he") === 0 ? "he" : "en";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("lang-toggle");
    var currentLang = getInitialLanguage();

    applyLanguage(currentLang);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        currentLang = currentLang === "he" ? "en" : "he";
        applyLanguage(currentLang);
      });
    }
  });
})();