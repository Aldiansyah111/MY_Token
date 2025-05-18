import React from 'react';

export default function About() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #2e0249, #0f0326)', // ungu ke hitam
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)', // transparan putih
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(139, 71, 255, 0.6)', // ungu glow
          color: 'white',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1
          style={{
            marginBottom: '1rem',
            fontSize: '2.5rem',
            fontWeight: '700',
            letterSpacing: '2px',
            textShadow: '0 0 8px #bb86fc',
          }}
        >
          About Us
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#d1c4e9',
            marginBottom: '0.5rem',
          }}
        >
          MyICO adalah platform untuk Initial Coin Offering (ICO) dan informasi token.
        </p>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#d1c4e9',
            marginTop: '0',
          }}
        >
          Kami berkomitmen untuk menyediakan info terbaru dan terpercaya.
        </p>
      </div>
    </div>
  );
}
