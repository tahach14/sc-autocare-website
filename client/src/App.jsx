import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, ShieldCheck, Sparkles, Droplets, CarFront, Check, ChevronDown, Clock3, MapPin, Instagram, Facebook, Phone, Mail, Gauge, CircleCheck, BadgeCheck, Heart } from 'lucide-react';

const services = [
  { slug:'exterior-detailing', icon:Droplets, no:'01', title:'Exterior Detailing', short:'A careful wash and finish that brings back depth, gloss and a clean, crisp look.', description:'A complete exterior refresh focused on safe washing, clean wheels and tyres, and a finish that looks sharp from every angle.', items:['Pre-rinse and foam wash','Careful hand wash','Wheels, tyres and wheel faces cleaned','Door jamb wipe-down','Exterior glass cleaned','Tyre dressing'] },
  { slug:'interior-detailing', icon:Sparkles, no:'02', title:'Interior Detailing', short:'Refresh your cabin with detailed cleaning of the surfaces you see and touch every day.', description:'Bring comfort back to your cabin with a thorough interior clean, from the carpets and mats to the dashboard and touch points.', items:['Thorough interior vacuum','Dashboard and trim wipe-down','Seats and upholstery cleaned','Floor mats and carpets refreshed','Interior glass cleaned','Detailing of hard-to-reach areas'] },
  { slug:'paint-enhancement', icon:ShieldCheck, no:'03', title:'Paint Enhancement', short:'Refine the appearance of your paintwork and bring out a smoother, glossier finish.', description:'A paint-focused service designed to improve gloss and clarity. The right approach depends on your vehicle’s paint condition.', items:['Vehicle and paint assessment','Exterior decontamination','Machine polishing as appropriate','Gloss enhancement','Finishing protection recommendation'] },
  { slug:'full-detail', icon:CarFront, no:'04', title:'Full Detail', short:'A complete inside-and-out reset for the vehicle that deserves extra attention.', description:'Combine interior and exterior care into one comprehensive visit. A great choice when your vehicle needs an all-round refresh.', items:['Complete interior refresh','Foam and hand wash','Wheels and tyres detailed','Door jambs and glass cleaned','Final inspection and finishing touches'] },
];

const packages = [

  {
    name: 'Standard Vehicle Interior Revival',
    price: '$60',
    fit: 'Sedans · Coupes · Compacts · Hatchbacks',
    label: '05 / STANDARD VEHICLES',
    featured: false,
    sections: [
      { title: 'INTERIOR REVIVAL INCLUDES', items: ['Full interior vacuum', 'Thorough wipe down', 'Glass cleaning', 'Floor mats cleaned & dressed'] }
    ]
  },
  {
    name: 'Standard Vehicle Premium Wash',
    price: '$80',
    fit: 'Sedans · Coupes · Compacts · Hatchbacks',
    label: '03 / STANDARD VEHICLES',
    featured: false,
    sections: [
      { title: 'PREMIUM WASH INCLUDES', items: ['Foam & hand wash', 'Iron remover / clay bar', 'Wheels & tires cleaned', '6-month paint sealant', 'Tire dressing applied'] }
    ]
  },
  {
    name: 'Large Vehicle Interior Revival',
    price: '$100',
    fit: 'SUVs · Trucks · Vans · 3-row SUVs',
    label: '06 / LARGE VEHICLES',
    featured: false,
    sections: [
      { title: 'INTERIOR REVIVAL INCLUDES', items: ['Full interior vacuum', 'Thorough wipe down', 'Glass cleaning', 'Floor mats cleaned & dressed'] }
    ]
  },
  {
    name: 'Large Vehicle Premium Wash',
    price: '$120',
    fit: 'SUVs · Vans · Trucks · 3-row SUVs',
    label: '04 / LARGE VEHICLES',
    featured: false,
    sections: [
      { title: 'PREMIUM WASH INCLUDES', items: ['Foam & hand wash', 'Iron remover / clay bar', 'Wheels & tires cleaned', '6-month paint sealant', 'Tire dressing applied'] }
    ]
  },
  {
    name: 'Standard Full Works',
    price: '$120',
    fit: 'Sedans · Coupes · Compacts · Hatchbacks',
    label: '01 / STANDARD VEHICLES',
    featured: false,
    sections: [
      { title: 'INTERIOR', items: ['Thorough vacuum', 'Full interior wipe down', 'Clean floor mats & carpets'] },
      { title: 'EXTERIOR', items: ['Foam & hand wash', 'Clean wheels & tires', 'Clean door jambs', 'Apply tire dressing'] }
    ]
  },
  {
    name: 'Large Vehicle Full Works',
    price: '$140',
    fit: 'SUVs · Trucks · Vans · 3-row SUVs',
    label: '02 / LARGE VEHICLES',
    featured: true,
    sections: [
      { title: 'INTERIOR', items: ['Thorough vacuum', 'Full interior wipe down', 'Clean floor mats & carpets'] },
      { title: 'EXTERIOR', items: ['Foam & hand wash', 'Clean wheels & tires', 'Clean door jambs', 'Apply tire dressing'] }
    ]
  }
  
];
const faqs = [
 ['How long does a detail take?','Timing depends on your vehicle size, condition and selected service. Share your vehicle details when enquiring and we can provide a better estimate.'],
 ['Do I need to book in advance?','Yes, booking ahead is recommended so we can reserve enough time for your vehicle. Send a booking enquiry and we’ll follow up to confirm.'],
 ['Which package should I choose?','The Standard Full Works package is for sedans, coupes, compact cars and hatchbacks. The Large Vehicle Full Works package is for SUVs, trucks and vans.'],
 ['Can I request a custom service?','Absolutely. Tell us what your vehicle needs in the message field and we can discuss the best option.'],
 ['Where are you located?','Location and service-area details can be confirmed directly with SC Autocare when you enquire.'],
];

const photos = [
 ['Detailing in progress','https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1100&q=85'],
 ['Glossy performance car','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85'],
 ['Precision exterior wash','https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1100&q=85'],
 ['Clean modern interior','https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1100&q=85'],
 ['Paintwork finish','https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&w=1100&q=85'],
 ['Wheel and tyre detail','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=85'],
];

const routeTitles = {
 '/':'SC Autocare | Professional Car Detailing',
 '/services':'Car Detailing Services | SC Autocare',
 '/packages':'Detailing Packages & Pricing | SC Autocare',
 '/about':'About SC Autocare | Time to Shine',
 '/gallery':'Car Detailing Gallery | SC Autocare',
 '/contact':'Book Car Detailing | Contact SC Autocare',
};

function usePath(){
 const [path,setPath]=useState(window.location.pathname.replace(/\/+$/,'')||'/');
 useEffect(()=>{const onPop=()=>setPath(window.location.pathname.replace(/\/+$/,'')||'/');window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);
 const go=(to)=>{if(to.startsWith('#')){document.querySelector(to)?.scrollIntoView({behavior:'smooth'});return;}window.history.pushState({},'',to);setPath(to);window.scrollTo({top:0,behavior:'instant'});};
 return [path,go];
}
function Link({to='/',go,children,className='',...props}){return <a href={to} className={className} onClick={e=>{if(e.button===0&&!e.metaKey&&!e.ctrlKey){e.preventDefault();go(to)}}} {...props}>{children}</a>}
function Eyebrow({children}){return <div className="eyebrow"><span/>{children}</div>}
function Header({go}) {
 const [open,setOpen]=useState(false);
 const nav=[['Home','/'],['Services','/services'],['Packages','/packages'],['About','/about'],['Gallery','/gallery'],['Contact','/contact']];
 return <><div className="topline"><div className="wrap top-inner"><span><i className="live-dot"/> YOUR CAR. OUR CRAFT. <b>TIME TO SHINE.</b></span><span className="top-right"><MapPin size={14}/> Mobile detailing <i/> <a href="tel:2149304371" className="top-phone">
  <Phone size={13} />
  214-930-4371
</a></span></div></div>
 <header className="header"><div className="wrap nav"><Link to="/" go={go} className="brand"><img src="/sc-autocare-logo.png" alt="SC Autocare car detailing logo"/></Link>
 <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
 <nav className={open?'nav-links open':'nav-links'}>{nav.map(([n,p])=><Link key={p} to={p} go={t=>{go(t);setOpen(false)}}>{n}</Link>)}<Link to="/contact" go={t=>{go(t);setOpen(false)}} className="nav-cta">Book a detail <ArrowUpRight size={17}/></Link></nav></div></header></>
}
function Footer({go}){return <footer className="footer"><div className="wrap footer-main"><div className="footer-brand"><Link to="/" go={go}><img src="/sc-autocare-logo.png" alt="SC Autocare"/></Link><p>Professional car care with an eye for every detail. Your car. Our craft. Time to shine.</p><div className="socials"><a href="https://www.instagram.com/_scautocare?utm_source=ig_web_button_share_sheet&hvrq=ZDNlZDc0MzIxNw==" aria-label="Instagram"><Instagram/></a><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook/></a></div></div>
 <div className="footer-nav"><span>EXPLORE</span>{[['Home','/'],['Services','/services'],['Packages','/packages'],['About us','/about'],['Gallery','/gallery']].map(([n,p])=><Link key={p} to={p} go={go}>{n}</Link>)}</div>
 <div className="footer-nav"><span>OUR SERVICES</span>{services.map(s=><Link key={s.slug} to={'/services/'+s.slug} go={go}>{s.title}</Link>)}</div>
 <div className="footer-cta"><span>READY FOR A RESET?</span><h3>LET YOUR RIDE<br/><em>SHINE AGAIN.</em></h3><Link to="/contact" go={go} className="btn btn-blue">BOOK YOUR DETAIL <ArrowUpRight size={17}/></Link><small><a href="tel:2149304371" className="footer-phone">
  <Phone size={15} />
  214-930-4371
</a></small></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} SC AUTOCARE. ALL RIGHTS RESERVED.</span><span>BUILT AROUND THE DETAILS <b>✳</b></span>  <a href="tel:2149304371" className="mobile-call-btn">
  <Phone size={18} />
  CALL NOW
</a></div></footer>}
function CTA({go}){return <section className="cta-band"><div className="wrap cta-inner"><div><Eyebrow>YOUR NEXT DETAIL STARTS HERE</Eyebrow><h2>READY TO <em>SHINE?</em></h2><p>Tell us about your vehicle and what you have in mind.</p></div><Link to="/contact" go={go} className="btn btn-blue">BOOK YOUR DETAIL <ArrowUpRight/></Link></div></section>}
function Home({go}){return <>
 <main><section className="hero"><div className="hero-grid"/><div className="wrap hero-layout"><div className="hero-copy"><Eyebrow>THE DETAILING EXPERIENCE</Eyebrow><h1 className="hero-main-heading">
  <span>BRING BACK</span>
  <span>THAT <em>NEW-CAR</em></span>
  <span  className="blue-text">FEELING.</span>
</h1><p className="hero-lead">More than a clean. It’s a complete reset for your ride. Precision detailing, serious shine, and care in every corner.</p><div className="hero-actions"><Link to="/contact" go={go} className="btn btn-blue">BOOK YOUR DETAIL <ArrowUpRight/></Link><Link to="/services" go={go} className="text-link">EXPLORE SERVICES <span>↓</span></Link></div><div className="hero-proof"><div className="proof-icon"><ShieldCheck/></div><div><b>DETAIL-DRIVEN CARE</b><small>Every finish. Every detail. Done right.</small></div><div className="proof-divider"/><div className="rating"><span>★★★★★</span><small>THE SC STANDARD</small></div></div></div>
 <div className="hero-visual"><div className="visual-ring ring-one"/><div className="visual-ring ring-two"/><div className="visual-label">BUILT ON THE DETAILS <span>✳</span></div><div className="car-photo"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=88" alt="Premium sports car representing professional auto detailing"/></div><div className="visual-stamp"><Sparkles/><span>THE ART OF<br/><b>THE SHINE</b></span></div><div className="visual-caption"><span>SC / 001</span><span>FINISH WITH PURPOSE</span></div></div></div><div className="wrap hero-bottom"><span>SC AUTOCARE</span><span className="bottom-line"/><span>TIME TO SHINE <b>✳</b></span></div></section>
 
<section className="ticker">
  <div className="ticker-track">
    {[0, 1].map((item) => (
      <div className="ticker-group" key={item}>
        <span>DETAIL WITH PURPOSE</span>
        <b>✳</b>
        <span>DRIVE THE DIFFERENCE</span>
        <b>✳</b>
        <span>TIME TO SHINE</span>
        <b>✳</b>
        <span>DETAIL WITH PURPOSE</span>
        <b>✳</b>
      </div>
    ))}
  </div>
</section>

 <section className="section"><div className="wrap"><div className="section-head"><div><Eyebrow>WHAT WE DO</Eyebrow><h2>THE RIGHT CARE.<br/><em>THE RIGHT FINISH.</em></h2></div><p>From a freshen-up to a full transformation, we bring the right attention and technique to every vehicle.</p></div><div className="service-grid">{services.map(s=><article className="service-card" key={s.slug}><div className="card-top"><span>{s.no} / SERVICE</span><s.icon/></div><h3>{s.title}</h3><p>{s.short}</p><ul>{s.items.slice(0,3).map(t=><li key={t}><Check/>{t}</li>)}</ul><Link to={'/services/'+s.slug} go={go} className="card-link">EXPLORE SERVICE <ArrowUpRight/></Link></article>)}</div><div className="center-action"><Link to="/services" go={go} className="text-link">VIEW ALL SERVICES <ArrowUpRight/></Link></div></div></section>
 <section className="feature-strip"><div className="wrap feature-layout"><div className="feature-image"><img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85" alt="Detailer carefully cleaning a vehicle"/></div><div className="feature-copy"><Eyebrow>THE SC STANDARD</Eyebrow><h2>WE DON'T JUST<br/>CLEAN CARS.<br/><em>WE CARE FOR THEM.</em></h2><p>We believe every vehicle deserves thoughtful care, the right products and a finish that makes you look back after you park.</p><div className="feature-points"><span><BadgeCheck/> Attention to detail</span><span><Gauge/> Finish-focused approach</span><span><Heart/> Care in every corner</span></div><Link to="/about" go={go} className="text-link">MORE ABOUT SC AUTOCARE <ArrowUpRight/></Link></div></div></section>
 <section className="section gallery-preview"><div className="wrap"><div className="section-head"><div><Eyebrow>THE FINISH SPEAKS</Eyebrow><h2>DETAILS THAT<br/><em>MAKE THE DIFFERENCE.</em></h2></div><p>A look at the craft, care and clean finishes that inspire the SC Autocare experience.</p></div><div className="gallery-grid">{photos.slice(0,3).map(([alt,url],i)=><div className={'gallery-tile tile-'+i} key={url}><img src={url} alt={alt}/><span>SC AUTOCARE / 0{i+1}</span></div>)}</div><div className="center-action"><Link to="/gallery" go={go} className="text-link">VIEW GALLERY <ArrowUpRight/></Link></div></div></section>
 <section className="package-teaser"><div className="wrap package-teaser-inner"><div><Eyebrow>SIMPLE, COMPLETE CARE</Eyebrow><h2>FULL WORKS.<br/><em>FRESH FINISH.</em></h2><p>Choose the package that fits your vehicle. Every Full Works detail includes a complete interior and exterior refresh.</p></div><div className="teaser-prices">{packages.slice(0, 3).map(p=><div key={p.name}><span>{p.label}</span><b>{p.name}</b><strong>{p.price}</strong></div>)}<Link to="/packages" go={go} className="btn btn-blue">EXPLORE PACKAGES <ArrowUpRight/></Link></div></div></section>
 <CTA go={go}/></main></>}

function PageHero({eyebrow,title,highlight,desc}) {
  return (
    <section className="page-hero">
      <div className="page-hero-overlay"></div>
      <div className="wrap page-hero-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}<br/><em>{highlight}</em></h1>
        <p>{desc}</p>
      </div>
    </section>
  );
}

function Services({go}){return <><PageHero eyebrow="THE SC SERVICE MENU" title="CARE FOR EVERY" highlight="CURVE." desc="From a quick refresh to a complete transformation, explore detailing services built around a clean, considered finish."/><section className="section"><div className="wrap service-page-grid">{services.map(s=><article className="service-wide" key={s.slug}><div className="service-wide-icon"><s.icon/></div><div><span className="mini-label">{s.no} / SC SERVICE</span><h2>{s.title}</h2><p>{s.description}</p><div className="tag-list">{s.items.slice(0,4).map(x=><span key={x}><Check/>{x}</span>)}</div><Link to={'/services/'+s.slug} go={go} className="text-link">SERVICE DETAILS <ArrowUpRight/></Link></div></article>)}</div></section><CTA go={go}/></>}
function ServiceDetail({slug,go}){const s=services.find(x=>x.slug===slug);if(!s)return <NotFound go={go}/>;return <><PageHero eyebrow={`SC AUTOCARE / SERVICE ${s.no}`} title={s.title.toUpperCase()} highlight="DONE RIGHT." desc={s.description}/><section className="section"><div className="wrap detail-layout"><div><Eyebrow>WHAT'S INCLUDED</Eyebrow><h2>THE DETAILS<br/><em>MATTER.</em></h2><p className="muted">Every vehicle is different. We’ll discuss its condition and your goals before confirming the right approach.</p><ul className="check-list">{s.items.map(x=><li key={x}><CircleCheck/>{x}</li>)}</ul><Link to="/contact" go={go} className="btn btn-blue">ENQUIRE ABOUT THIS SERVICE <ArrowUpRight/></Link></div><img className="detail-photo" src={s.slug==='interior-detailing'?photos[3][1]:s.slug==='paint-enhancement'?photos[4][1]:s.slug==='exterior-detailing'?photos[2][1]:photos[0][1]} alt={s.title+' car care'}/></div></section><CTA go={go}/></>}
function Packages({go}){return <><PageHero eyebrow="SIMPLE, COMPLETE CARE" title="PICK YOUR" highlight="FULL WORKS." desc="Straightforward packages for standard and larger vehicles. Need something different? Send us a note and tell us about your car."/><section className="packages-section"><div className="wrap"><div className="package-grid">
  {packages.map(p => (
    <article
      className={'package-card ' + (p.featured ? 'package-featured' : '')}
      key={p.name}
    >
      <div className="package-kicker">{p.label}</div>

      <h2>{p.name}</h2>

      <p className="vehicle-fit">{p.fit}</p>

      <div className="package-price">
        <span>PACKAGE PRICE</span>
        <strong>{p.price}</strong>
      </div>

      <div className="package-includes">
        {p.sections.map(section => (
          <div key={section.title}>
            <b>{section.title}</b>
            <ul>
              {section.items.map(item => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link
        to="/contact"
        go={go}
        className="btn btn-blue package-cta"
      >
        BOOK THIS PACKAGE <ArrowUpRight />
      </Link>
    </article>
  ))}
</div><p className="package-note">Prices and package inclusions shown are the details supplied for this website preview. Confirm final pricing, availability and any vehicle-condition surcharges directly with SC Autocare.</p></div></section><CTA go={go}/></>}
function About({go}){return <><PageHero eyebrow="WHO WE ARE" title="THE SC" highlight="STANDARD." desc="A detailing experience shaped by care, precision and a simple belief: the difference is always in the details."/><section className="section"><div className="wrap about-page"><img src={photos[0][1]} alt="Professional detailing process"/><div><Eyebrow>YOUR CAR. OUR CRAFT.</Eyebrow><h2>WE BELIEVE IN<br/><em>THE FINISH.</em></h2><p>SC Autocare is built around giving every vehicle thoughtful attention. Whether it needs a freshen-up or a full inside-and-out reset, our focus is a clean process and a finish you can feel good about.</p><p>We take the time to understand your vehicle and what you want from the detail, then recommend a service that makes sense.</p><div className="feature-points"><span><BadgeCheck/> Careful attention</span><span><Gauge/> Detail-led process</span><span><Heart/> Pride in the finish</span></div><Link to="/contact" go={go} className="btn btn-blue">GET IN TOUCH <ArrowUpRight/></Link></div></div></section><CTA go={go}/></>}
function Gallery({go}){return <><PageHero eyebrow="THE WORK. THE FINISH." title="A CLOSER LOOK AT" highlight="THE DETAILS." desc="Explore the world of automotive care, clean finishes and detailing inspiration behind SC Autocare."/><section className="section"><div className="wrap"><div className="gallery-grid gallery-full">{photos.map(([alt,url],i)=><div className="gallery-tile" key={url}><img src={url} alt={alt}/><span>SC AUTOCARE / 0{i+1} — {alt.toUpperCase()}</span></div>)}</div><p className="gallery-note">These are illustrative photography selections for the website preview. Replace with SC Autocare’s own before-and-after and completed-work photos for an authentic portfolio.</p></div></section><CTA go={go}/></>}
function Contact({go}){const [form,setForm]=useState({name:'',phone:'',email:'',vehicle:'',service:'Standard Full Works — $120',date:'',message:''});const [status,setStatus]=useState('');const [loading,setLoading]=useState(false);const update=e=>setForm({...form,[e.target.name]:e.target.value});async function submit(e){e.preventDefault();setLoading(true);setStatus('');try{const url=`${import.meta.env.VITE_API_URL||''}/api/bookings`;const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await r.json();if(!r.ok)throw new Error(data.message||'Request failed');setStatus('Thanks! Your booking enquiry has been received. We’ll be in touch soon.');setForm({name:'',phone:'',email:'',vehicle:'',service:'Standard Full Works — $120',date:'',message:''});}catch(err){setStatus('Your enquiry could not be submitted right now. Please try again or contact SC Autocare directly.');}finally{setLoading(false)}}return <><PageHero eyebrow="LET'S GET YOU BOOKED" title="TIME TO" highlight="SHINE." desc="Tell us a little about your vehicle and the service you’re interested in. We’ll follow up to discuss the next steps."/><section className="booking-section"><div className="wrap booking-layout"><div className="booking-copy"><Eyebrow>START YOUR ENQUIRY</Eyebrow><h2>YOUR RIDE.<br/><em>YOUR RESET.</em></h2><p>Share your details using the form. Include your vehicle make, model and anything you’d like us to know about its current condition.</p><div className="contact-lines"><div><span><Phone/></span><div><b>PHONE</b><small><a href="tel:2149304371">
  214-930-4371
</a></small></div></div><div><span><Mail/></span><div><b>EMAIL</b><small>shawncosta09@gmail.com</small></div></div><div><span><MapPin/></span><div><b>LOCATION</b><small>Mobile service</small></div></div></div></div><form className="booking-form" onSubmit={submit}><div className="form-heading"><span>SC / BOOKING ENQUIRY</span><b>LET'S TALK DETAILS.</b></div><div className="form-row"><label>Your name *<input required name="name" value={form.name} onChange={update} placeholder="Full name"/></label><label>Phone number *<input required name="phone" value={form.phone} onChange={update} placeholder="Your best contact number"/></label></div><div className="form-row"><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com"/></label><label>Vehicle<input name="vehicle" value={form.vehicle} onChange={update} placeholder="Year, make & model"/></label></div><div className="form-row"><label>Service interested in<select name="service" value={form.service} onChange={update}>{[...services.map(s=>s.title),'Not sure — recommend a service'].map(x=><option key={x}>{x}</option>)}</select></label><label>Preferred date<input type="date" name="date" value={form.date} onChange={update}/></label></div><label>Tell us more<textarea name="message" value={form.message} onChange={update} placeholder="What would you like us to know about your vehicle?" rows="4"/></label><button className="btn btn-blue submit-btn" disabled={loading}>{loading?'SENDING...':'SEND BOOKING ENQUIRY'} <ArrowUpRight/></button>{status&&<p className="form-status" role="status">{status}</p>}<small className="form-privacy">Your information is used only to respond to your enquiry.</small></form></div></section><FAQ/><CTA go={go}/></>}
function FAQ(){const [active,setActive]=useState(0);return <section className="faq-section"><div className="wrap faq-layout"><div><Eyebrow>GOOD TO KNOW</Eyebrow><h2>GOT<br/><em>QUESTIONS?</em></h2><p>A few helpful answers before you book your detail.</p></div><div>{faqs.map(([q,a],i)=><div className={'faq-item '+(active===i?'active':'')} key={q}><button onClick={()=>setActive(active===i?-1:i)}><span><small>0{i+1}</small>{q}</span><ChevronDown/></button>{active===i&&<p>{a}</p>}</div>)}</div></div></section>}
function NotFound({go}){return <PageHero eyebrow="404 / PAGE NOT FOUND" title="THIS PAGE" highlight="ISN'T HERE." desc="The page you’re looking for may have moved. Head back to SC Autocare and explore our services."/>}
export default function App(){const [path,go]=usePath();useEffect(()=>{document.title=routeTitles[path]|| (path.startsWith('/services/')?'Service Details | SC Autocare':'SC Autocare | Time to Shine');let meta=document.querySelector('meta[name="description"]');if(meta)meta.content='SC Autocare offers professional car detailing, interior and exterior care, full detail packages and booking enquiries. Your car. Our craft. Time to shine.';},[path]);let content;if(path==='/')content=<Home go={go}/>;else if(path==='/services')content=<Services go={go}/>;else if(path==='/packages')content=<Packages go={go}/>;else if(path==='/about')content=<About go={go}/>;else if(path==='/gallery')content=<Gallery go={go}/>;else if(path==='/contact')content=<Contact go={go}/>;else if(path.startsWith('/services/'))content=<ServiceDetail slug={path.split('/')[2]} go={go}/>;else content=<NotFound go={go}/>;return <div className="site-shell"><Header go={go}/>{content}<Footer go={go}/></div>}
