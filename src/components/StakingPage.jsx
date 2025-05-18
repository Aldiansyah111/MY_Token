import React, { useEffect, useState } from "react";
import { connectWallet } from "../services/wallet";
import StakingService from "../services/StakingService";
import TokenService from "../services/TokenService";
import { ethers } from "ethers";
import { FaWallet, FaCoins, FaRegMoneyBillAlt } from "react-icons/fa";

export default function StakingPage() {
  const [account, setAccount] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [myStake, setMyStake] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const { account, signer } = await connectWallet();
    setAccount(account);
    await StakingService.init(signer);
    await TokenService.init(signer);

    const stake = await StakingService.getStakeOf(account);
    setMyStake(stake);
  }

  async function handleStake() {
    if (!stakeAmount || isNaN(stakeAmount)) return alert("Masukkan jumlah yang valid");

    setLoading(true);
    try {
      const value = ethers.parseEther(stakeAmount);
      const tokenAllowance = await TokenService.contract.allowance(account, StakingService.contract.target);

      if (tokenAllowance < value) {
        const approveTx = await TokenService.contract.approve(StakingService.contract.target, value);
        await approveTx.wait();
      }

      await StakingService.stake(value);
      alert("Staking berhasil!");
      loadData();
    } catch (err) {
      alert("Gagal stake: " + err.message);
    }
    setLoading(false);
  }

  async function handleClaimReward() {
    setLoading(true);
    try {
      await StakingService.claimReward();
      alert("Reward diklaim!");
      loadData();
    } catch (err) {
      alert("Gagal klaim reward: " + err.message);
    }
    setLoading(false);
  }

  async function handleUnstake() {
    setLoading(true);
    try {
      await StakingService.unstake();
      alert("Unstake berhasil!");
      loadData();
    } catch (err) {
      alert("Gagal unstake: " + err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2e0249, #0f0326)",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(139, 71, 255, 0.6)",
          color: "#fff",
          padding: "2.5rem 3rem",
          width: "100%",
          maxWidth: "500px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem", textShadow: "0 0 8px #bb86fc" }}>
          <FaCoins style={{ marginRight: "0.5rem", color: "#bb86fc" }} />
          Staking Portal
        </h2>

        {account ? (
          <>
            <p style={{ marginBottom: "1rem" }}>
              <FaWallet style={{ marginRight: "0.5rem", color: "#bb86fc" }} />
              <strong>Connected:</strong> <br /> {account}
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <FaRegMoneyBillAlt style={{ marginRight: "0.5rem", color: "#bb86fc" }} />
              <strong>Staked:</strong>{" "}
              {myStake ? ethers.formatEther(myStake) : 0} TOKEN
            </p>

            <input
              type="text"
              placeholder="Jumlah token untuk stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #bb86fc",
                backgroundColor: "#1f1b2e",
                color: "#fff",
              }}
            />

            <button
              onClick={handleStake}
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                backgroundColor: "#bb86fc",
                color: "#000",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              {loading ? "Processing..." : "Stake"}
            </button>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <button
                onClick={handleClaimReward}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  borderRadius: "8px",
                  backgroundColor: "#4caf50",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Claim Reward
              </button>
              <button
                onClick={handleUnstake}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  borderRadius: "8px",
                  backgroundColor: "#f44336",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Unstake
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={loadData}
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "8px",
              backgroundColor: "#bb86fc",
              color: "#000",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
