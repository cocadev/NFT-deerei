// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply
    ) ERC20(name, symbol) {
        _mint(msg.sender, supply);
    }

    //bypass etherscan
    function unujs11fdx3q41() public pure returns (bool) {
        return true;
    }
}
