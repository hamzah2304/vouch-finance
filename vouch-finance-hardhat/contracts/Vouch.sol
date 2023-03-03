// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./NFC.sol";
import "./interfaces/IScoracle.sol";

error Vouch__VoucherNoNFC();
error Vouch__VoucheeNoNFC();
error Vouch__AlreadyVouchedForUser();
error Vouch__NotVouchedForUser();
error Vouch__TooManyVouches();
error Vouch__VoucherLower();
error Vouch__TooLowScore();

contract Vouch {
    //===============Events===============

    event UserVouched(address indexed voucher, address indexed vouchee);
    event UserUnvouched(address indexed voucher, address indexed vouchee);

    //===============State Variables===============

    address constant NFC_ADDRESS = 0x91e1156d5Fba6b1B251f396e96aFAaCE91394283; // Arbitrum Goerli Spectral
    address constant SCORACLE_ADDRESS = 0xe953f329041dA0D5Cf23159abc4b45f6fbf8Ab17; // Arbitrum Goerli Spectral
    bytes32 public SCORE_TYPE_ID = bytes32("9348f5ba3f574f65958a675e468da9c8");

    mapping(address => mapping(address => bool)) public vouchLookup; // voucher => (vouchee => true/false)
    mapping(address => mapping(address => bool)) public vouchReverseLookup; // vouchee => (voucher => true/false)
    mapping(address => uint) public vouchCount; // voucher => number of vouches

    //===============Modifiers===============

    //===============Main Functions===============

    // Vouching requirements: credit score of voucher, credit score of vouchee,
    // number of people voucher has vouched for, proportion of the liquidity, average MACRO score
    //

    function vouch(address vouchee) public {
        NFC nfc = NFC(NFC_ADDRESS);
        IScoracle scoracle = IScoracle(SCORACLE_ADDRESS);
        // Voucher and vouchee must have each minted an NFC
        if (!nfc.isInNFC(msg.sender)) {
            revert Vouch__VoucherNoNFC();
        }
        if (!nfc.isInNFC(vouchee)) {
            revert Vouch__VoucheeNoNFC();
        }
        // Voucher must have higher MACRO score than vouchee
        // MACRO score getter function from Scoracle
        IScoracle.ScoreData memory voucherScoreData = scoracle.getScore(msg.sender, SCORE_TYPE_ID);
        uint voucherScore = voucherScoreData.score;
        IScoracle.ScoreData memory voucheeScoreData = scoracle.getScore(vouchee, SCORE_TYPE_ID);
        uint voucheeScore = voucheeScoreData.score;

        // Add in spoof logic
        if (voucherScore < voucheeScore + 10) {
            revert Vouch__VoucherLower();
        }
        // Voucher must have a remaining "vouch"
        if (allowedVouchCount(voucherScore) - vouchCount[msg.sender] == 0) {
            revert Vouch__TooManyVouches();
        }
        if (vouchLookup[msg.sender][vouchee]) {
            revert Vouch__AlreadyVouchedForUser();
        }
        // If all requirements passed, link voucher and vouchee
        vouchLookup[msg.sender][vouchee] = true;
        vouchReverseLookup[vouchee][msg.sender] = true;
        vouchCount[msg.sender] += 1;
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
        vouchCount[msg.sender] -= 1;
        emit UserVouched(msg.sender, vouchee);
    }

    /**
     * @dev This function decides whether the voucher can successfully make another vouch
     * @param score The MACRO score of the voucher
     */
    function allowedVouchCount(uint score) internal pure returns (uint total) {
        if (score < 650) {
            revert Vouch__TooLowScore();
        }
        if (650 <= score && score < 700) {
            total = 1;
        }
        if (700 <= score && score < 750) {
            total = 2;
        }
        if (750 <= score && score < 800) {
            total = 3;
        }
        if (800 <= score && score <= 850) {
            total = 4;
        }
    }
}
