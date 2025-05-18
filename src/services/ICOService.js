import { ethers } from "ethers";
import ICOABI from "./ICO.json";

const icoAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // alamat contract ICO lo

class ICOService {
  contract = null;

  async init(signerOrProvider) {
    this.contract = new ethers.Contract(icoAddress, ICOABI.abi, signerOrProvider);
  }

  async getTokenPrice() {
    if (!this.contract) throw new Error("Contract belum diinit");
    return await this.contract.tokenPrice();
  }

  async buyTokens(ethAmountWei) {
    if (!this.contract) throw new Error("Contract belum diinit");
    const tx = await this.contract.buyTokens({ value: ethAmountWei });
    await tx.wait();
  }

  async tokensSold() {
    if (!this.contract) throw new Error("Contract belum diinit");
    return await this.contract.tokensSold();
  }

  // Tambah fungsi lain sesuai kebutuhan
}

export default new ICOService();
