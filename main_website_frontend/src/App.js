import React, { useState, useEffect } from "react";
import "./App.css";

// --- Data Definitions (Demo Data) ---
const SERVICES = [
  {
    icon: "☀️",
    title: "Residential Solar Installation",
    description: "Custom solar solutions for your home. Clean energy, lower bills.",
  },
  {
    icon: "🏢",
    title: "Commercial Solar Solutions",
    description: "Scalable solar PV systems for businesses and industries.",
  },
  {
    icon: "🔋",
    title: "Battery Storage",
    description: "Energy storage for 24/7 reliability and cost optimization.",
  },
  {
    icon: "🧐",
    title: "Site Assessment & Consulting",
    description: "Expert site analysis and planning for optimal system design.",
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400",
    alt: "Solar panels on rooftop",
  },
  {
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=400",
    alt: "Field with solar panels",
  },
  {
    src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=400",
    alt: "Array of solar panels",
  },
  {
    src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=400",
    alt: "Engineer inspecting solar installation",
  },
];

const TESTIMONIALS = [
  {
    name: "Alex Greene",
    message:
      "Our home electricity bill dropped by over 60%! Excellent work and a very professional team.",
    location: "Austin, TX",
  },
  {
    name: "Priya Nair",
    message:
      "The installation was smooth and the results are even better than promised. Highly recommended.",
    location: "San Jose, CA",
  },
  {
    name: "Lucas Zhang",
    message:
      "We had a large commercial installation, and everything was on time and under budget.",
    location: "Phoenix, AZ",
  },
];

const SOCIALS = [
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: <svg height="20" width="20" fill="currentColor"><path d="M19.6,3.2c-0.7,0.3-1.4,0.5-2.1,0.6c0.8-0.5,1.4-1.3,1.7-2.3c-0.8,0.5-1.5,0.8-2.4,1C15.8,1.7,14.8,1.1,13.7,1.1    c-2.1,0-3.7,1.7-3.7,3.7c0,0.3,0,0.5,0.1,0.8C6.6,5.4,3.6,3.7,1.5,1.2C1.1,2,1,2.8,1,3.6c0,1.3,0.7,2.6,2,3.4    C2.2,7,1.6,6.8,1,6.5c0,0,0,0,0,0.1c0,1.8,1.2,3.4,3,3.8c-0.3,0.1-0.8,0.2-1.1,0.2c-0.2,0-0.4,0-0.5,0c0.4,1.2,1.5,2,2.8,2    c-1,0.8-2.2,1.3-3.5,1.3c-0.2,0-0.4,0-0.6,0c1.3,0.8,2.8,1.3,4.5,1.3c5.4,0,8.3-4.5,8.3-8.4c0-0.1,0-0.2,0-0.3    C18.4,4.6,19.1,3.9,19.6,3.2z"></path></svg>,
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: <svg height="20" width="20" fill="currentColor"><circle cx="10" cy="10" r="3"/><rect x="3" y="3" width="14" height="14" rx="4"/><circle cx="16" cy="4" r="1"/></svg>
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: <svg height="20" width="20" fill="currentColor"><rect x="2" y="6" width="3" height="12"/><circle cx="3.5" cy="3.5" r="1.5"/><rect x="7" y="9" width="3" height="9"/><path d="M12 9h2.8C17.08 9 18 9.92 18 12.12V18H15v-5c0-1-.28-1.88-1.4-1.88H12V9z"/></svg>
  }
];

// --- Helper Components ---

function Header({ scrollToSection }) {
  return (
    <nav className="header">
      <div className="logo"> 
        <span role="img" aria-label="sun" style={{fontSize: "2rem", color: "var(--primary)"}}>☀️</span>
        <span className="brand">Solaris Solutions</span>
      </div>
      <ul className="nav-links">
        <li><button onClick={() => scrollToSection('services')}>Services</button></li>
        <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
        <li><button onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
        <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <h1>
        Clean, Reliable Solar Energy <span className="hero-accent">for Your Future</span>
      </h1>
      <p className="hero-desc">
        Solaris Solutions delivers modern solar installations customized for your home or business.
      </p>
      <a href="#contact" className="btn-primary">Request Free Quote</a>
    </section>
  );
}

function Services({ id }) {
  return (
    <section className="services" id={id}>
      <h2>Our Solar Services</h2>
      <div className="services-list">
        {SERVICES.map((srv, i) => (
          <div className="service-card" key={srv.title}>
            <div className="service-icon" aria-hidden>
              {srv.icon}
            </div>
            <h3>{srv.title}</h3>
            <p>{srv.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery({ id }) {
  return (
    <section className="gallery" id={id}>
      <h2>Recent Installations</h2>
      <div className="gallery-grid">
        {GALLERY.map((img, i) => (
          <div className="gallery-item" key={i}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ id }) {
  const [current, setCurrent] = useState(0);

  // Carousel Logic: loop to next testimonial every 8s
  useEffect(() => {
    const timer = setTimeout(() => setCurrent((current+1)%TESTIMONIALS.length), 8000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="testimonials" id={id}>
      <h2>What Our Customers Say</h2>
      <div className="testimonials-carousel">
        <blockquote>
          <p>“{TESTIMONIALS[current].message}”</p>
          <footer>
            <strong>{TESTIMONIALS[current].name}</strong>
            <span className="testimonial-location">{TESTIMONIALS[current].location}</span>
          </footer>
        </blockquote>
        <div className="carousel-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              className={current === i ? "active" : ""}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ id }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Dummy validation
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }
    // Fake "submit" (replace with API call for real)
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 900);
  }

  return (
    <section className="contact" id={id}>
      <h2>Contact Us</h2>
      <p>Ready to go solar or have questions? Fill the form below. We'll get back to you promptly.</p>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form" autoComplete="off">
          <div className="form-group">
            <input
              name="name"
              type="text"
              maxLength={60}
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              maxLength={80}
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              maxLength={300}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              />
          </div>
          {error && (
            <div className="form-error">{error}</div>
          )}
          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      ) : (
        <div className="form-success">
          <b>Thank you!</b> We have received your message and will get in touch soon.
        </div>
      )}
    </section>
  );
}

function Footer() {
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // PUBLIC_INTERFACE
  function handleNewsletter(e) {
    e.preventDefault();
    // Minimal email pattern and demo handling
    if (!newsletter.match(/^[^@]+@[^.]+\..+/)) return;
    setSubscribed(true);
    setNewsletter("");
  }

  return (
    <footer className="site-footer">
      <div className="footer-sections">
        <div className="footer-brand-social">
          <div className="footer-logo">
            <span role="img" aria-label="sun" style={{color: "var(--primary)"}}>☀️</span>
            Solaris Solutions
          </div>
          <div className="footer-socials">
            {SOCIALS.map(icon => (
              <a
                key={icon.name}
                href={icon.url}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.name}
              >
                {icon.icon}
              </a>
            ))}
          </div>
          <div className="footer-kavia">developed by <b>kavia</b></div>
        </div>
        <div className="footer-sitemap">
          <h4>Sitemap</h4>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Newsletter Signup</h4>
          {!subscribed ? (
            <form onSubmit={handleNewsletter} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                value={newsletter}
                onChange={e => setNewsletter(e.target.value)}
                required
              />
              <button className="btn-accent" type="submit">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="newsletter-msg">Thanks for subscribing! 🙌</div>
          )}
        </div>
      </div>
      <div className="footer-meta">
        &copy; {new Date().getFullYear()} Solaris Solutions. All rights reserved.
      </div>
    </footer>
  );
}

// --- Main App Component ---

// PUBLIC_INTERFACE
function App() {
  // For header nav scroll
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // Set up CSS variables for requested theme and colors
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", "#8424f9");
    document.documentElement.style.setProperty("--secondary", "#1565C0");
    document.documentElement.style.setProperty("--accent", "#388E3C");
  }, []);

  return (
    <div className="site-root">
      <Header scrollToSection={scrollToSection} />
      <main>
        <Hero />
        <Services id="services" />
        <Gallery id="gallery" />
        <Testimonials id="testimonials" />
        <ContactForm id="contact" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
