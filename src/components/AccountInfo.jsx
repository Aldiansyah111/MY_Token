import React, { useState, useEffect } from "react";
import { connectWallet } from "../services/wallet";
import TokenService from "../services/TokenService";
import { ethers } from "ethers";

export default function AccountInfo({ onConnected }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  async function connect() {
    try {
      const { account, signer } = await connectWallet();
      setAccount(account);
      onConnected?.(account, signer);

      // Get token balance
      await TokenService.init(signer);
      const bal = await TokenService.balanceOf(account);
      setBalance(ethers.formatUnits(bal, 18)); // asumsi token 18 desimal
    } catch (err) {
      alert("Gagal connect: " + err.message);
    }
  }

  useEffect(() => {
    connect();
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      {account ? (
        <div>
          <p><strong>Wallet:</strong> {account}</p>
          <p><strong>Token ALD:</strong> {balance ?? 'Loading...'} ALD</p>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
