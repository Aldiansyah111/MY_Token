import { ethers } from "ethers";
import StakingABI from "./Staking.json"; // ABI hasil compile contract Staking

const stakingAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // ganti dengan alamat Staking contract kamu

class StakingService {
  contract = null;

  async init(signerOrProvider) {
    this.contract = new ethers.Contract(stakingAddress, StakingABI.abi, signerOrProvider);
  }

  async stake(amount) {
    if (!this.contract) throw new Error("Contract belum diinit");
    const tx = await this.contract.stake(amount);
    await tx.wait();
  }

  async claimReward() {
    if (!this.contract) throw new Error("Contract belum diinit");
    const tx = await this.contract.claimReward();
    await tx.wait();
  }

  async unstake() {
    if (!this.contract) throw new Error("Contract belum diinit");
    const tx = await this.contract.unstake();
    await tx.wait();
  }

  async getStakeOf(address) {
    return await this.contract.stakes(address);
  }
}

export default new StakingService();
