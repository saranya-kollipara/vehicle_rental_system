import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { User, Mail, Phone, MapPin, Edit3, CheckCircle2 } from 'lucide-react';

export const ProfileCard = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone, address });
    setIsEditing(false);
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Personal Profile Details</h3>
        {!isEditing && (
          <Button variant="outline" size="sm" icon={Edit3} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {successMsg && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="grid-2">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <Button type="submit" variant="primary">Save Changes</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <User size={20} color="var(--primary)" />
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</span>
              <p style={{ fontWeight: 600, margin: 0 }}>{currentUser?.name}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail size={20} color="var(--primary)" />
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</span>
              <p style={{ fontWeight: 600, margin: 0 }}>{currentUser?.email}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={20} color="var(--primary)" />
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</span>
              <p style={{ fontWeight: 600, margin: 0 }}>{currentUser?.phone}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={20} color="var(--primary)" />
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Delivery Address</span>
              <p style={{ fontWeight: 600, margin: 0 }}>{currentUser?.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
