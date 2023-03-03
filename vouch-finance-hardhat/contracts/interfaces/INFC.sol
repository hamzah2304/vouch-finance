// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

interface INFC {
    event NFCCreated(uint256 indexed id, address[] accounts);
    event AccountsAdded(uint256 indexed id, address[] accounts);
    event NFCMerged(uint256 indexed id, uint256[] ids);
    event BaseURIUpdated(string uri);
    event CustomURIUpdated(uint256 indexed id, string uri);

    function mint() external returns (uint256);

    function addAccounts(address[] memory accounts, bytes[] memory signatures) external;

    function mintAndAdd(
        address[] memory accounts,
        bytes[] memory signatures
    ) external returns (uint256 id);

    function merge(uint256[] memory ids, bytes[] memory signatures) external;

    function getAddresses(uint256 id) external view returns (address[] memory);

    function getNFCId(address account) external view returns (uint256);
}
