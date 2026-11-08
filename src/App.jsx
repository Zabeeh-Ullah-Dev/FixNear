import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, ChevronDown,
  Clock3, MapPin, Menu, Search, ShieldCheck, SlidersHorizontal,
  Star, Wrench, X, Zap, Droplets, CarFront, Laptop, CircleHelp,
} from 'lucide-react';

const services = [
  { id: 1, name: 'Naveed Electric Works', trade: 'Electrician', icon: Zap, initials: 'NE', neighborhood: 'Hayatabad', distance: '1.2 mi', price: 1800, rating: 4.9, reviews: 84, response: 'Usually replies in 15 min', tag: 'Top rated', color: 'lime', detail: 'Wiring, breakers & lighting', available: 'Today, 4:30 PM' },
  { id: 2, name: 'Pipe & Flow Co.', trade: 'Plumber', icon: Droplets, initials: 'PF', neighborhood: 'University Town', distance: '2.1 mi', price: 1500, rating: 4.8, reviews: 61, response: 'Usually replies in 20 min', tag: 'Quick response', color: 'blue', detail: 'Leaks, taps & water heaters', available: 'Today, 5:15 PM' },
  { id: 3, name: 'Khan Auto Care', trade: 'Mechanic', icon: CarFront, initials: 'KA', neighborhood: 'Saddar', distance: '3.4 mi', price: 2200, rating: 4.7, reviews: 47, response: 'Usually replies in 30 min', tag: 'Popular nearby', color: 'orange', detail: 'Diagnostics, brakes & tune-ups', available: 'Tomorrow, 9:00 AM' },
  { id: 4, name: 'Circuit Lab', trade: 'Technician', icon: Laptop, initials: 'CL', neighborhood: 'University Town', distance: '2.7 mi', price: 2000, rating: 4.9, reviews: 39, response: 'Usually replies in 25 min', tag: 'Highly rated', color: 'violet', detail: 'Appliance & device repair', available: 'Today, 6:00 PM' },
  { id: 5, name: 'Brightline Electrical', trade: 'Electrician', icon: Zap, initials: 'BE', neighborhood: 'Saddar', distance: '3.1 mi', price: 1600, rating: 4.6, reviews: 28, response: 'Usually replies in 40 min', tag: 'New on FixNear', color: 'lime', detail: 'Fans, sockets & safety checks', available: 'Tomorrow, 10:30 AM' },
  { id: 6, name: 'Clearway Plumbing', trade: 'Plumber', icon: Droplets, initials: 'CP', neighborhood: 'Hayatabad', distance: '1.8 mi', price: 1700, rating: 4.8, reviews: 52, response: 'Usually replies in 18 min', tag: 'Quick response', color: 'blue', detail: 'Drain cleaning & pipe repair', available: 'Today, 7:00 PM' },
];
const categories = [
  { name: 'All services', icon: SlidersHorizontal }, { name: 'Electrician', icon: Zap },
  { name: 'Plumber', icon: Droplets }, { name: 'Mechanic', icon: CarFront }, { name: 'Technician', icon: Laptop },
];
const neighborhoods = ['All neighborhoods', 'Hayatabad', 'University Town', 'Saddar'];
const reviews = [
  { name: 'Ayesha R.', trade: 'Electrician', place: 'Hayatabad', stars: 5, daysAgo: 2, date: '2 days ago', text: 'Clear estimate, arrived when expected, and explained the repair before starting.' },
  { name: 'Bilal M.', trade: 'Plumber', place: 'University Town', stars: 5, daysAgo: 5, date: '5 days ago', text: 'Easy to compare options. The leak was fixed neatly and the price matched the estimate.' },
  { name: 'Sana K.', trade: 'Mechanic', place: 'Saddar', stars: 4, daysAgo: 7, date: '1 week ago', text: 'Helpful diagnostic visit and a straightforward explanation of what needed attention.' },
];
const money = (value) => `Rs ${Number(value).toLocaleString('en-PK')}`;

function Brand() {
  return <a className="brand" href="#top" aria-label="FixNear home"><span className="brand-mark"><Zap size={18} fill="currentColor" strokeWidth={2.5} /></span><span>fixnear<span className="brand-period">.</span></span></a>;
}

function ProviderCard({ service, onBook }) {
  const Icon = service.icon;
  return <article className="provider-card">
    <div className="provider-top">
      <div className={`provider-avatar ${service.color}`} aria-hidden="true"><Icon size={24} strokeWidth={1.8} /></div>
      <span className={`provider-tag ${service.color}`}><span className="tag-dot" />{service.tag}</span>
      <button className="icon-button save-button" type="button" aria-label={`Save ${service.name}`} onClick={(e) => e.currentTarget.classList.toggle('saved')}><Star size={18} /></button>
    </div>
    <div className="provider-title-row"><div><p className="eyebrow">{service.trade}</p><h3>{service.name}</h3></div><div className="rating"><Star size={14} fill="currentColor" /><b>{service.rating}</b><span>({service.reviews})</span></div></div>
    <p className="provider-detail">{service.detail}</p>
    <div className="provider-meta"><span><MapPin size={14} />{service.neighborhood} · {service.distance}</span><span><Clock3 size={14} />{service.response}</span></div>
    <div className="provider-bottom"><div><span className="price-label">Visit from</span><strong>{money(service.price)}<small> / visit</small></strong></div><button className="button button-small" type="button" onClick={() => onBook(service)}>Book <ArrowUpRight size={15} /></button></div>
    <span className="sr-only">Sample listing. Rating and pricing are illustrative.</span>
  </article>;
}

function BookingDialog({ service, onClose, onBooked }) {
  const [done, setDone] = useState(false);
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); if (dialog?.open) dialog.close(); };
  }, [onClose]);
  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const booking = { ...data, serviceId: service.id, serviceName: service.name, createdAt: new Date().toISOString(), demo: true };
    try {
      const existing = JSON.parse(localStorage.getItem('fixnear-demo-bookings') || '[]');
      localStorage.setItem('fixnear-demo-bookings', JSON.stringify([booking, ...existing]));
    } catch { /* Demo confirmation still works if local storage is unavailable. */ }
    setDone(true);
    onBooked();
  }
  return <dialog ref={dialogRef} className="booking-dialog" aria-labelledby="booking-title" onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label="Close booking dialog"><X size={20} /></button>
    {done ? <div className="booking-success"><span className="success-mark"><Check size={26} /></span><p className="eyebrow">DEMO REQUEST SAVED</p><h2 id="booking-title">You’re on the list.</h2><p>Your sample booking with <strong>{service.name}</strong> is saved in this browser only. It has not been sent to a real service provider.</p><button className="button button-wide" type="button" onClick={onClose}>Done <ArrowRight size={17} /></button></div> : <>
      <p className="eyebrow">REQUEST A VISIT · DEMO</p><h2 id="booking-title">Book {service.trade.toLowerCase()}</h2><p className="dialog-intro">Choose a time to try the FixNear booking flow. This demo won’t contact a provider.</p>
      <form className="booking-form" onSubmit={submit}>
        <label>Your name<input name="name" autoComplete="name" required minLength="2" placeholder="e.g. Amina Khan" /></label>
        <label>Phone or email<input name="contact" autoComplete="email" required placeholder="How could they reach you?" /></label>
        <label>Preferred visit<input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} /></label>
        <label>What needs fixing?<textarea name="note" rows="3" maxLength="240" placeholder="A short description helps the professional prepare." /></label>
        <div className="dialog-provider"><div className={`provider-avatar tiny ${service.color}`}><service.icon size={17} /></div><span><b>{service.name}</b><small>Sample listing · {money(service.price)} / visit</small></span></div>
        <button className="button button-wide" type="submit">Save demo request <ArrowRight size={17} /></button>
        <p className="form-note"><ShieldCheck size={14} /> Sample only — no contact details leave this browser.</p>
      </form>
    </>}
  </dialog>;
}

function MuseModule() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const appId = location.pathname.split('/')[2] || '';
    fetch('/app-session/me?app_id=' + appId).then((response) => response.ok ? response.json() : null).then((value) => { if (value) setUser(value); }).catch(() => {});
  }, []);
  return <>
    {user && <div className="user-module"><span>{user.nickname || user.email?.split('@')[0]}</span><button type="button" onClick={() => fetch('/app-session/logout?app_id=' + (location.pathname.split('/')[2] || ''), { method: 'POST' }).then(() => location.reload())}>Log out</button></div>}
    <a className={`muse-badge ${user ? 'icon-only' : ''}`} href="https://museai.im/home" target="_blank" rel="noopener noreferrer"><img src="/assets/images/icon.png" alt="" aria-hidden="true" /><span style={user ? { display: 'none' } : undefined}>Build by MuseWork</span></a>
  </>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('Peshawar');
  const [category, setCategory] = useState('All services');
  const [neighborhood, setNeighborhood] = useState('All neighborhoods');
  const [sort, setSort] = useState('recommended');
  const [priceCap, setPriceCap] = useState('any');
  const [bookingService, setBookingService] = useState(null);
  const [toast, setToast] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reviewSort, setReviewSort] = useState('Recent');
  const searchRef = useRef(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = services.filter((service) => {
      const matchesText = !normalized || [service.name, service.trade, service.detail, service.neighborhood].some((item) => item.toLowerCase().includes(normalized));
      const matchesCategory = category === 'All services' || service.trade === category;
      const matchesNeighborhood = neighborhood === 'All neighborhoods' || service.neighborhood === neighborhood;
      const matchesPrice = priceCap === 'any' || service.price <= Number(priceCap);
      return matchesText && matchesCategory && matchesNeighborhood && matchesPrice;
    });
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [query, category, neighborhood, sort, priceCap]);
  const shownReviews = useMemo(() => [...reviews].sort((a, b) => reviewSort === 'Top rated' ? b.stars - a.stars || a.daysAgo - b.daysAgo : a.daysAgo - b.daysAgo), [reviewSort]);
  function clearFilters() { setQuery(''); setCategory('All services'); setNeighborhood('All neighborhoods'); setPriceCap('any'); setSort('recommended'); }
  function scrollToListings() { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }
  const closeBooking = useCallback(() => setBookingService(null), []);
  function showBookingSuccess() { setToast(true); window.setTimeout(() => setToast(false), 4500); }
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header" id="top"><div className="header-inner"><Brand />
      <nav className={`main-nav ${mobileMenu ? 'open' : ''}`} aria-label="Main navigation"><a href="#services" onClick={() => setMobileMenu(false)}>Find a service</a><a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a><a href="#reviews" onClick={() => setMobileMenu(false)}>Reviews</a></nav>
      <div className="header-actions"><a className="provider-link" href="#how-it-works">For professionals <ArrowUpRight size={15} /></a><button className="button header-cta" type="button" onClick={scrollToListings}>Find a pro <ArrowRight size={16} /></button></div>
      <button className="mobile-menu icon-button" type="button" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenu} onClick={() => setMobileMenu((value) => !value)}>{mobileMenu ? <X /> : <Menu />}</button>
    </div></header>

    <main id="main">
      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-grid"><div className="hero-copy">
        <div className="dispatch-pill"><span className="pulse-dot" /> YOUR NEIGHBORHOOD, ON CALL <span className="pill-separator">/</span> DEMO</div>
        <h1 id="hero-title">Good help.<br /><span>Right around</span><br />the corner.</h1>
        <p className="hero-lede">Find a local pro for the jobs life throws your way. Compare options, see what they do, and request a visit — all in one place.</p>
        <form className="hero-search" onSubmit={(event) => { event.preventDefault(); scrollToListings(); }}>
          <label className="search-field service-field"><Search size={19} /><span className="sr-only">What do you need help with?</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What needs fixing?" /></label>
          <span className="search-divider" />
          <label className="search-field location-field"><MapPin size={18} /><span className="sr-only">Your city or neighborhood</span><input value={locationQuery} onChange={(event) => setLocationQuery(event.target.value)} placeholder="City or neighborhood" /></label>
          <button className="button search-submit" type="submit" aria-label="Search local services"><Search size={19} /><span>Find a pro</span></button>
        </form>
        <div className="hero-footnote"><span><Check size={14} /> Compare local options</span><span><Check size={14} /> No-pressure requests</span></div>
        <p className="location-caption"><MapPin size={13} /> Exploring sample listings in <b>{locationQuery || 'your area'}</b></p>
      </div>
      <div className="hero-art" role="img" aria-label="Nighttime neighborhood with a service van and a technician heading to a home"><img src="/fixnear-hero.png" alt="A local service technician arriving at a neighborhood home after dark" />
        <div className="dispatch-card"><div className="dispatch-card-top"><span className="live-indicator"><span /> SAMPLE BOARD</span><span className="dispatch-time">LOCAL PREVIEW</span></div><div className="dispatch-line"><div className="dispatch-icon"><Wrench size={17} /></div><div><b>Home services</b><small>Electric · Plumbing · Repair</small></div><span className="dispatch-arrow"><ArrowUpRight size={16} /></span></div><div className="dispatch-bottom"><span><MapPin size={13} /> Peshawar area</span><span>Illustrative demo data</span></div></div>
        <div className="hero-art-label"><span className="art-label-dot" /> GOOD PEOPLE, CLOSE BY</div>
      </div></div>
        <div className="hero-ticker"><span>BUILT FOR THE FIXES THAT CAN’T WAIT</span><span className="ticker-line" /><span>LOCAL SERVICE DISCOVERY · PROTOTYPE</span><span className="ticker-line" /><a href="#services">EXPLORE THE BOARD <ArrowDown size={13} /></a></div>
      </section>

      <section className="categories-section content-wrap" aria-labelledby="categories-title"><div className="section-heading compact"><div><p className="eyebrow">ONE PLACE FOR THE EVERYDAY FIX</p><h2 id="categories-title">What can we help with?</h2></div><a className="text-link" href="#services">Browse all services <ArrowRight size={16} /></a></div>
        <div className="category-grid">{categories.slice(1).map(({ name, icon: Icon }, index) => <button className={`category-card category-${index}`} type="button" key={name} onClick={() => { setCategory(name); scrollToListings(); }}><span className="category-icon"><Icon size={22} /></span><span className="category-name">{name}<small>{['Wiring · lighting · safety', 'Leaks · taps · drainage', 'Repairs · diagnostics · service', 'Appliances · devices · setup'][index]}</small></span><ArrowUpRight size={17} className="category-arrow" /></button>)}</div>
      </section>

      <section className="services-section content-wrap" id="services" aria-labelledby="services-title"><div className="section-heading services-heading"><div><p className="eyebrow">THE LOCAL DISPATCH BOARD</p><h2 id="services-title">Good hands, nearby.</h2><p className="section-subtitle">A preview of pros around Peshawar. Every listing below is illustrative demo content.</p></div><span className="demo-chip"><span className="chip-dot" /> DEMO LISTINGS</span></div>
        <div className="filters-row"><div className="category-tabs" role="group" aria-label="Filter by service type">{categories.map(({ name, icon: Icon }) => <button className={category === name ? 'active' : ''} type="button" key={name} onClick={() => setCategory(name)}><Icon size={15} />{name === 'All services' ? 'All' : name}</button>)}</div><div className="extra-filters"><label className="select-control"><MapPin size={15} /><span className="sr-only">Neighborhood</span><select value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)}>{neighborhoods.map((place) => <option key={place}>{place}</option>)}</select><ChevronDown size={14} /></label><label className="select-control"><SlidersHorizontal size={15} /><span className="sr-only">Maximum visit price</span><select value={priceCap} onChange={(event) => setPriceCap(event.target.value)}><option value="any">Any price</option><option value="1700">Under Rs 1,700</option><option value="2000">Under Rs 2,000</option><option value="2500">Under Rs 2,500</option></select><ChevronDown size={14} /></label></div></div>
        <div className="results-topline"><span><b>{filtered.length.toString().padStart(2, '0')}</b> sample professionals</span><label className="sort-control">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option></select><ChevronDown size={13} /></label></div>
        {filtered.length ? <div className="provider-grid">{filtered.map((service) => <ProviderCard key={service.id} service={service} onBook={setBookingService} />)}</div> : <div className="empty-state"><span className="empty-icon"><Search size={22} /></span><h3>No matches on this board</h3><p>Try another trade or neighborhood to see more sample listings.</p><button className="button button-quiet" type="button" onClick={clearFilters}>Clear filters</button></div>}
        <p className="listing-disclaimer"><CircleHelp size={15} /> Sample providers, prices, ratings and availability are for demonstration only. FixNear does not currently verify or dispatch real professionals.</p>
      </section>

      <section className="how-section" id="how-it-works"><div className="content-wrap how-grid"><div className="how-intro"><p className="eyebrow">LESS GUESSWORK. MORE GETTING IT FIXED.</p><h2>From “uh-oh”<br />to <span>all sorted.</span></h2><p>Finding help should feel like the easy part. FixNear brings the next step a little closer.</p><a className="button button-outline" href="#services">Explore the demo <ArrowRight size={16} /></a></div><div className="steps-list"><article className="step-card"><span className="step-index">01</span><div className="step-icon"><Search size={19} /></div><div><h3>Find your kind of help</h3><p>Search by job, choose a trade, or browse around a neighborhood.</p></div><ArrowUpRight size={17} className="step-arrow" /></article><article className="step-card"><span className="step-index">02</span><div className="step-icon"><BadgeCheck size={19} /></div><div><h3>Compare what matters</h3><p>Review sample services, price estimates and illustrative customer feedback.</p></div><ArrowUpRight size={17} className="step-arrow" /></article><article className="step-card"><span className="step-index">03</span><div className="step-icon"><CalendarDays size={19} /></div><div><h3>Request a time</h3><p>Try the local-only booking flow. No real provider is contacted in this prototype.</p></div><ArrowUpRight size={17} className="step-arrow" /></article></div></div></section>

      <section className="reviews-section content-wrap" id="reviews"><div className="reviews-heading"><div><p className="eyebrow">NOTES FROM A DEMO NEIGHBORHOOD</p><h2>A little word of mouth.</h2><p className="section-subtitle">Illustrative review examples only — not verified customer testimonials.</p></div><label className="review-sort">View <select value={reviewSort} onChange={(event) => setReviewSort(event.target.value)}><option>Recent</option><option>Top rated</option></select><ChevronDown size={13} /></label></div><div className="review-grid">{shownReviews.map((review) => <article className="review-card" key={review.name}><div className="review-stars" aria-label={`${review.stars} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill={i < review.stars ? 'currentColor' : 'none'} />)}<span>ILLUSTRATIVE</span></div><p className="review-quote">“{review.text}”</p><div className="review-author"><span className="review-avatar">{review.name.slice(0, 1)}</span><span><b>{review.name}</b><small>{review.trade} · {review.place}</small></span><time>{review.date}</time></div></article>)}</div></section>

      <section className="faq-section content-wrap" id="faq"><div className="faq-heading"><p className="eyebrow">GOOD TO KNOW</p><h2>Questions, answered.</h2></div><div className="faq-list"><details><summary>Can I book a real service through FixNear right now?<ChevronDown size={17} /></summary><p>Not yet. This is a front-end prototype. Booking requests are saved only in your browser and are not sent to a real professional.</p></details><details><summary>Are these providers and reviews real?<ChevronDown size={17} /></summary><p>No. Provider names, prices, ratings, availability and review snippets on this page are illustrative sample content for the demo.</p></details><details><summary>How does the location filter work?<ChevronDown size={17} /></summary><p>The demo uses a small set of sample Peshawar neighborhoods. It does not access your device location or connect to a live map service.</p></details></div></section>

      <section className="closing-cta content-wrap"><div className="closing-pattern" aria-hidden="true" /><div><p className="eyebrow">A BETTER WAY TO FIND THE RIGHT HANDS</p><h2>That fix won’t fix itself.</h2><p>Take FixNear for a spin. The data’s a demo; the direction is real.</p></div><button className="button button-dark" type="button" onClick={scrollToListings}>Find your local pro <ArrowRight size={17} /></button></section>
    </main>

    <footer className="site-footer"><div className="content-wrap footer-main"><div className="footer-brand"><Brand /><p>A local services finder concept<br />built to bring good help closer.</p><span className="footer-demo"><span /> Front-end demo · Sample data</span></div><div className="footer-links"><div><b>Explore</b><a href="#services">Find a service</a><a href="#how-it-works">How it works</a><a href="#reviews">Demo reviews</a></div><div><b>Project</b><a href="#faq">Prototype FAQ</a><a href="https://github.com/Zabeeh-Ullah-Dev/FixNear" target="_blank" rel="noreferrer">Source on GitHub <ArrowUpRight size={13} /></a></div></div><a className="back-to-top" href="#top" aria-label="Back to top"><ArrowDown size={17} /></a></div><div className="content-wrap footer-bottom"><span>© 2026 FixNear concept. Built for local discovery.</span><span>Not a live booking service · No real providers represented</span></div></footer>

    {bookingService && <BookingDialog key={bookingService.id} service={bookingService} onClose={closeBooking} onBooked={showBookingSuccess} />}
    {toast && <div className="toast" role="status"><Check size={16} /> Demo request saved locally <span>· not sent to a provider</span></div>}
    <MuseModule />
  </>;
}
