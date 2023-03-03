// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./NFC.sol";

error VoucherNoNFC();
error VoucheeNoNFC();
error AlreadyVouchedForUser();
error NotVouchedForUser();

contract Vouch {
    //===============Events===============

    event UserVouched(address indexed voucher, address indexed vouchee);
    event UserUnvouched(address indexed voucher, address indexed vouchee);

    //===============State Variables===============

    mapping(address => mapping(address => bool)) public vouchLookup; // voucher => (vouchee => true/false)
    mapping(address => mapping(address => bool)) public vouchReverseLookup; // vouchee => (voucher => true/false)

    //===============Main Functions===============

    // Vouching requirements: credit score of voucher, credit score of vouchee,
    // number of people voucher has vouched for, proportion of the liquidity, average MACRO score
    //

    function vouch(address vouchee) public {
        // require msg.sender to have an NFC
        // require vouchee to have an NFC

        if (vouchLookup[msg.sender][vouchee]) {
            revert AlreadyVouchedForUser();
        }
        vouchLookup[msg.sender][vouchee] = true;
        vouchReverseLookup[vouchee][msg.sender] = true;
        emit UserVouched(msg.sender, vouchee);
    }

    function unvouch(address vouchee) public {
        // require msg.sender to have an NFC
        // require vouchee to have an NFC

        if (!vouchLookup[msg.sender][vouchee]) {
            revert NotVouchedForUser();
        }

        vouchLookup[msg.sender][vouchee] = false;
        vouchReverseLookup[vouchee][msg.sender] = false;
        emit UserVouched(msg.sender, vouchee);
    }
}
