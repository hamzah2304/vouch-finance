// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Collateral {
    receive() external payable {}

    function clawback() public {
        // require msg.sender == LiquidityPool contract address
        // send
    }
}
