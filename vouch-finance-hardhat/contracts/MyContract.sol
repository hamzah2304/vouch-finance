// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./interfaces/IScoracle.sol";

contract MyContract {
    address constant SCORACLE_ADDRESS = 0xe953f329041dA0D5Cf23159abc4b45f6fbf8Ab17; // Arbitrum Goerli

    constructor() {}

    function calculateMacroScore(bytes32 _scoreTypeJobId, bytes memory _userSignature) external {
        IScoracle scoracle = IScoracle(SCORACLE_ADDRESS);
        scoracle.scoreRequest(msg.sender, _scoreTypeJobId, _userSignature);
    }

    function prequalifyUser(
        bytes32 _scoreTypeJobId
    ) public view returns (bool prequalified, uint256 score) {
        IScoracle scoracle = IScoracle(SCORACLE_ADDRESS);

        // Scoracle's getScore will read an already calculated score from the Scoracle contract's state.
        IScoracle.ScoreData memory scoreData = scoracle.getScore(msg.sender, _scoreTypeJobId);

        prequalified = (scoreData.score > 650) ? true : false;

        return (prequalified, scoreData.score);
    }
}
