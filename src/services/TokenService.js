import { ethers } from "ethers";
import MyTokenABI from "./MyToken.json";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // alamat token ERC20 lo

class TokenService {
  contract = null;

  async init(signerOrProvider) {
    this.contract = new ethers.Contract(tokenAddress, MyTokenABI.abi, signerOrProvider);
  }

  async balanceOf(address) {
    if (!this.contract) throw new Error("Contract belum diinit");
    return await this.contract.balanceOf(address);
  }

  // Kalau mau implement approve / transfer dll bisa ditambah
}

export default new TokenService();
