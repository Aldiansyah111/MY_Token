import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connectWallet } from '../services/wallet';

export default function Navbar() {
    const [account, setAccount] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(false);

    const handleConnect = async () => {
        try {
            const { account } = await connectWallet();
            setAccount(account);
        } catch (err) {
            alert('Gagal connect wallet: ' + err.message);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
                if (accounts.length > 0) setAccount(accounts[0]);
            });
        }
    }, []);

    const baseLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginRight: '1rem',
        transition: 'color 0.3s ease',
    };

    const hoveredLinkStyle = {
        color: '#bb86fc', // ungu muda saat hover
    };

    const baseButtonStyle = {
        background: '#61dafb',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        color: '#000',
    };

    const hoveredButtonStyle = {
        background: '#21a1f1',
    };

    return (
        <nav style={{
            background: 'rgba(40, 44, 52, 0.5)',
            padding: '1rem',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
            <h2
                style={{
                    margin: 0,
                    marginLeft: '20px',
                    color: 'white',
                    position: 'relative',
                    animation: 'glow 2.5s ease-in-out infinite',
                }}
            >
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    MyICO
                </Link>

                <style>
                    {`
      @keyframes glow {
        0%, 100% {
          text-shadow:
            0 0 5px rgba(187, 134, 252, 0.7),
            0 0 10px rgba(187, 134, 252, 0.5),
            0 0 20px rgba(187, 134, 252, 0.3);
        }
        50% {
          text-shadow:
            0 0 8px rgba(187, 134, 252, 1),
            0 0 15px rgba(187, 134, 252, 0.8),
            0 0 25px rgba(187, 134, 252, 0.6);
        }
      }
    `}
                </style>
            </h2>


            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {['/', '/about', '/contact', '/ICOPage'].map((path, idx) => {
                    const text = ['Home', 'About', 'Contact', 'Token Info'][idx];
                    return (
                        <Link
                            key={path}
                            to={path}
                            style={{
                                ...baseLinkStyle,
                                ...(hoveredLink === path ? hoveredLinkStyle : {}),
                            }}
                            onMouseEnter={() => setHoveredLink(path)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            {text}
                        </Link>
                    );
                })}

                {account ? (
                    <span style={{ color: '#61dafb' }}>
                        {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                ) : (
                    <button
                        onClick={handleConnect}
                        style={{
                            ...baseButtonStyle,
                            ...(hoveredButton ? hoveredButtonStyle : {}),
                        }}
                        onMouseEnter={() => setHoveredButton(true)}
                        onMouseLeave={() => setHoveredButton(false)}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    );
}
