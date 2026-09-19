import React, { useEffect, useMemo, useRef, useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, ChevronRight, Clock3, Footprints, Leaf, MapPin, Menu, Minus, Moon, Mountain, Plus, Search, Sparkles, TreePine, Users, X } from 'lucide-react';
import './styles.css';

const IMG = {
  sunset: '/images/sunset-03.webp',
  sunset2: '/images/sunset-01.webp',
  sunset6: '/images/sunset-06.webp',
  trailSign: '/images/trail-sign.webp',
  trail: '/images/trail-vista.webp',
  nest: '/images/nest.webp',
  orangeCups: '/images/orange-cups.webp',
  orchid: '/images/orchid.webp',
  water: '/images/water-flower.webp',
  bees: '/images/bees.webp',
  soil: '/images/soil-track.webp',
  gecko: '/images/gecko.webp',
  mushrooms: '/images/mushroom-grid.webp',
  motmot: 'https://i.ibb.co/ksSyJ795/montenubis-momoto.jpg',
  warbler: 'https://i.ibb.co/qF9ztRLt/IMG-20260703-WA0039.jpg',
  hummingbird: 'https://i.ibb.co/LdBd2Nyz/montenibis-colibri.jpg',
  hongo: 'https://i.ibb.co/4gXsvh83/hongo.jpg',
  frog: 'https://i.ibb.co/4nRHXDS6/rana-montenubis.jpg',
  snake: 'https://i.ibb.co/RpkMbzHf/serpiente-montenubis.jpg',
  map: 'https://i.ibb.co/3mYkfXxB/mapa-montenubis.jpg',
  raulSonia: 'https://i.ibb.co/4g5qr6N5/Whats-App-Image-2026-07-05-at-10-53-40-AM.jpg',
  eduardoNidia: 'https://i.ibb.co/4ZQ68wNy/Whats-App-Image-2026-07-04-at-9-15-33-PM.jpg',
  liam: '/images/liam-abarca-puma-trail.jpeg'
};

const tours = [
  { slug:'birdwatching-private', type:'birding', price:150, duration:'4 h', time:'6:00 AM – 10:00 AM', group:'2–5', image:IMG.motmot,
    es:{title:'Birdwatching Tour · Privado', short:'Una mañana de aves, silencio y bosque con tu propio guía.', body:'Empieza antes de que el bosque se caliente. Escucha las llamadas, busca movimiento en el dosel y aprende a leer los claros, ramas y bordes de la reserva.', includes:['Entrada','Guía','Refrigerio']},
    en:{title:'Birdwatching Tour · Private', short:'A morning of birds, silence and cloud forest with your own guide.', body:'Start before the forest warms. Listen for calls, scan the canopy and learn to read the clearings, branches and edges of the reserve.', includes:['Entrance','Guide','Snack']} },
  { slug:'birdwatching-shared', type:'birding', price:120, duration:'4 h', time:'6:00 AM – 10:00 AM', group:'2–10', image:IMG.warbler,
    es:{title:'Birdwatching Tour · Colectivo', short:'Observación guiada en grupo pequeño para descubrir el dosel.', body:'Comparte una mañana lenta de observación, binoculares y sonidos. Ideal para viajeros que quieren compañía sin perder la intimidad del bosque.', includes:['Entrada','Guía','Refrigerio']},
    en:{title:'Birdwatching Tour · Shared', short:'Small-group guided birding in the heart of the canopy.', body:'Share a slow morning of observation, binoculars and sound. A social experience without losing the intimacy of the forest.', includes:['Entrance','Guide','Snack']} },
  { slug:'natural-history-private', type:'history', price:80, duration:'2.5 h', time:'7:00 AM – 9:30 AM', group:'2–7', image:IMG.hummingbird,
    es:{title:'Tour de Historia Natural · Privado', short:'El bosque contado como una historia viva.', body:'Plantas, hongos, árboles, insectos y relaciones ecológicas se convierten en una narrativa mientras caminas con un guía naturalista.', includes:['Entrada','Guía']},
    en:{title:'Natural History Tour · Private', short:'The forest told as a living story.', body:'Plants, fungi, trees, insects and ecological relationships become a narrative as you walk with a naturalist guide.', includes:['Entrance','Guide']} },
  { slug:'natural-history-shared', type:'history', price:60, duration:'2.5 h', time:'7:00 AM – 9:30 AM', group:'2–10', image:IMG.hongo,
    es:{title:'Tour de Historia Natural · Colectivo', short:'Una lectura del bosque para compartir y aprender.', body:'Mira de cerca lo que normalmente pasa desapercibido: hongos, texturas, hojas, cortezas y pequeñas pistas de vida.', includes:['Entrada','Guía']},
    en:{title:'Natural History Tour · Shared', short:'A guided reading of the forest to share and learn.', body:'Look closely at what normally goes unnoticed: fungi, textures, leaves, bark and tiny signs of life.', includes:['Entrance','Guide']} },
  { slug:'night-private', type:'night', price:60, duration:'2 h', time:'6:00 PM – 8:00 PM', group:'2–5', image:IMG.frog,
    es:{title:'Tour de Noche · Privado', short:'Cuando cae la luz, el bosque cambia por completo.', body:'Con linterna y guía, busca movimientos entre hojas y ramas. La experiencia gira alrededor de sonidos, sombras, anfibios, insectos y reptiles.', includes:['Entrada','Guía','Linternas']},
    en:{title:'Night Tour · Private', short:'When the light fades, the forest becomes another place.', body:'With a flashlight and guide, search between leaves and branches. Focus on sound, shadow, amphibians, insects and reptiles.', includes:['Entrance','Guide','Flashlights']} },
  { slug:'night-shared', type:'night', price:40, duration:'2 h', time:'6:00 PM – 8:00 PM', group:'2–10', image:IMG.snake,
    es:{title:'Tour de Noche · Colectivo', short:'Una caminata nocturna para descubrir quién sale después del sol.', body:'Una experiencia compartida para aprender a observar la vida nocturna sin prisa y con la ayuda de un guía.', includes:['Entrada','Guía','Linternas']},
    en:{title:'Night Tour · Shared', short:'A night walk to discover who comes out after dark.', body:'A shared experience for learning how to spot nocturnal life slowly and safely with a guide.', includes:['Entrance','Guide','Flashlights']} },
  { slug:'cloud-forest-hike', type:'hiking', price:20, duration:'Flexible', time:'10:00 AM – 4:00 PM', group:'1+', image:IMG.trail,
    es:{title:'Senderismo en Bosque Nuboso', short:'Camina la reserva a tu ritmo, durante el día.', body:'Acceso autoguiado a los senderos de la reserva. Tómate el tiempo de mirar, escuchar y encontrar los pequeños detalles del bosque.', includes:['Entrada general','Acceso al sendero']},
    en:{title:'Cloud Forest Hiking', short:'Walk the reserve at your own pace, during the day.', body:'Self-guided access to the reserve trails. Take the time to look, listen and notice the small details of the forest.', includes:['General admission','Trail access']} }
];

function tourTypeLabel(type, lang){
  const labels={
    en:{birding:'BIRDING',history:'NATURAL HISTORY',night:'NIGHT',hiking:'HIKING'},
    es:{birding:'AVES',history:'HISTORIA NATURAL',night:'NOCHE',hiking:'SENDERISMO'}
  };
  return labels[lang][type] || type.toUpperCase();
}

const gallery = [
  [IMG.sunset,'Golden hour','Hora dorada'], [IMG.sunset2,'Clouds over the canopy','Nubes sobre el dosel'], [IMG.orangeCups,'Forest fungi','Hongos del bosque'],
  [IMG.orchid,'Orchid','Orquídea'], [IMG.nest,'Tree detail','Detalle del árbol'], [IMG.water,'Water garden','Jardín de agua'], [IMG.bees,'Native pollinators','Polinizadores'],
  [IMG.gecko,'After dark','Después del atardecer'], [IMG.mushrooms,'Fungi wall','Muro de hongos'], [IMG.trailSign,'Puma Trail','Sendero El Puma'], [IMG.trail,'Walking the reserve','Caminar la reserva'],
  [IMG.sunset,'Last light','Última luz'], [IMG.orangeCups,'Cloud-forest textures','Texturas del bosque'], [IMG.orchid,'Forest orchid','Orquídea del bosque'], [IMG.soil,'Footprints in the soil','Huellas en el suelo']
];

const copy = {
  en: {
    navHome:'Home', navTours:'Tours', navMap:'Map', navStory:'Our story', navGallery:'Gallery', book:'Book', switch:'ES',
    location:'Monteverde · Costa Rica', hero:'Welcome to Montenubis.', heroSub:'A boutique botanical reserve in Monteverde, Costa Rica.', cta:'Enter the forest', viewTours:'Explore tours',
    trailBadge:'PUMA TRAIL', field:'FIELD NOTE', fieldText:'',
    homeCard1:'Guided experiences', homeCard2:'Trail map', homeCard3:'The people behind it',
    toursTitle:'Choose your way into the forest.', toursSub:'Seven ways to experience Montenubis — from first light to after dark.',
    mapTitle:'The reserve, mapped.', mapSub:'The trail system is right below. Choose a route, slow down and explore.',
    mapStats:['Self-guided access','Approx. 3 hours','Moderate walking'],
    storyTitle:'A family-built forest.', storySub:'Montenubis began as a shared project to protect the landscape and teach people how to notice it.',
    storyIntro:'The reserve is shaped by people who live close to the forest — and by the generations that will inherit it.',
    familyLegacy:'The next generation', familyLegacySub:'A family story that continues into the forest.',
    galleryTitle:'Stay a little longer.', gallerySub:'Textures, wildlife, paths and small moments from Montenubis.',
    reserveTitle:'Make it yours.', reserveSub:'Choose the experience, date and number of guests. We will keep the rest simple.',
    continue:'Continue to guest details', guest:'Guest details', payment:'Payment', confirmation:'Ready to book', total:'Estimated total', paymentDemo:'Payment options are shown here for now. Live checkout is not connected yet.',
    date:'Date', people:'People', selectTour:'Choose a tour', firstName:'First name', lastName:'Last name', email:'Email', phone:'Phone', back:'Back', finish:'Complete booking', demo:'Demo checkout',
    hours:'Hours', group:'Group size', includes:'Includes', perPerson:'/ person', reserve:'Reserve this experience', homeEyebrow:'MONTEVERDE · COSTA RICA', homeHeading:'', homeCopy:'', scroll:'', fieldJournal:'', viewExperience:'View experience', closerLook:'A closer look.', fieldNote:'FIELD NOTE', forestChanges:'The forest changes when you slow down.', contact:'Contact', founders:'FOUNDERS', naturalHistory:'NATURAL HISTORY', nextGeneration:'NEXT GENERATION', mapLabel:'', locationButton:'Location', instagram:'Instagram', facebook:'Facebook', listenLookWalk:'', ribbonTitle:'Small details. Wild place.' 
  },
  es: {
    navHome:'Inicio', navTours:'Tours', navMap:'Mapa', navStory:'Nuestra historia', navGallery:'Galería', book:'Reservar', switch:'EN',
    location:'Monteverde · Costa Rica', hero:'Bienvenido a Montenubis.', heroSub:'Una reserva botánica boutique en Monteverde, Costa Rica.', cta:'Entrar al bosque', viewTours:'Ver tours',
    trailBadge:'SENDERO EL PUMA', field:'NOTA DE CAMPO', fieldText:'',
    homeCard1:'Experiencias guiadas', homeCard2:'Mapa del sendero', homeCard3:'Las personas detrás',
    toursTitle:'Elige cómo entrar al bosque.', toursSub:'Siete maneras de vivir Montenubis — desde la primera luz hasta la noche.',
    mapTitle:'La reserva, en el mapa.', mapSub:'El sistema de senderos está aquí abajo. Elige una ruta, baja el ritmo y explora.',
    mapStats:['Acceso autoguiado','Aprox. 3 horas','Caminata moderada'],
    storyTitle:'Un bosque construido en familia.', storySub:'Montenubis nació como un proyecto compartido para proteger el paisaje y enseñar a observarlo.',
    storyIntro:'La reserva está marcada por personas que viven cerca del bosque — y por las generaciones que lo heredarán.',
    familyLegacy:'La siguiente generación', familyLegacySub:'Una historia familiar que continúa en el bosque.',
    galleryTitle:'Quédate un poco más.', gallerySub:'Texturas, vida silvestre, senderos y pequeños momentos de Montenubis.',
    reserveTitle:'Hazlo tuyo.', reserveSub:'Elige experiencia, fecha y cantidad de visitantes. Nosotros mantenemos lo demás simple.',
    continue:'Continuar con los datos', guest:'Datos del visitante', payment:'Pago', confirmation:'Listo para reservar', total:'Total estimado', paymentDemo:'Por ahora mostramos las opciones de pago. El checkout real todavía no está conectado.',
    date:'Fecha', people:'Personas', selectTour:'Elige un tour', firstName:'Nombre', lastName:'Apellido', email:'Correo', phone:'Teléfono', back:'Atrás', finish:'Completar reserva', demo:'Pago de demostración',
    hours:'Horario', group:'Grupo', includes:'Incluye', perPerson:'/ persona', reserve:'Reservar esta experiencia', homeEyebrow:'MONTEVERDE · COSTA RICA', homeHeading:'', homeCopy:'', scroll:'', fieldJournal:'', viewExperience:'Ver experiencia', closerLook:'Un vistazo más cerca.', fieldNote:'NOTA DE CAMPO', forestChanges:'El bosque cambia cuando bajas el ritmo.', contact:'Contacto', founders:'FUNDADORES', naturalHistory:'HISTORIA NATURAL', nextGeneration:'SIGUIENTE GENERACIÓN', mapLabel:'', locationButton:'Ubicación', instagram:'Instagram', facebook:'Facebook', listenLookWalk:'', ribbonTitle:'Pequeños detalles. Lugar salvaje.' 
  }
};

const LanguageContext = createContext(null);
const useLang = () => useContext(LanguageContext);
function LanguageProvider({children}){
  const [lang,setLang] = useState(()=>localStorage.getItem('montenubis-lang') || 'en');
  useEffect(()=>localStorage.setItem('montenubis-lang',lang),[lang]);
  const value = useMemo(()=>({lang,setLang,t:copy[lang]}),[lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function ScrollTop(){
  const {pathname} = useLocation();
  useEffect(()=>window.scrollTo({top:0,behavior:'instant'}),[pathname]);
  return null;
}


function Header(){
  const {lang,setLang,t}=useLang();
  const [menu,setMenu]=useState(false);
  const [theme,setTheme]=useState('dark');
  const [scrolled,setScrolled]=useState(false);
  const location=useLocation();

  useEffect(()=>setMenu(false),[location.pathname]);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>34);
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);

  useEffect(()=>{
    const sections=[...document.querySelectorAll('[data-header-theme]')];
    if(!sections.length) return;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible) setTheme(visible.target.dataset.headerTheme);
    },{rootMargin:'-16% 0px -67% 0px',threshold:[0,.2,.45,.7]});
    sections.forEach(s=>observer.observe(s));
    return ()=>observer.disconnect();
  },[location.pathname]);

  const links=[['/',t.navHome],['/tours',t.navTours],['/mapa',t.navMap],['/historia',t.navStory],['/galeria',t.navGallery]];
  return <>
    <header className={`site-header ${theme==='light'?'header-light':'header-dark'} ${scrolled?'is-scrolled':''}`}>
      <div className="header-brand-zone">
        <Link className="wordmark" to="/" aria-label="Montenubis home">MonteNubis</Link>
      </div>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href,label])=><NavLink key={href} to={href} className={({isActive})=>isActive?'nav-link is-active':'nav-link'} end={href==='/' }>{label}</NavLink>)}
      </nav>

      <div className="header-actions">
        <div className="language-switch" aria-label={lang==='en'?'Language':'Idioma'}>
          <button className={lang==='en'?'lang-choice active':'lang-choice'} onClick={()=>setLang('en')} aria-pressed={lang==='en'} title="English"><b>ENG</b></button>
          <button className={lang==='es'?'lang-choice active':'lang-choice'} onClick={()=>setLang('es')} aria-pressed={lang==='es'} title="Español"><b>ESP</b></button>
        </div>
        <Link className="book-pill" to="/reservar">{t.book}<ArrowRight size={15}/></Link>
        <button className="mobile-trigger" onClick={()=>setMenu(true)} aria-label={lang==='en'?'Open menu':'Abrir menú'}><Menu size={22}/></button>
      </div>
    </header>
    {menu && <div className="mobile-drawer" role="dialog" aria-modal="true">
      <div className="mobile-drawer-top"><span className="wordmark">MonteNubis</span><button className="close-button" onClick={()=>setMenu(false)} aria-label={lang==='en'?'Close menu':'Cerrar menú'}><X/></button></div>
      <div className="mobile-nav">
        {links.map(([href,label],i)=><NavLink key={href} to={href} end={href==='/' }>{String(i+1).padStart(2,'0')}<span>{label}</span><ChevronRight size={18}/></NavLink>)}
      </div>
      <div className="mobile-drawer-footer"><div className="drawer-language"><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>ENG</button><button className={lang==='es'?'active':''} onClick={()=>setLang('es')}>ESP</button></div><Link to="/reservar">{t.book} <ArrowRight size={16}/></Link></div>
    </div>}
  </>;
}

function ForestNoise(){ return <div className="forest-noise" aria-hidden="true"/>; }

function Layout(){
  return <>
    <Header/>
    <ScrollTop/>
    <main><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tours" element={<ToursPage/>}/>
      <Route path="/tours/:slug" element={<TourDetail/>}/>
      <Route path="/mapa" element={<MapPage/>}/>
      <Route path="/historia" element={<StoryPage/>}/>
      <Route path="/galeria" element={<GalleryPage/>}/>
      <Route path="/reservar" element={<ReservePage/>}/>
      <Route path="/contacto" element={<ContactPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes></main>
  </>;
}

function Home(){
  const {t,lang}=useLang();
  return <div className="home">
    <section className="hero immersive-hero" data-header-theme="dark" style={{'--hero':`url(${IMG.sunset})`}}>
      <ForestNoise/><div className="hero-glow"/>
      <div className="hero-copy">
        <span className="eyebrow hero-location">MONTEVERDE · COSTA RICA</span>
        <h1>{t.hero}</h1>
        <p>{t.heroSub}</p>
        <div className="hero-actions"><Link to="/tours" className="primary-btn hero-enter">{t.cta}<ArrowRight/></Link></div>
      </div>
    </section>


    <section className="home-gateway compact-gateway" data-header-theme="light">
      <div className="gateway-copy"><span className="eyebrow">{t.homeEyebrow}</span><h2>{lang==='en'?'Choose your way into Montenubis.':'Elige cómo entrar a Montenubis.'}</h2></div>
      <div className="gateway-cards">
        <Link to="/tours" className="gateway-card card-tall"><img src={IMG.motmot} alt="Birdwatching in Montenubis"/><div><span>01</span><h3>{t.homeCard1}</h3><ArrowRight/></div></Link>
        <Link to="/mapa" className="gateway-card"><img src={IMG.map} alt="Montenubis trail map"/><div><span>02</span><h3>{t.homeCard2}</h3><ArrowRight/></div></Link>
        <Link to="/historia" className="gateway-card"><img src={IMG.raulSonia} alt="Montenubis founders"/><div><span>03</span><h3>{t.homeCard3}</h3><ArrowRight/></div></Link>
      </div>
    </section>
    <Footer/>
  </div>;
}

function ForestRibbon(){
  const {t}=useLang();
  return <section className="forest-ribbon" data-header-theme="dark">
    <div className="ribbon-mark">{t.listenLookWalk}</div>
    <div className="ribbon-title">{t.ribbonTitle}</div>
    <img src={IMG.orangeCups} alt="Orange forest fungi"/>
    <img src={IMG.orchid} alt="Forest orchid"/>
    <img src={IMG.gecko} alt="Gecko at night"/>
  </section>;
}

function PageHero({eyebrow,title,sub,image,dark=true,children,position='center'}){
  return <section className={`page-hero ${dark?'dark':'light'}`} data-header-theme={dark?'dark':'light'} style={image?{'--hero':`url(${image})`,'--hero-position':position}:undefined}>
    <div className="page-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{sub&&<p>{sub}</p>}{children}</div>
  </section>;
}

function ToursPage(){
  const {lang,t}=useLang();
  const [filter,setFilter]=useState('all');
  const filters=lang==='en'?[['all','All'],['birding','Birding'],['history','Natural history'],['night','Night'],['hiking','Hiking']]:[['all','Todos'],['birding','Aves'],['history','Historia natural'],['night','Noche'],['hiking','Senderismo']];
  const shown=tours.filter(x=>filter==='all'||x.type===filter);
  return <div className="page light-page">
    <PageHero eyebrow={t.navTours} title={t.toursTitle} sub={t.toursSub} image={IMG.sunset6} />
    <section className="catalog-section" data-header-theme="light">
      <div className="filter-row">{filters.map(([v,l])=><button key={v} onClick={()=>setFilter(v)} className={filter===v?'filter active':'filter'}>{l}</button>)}</div>
      <div className="tour-grid">
        {shown.map((tour,i)=><TourCard key={tour.slug} tour={tour} lang={lang} index={i}/>) }
      </div>
    </section>
    <Footer light/>
  </div>;
}

function TourCard({tour,lang,index}){
  const {t}=useLang();
  const d=tour[lang];
  return <Link to={`/tours/${tour.slug}`} className="tour-card-modern">
    <div className="tour-card-image"><img src={tour.image} alt={d.title}/><div className="tour-number">{String(index+1).padStart(2,'0')}</div><div className="tour-hover"><span>{t.viewExperience}</span><ArrowRight size={17}/></div></div>
    <div className="tour-card-body"><div className="tour-meta"><span><Clock3 size={13}/>{tour.duration}</span><span><Users size={13}/>{tour.group}</span></div><h2>{d.title}</h2><p>{d.short}</p><div className="tour-card-foot"><strong>${tour.price}<small>{t.perPerson}</small></strong><span>{t.reserve}<ChevronRight size={16}/></span></div></div>
  </Link>;
}

function TourDetail(){
  const {slug}=useParams(); const {lang,t}=useLang(); const navigate=useNavigate();
  const tour=tours.find(x=>x.slug===slug);
  if(!tour) return <NotFound/>;
  const d=tour[lang];
  return <div className="tour-detail-page">
    <section className="detail-hero" data-header-theme="dark" style={{'--hero':`url(${tour.image})`}}><div className="detail-overlay"/><div className="detail-hero-copy"><span className="eyebrow">{t.navTours} · {tourTypeLabel(tour.type,lang)}</span><h1>{d.title}</h1><p>{d.short}</p><button className="primary-btn" onClick={()=>navigate(`/reservar?tour=${tour.slug}`)}>{t.reserve}<ArrowRight/></button></div></section>
    <section className="detail-body" data-header-theme="light">
      <div className="detail-main"><div className="detail-kicker"><span>{t.hours}</span><strong>{tour.time}</strong><span>{t.group}</span><strong>{tour.group}</strong></div><h2>{t.closerLook}</h2><p className="detail-lead">{d.body}</p><div className="include-grid">{d.includes.map(x=><div key={x}><Check size={16}/>{x}</div>)}</div><div className="detail-forest-note"><img src={tour.slug.includes('night')?IMG.gecko:tour.slug.includes('hiking')?IMG.trailSign:IMG.orangeCups} alt="Montenubis detail"/><div><span className="eyebrow">{t.fieldNote}</span><h3>{t.forestChanges}</h3></div></div></div>
      <aside className="booking-card-modern"><span className="eyebrow">{lang==='en'?'RESERVE':'RESERVAR'}</span><div className="booking-price">${tour.price}<small>{t.perPerson}</small></div><div className="booking-line"><span>{t.date}</span><input type="date" defaultValue={new Date().toISOString().slice(0,10)}/></div><div className="booking-line"><span>{t.people}</span><select defaultValue="2"><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>8</option><option>10</option></select></div><button className="primary-btn full" onClick={()=>navigate(`/reservar?tour=${tour.slug}`)}>{t.continue}<ArrowRight/></button><div className="booking-note"><Leaf size={15}/>{lang==='en'?'No live payment connection yet.':'Pago real todavía no conectado.'}</div></aside>
    </section>
    <Footer light/>
  </div>;
}

function MapPage(){
  const {t,lang}=useLang();
  return <div className="page light-page">
    <PageHero eyebrow={t.navMap} title={t.mapTitle} sub={t.mapSub} image={IMG.trailSign}/>
    <section className="map-page-content" data-header-theme="light">
      <div className="map-header-row"><div><span className="eyebrow">MONTE NUBES · MONTEVERDE</span><h2>{lang==='en'?'The trail, exactly as you find it.':'El sendero, tal como lo encuentras.'}</h2></div><div className="map-stats">{t.mapStats.map((s,i)=><span key={i}>{s}</span>)}</div></div>
      <div className="map-frame-large"><img src={IMG.map} alt="Montenubis trail map"/></div><div className="map-legend-clean"><span>01 · El Puma</span><span>02 · El Viento</span><span>03 · El Mirador</span><span>04 · La Roca</span></div>
    </section>
    <Footer light/>
  </div>;
}

function StoryPage(){
  const {t,lang}=useLang();
  return <div className="story-page">
    <PageHero eyebrow={t.navStory} title={t.storyTitle} sub={t.storySub} image={IMG.sunset2} position="center 52%"/>
    <section className="story-section" data-header-theme="light">
      <div className="story-opening"><span className="eyebrow">{lang==='en'?'THE PEOPLE':'LAS PERSONAS'}</span><h2>{t.storyIntro}</h2></div>
      <div className="guardian-grid">
        <article className="guardian-card featured"><img src={IMG.raulSonia} alt="Founders of Montenubis"/><div className="guardian-copy"><span className="eyebrow">01 · {t.founders}</span><h3>Raúl Abarca & Sonia Ovares</h3><p>{lang==='en'?'Owners & founders. Their project combines sustainable management, education and a long-term commitment to the natural landscape.':'Dueños y fundadores. Su proyecto combina gestión sostenible, educación y un compromiso de largo plazo con el paisaje natural.'}</p></div></article>
        <article className="guardian-card"><img src={IMG.eduardoNidia} alt="Eduardo and Nidia"/><div className="guardian-copy"><span className="eyebrow">02 · {t.naturalHistory}</span><h3>Eduardo Venegas & Nidia Mejías</h3><p>{lang==='en'?'Naturalist guide & tourism administration. Together they shape the visitor experience, interpretation and day-to-day flow of the reserve.':'Guía naturalista y administración turística. Juntos dan forma a la experiencia, la interpretación y la operación de la reserva.'}</p></div></article>
        <article className="legacy-card"><img src={IMG.liam} alt="Liam Abarca at the Puma Trail"/><div><span className="eyebrow">03 · {t.nextGeneration}</span><h3>{lang==='en'?'Liam Abarca':'Liam Abarca'}</h3><p>{lang==='en'?'Raúl and Sonia’s grandson, growing up with the forest and its trails as part of the family story.':'Nieto de Raúl y Sonia, creciendo con el bosque y sus senderos como parte de la historia familiar.'}</p></div></article>
      </div>
    </section>
    <section className="story-quote" data-header-theme="dark"><div className="quote-big">“</div><blockquote>{lang==='en'?'We conserve today so the forest can keep teaching tomorrow.':'Conservamos hoy para que el bosque pueda seguir enseñando mañana.'}</blockquote></section>
    <Footer/>
  </div>;
}

function GalleryPage(){
  const {lang,t}=useLang(); const [lightbox,setLightbox]=useState(null);
  return <div className="page gallery-page-wrap">
    <PageHero eyebrow={t.navGallery} title={t.galleryTitle} sub={t.gallerySub} image={IMG.orangeCups}/>
    <section className="gallery-wall" data-header-theme="light">
      <div className="gallery-intro"><span className="eyebrow">{t.fieldJournal}</span><p>{lang==='en'?'Everything here comes from the forest around the reserve.':'Todo aquí viene del bosque alrededor de la reserva.'}</p></div>
      <div className="masonry">
        {gallery.map(([src,en,es],i)=><button className={`masonry-item tile-${i%8}`} key={src+i} onClick={()=>setLightbox([src,lang==='en'?en:es])}><img src={src} alt={lang==='en'?en:es}/><span>{String(i+1).padStart(2,'0')} · {lang==='en'?en:es}</span></button>)}
      </div>
    </section>
    {lightbox && <div className="lightbox" onClick={()=>setLightbox(null)}><button className="lightbox-close" onClick={()=>setLightbox(null)}><X/></button><img src={lightbox[0]} alt={lightbox[1]}/><div>{lightbox[1]}</div></div>}
    <Footer light/>
  </div>;
}

function ReservePage(){
  const {t,lang}=useLang(); const [params]=useSearchParams();
  const initial=params.get('tour') || 'birdwatching-private';
  const [step,setStep]=useState(1); const [tourSlug,setTourSlug]=useState(initial); const [date,setDate]=useState(new Date().toISOString().slice(0,10)); const [people,setPeople]=useState(2);
  const tour=tours.find(x=>x.slug===tourSlug) || tours[0]; const d=tour[lang]; const total=tour.price*Number(people);
  return <div className="reserve-page">
    <section className="reserve-head" data-header-theme="light"><span className="eyebrow">MONTENUBIS · {t.book}</span><h1>{t.reserveTitle}</h1><p>{t.reserveSub}</p></section>
    <div className="stepper"><span className={step===1?'active':''}>01 · {lang==='en'?'Experience':'Experiencia'}</span><span className={step===2?'active':''}>02 · {t.guest}</span><span className={step===3?'active':''}>03 · {t.payment}</span></div>
    {step===1 && <section className="reserve-layout" data-header-theme="light"><div className="reserve-form-area"><label className="big-label">{t.selectTour}</label><div className="reserve-tour-list">{tours.map(item=><button key={item.slug} onClick={()=>setTourSlug(item.slug)} className={item.slug===tourSlug?'reserve-tour selected':'reserve-tour'}><img src={item.image} alt=""/><div><strong>{item[lang].title}</strong><span>${item.price} {t.perPerson} · {item.duration}</span></div><Check className="selected-check" size={18}/></button>)}</div></div><aside className="reserve-summary"><span className="eyebrow">01</span><h3>{d.title}</h3><div className="summary-row"><CalendarDays size={16}/><label>{t.date}<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div><div className="summary-row"><Users size={16}/><label>{t.people}<select value={people} onChange={e=>setPeople(e.target.value)}>{[2,3,4,5,6,8,10].map(n=><option key={n}>{n}</option>)}</select></label></div><div className="summary-total"><span>{t.total}</span><strong>${total}</strong></div><button className="primary-btn full" onClick={()=>setStep(2)}>{t.continue}<ArrowRight/></button></aside></section>}
    {step===2 && <section className="guest-step" data-header-theme="light"><div><span className="eyebrow">02</span><h2>{t.guest}</h2><p>{lang==='en'?'Tell us who is coming so we can prepare your visit.':'Cuéntanos quién viene para preparar tu visita.'}</p></div><div className="form-card"><div className="form-grid"><label>{t.firstName}<input placeholder="Jane"/></label><label>{t.lastName}<input placeholder="Smith"/></label><label>{t.email}<input type="email" placeholder="jane@example.com"/></label><label>{t.phone}<input placeholder="+1"/></label></div><div className="form-summary"><div><span>{d.title}</span><strong>{people} {t.people.toLowerCase()}</strong><strong>{date}</strong></div><strong>${total}</strong></div><div className="form-actions"><button className="ghost-btn" onClick={()=>setStep(1)}>{t.back}</button><button className="primary-btn" onClick={()=>setStep(3)}>{t.continue}<ArrowRight/></button></div></div></section>}
    {step===3 && <section className="payment-step" data-header-theme="light"><div><span className="eyebrow">03 · {t.payment}</span><h2>{lang==='en'?'Ready when you are.':'Listo cuando tú quieras.'}</h2><p>{t.paymentDemo}</p><div className="payment-methods"><div>VISA</div><div>MC</div><div>AMEX</div><div>PAYPAL</div></div></div><div className="payment-card-demo"><span>{t.demo}</span><div className="fake-card"><div>MonteNubis</div><strong>${total}</strong><small>•••• 4242 · DEMO</small></div><div className="form-actions"><button className="ghost-btn" onClick={()=>setStep(2)}>{t.back}</button><button className="primary-btn" onClick={()=>setStep(4)}>{t.finish}<Check/></button></div></div></section>}
    {step===4 && <section className="confirmation" data-header-theme="dark"><div className="confirmation-glow"/><Sparkles size={26}/><span className="eyebrow">MONTENUBIS</span><h2>{t.confirmation}</h2><p>{lang==='en'?'Your demo reservation has been prepared. Connect your real payment provider later to complete the flow.':'Tu reserva de demostración quedó preparada. Conecta el proveedor de pago real más adelante para completar el proceso.'}</p><Link to="/" className="primary-btn">{t.navHome}<ArrowRight/></Link></section>}
    <Footer light/>
  </div>;
}

function ContactPage(){
  const {lang}=useLang();
  return <div className="contact-page"><PageHero eyebrow={lang==='en'?'CONTACT':'CONTACTO'} title={lang==='en'?'Come into the forest.':'Ven al bosque.'} sub={lang==='en'?'Questions, private groups and reservations.':'Preguntas, grupos privados y reservas.'} image={IMG.sunset2}/><section className="contact-grid" data-header-theme="light"><div><span className="eyebrow">MONTEVERDE · COSTA RICA</span><h2>{lang==='en'?'Talk to Montenubis.':'Habla con Montenubis.'}</h2><div className="contact-lines"><a href="tel:+50660003120">+506 6000-3120</a><a href="mailto:reservamontenubis@gmail.com">reservamontenubis@gmail.com</a><span>7:00 AM – 8:00 PM</span></div></div><form className="form-card"><label>{lang==='en'?'Name':'Nombre'}<input/></label><label>{lang==='en'?'Email':'Correo'}<input type="email"/></label><label>{lang==='en'?'Message':'Mensaje'}<textarea rows="5"/></label><button className="primary-btn" type="button">{lang==='en'?'Send message':'Enviar mensaje'}<ArrowRight/></button></form></section><Footer light/></div>;
}

function NotFound(){ const {lang}=useLang(); return <div className="notfound"><span className="eyebrow">404</span><h1>{lang==='en'?'This trail ends here.':'Este sendero termina aquí.'}</h1><Link to="/" className="primary-btn">{lang==='en'?'Back to forest':'Volver al bosque'}<ArrowRight/></Link></div>; }

function BrandIcon({type}){
  if(type==='instagram') return <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.4" cy="6.8" r="1.15" fill="currentColor"/></svg>;
  if(type==='facebook') return <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon"><path d="M13.6 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8.2V12h2.6v9h2.8Z" fill="currentColor"/></svg>;
  if(type==='whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon"><path d="M12 3.5a8.3 8.3 0 0 0-7.2 12.5L3.5 20.5l4.7-1.2A8.3 8.3 0 1 0 12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M8.8 8.7c.2-.4.4-.4.8-.4h.6c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.8l-.5.6c.6 1.1 1.4 1.9 2.5 2.4l.6-.5c.2-.2.5-.2.8-.1l1.6.7c.3.1.4.3.4.6 0 .4-.2 1.1-.5 1.3-.3.3-1 .4-1.4.3-2.4-.6-5.2-3.1-6.1-5.3-.2-.6-.4-1.6.1-2.4Z" fill="currentColor"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon maps-icon"><path d="M12 21s6-6.1 6-11a6 6 0 1 0-12 0c0 4.9 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="10" r="2.2" fill="currentColor"/></svg>;
}

function Footer({light=false}){
  const {t}=useLang();
  const locationUrl='https://www.google.com/maps/place/Montenubis/@10.3366601,-84.8346971,1002m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8fa01b003998d75d:0x20b5085b62c8cc4a!8m2!3d10.3366601!4d-84.8346971!16s%2Fg%2F11np_bj_7k!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';
  const instagramUrl='https://www.instagram.com/montenubis?stkn=MXduMWsxZmxkNnF3cw%3D%3D';
  const facebookUrl='https://www.facebook.com/Montenubis/?rdid=nWVk2lfFPIreCE8E';
  const whatsappUrl='https://wa.me/50660003120';
  return <footer className={`site-footer ${light?'footer-light':'footer-dark'}`}>
    <div className="footer-top">
      <div>
        <span className="footer-wordmark">MonteNubis</span>
        <p>{t.location}<br/>{t.fieldText}</p>
        <div className="footer-contact">
          <a href={whatsappUrl} target="_blank" rel="noreferrer"><span className="contact-icon"><BrandIcon type="whatsapp"/></span><span>+506 6000-3120</span></a>
          <a href="mailto:reservamontenubis@gmail.com"><span className="contact-icon"><span className="mail-symbol">✉</span></span><span>reservamontenubis@gmail.com</span></a>
        </div>
      </div>
      <div className="footer-nav"><Link to="/">{t.navHome}</Link><Link to="/tours">{t.navTours}</Link><Link to="/mapa">{t.navMap}</Link><Link to="/historia">{t.navStory}</Link><Link to="/galeria">{t.navGallery}</Link></div>
      <div className="footer-cta">
        <span>{t.book}</span>
        <Link to="/reservar" className="primary-btn">{t.book}<ArrowRight/></Link>
        <div className="footer-socials" aria-label="Social links">
          <a className="social-icon-link" href={locationUrl} target="_blank" rel="noreferrer" aria-label={t.locationButton} title={t.locationButton}><BrandIcon type="maps"/></a>
          <a className="social-icon-link" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><BrandIcon type="instagram"/></a>
          <a className="social-icon-link" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook"><BrandIcon type="facebook"/></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom"><span>© 2026 MonteNubis</span><span>Monteverde · Costa Rica</span><Link to="/contacto">{t.contact}</Link></div>
  </footer>;
}
function App(){return <LanguageProvider><Layout/></LanguageProvider>}

ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
