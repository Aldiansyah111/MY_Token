import React from 'react';
import { FaCopyright } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #2e0249, #0f0326)', // gradasi ungu ke hitam
        padding: '1.5rem 1rem',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.7rem',
        fontSize: '1rem',
        color: '#bb86fc', // ungu soft untuk teks
        fontWeight: '500',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: '0 -3px 10px rgba(187, 134, 252, 0.4)', // glow shadow dari bawah
      }}
    >
      <FaCopyright
        style={{
          transition: 'transform 0.3s ease, color 0.3s ease',
          cursor: 'default',
          color: '#bb86fc',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#e0b3ff';
          e.currentTarget.style.transform = 'scale(1.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#bb86fc';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      <p style={{ margin: 0 }}>
        {new Date().getFullYear()} MyICO. All rights reserved.
      </p>
    </footer>
  );
}
