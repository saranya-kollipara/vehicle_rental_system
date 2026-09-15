import React, { useState } from 'react';

export const VehicleImageGallery = ({ images = [], mainImage, vehicleName }) => {
  const allImages = images.length > 0 ? images : [mainImage];
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="card" style={{ height: '380px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={allImages[selectedIdx] || mainImage} 
          alt={vehicleName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {allImages.length > 1 && (
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
          {allImages.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedIdx(idx)}
              style={{
                width: '90px',
                height: '65px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: selectedIdx === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
                opacity: selectedIdx === idx ? 1 : 0.7,
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
