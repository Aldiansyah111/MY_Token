import React, { useEffect, useState } from "react";
import { BrowserProvider, formatUnits } from "ethers";
import TokenService from "../services/TokenService";

export default function TokenDashboard() {
    const [addressToCheck, setAddressToCheck] = useState("");
    const [balance, setBalance] = useState(null);

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const [txStatus, setTxStatus] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    const provider = new BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const account = await signer.getAddress();
                    setCurrentAccount(account);
                    await TokenService.init(signer);
                } catch (err) {
                    alert("Gagal menghubungkan wallet: " + err.message);
                }
            } else {
                alert("Please install MetaMask");
            }
        };

        initWeb3();
    }, []);

    const handleCheckBalance = async () => {
        try {
            console.log("Cek saldo alamat:", addressToCheck);
            const rawBalance = await TokenService.balanceOf(addressToCheck);
            const formatted = formatUnits(rawBalance, 18);
            setBalance(formatted);
        } catch (error) {
            console.error("Error cek saldo:", error);
            alert("Gagal cek saldo: " + error.message);
        }
    };


    const handleSendToken = async () => {
        try {
            setTxStatus("Mengirim...");
            const tx = await TokenService.transfer(recipient, amount);
            setTxStatus("Berhasil! TX Hash: " + tx.transactionHash);
        } catch (err) {
            setTxStatus("Gagal mengirim token: " + err.message);
        }
    };

    return (
        <div
            style={{
                padding: "2rem",
                maxWidth: "480px",
                margin: "3rem auto",
                backgroundColor: "#1e1e2f",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                color: "#e0e0e0",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Token Dashboard</h2>
            <p style={{ marginBottom: "2rem", textAlign: "center" }}>
                Connected Wallet: <b>{currentAccount || "-"}</b>
            </p>

            <div style={{ marginBottom: "1.5rem" }}>
                <label
                    htmlFor="addressCheck"
                    style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}
                >
                    Cek Saldo Alamat:
                </label>
                <input
                    id="addressCheck"
                    value={addressToCheck}
                    onChange={(e) => setAddressToCheck(e.target.value)}
                    placeholder="Masukkan alamat Ethereum"
                    style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "6px",
                        border: "1.5px solid #444",
                        marginBottom: "0.7rem",
                        backgroundColor: "#2a2a3d",
                        color: "#f0f0f0",
                        fontSize: "1rem",
                    }}
                />
                <button
                    onClick={handleCheckBalance}
                    style={{
                        width: "100%",
                        backgroundColor: "#4f9eed",
                        border: "none",
                        padding: "0.7rem",
                        borderRadius: "6px",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3b7dc4")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f9eed")}
                >
                    Cek Saldo
                </button>
                {balance !== null && (
                    <p style={{ marginTop: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>
                        Saldo: {balance} ALD
                    </p>
                )}
            </div>

            <hr style={{ borderColor: "#444", margin: "2rem 0" }} />

            <div style={{ marginBottom: "1rem" }}>
                <label
                    htmlFor="recipient"
                    style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}
                >
                    Alamat Penerima:
                </label>
                <input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Masukkan alamat penerima"
                    style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "6px",
                        border: "1.5px solid #444",
                        backgroundColor: "#2a2a3d",
                        color: "#f0f0f0",
                        fontSize: "1rem",
                    }}
                />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
                <label
                    htmlFor="amount"
                    style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}
                >
                    Jumlah Token:
                </label>
                <input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Masukkan jumlah token"
                    style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "6px",
                        border: "1.5px solid #444",
                        backgroundColor: "#2a2a3d",
                        color: "#f0f0f0",
                        fontSize: "1rem",
                    }}
                />
            </div>
            <button
                onClick={handleSendToken}
                style={{
                    width: "100%",
                    backgroundColor: "#4caf50",
                    border: "none",
                    padding: "0.8rem",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a8d40")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
                Kirim Token
            </button>

            {txStatus && (
                <p
                    style={{
                        marginTop: "1.2rem",
                        fontWeight: "600",
                        color: txStatus.startsWith("Berhasil") ? "#4caf50" : "#f44336",
                        wordBreak: "break-word",
                    }}
                >
                    {txStatus}
                </p>
            )}
        </div>
    );
}
