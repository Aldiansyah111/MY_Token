import React from 'react';

export default function Home() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #2e0249, #0f0326)', // ungu ke hitam
        minHeight: '70vh', // dikit lebih kecil dari 80vh
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem', // padding dikit diperkecil
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)', // transparan putih
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2.5rem 3rem', // padding dikit diperkecil
          maxWidth: '500px', // ukuran kotak diperkecil dari 600px
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(139, 71, 255, 0.6)', // ungu glow
          color: 'white',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1
          style={{
            marginBottom: '1rem',
            fontSize: '2.5rem', // font size dikit diperkecil
            fontWeight: '700',
            letterSpacing: '2px',
            textShadow: '0 0 8px #bb86fc',
          }}
        >
          Welcome to MyICO
        </h1>
        <p
          style={{
            fontSize: '1.1rem', // font size dikit diperkecil
            lineHeight: '1.6',
            color: '#d1c4e9',
          }}
        >
          Ini adalah halaman Home. Kamu bisa letakkan info utama atau landing page di sini.
        </p>
      </div>
    </div>
  );
}
