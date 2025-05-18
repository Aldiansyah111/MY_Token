import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #2e0249, #0f0326)', // ungu ke hitam
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          color: 'white',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textAlign: 'center',
        }}
      >
        {/* Judul Contact Us */}
        <h1
          style={{
            marginBottom: '1.5rem',
            fontSize: '2.8rem',
            fontWeight: '700',
            letterSpacing: '2px',
            textShadow: '0 0 8px #bb86fc',
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: '#d1c4e9',
          }}
        >
          Hubungi kami di:
        </p>

        {/* Container 3 Cards */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Card Email */}
          <div
            style={{
              flex: '1 1 180px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(139, 71, 255, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              color: 'white',
            }}
          >
            <FaEnvelope size={32} color="#bb86fc" />
            <h3>Email</h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>support@myico.com</p>
          </div>

          {/* Card Phone */}
          <div
            style={{
              flex: '1 1 180px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(139, 71, 255, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              color: 'white',
            }}
          >
            <FaPhone size={32} color="#bb86fc" />
            <h3>Phone</h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>+62 812 3456 7890</p>
          </div>

          {/* Card Address */}
          <div
            style={{
              flex: '1 1 180px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(139, 71, 255, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              color: 'white',
            }}
          >
            <FaMapMarkerAlt size={32} color="#bb86fc" />
            <h3>Address</h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>Jl. Jendral Sudirman No. 123, Jakarta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
