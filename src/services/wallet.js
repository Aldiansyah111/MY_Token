import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) throw new Error("Install MetaMask dulu!");

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return { account, provider, signer };
}
