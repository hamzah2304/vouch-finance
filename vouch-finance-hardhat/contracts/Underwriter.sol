// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./NFC.sol";
import "./interfaces/IScoracle.sol";

contract Underwriter {
    //necessary addresses to be edited

    address constant NFC_ADDRESS = 0x91e1156d5Fba6b1B251f396e96aFAaCE91394283; // Arbitrum Goerli Spectral
    address constant SCORACLE_ADDRESS = 0xe953f329041dA0D5Cf23159abc4b45f6fbf8Ab17; // Arbitrum Goerli Spectral
    bytes32 public SCORE_TYPE_ID = bytes32("9348f5ba3f574f65958a675e468da9c8");

    //insert score prior to calculating

    address[] public poolAddressList; //list of poeple in the pool to check their scores
    uint[] public poolScores; //list of scores of the pool -- need to request
    uint[] public poolLiquidity; //preliminary -- need to request
    mapping(address => uint) public poolNo; // voucher => pool assignment
    Pool[] public pool; //pool struct

    // move
    //creating and populating pools - in the future they should be requested
    struct Pool {
        uint number; //1- normal risk, 2 - high risk
        uint[] addresses; //addresses of people in the pool
        uint liquidity; // liquidity in the pool available
        uint risk; //average risk of the pool
    }

    Pool poolStruct1 = Pool(1, [123, 456], 100000);
    Pool poolStruct2 = Pool(2, [123, 456], 100000);

    uint voucherScore = 800;
    uint voucheeScore = 650;

    // move - test

    function updatePoolRisk(Pool memory pool) public {
        poolAddressList = pool.addresses;
        poolLiquidity = pool.liquidity;

        NFC nfc = NFC(NFC_ADDRESS);
        IScoracle scoracle = IScoracle(SCORACLE_ADDRESS);

        /*Getting the scores for every pool member and finding the average

        MACRO score getter function from Scoracle
        IScoracle.ScoreData memory poolScoresData[i] = scoracle.getScore(poolAddressList[i], SCORE_TYPE_ID));
        uint poolScores[i] = voucherScoreData.score[i];
        uint poolAvRisk = sum / poolAddressList.length() - sum obtained by for loop

        Would also need to access pool liquidity data set in the Pool contract and set pool.risk

        */

        // test data
        if (pool.number == 1) {
            pool.risk = 800;
        } else {
            pool.risk = 690;
        }
    }

    function underwrite(
        uint _voucherScore,
        uint _voucheeScore,
        address _vouchee
    ) public returns (uint[] memory) {
        //based on the averageScore it should request a specific pool
        uint averageScore = (voucherScore + voucheeScore) / 2;
        if (averageScore < 700) {
            //request pool 2 struct
        } else {
            //request pool 1 struct
        }

        // pool =..

        updatePoolRisk(pool);
        address vouchee = _vouchee;
        voucherScore = _voucherScore;
        voucheeScore = _voucheeScore;
        uint poolAvRisk = 1; //pool.risk;
        poolLiquidity = 1; //pool.liquidity;

        //risk factors
        uint risk = (1 - (averageScore) / (poolAvRisk)) * 1000;
        uint loanMaxAmount = poolLiquidity / risk;
        uint collateralPercentage = loanMaxAmount / (risk * 100);
        uint[] memory returnValue = [loanMaxAmount, collateralPercentage];

        //updating the average risk
        // pool.risk =
        //     (poolAvRisk * pool.addresses.length() + averageScore) /
        //     (pool.addresses.length() + 2);

        //getting the interest rates set and assigning the person a risk criteria
        if (averageScore < 700) {
            poolNo[_vouchee] = 2; // high risk
            uint poolIr = 0.1;
            uint voucherIr = 0.13;
            uint voucheeIr = 0.03;
        } else {
            poolNo[_vouchee] = 1; //standard risk
            uint poolIr = 0.08;
            uint voucherIr = 0.1;
            uint voucheeIr = 0.1;
        }

        return returnValue; //not commiting to memory since it's not set.
    }
}
