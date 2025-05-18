// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public token;
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public startTime;

    uint256 public rewardRatePerSecond = 1e16; // contoh: 0.01 token per detik

    constructor(address _token) {
        token = IERC20(_token);
    }

    function stake(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        stakes[msg.sender] += amount;
        startTime[msg.sender] = block.timestamp;
    }

    function claimReward() external {
        uint256 timeStaked = block.timestamp - startTime[msg.sender];
        uint256 reward = timeStaked * rewardRatePerSecond;

        token.transfer(msg.sender, reward);
        startTime[msg.sender] = block.timestamp;
    }

    function unstake() external {
        uint256 amount = stakes[msg.sender];
        stakes[msg.sender] = 0;
        token.transfer(msg.sender, amount);
    }
}
