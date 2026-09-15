import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Get In Touch With DriveEase</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Have a question about bookings, fleet partnership, or assistance? We are here 24/7.</p>
      </div>

      <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
        {/* Contact Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
            Send Us a Message
          </h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Message Received!</h3>
              <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. Our support team will respond to your email within 2 hours.</p>
              <Button variant="outline" style={{ marginTop: '1rem' }} onClick={() => setSubmitted(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Full Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter full name" />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea className="form-control" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help you?"></textarea>
              </div>

              <Button type="submit" variant="primary" size="lg" icon={Send} fullWidth>
                Submit Message
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info & Map Placeholder */}
        <div>
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              Headquarters Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>Main Hub & Corporate Office</strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Plot 42, Mindspace Road, Hitec City, Hyderabad, Telangana - 500081</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Customer Helpline</strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>+91 1800-425-DRIVE / +91 040-23456789</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Support Email</strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>support@driveease.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Clock size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Hub Working Hours</strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>24 Hours / 7 Days a week (Including Holidays)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="card" style={{ height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
            <MapPin size={36} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--text-main)' }}>DriveEase Hitec City Hub Location</h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Interactive Map View Demo Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};
