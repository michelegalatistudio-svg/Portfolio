
(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=window.matchMedia('(pointer: fine)').matches;
  const $=(sel,root=document)=>root.querySelector(sel);
  const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
  const nav=$('#site-nav'),progress=$('#progress'),backtop=$('#backtop');
  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;
    nav.classList.toggle('scrolled',scrollY>30);
    backtop.classList.toggle('show',scrollY>600);
  };
  addEventListener('scroll',updateScroll,{passive:true});addEventListener('resize',updateScroll,{passive:true});updateScroll();
  backtop.addEventListener('click',()=>scrollTo({top:0,behavior:reduceMotion?'instant':'smooth'}));
  if('IntersectionObserver' in window && !reduceMotion){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
    }),{threshold:.09,rootMargin:'0px 0px -30px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  }else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
  const menu=$('#mobile-menu'),toggle=$('#menu-toggle');
  const i18n = {
    "it": {
      "skip": "Vai al contenuto",
      "about": "Profilo",
      "work": "Progetti",
      "process": "Metodo",
      "contact": "Contatti",
      "available": "Aperto a nuove idee",
      "disciplines": "DESIGN × FINANZA × IA",
      "eyebrow": "Michele Galati · Designer UI/UX e visuale",
      "location": "IN ITALIA · PORTFOLIO 2026",
      "hero1": "Tu",
      "hero2": "immagini",
      "hero3": "io progetto",
      "heroIntro": "Sono Michele. Progetto esperienze digitali chiare ed espressive all’incrocio tra finanza, tecnologia e IA.",
      "scroll": "SCORRI PER ESPLORARE <span>↓</span>",
      "aboutTag": "01 / Profilo e approccio",
      "aboutTitle": "Il design deve essere piacevole da <em>usare</em> quanto da guardare.",
      "aboutAside": "Curiosità, chiarezza e interazioni curate. Il funzionamento di un prodotto mi interessa quanto il suo aspetto.",
      "aboutIntro": "Unisco <strong>pensiero visivo</strong>, design centrato sulle persone e tecnologie emergenti per rendere semplice ciò che è complesso.",
      "uiux": "Design UI/UX",
      "visual": "Design visivo",
      "systems": "Sistemi di design",
      "agents": "Agenti IA",
      "prototyping": "Prototipazione",
      "uxStat": "Ricerca, flussi e test",
      "uiStat": "Interfacce e sistemi visivi",
      "aiStat": "Agenti e flussi digitali",
      "ai": "IA",
      "workTag": "02 / Progetti selezionati",
      "workTitle": "Alcuni dei<br/><em>miei progetti.</em>",
      "all": "Tutti i progetti",
      "aiFilter": "IA e sistemi",
      "bankMock": "La tua banca",
      "bankTitle": "La banca,<br/>ripensata.",
      "bankType": "Intesa Sanpaolo · Concept personale",
      "bankCopy": "Un redesign personale per rendere più chiare le operazioni bancarie, dai pagamenti quotidiani agli investimenti.",
      "testMock": "Esperienza digitale",
      "discover": "Scopri.",
      "testTitle": "Migliorare<br/>con i test.",
      "testType": "Ricerca UX · Progetto formativo",
      "testCopy": "Un’esplorazione pratica dei test di usabilità per osservare il comportamento delle persone e migliorare le esperienze digitali.",
      "agentMock": "Automazione e IA",
      "smarter": "Lavora meglio.",
      "agentTitle": "Automazione<br/>a misura d’uomo.",
      "agentType": "Agenti IA · n8n · Progetto formativo",
      "agentCopy": "Un flusso conversazionale che combina automazione, revisione esplicita e controllo umano.",
      "flowMock": "PANORAMICA<br/>PROGETTO",
      "flowTitle": "Lavoro in<br/>movimento.",
      "flowType": "Flow · Concept per la gestione del lavoro",
      "flowCopy": "Un approccio visivo per seguire progetti, responsabilità e scadenze, pensato per dare chiarezza ai team.",
      "processTag": "03 / Come lavoro",
      "processTitle": "Dalla complessità<br/>alla <em>chiarezza.</em>",
      "processIntro": "Il buon design nasce da una serie di decisioni. Con questo metodo traduco bisogni reali in interfacce utili e coinvolgenti.",
      "understand": "Comprendere",
      "understandCopy": "Esploro il contesto, definisco il problema e individuo le persone a cui si rivolge l’esperienza e i loro bisogni.",
      "structure": "Strutturare",
      "structureCopy": "Trasformo i risultati della ricerca in percorsi chiari, architettura dell’informazione e primi wireframe.",
      "design": "Progettare",
      "designCopy": "Definisco un linguaggio visivo, disegno interfacce dettagliate e creo animazioni al servizio dell’usabilità.",
      "refine": "Testare e affinare",
      "refineCopy": "Creo prototipi, testo le attività principali e miglioro il progetto in base all’esperienza delle persone.",
      "ticker": "DESIGN × FINANZA — IA —",
      "contactTag": "04 / Parliamone",
      "contactTitle": "Hai qualcosa<br/><em>in mente?</em>",
      "contactCopy": "Mi interessano i prodotti digitali che rispondono a bisogni reali, le collaborazioni e le idee da esplorare.",
      "instagram": "Scrivimi su Instagram ↗",
      "seeWork": "Esplora i progetti ↗",
      "footer": "Progettato con cura. Creato per il web.",
      "back": "Torna all’inizio ↑",
      "focus": "Obiettivi",
      "approach": "Approccio",
      "note": "Anteprima del portfolio. Il caso studio dettagliato e le schermate definitive saranno aggiunti in seguito.",
      "language": "Lingua",
      "menuOpen": "Apri il menu",
      "menuClose": "Chiudi il menu",
      "menuText": "MENU +",
      "closeText": "CHIUDI ×",
      "brandLabel": "michele.workspace — torna all’inizio",
      "mobileLabel": "Navigazione mobile",
      "filterLabel": "Filtra i progetti",
      "projectLabel": "Apri i dettagli del progetto",
      "flowLabel": "Apri i dettagli del progetto Flow",
      "closeLabel": "Chiudi i dettagli del progetto",
      "backLabel": "Torna all’inizio",
      "description": "Michele Galati, designer UI/UX. Progetti selezionati di fintech, design visivo e IA.",
      "projectNumber": "PROGETTO",
      "pageTitle": "michele.workspace — UI/UX, Fintech e IA",
      "bankBalance": "24.580 €",
      "navLabel": "Navigazione principale",
      "details": {
        "banking": {
          "label": "FINTECH / REDESIGN PERSONALE",
          "title": "La banca, ripensata.",
          "summary": "Un progetto personale per semplificare l’esperienza di mobile banking, dal riepilogo ai movimenti, ai bonifici e agli investimenti.",
          "focus": "Gerarchia delle informazioni, chiarezza, navigazione tra i prodotti finanziari e coerenza dell’interfaccia.",
          "approach": "Analizzare l’esperienza esistente, individuare gli ostacoli, riprogettare le schermate chiave e collegarle in un prototipo coerente."
        },
        "testing": {
          "label": "RICERCA UX / PROGETTO FORMATIVO",
          "title": "Migliorare con i test.",
          "summary": "Esercizi di ricerca e test di usabilità per capire come il feedback delle persone possa guidare le scelte d’interfaccia.",
          "focus": "Comportamento delle persone, chiarezza delle attività, osservazioni e iterazione basata sui riscontri.",
          "approach": "Preparare le attività, osservare le sessioni, organizzare i risultati e tradurli in miglioramenti dell’interfaccia."
        },
        "agents": {
          "label": "IA / SUPERVISIONE UMANA",
          "title": "Automazione a misura d’uomo.",
          "summary": "Un progetto formativo in n8n sulle azioni assistite dall’IA, con approvazione umana esplicita prima dei passaggi sensibili.",
          "focus": "Interazione conversazionale, punti decisionali e stati di sistema comprensibili.",
          "approach": "Mappare il flusso, collegare modello e strumenti, progettare i percorsi di approvazione e rifiuto e testare gli scenari illustrati."
        },
        "flow": {
          "label": "CONCEPT DI PRODOTTO / FLUSSI DI TEAM",
          "title": "Lavoro in movimento.",
          "summary": "Flow è uno spazio di lavoro visivo in evoluzione per gestire clienti, attività di progetto, responsabilità e scadenze.",
          "focus": "Stato dei progetti a colpo d’occhio, responsabilità chiare, relazioni visive tra attività e organizzazione responsive delle informazioni.",
          "approach": "Partire da un prototipo funzionante, semplificare l’architettura e verificare quali informazioni servono per prime a chi collabora."
        }
      }
    },
    "en": {
      "skip": "Skip to content",
      "about": "About",
      "work": "Work",
      "process": "Process",
      "contact": "Contact",
      "available": "Available for ideas",
      "disciplines": "DESIGN × FINANCE × AI",
      "eyebrow": "Michele Galati · UI/UX &amp; visual designer",
      "location": "BASED IN ITALY · PORTFOLIO 2026",
      "hero1": "You",
      "hero2": "imagine",
      "hero3": "I design",
      "heroIntro": "I’m Michele. I design clear, expressive digital experiences at the intersection of finance, technology and AI.",
      "scroll": "SCROLL TO EXPLORE <span>↓</span>",
      "aboutTag": "01 / About &amp; approach",
      "aboutTitle": "Design should <em>feel</em> as good as it looks.",
      "aboutAside": "Curiosity, clarity and thoughtful interactions. I care about how products work just as much as how they look.",
      "aboutIntro": "I combine <strong>visual thinking</strong>, user-centered design and emerging technology to make complex things feel simple.",
      "uiux": "UI/UX Design",
      "visual": "Visual Design",
      "systems": "Design Systems",
      "agents": "AI Agents",
      "prototyping": "Prototyping",
      "uxStat": "Research, flows &amp; testing",
      "uiStat": "Interfaces &amp; visual systems",
      "aiStat": "Agents &amp; digital workflows",
      "ai": "AI",
      "workTag": "02 / Selected work",
      "workTitle": "A few things<br/><em>I've designed.</em>",
      "all": "All work",
      "aiFilter": "AI &amp; systems",
      "bankMock": "Your banking",
      "bankTitle": "Banking,<br/>reimagined.",
      "bankType": "Intesa Sanpaolo · Personal concept",
      "bankCopy": "A personal redesign exploring clearer banking journeys, from everyday transactions to investments.",
      "testMock": "Digital experience",
      "discover": "Discover.",
      "testTitle": "Better by<br/>testing.",
      "testType": "UX research · Learning project",
      "testCopy": "A practical exploration of usability testing, observing user behavior and refining digital experiences.",
      "agentMock": "Automation &amp; AI",
      "smarter": "Work smarter.",
      "agentTitle": "Human-first<br/>automation.",
      "agentType": "AI Agents · n8n · Learning project",
      "agentCopy": "A conversational workflow that combines automation with explicit human review and control.",
      "flowMock": "PROJECT<br/>OVERVIEW",
      "flowTitle": "Work, in<br/>motion.",
      "flowType": "Flow · Workflow product concept",
      "flowCopy": "A visual approach to tracking projects, ownership and deadlines, built around clarity for teams.",
      "processTag": "03 / How I work",
      "processTitle": "From messy<br/>to <em>meaningful.</em>",
      "processIntro": "Good design is a sequence of decisions. Here’s the process I use to connect real needs with useful, engaging interfaces.",
      "understand": "Understand",
      "understandCopy": "Explore the context, define the problem and identify the people and needs the experience should serve.",
      "structure": "Structure",
      "structureCopy": "Turn insights into clear user journeys, information architecture and early wireframes.",
      "design": "Design",
      "designCopy": "Build a visual language, detailed interfaces and thoughtful motion that supports usability.",
      "refine": "Test &amp; refine",
      "refineCopy": "Prototype, test key tasks and iterate based on what people actually experience.",
      "ticker": "DESIGN × FINANCE — AI —",
      "contactTag": "04 / Let’s connect",
      "contactTitle": "Have something<br/><em>in mind?</em>",
      "contactCopy": "I’m always curious about meaningful digital products, thoughtful collaborations and ideas worth exploring.",
      "instagram": "Say hello on Instagram ↗",
      "seeWork": "Explore selected work ↗",
      "footer": "Designed with intention. Built for the web.",
      "back": "Back to top ↑",
      "focus": "Focus",
      "approach": "Approach",
      "note": "Portfolio preview — detailed case study and final project screenshots will be added later.",
      "language": "Language",
      "menuOpen": "Open menu",
      "menuClose": "Close menu",
      "menuText": "MENU +",
      "closeText": "CLOSE ×",
      "brandLabel": "michele.workspace — back to top",
      "mobileLabel": "Mobile navigation",
      "filterLabel": "Filter projects",
      "projectLabel": "Open project details",
      "flowLabel": "Open Flow project details",
      "closeLabel": "Close project details",
      "backLabel": "Back to top",
      "description": "Michele Galati — UI/UX designer. Selected work across fintech, visual design and AI experiences.",
      "projectNumber": "PROJECT",
      "pageTitle": "michele.workspace — UI/UX, Fintech & AI",
      "bankBalance": "€24,580",
      "navLabel": "Main navigation",
      "details": {
        "banking": {
          "label": "FINTECH / PERSONAL REDESIGN",
          "title": "Banking, reimagined.",
          "summary": "A self-initiated exploration of a more focused mobile banking experience, including overview, movements, transfers and investment journeys.",
          "focus": "Information hierarchy, clarity, financial product navigation and consistent UI patterns.",
          "approach": "Analyze the existing experience, identify friction, redesign key screens and connect them into a coherent prototype."
        },
        "testing": {
          "label": "UX RESEARCH / LEARNING PROJECT",
          "title": "Better by testing.",
          "summary": "Usability research and testing exercises exploring how real feedback can guide interface decisions.",
          "focus": "User behavior, task clarity, observations and evidence-based iteration.",
          "approach": "Prepare tasks, observe sessions, organize findings and turn insights into interface improvements."
        },
        "agents": {
          "label": "AI / HUMAN-IN-THE-LOOP",
          "title": "Human-first automation.",
          "summary": "An n8n learning project exploring AI-assisted actions with explicit human approval before sensitive workflow steps.",
          "focus": "Conversational interaction, decision checkpoints and understandable system states.",
          "approach": "Map the workflow, connect model and tools, design approval/decline branches and test the demonstrated scenarios."
        },
        "flow": {
          "label": "PRODUCT CONCEPT / TEAM WORKFLOWS",
          "title": "Work, in motion.",
          "summary": "Flow is an evolving visual workspace concept for managing clients, project activities, ownership and deadlines.",
          "focus": "At-a-glance project status, clear responsibilities, visual task relationships and responsive information design.",
          "approach": "Iterate from a working prototype, simplify the architecture and test what information collaborators need first."
        }
      }
    },
    "de": {
      "skip": "Zum Inhalt springen",
      "about": "Über mich",
      "work": "Projekte",
      "process": "Vorgehen",
      "contact": "Kontakt",
      "available": "Offen für neue Ideen",
      "disciplines": "DESIGN × FINANZEN × KI",
      "eyebrow": "Michele Galati · UI/UX- und Visual Designer",
      "location": "IN ITALIEN · PORTFOLIO 2026",
      "hero1": "Du hast",
      "hero2": "die Idee",
      "hero3": "ich gestalte",
      "heroIntro": "Ich bin Michele. Ich gestalte klare, ausdrucksstarke digitale Erlebnisse an der Schnittstelle von Finanzen, Technologie und KI.",
      "scroll": "SCROLLEN UND ENTDECKEN <span>↓</span>",
      "aboutTag": "01 / Profil und Ansatz",
      "aboutTitle": "Design sollte sich so gut <em>anfühlen</em>, wie es aussieht.",
      "aboutAside": "Neugier, Klarheit und durchdachte Interaktionen. Wie Produkte funktionieren, ist mir genauso wichtig wie ihr Aussehen.",
      "aboutIntro": "Ich verbinde <strong>visuelles Denken</strong>, nutzerzentriertes Design und neue Technologien, um Komplexes verständlich zu machen.",
      "uiux": "UI/UX-Design",
      "visual": "Visuelles Design",
      "systems": "Designsysteme",
      "agents": "KI-Agenten",
      "prototyping": "Prototyping",
      "uxStat": "Recherche, Abläufe und Tests",
      "uiStat": "Oberflächen und visuelle Systeme",
      "aiStat": "Agenten und digitale Abläufe",
      "ai": "KI",
      "workTag": "02 / Ausgewählte Projekte",
      "workTitle": "Ein Einblick in<br/><em>meine Projekte.</em>",
      "all": "Alle Projekte",
      "aiFilter": "KI und Systeme",
      "bankMock": "Deine Bank",
      "bankTitle": "Banking,<br/>neu gedacht.",
      "bankType": "Intesa Sanpaolo · Eigenes Konzept",
      "bankCopy": "Ein eigener Entwurf für verständlichere Bankgeschäfte, von täglichen Zahlungen bis zu Geldanlagen.",
      "testMock": "Digitales Erlebnis",
      "discover": "Entdecken.",
      "testTitle": "Besser durch<br/>Tests.",
      "testType": "UX-Forschung · Lernprojekt",
      "testCopy": "Ein praktischer Einblick in Usability-Tests, die Beobachtung des Nutzerverhaltens und die Verbesserung digitaler Erlebnisse.",
      "agentMock": "Automatisierung und KI",
      "smarter": "Clever arbeiten.",
      "agentTitle": "Der Mensch zuerst,<br/>auch bei Automation.",
      "agentType": "KI-Agenten · n8n · Lernprojekt",
      "agentCopy": "Ein dialogbasierter Ablauf, der Automatisierung mit ausdrücklicher menschlicher Prüfung und Kontrolle verbindet.",
      "flowMock": "PROJEKT-<br/>ÜBERSICHT",
      "flowTitle": "Arbeit in<br/>Bewegung.",
      "flowType": "Flow · Produktkonzept für Arbeitsabläufe",
      "flowCopy": "Eine visuelle Lösung, mit der Teams Projekte, Zuständigkeiten und Fristen im Blick behalten.",
      "processTag": "03 / So arbeite ich",
      "processTitle": "Vom Chaos<br/>zur <em>Klarheit.</em>",
      "processIntro": "Gutes Design entsteht durch eine Reihe von Entscheidungen. So übersetze ich echte Bedürfnisse in nützliche und ansprechende Oberflächen.",
      "understand": "Verstehen",
      "understandCopy": "Ich untersuche den Kontext, definiere das Problem und ermittle, für wen das Angebot gedacht ist und welche Bedürfnisse es erfüllen soll.",
      "structure": "Strukturieren",
      "structureCopy": "Ich übersetze Erkenntnisse in klare Nutzerpfade, eine Informationsarchitektur und erste Wireframes.",
      "design": "Gestalten",
      "designCopy": "Ich entwickle eine visuelle Sprache, detaillierte Oberflächen und Animationen, die die Bedienung unterstützen.",
      "refine": "Testen und verbessern",
      "refineCopy": "Ich baue Prototypen, teste zentrale Aufgaben und verbessere den Entwurf anhand der tatsächlichen Erfahrungen.",
      "ticker": "DESIGN × FINANZEN — KI —",
      "contactTag": "04 / Kontakt aufnehmen",
      "contactTitle": "Hast du schon<br/><em>eine Idee?</em>",
      "contactCopy": "Ich interessiere mich für digitale Produkte mit echtem Nutzen, gute Zusammenarbeit und Ideen, die es zu erkunden lohnt.",
      "instagram": "Schreib mir auf Instagram ↗",
      "seeWork": "Ausgewählte Projekte ansehen ↗",
      "footer": "Bewusst gestaltet. Für das Web entwickelt.",
      "back": "Nach oben ↑",
      "focus": "Schwerpunkte",
      "approach": "Ansatz",
      "note": "Portfolio-Vorschau. Die ausführliche Fallstudie und die endgültigen Screenshots folgen später.",
      "language": "Sprache",
      "menuOpen": "Menü öffnen",
      "menuClose": "Menü schließen",
      "menuText": "MENÜ +",
      "closeText": "SCHLIESSEN ×",
      "brandLabel": "michele.workspace — nach oben",
      "mobileLabel": "Mobile Navigation",
      "filterLabel": "Projekte filtern",
      "projectLabel": "Projektdetails öffnen",
      "flowLabel": "Details zum Projekt Flow öffnen",
      "closeLabel": "Projektdetails schließen",
      "backLabel": "Nach oben",
      "description": "Michele Galati, UI/UX-Designer. Ausgewählte Projekte aus Fintech, visuellem Design und KI.",
      "projectNumber": "PROJEKT",
      "pageTitle": "michele.workspace — UI/UX, Fintech und KI",
      "bankBalance": "24.580 €",
      "navLabel": "Hauptnavigation",
      "details": {
        "banking": {
          "label": "FINTECH / EIGENER REDESIGN-ENTWURF",
          "title": "Banking, neu gedacht.",
          "summary": "Ein eigeninitiierter Entwurf für übersichtlicheres Mobile Banking, von der Kontoübersicht über Umsätze und Überweisungen bis zu Geldanlagen.",
          "focus": "Informationshierarchie, Verständlichkeit, Navigation durch Finanzprodukte und einheitliche UI-Muster.",
          "approach": "Das bestehende Angebot analysieren, Hürden ermitteln, zentrale Ansichten neu gestalten und zu einem stimmigen Prototyp verbinden."
        },
        "testing": {
          "label": "UX-FORSCHUNG / LERNPROJEKT",
          "title": "Besser durch Tests.",
          "summary": "Forschungs- und Usability-Übungen dazu, wie echtes Feedback Entscheidungen zur Oberfläche leiten kann.",
          "focus": "Nutzerverhalten, klare Aufgaben, Beobachtungen und Verbesserungen auf Grundlage der Ergebnisse.",
          "approach": "Aufgaben vorbereiten, Sitzungen beobachten, Ergebnisse ordnen und daraus Verbesserungen für die Oberfläche ableiten."
        },
        "agents": {
          "label": "KI / MENSCHLICHE AUFSICHT",
          "title": "Der Mensch zuerst, auch bei Automation.",
          "summary": "Ein n8n-Lernprojekt zu KI-gestützten Aktionen, bei dem sensible Schritte eine ausdrückliche menschliche Freigabe erfordern.",
          "focus": "Dialogbasierte Interaktion, Entscheidungspunkte und verständliche Systemzustände.",
          "approach": "Den Ablauf skizzieren, Modell und Werkzeuge verbinden, Pfade für Freigabe und Ablehnung entwerfen und die gezeigten Szenarien testen."
        },
        "flow": {
          "label": "PRODUKTKONZEPT / TEAMABLÄUFE",
          "title": "Arbeit in Bewegung.",
          "summary": "Flow ist ein visuelles Arbeitsbereichskonzept zur Verwaltung von Kunden, Projektaufgaben, Zuständigkeiten und Fristen, das laufend weiterentwickelt wird.",
          "focus": "Projektstatus auf einen Blick, klare Zuständigkeiten, sichtbare Aufgabenbeziehungen und responsive Informationsgestaltung.",
          "approach": "Einen funktionsfähigen Prototyp weiterentwickeln, die Architektur vereinfachen und prüfen, welche Informationen das Team zuerst braucht."
        }
      }
    },
    "es": {
      "skip": "Ir al contenido",
      "about": "Sobre mí",
      "work": "Proyectos",
      "process": "Proceso",
      "contact": "Contacto",
      "available": "Abierto a nuevas ideas",
      "disciplines": "DISEÑO × FINANZAS × IA",
      "eyebrow": "Michele Galati · Diseñador UI/UX y visual",
      "location": "EN ITALIA · PORTFOLIO 2026",
      "hero1": "Tú",
      "hero2": "imaginas",
      "hero3": "yo diseño",
      "heroIntro": "Soy Michele. Diseño experiencias digitales claras y expresivas en la intersección de las finanzas, la tecnología y la IA.",
      "scroll": "DESPLÁZATE PARA EXPLORAR <span>↓</span>",
      "aboutTag": "01 / Perfil y enfoque",
      "aboutTitle": "El diseño debe ser tan agradable de <em>usar</em> como de ver.",
      "aboutAside": "Curiosidad, claridad e interacciones cuidadas. Me importa tanto cómo funciona un producto como su aspecto.",
      "aboutIntro": "Combino <strong>pensamiento visual</strong>, diseño centrado en las personas y tecnologías emergentes para simplificar lo complejo.",
      "uiux": "Diseño UI/UX",
      "visual": "Diseño visual",
      "systems": "Sistemas de diseño",
      "agents": "Agentes de IA",
      "prototyping": "Prototipado",
      "uxStat": "Investigación, flujos y pruebas",
      "uiStat": "Interfaces y sistemas visuales",
      "aiStat": "Agentes y flujos digitales",
      "ai": "IA",
      "workTag": "02 / Proyectos destacados",
      "workTitle": "Algunos de<br/><em>mis proyectos.</em>",
      "all": "Todos los proyectos",
      "aiFilter": "IA y sistemas",
      "bankMock": "Tu banca",
      "bankTitle": "La banca,<br/>reinventada.",
      "bankType": "Intesa Sanpaolo · Concepto personal",
      "bankCopy": "Un rediseño personal que explora cómo simplificar las gestiones bancarias, desde los pagos diarios hasta las inversiones.",
      "testMock": "Experiencia digital",
      "discover": "Descubre.",
      "testTitle": "Mejorar<br/>con pruebas.",
      "testType": "Investigación UX · Proyecto de aprendizaje",
      "testCopy": "Una exploración práctica de las pruebas de usabilidad, la observación del comportamiento y la mejora de experiencias digitales.",
      "agentMock": "Automatización e IA",
      "smarter": "Trabaja mejor.",
      "agentTitle": "Automatización<br/>para las personas.",
      "agentType": "Agentes de IA · n8n · Proyecto de aprendizaje",
      "agentCopy": "Un flujo conversacional que combina automatización con revisión explícita y control humano.",
      "flowMock": "RESUMEN DEL<br/>PROYECTO",
      "flowTitle": "Trabajo en<br/>movimiento.",
      "flowType": "Flow · Concepto para gestionar flujos de trabajo",
      "flowCopy": "Un enfoque visual para que los equipos puedan seguir proyectos, responsabilidades y plazos con claridad.",
      "processTag": "03 / Cómo trabajo",
      "processTitle": "Del caos<br/>a la <em>claridad.</em>",
      "processIntro": "El buen diseño nace de una serie de decisiones. Así convierto necesidades reales en interfaces útiles y atractivas.",
      "understand": "Comprender",
      "understandCopy": "Exploro el contexto, defino el problema e identifico a las personas y las necesidades que debe atender la experiencia.",
      "structure": "Estructurar",
      "structureCopy": "Convierto los hallazgos en recorridos claros, arquitectura de información y primeros wireframes.",
      "design": "Diseñar",
      "designCopy": "Defino un lenguaje visual, diseño interfaces detalladas y creo animaciones que facilitan el uso.",
      "refine": "Probar y mejorar",
      "refineCopy": "Creo prototipos, pruebo las tareas clave e itero a partir de la experiencia real de las personas.",
      "ticker": "DISEÑO × FINANZAS — IA —",
      "contactTag": "04 / Hablemos",
      "contactTitle": "¿Tienes algo<br/><em>en mente?</em>",
      "contactCopy": "Me interesan los productos digitales con propósito, las buenas colaboraciones y las ideas que merece la pena explorar.",
      "instagram": "Escríbeme en Instagram ↗",
      "seeWork": "Explorar proyectos destacados ↗",
      "footer": "Diseñado con intención. Creado para la web.",
      "back": "Volver arriba ↑",
      "focus": "Objetivos",
      "approach": "Enfoque",
      "note": "Vista previa del portfolio. El caso de estudio y las capturas definitivas se añadirán más adelante.",
      "language": "Idioma",
      "menuOpen": "Abrir menú",
      "menuClose": "Cerrar menú",
      "menuText": "MENÚ +",
      "closeText": "CERRAR ×",
      "brandLabel": "michele.workspace — volver arriba",
      "mobileLabel": "Navegación móvil",
      "filterLabel": "Filtrar proyectos",
      "projectLabel": "Abrir detalles del proyecto",
      "flowLabel": "Abrir detalles del proyecto Flow",
      "closeLabel": "Cerrar detalles del proyecto",
      "backLabel": "Volver arriba",
      "description": "Michele Galati, diseñador UI/UX. Proyectos destacados de fintech, diseño visual e IA.",
      "projectNumber": "PROYECTO",
      "pageTitle": "michele.workspace — UI/UX, Fintech e IA",
      "bankBalance": "24.580 €",
      "navLabel": "Navegación principal",
      "details": {
        "banking": {
          "label": "FINTECH / REDISEÑO PERSONAL",
          "title": "La banca, reinventada.",
          "summary": "Un proyecto personal para simplificar la banca móvil, desde la vista general y los movimientos hasta las transferencias y las inversiones.",
          "focus": "Jerarquía de la información, claridad, navegación entre productos financieros y patrones de interfaz coherentes.",
          "approach": "Analizar la experiencia actual, detectar obstáculos, rediseñar las pantallas clave y conectarlas en un prototipo coherente."
        },
        "testing": {
          "label": "INVESTIGACIÓN UX / PROYECTO DE APRENDIZAJE",
          "title": "Mejorar con pruebas.",
          "summary": "Ejercicios de investigación y pruebas de usabilidad para entender cómo los comentarios de las personas pueden orientar las decisiones de interfaz.",
          "focus": "Comportamiento de las personas, claridad de las tareas, observación e iteración basada en evidencias.",
          "approach": "Preparar las tareas, observar las sesiones, organizar los hallazgos y convertirlos en mejoras de interfaz."
        },
        "agents": {
          "label": "IA / SUPERVISIÓN HUMANA",
          "title": "Automatización para las personas.",
          "summary": "Un proyecto de aprendizaje en n8n sobre acciones asistidas por IA que requieren aprobación humana explícita antes de los pasos sensibles.",
          "focus": "Interacción conversacional, puntos de decisión y estados del sistema comprensibles.",
          "approach": "Mapear el flujo, conectar el modelo y las herramientas, diseñar las rutas de aprobación y rechazo y probar los escenarios ilustrados."
        },
        "flow": {
          "label": "CONCEPTO DE PRODUCTO / FLUJOS DE EQUIPO",
          "title": "Trabajo en movimiento.",
          "summary": "Flow es un espacio de trabajo visual en evolución para gestionar clientes, actividades de proyecto, responsabilidades y plazos.",
          "focus": "Estado de los proyectos de un vistazo, responsabilidades claras, relaciones visuales entre tareas y diseño adaptable de la información.",
          "approach": "Partir de un prototipo funcional, simplificar la arquitectura y comprobar qué información necesita primero el equipo."
        }
      }
    }
  };
i18n.it.portraitAlt = 'Ritratto di Michele Galati';
i18n.en.portraitAlt = 'Portrait of Michele Galati';
i18n.de.portraitAlt = 'Porträt von Michele Galati';
i18n.es.portraitAlt = 'Retrato de Michele Galati';
  const languageSelect = $('#site-language');
  const localeKey = 'michele.workspace.language';
  const supported = lang => Object.hasOwn(i18n, lang);
  let language = "it";
  const updateMenuLabel = () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.textContent = i18n[language][isOpen ? 'closeText' : 'menuText'];
    toggle.setAttribute('aria-label', i18n[language][isOpen ? 'menuClose' : 'menuOpen']);
  };
  const setMenu=open=>{
    menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));
    updateMenuLabel();
    document.body.style.overflow=open?'hidden':'';
  };
  toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
  $$('#mobile-menu a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  addEventListener('resize',()=>{if(innerWidth>900&&menu.classList.contains('open'))setMenu(false)});
  const sections=$$('main section[id]');
  if('IntersectionObserver' in window){
    const navObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){
        $$('.navlinks a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
      }})
    },{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(section=>navObserver.observe(section));
  }
  if(finePointer&&!reduceMotion){
    const cursor=$('#cursor'),glow=$('#glow'),orbit=$('#hero-orbit');
    let mx=0,my=0,cx=0,cy=0,frame=0;
    const animate=()=>{
      cx+=(mx-cx)*.19;cy+=(my-cy)*.19;
      cursor.style.left=cx+'px';cursor.style.top=cy+'px';
      frame=requestAnimationFrame(animate);
    };
    addEventListener('pointermove',e=>{
      mx=e.clientX;my=e.clientY;cursor.style.opacity='1';
      if(scrollY<innerHeight){
        glow.style.transform=`translate(${(mx-innerWidth/2)*.035}px,${(my-innerHeight/2)*.035}px)`;
        orbit.style.transform=`translate(${(mx-innerWidth/2)*-.018}px,${(my-innerHeight/2)*-.018}px) rotate(-15deg)`;
      }
    },{passive:true});animate();
    $$('a,button,.chip,.visual').forEach(el=>{
      el.addEventListener('mouseenter',()=>cursor.classList.add('big'));
      el.addEventListener('mouseleave',()=>cursor.classList.remove('big'));
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame)}else{animate()}});
    $$('.visual').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const rect=card.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;
        card.style.transform=`perspective(1000px) rotateX(${-y*3}deg) rotateY(${x*3}deg) scale(.99)`;
      });
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }else{$('#cursor').style.display='none'}
const carousel = $('#project-carousel');
const projectCards = $$('.project', carousel);
const carouselStatus = $('#carousel-status');
let activeProjectIndex = 0;
const setActiveProject = index => {
  activeProjectIndex = Math.max(0, Math.min(index, projectCards.length - 1));
  projectCards.forEach((card, cardIndex) => {
    const active = cardIndex === activeProjectIndex;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-pressed', String(active));
  });
  carouselStatus.textContent = String(activeProjectIndex + 1).padStart(2, '0') + ' / ' + String(projectCards.length).padStart(2, '0');
};
const centerProject = (card, behavior = 'smooth') => {
  carousel.scrollTo({
    left: carousel.scrollLeft + card.getBoundingClientRect().left - carousel.getBoundingClientRect().left - (carousel.clientWidth - card.offsetWidth) / 2,
    behavior: reduceMotion ? 'instant' : behavior
  });
};
const updateActiveProject = () => {
  const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;
  projectCards.forEach((card, index) => {
    if (card.classList.contains('is-hidden')) return;
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(rect.left + rect.width / 2 - center);
    if (distance < closestDistance) {
      closestIndex = index;
      closestDistance = distance;
    }
  });
  setActiveProject(closestIndex);
};
projectCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (index !== activeProjectIndex) {
      centerProject(card);
      return;
    }
    openDialog(card.dataset.project);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (activeProjectIndex + direction + projectCards.length) % projectCards.length;
      projectCards[nextIndex].focus({preventScroll:true});
      centerProject(projectCards[nextIndex]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (index !== activeProjectIndex) centerProject(card);
      else openDialog(card.dataset.project);
    }
  });
});
let carouselFrame = 0;
carousel.addEventListener('scroll', () => {
  cancelAnimationFrame(carouselFrame);
  carouselFrame = requestAnimationFrame(updateActiveProject);
}, {passive:true});
addEventListener('resize', updateActiveProject);
requestAnimationFrame(() => {
  centerProject(projectCards[0], 'instant');
  setActiveProject(0);
});
  const filters=$$('.filter'),projects=$$('.project');
  filters.forEach(filter=>filter.addEventListener('click',()=>{
    const category=filter.dataset.filter;
    filters.forEach(f=>{const active=f===filter;f.classList.toggle('active',active);f.setAttribute('aria-pressed',String(active))});
    projects.forEach(project=>{const visible=category==='all'||project.dataset.category.split(' ').includes(category);project.classList.toggle('is-hidden',!visible)});
    updateActiveProject();
    centerProject(projectCards[activeProjectIndex]);
  }));

  const dialog=$('#project-dialog'),panel=$('.dialog-panel',dialog),close=$('.dialog-close',dialog);
  let previousFocus=null;
  let currentProject = null;
  const renderDialog = () => {
    const details = i18n[language].details[currentProject];
    for (const [field, value] of Object.entries(details)) {
      $('#dialog-' + field).textContent = value;
    }
  };
  const openDialog=key=>{
    if (!Object.hasOwn(i18n[language].details, key)) return;
    previousFocus=document.activeElement;
    currentProject = key;
    renderDialog();
    dialog.classList.add('open');document.body.classList.add('dialog-open');dialog.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';close.focus({preventScroll:true});
  };
  const closeDialog=()=>{
    currentProject = null;
    dialog.classList.remove('open');document.body.classList.remove('dialog-open');dialog.setAttribute('aria-hidden','true');document.body.style.overflow='';
    if(previousFocus)previousFocus.focus({preventScroll:true});
  };
  close.addEventListener('click',closeDialog);
  dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(dialog.classList.contains('open'))closeDialog();else if(menu.classList.contains('open'))setMenu(false)}
    if(e.key==='Tab'&&dialog.classList.contains('open')){
      const focusable=$$('button,a[href],[tabindex]:not([tabindex="-1"])',panel).filter(el=>!el.disabled);
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  $$('.step').forEach(step=>{
    const btn=$('.step-button',step),copy=$('.step-copy',step);
    const sync=()=>{copy.style.maxHeight=step.classList.contains('open')?copy.scrollHeight+'px':'0px'};
    btn.addEventListener('click',()=>{
      $$('.step').forEach(other=>{other.classList.remove('open');$('.step-button',other).setAttribute('aria-expanded','false');$('.step-copy',other).style.maxHeight='0px'});
      step.classList.add('open');btn.setAttribute('aria-expanded','true');sync();
    });sync();
  });
  const updateAccordionHeight = () => {
    const copy = $('.step.open .step-copy');
    if (copy) copy.style.maxHeight = copy.scrollHeight + 'px';
  };
  const applyLanguage = (nextLanguage) => {
    language = supported(nextLanguage) ? nextLanguage : "it";
    const messages = i18n[language];
    document.documentElement.lang = language;
    document.title = messages.pageTitle;
    languageSelect.value = language;
    $('#locale-code').textContent = language.toUpperCase();
    // Only trusted, static translations contain formatting markup.
    $$('[data-i18n]').forEach(el => { el.innerHTML = messages[el.dataset.i18n]; });
    $$('[data-i18n-label]').forEach(el => { el.setAttribute('aria-label', messages[el.dataset.i18nLabel]); });
    $$('[data-i18n-alt]').forEach(el => { el.alt = messages[el.dataset.i18nAlt]; });
    $('[data-i18n-content]').content = messages.description;
    updateMenuLabel();
    if (currentProject) renderDialog();
    updateAccordionHeight();
    updateScroll();
  };
  let savedLanguage;
  try { savedLanguage = localStorage.getItem(localeKey); } catch {}
  const browserLanguage = (navigator.languages || [navigator.language])
    .map(locale => locale.toLowerCase().split('-')[0]).find(supported);
  applyLanguage(supported(savedLanguage) ? savedLanguage : browserLanguage || "it");
  languageSelect.addEventListener('change', () => {
    applyLanguage(languageSelect.value);
    try { localStorage.setItem(localeKey, language); } catch {}
  });
  addEventListener('resize', updateAccordionHeight);
  document.fonts?.ready.then(updateAccordionHeight);
})();
