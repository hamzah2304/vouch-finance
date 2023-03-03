// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./NFC.sol";

error Vouch__VoucherNoNFC();
error Vouch__VoucheeNoNFC();
error Vouch__AlreadyVouchedForUser();
error Vouch__NotVouchedForUser();

contract Vouch {
    //===============Events===============

    event UserVouched(address indexed voucher, address indexed vouchee);
    event UserUnvouched(address indexed voucher, address indexed vouchee);

    //===============State Variables===============

    address constant NFC_ADDRESS = 0x91e1156d5Fba6b1B251f396e96aFAaCE91394283; // Arbitrum Goerli Spectral
    mapping(address => mapping(address => bool)) public vouchLookup; // voucher => (vouchee => true/false)
    mapping(address => mapping(address => bool)) public vouchReverseLookup; // vouchee => (voucher => true/false)

    //===============Modifiers===============

    //===============Main Functions===============

    // Vouching requirements: credit score of voucher, credit score of vouchee,
    // number of people voucher has vouched for, proportion of the liquidity, average MACRO score
    //

    function vouch(address vouchee) public {
        NFC nfc = NFC(NFC_ADDRESS);
        // Voucher and vouchee must have minted an NFC
        if (!nfc.isInNFC(msg.sender)) {
            revert Vouch__VoucherNoNFC();
        }
        if (!nfc.isInNFC(vouchee)) {
            revert Vouch__VoucheeNoNFC();
        }
        // Voucher must have higher MACRO score than vouchee
        if (vouchLookup[msg.sender][vouchee]) {
            revert Vouch__AlreadyVouchedForUser();
        }
        vouchLookup[msg.sender][vouchee] = true;
        vouchReverseLookup[vouchee][msg.sender] = true;
        emit UserVouched(msg.sender, vouchee);
    }

    function unvouch(address vouchee) public {
        // require msg.sender to have an NFC
        // require vouchee to have an NFC

        if (!vouchLookup[msg.sender][vouchee]) {
            revert Vouch__NotVouchedForUser();
        }

        vouchLookup[msg.sender][vouchee] = false;
        vouchReverseLookup[vouchee][msg.sender] = false;
        emit UserVouched(msg.sender, vouchee);
    }
}
