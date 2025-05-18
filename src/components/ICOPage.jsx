import React, { useState } from "react";
import ICOService from "../services/ICOService";
import AccountInfo from "./AccountInfo";
import { ethers } from "ethers";
import { FaEthereum, FaDollarSign, FaShoppingCart } from "react-icons/fa";

export default function ICOPage() {
  const [tokenPrice, setTokenPrice] = useState(null);
  const [buyAmount, setBuyAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConnect(account, signer) {
    try {
      await ICOService.init(signer);
      const price = await ICOService.getTokenPrice();
      setTokenPrice(price);
    } catch (err) {
      alert("Gagal ambil data ICO: " + err.message);
    }
  }

  async function handleBuy() {
    if (!buyAmount || isNaN(buyAmount)) return alert("Masukkan jumlah ETH yang valid");
    setLoading(true);
    try {
      const ethValue = ethers.parseEther(buyAmount);
      await ICOService.buyTokens(ethValue);
      alert("Pembelian berhasil!");
      setBuyAmount("");
    } catch (err) {
      alert("Gagal beli token: " + err.message);
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #2e0249, #0f0326)",
        padding: "3rem 1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          letterSpacing: "2px",
          marginBottom: "2.5rem",
          textShadow: "0 0 10px #bb86fc",
          textAlign: "center",
        }}
      >
        Initial Coin Offering
      </h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Card 1 - AccountInfo */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "2rem",
            flex: "1 1 280px",
            minWidth: "280px",
            boxShadow: "0 0 20px rgba(187, 134, 252, 0.6)",
          }}
        >
          <AccountInfo onConnected={handleConnect} />
        </div>

        {/* Card 2 - Token Price */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "2rem",
            flex: "1 1 280px",
            minWidth: "280px",
            boxShadow: "0 0 20px rgba(187, 134, 252, 0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tokenPrice ? (
            <>
              <FaEthereum size={48} color="#bb86fc" style={{ marginBottom: "1rem" }} />
              <p style={{ fontSize: "1.3rem", color: "#d1c4e9", fontWeight: "600" }}>
                Harga Token
              </p>
              <p style={{ fontSize: "1.8rem", fontWeight: "700", marginTop: "0.5rem" }}>
                {ethers.formatEther(tokenPrice)} ETH
              </p>
            </>
          ) : (
            <p style={{ color: "#d1c4e9" }}>Koneksi belum terhubung</p>
          )}
        </div>

        {/* Card 3 - Buy Token */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "2rem",
            flex: "1 1 280px",
            minWidth: "280px",
            boxShadow: "0 0 20px rgba(187, 134, 252, 0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <label
            htmlFor="buyAmount"
            style={{ fontSize: "1.2rem", color: "#d1c4e9", fontWeight: "600" }}
          >
            Masukkan Jumlah ETH
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "0.8rem",
            }}
          >
            <FaDollarSign size={20} color="#bb86fc" />
            <input
              id="buyAmount"
              type="text"
              placeholder="0.1"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              style={{
                flex: 1,
                padding: "0.6rem 1rem",
                fontSize: "1.1rem",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                backgroundColor: "#3b1f6b",
                color: "white",
                boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.2)",
                transition: "background-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.backgroundColor = "#532a9c")}
              onBlur={(e) => (e.target.style.backgroundColor = "#3b1f6b")}
            />
          </div>
          <button
            onClick={handleBuy}
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.85rem 1.5rem",
              fontSize: "1.1rem",
              fontWeight: "700",
              borderRadius: "10px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: loading
                ? "#9c84e7"
                : "linear-gradient(135deg, #7e57c2, #b388ff)",
              color: "white",
              boxShadow: loading
                ? "none"
                : "0 5px 15px rgba(187, 134, 252, 0.7)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FaShoppingCart />
            {loading ? "Processing..." : "Beli Token"}
          </button>
        </div>
      </div>
    </div>
  );
}
