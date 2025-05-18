// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ICO is Ownable {
    IERC20 public token;

    uint256 public tokenPrice; // in wei per token (e.g. 1e15 = 0.001 ETH per token)
    uint256 public tokensSold;

    uint256 public startTime;
    uint256 public endTime;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);

    constructor(
        address _token,
        uint256 _tokenPrice,
        uint256 _startTime,
        uint256 _endTime
    ) Ownable(msg.sender) {
        require(_startTime < _endTime, "Start must be before end");
        token = IERC20(_token);
        tokenPrice = _tokenPrice;
        startTime = _startTime;
        endTime = _endTime;
    }

    modifier icoActive() {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "ICO not active"
        );
        _;
    }

    function buyTokens() external payable icoActive {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 tokenAmount = (msg.value * 1 ether) / tokenPrice;
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Not enough tokens"
        );

        tokensSold += tokenAmount;
        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, tokenAmount);
    }

    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
        emit Withdrawn(owner(), balance);
    }

    function withdrawUnsoldTokens() external onlyOwner {
        require(block.timestamp > endTime, "ICO still active");
        uint256 unsold = token.balanceOf(address(this));
        token.transfer(owner(), unsold);
    }

    function changePrice(uint256 newPrice) external onlyOwner {
        tokenPrice = newPrice;
    }
}
