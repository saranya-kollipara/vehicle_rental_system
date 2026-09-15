import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--dark-surface)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem', marginTop: '4rem', borderTop: '1px solid var(--dark-hover)' }}>
      <div className="container">
        <div className="grid-4" style={{ gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand & Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
              <div style={{ width: '34px', height: '34px', backgroundColor: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={20} color="white" />
              </div>
              DriveEase
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your Journey, Our Vehicles. Premium, hassle-free car and bike rentals for city rides, business trips, and road journeys.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', transition: 'var(--transition-fast)' }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Home</Link></li>
              <li><Link to="/vehicles" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Browse Vehicles</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Contact Support</Link></li>
              <li><Link to="/login" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>User Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Rental Fleet</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/vehicles" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>7-Seater Family SUVs</Link></li>
              <li><Link to="/vehicles" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Executive Sedans</Link></li>
              <li><Link to="/vehicles" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Electric Vehicles (EVs)</Link></li>
              <li><Link to="/vehicles" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Flagship Luxury Cars</Link></li>
              <li><Link to="/vehicles" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Adventure Bikes</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Headquarters</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.65rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                <span>Hitec City, Hyderabad, Telangana - 500081</span>
              </li>
              <li style={{ display: 'flex', gap: '0.65rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                <Phone size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>+91 1800-425-DRIVE</span>
              </li>
              <li style={{ display: 'flex', gap: '0.65rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                <Mail size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>support@driveease.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <p>© {new Date().getFullYear()} DriveEase — Vehicle Rental Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
