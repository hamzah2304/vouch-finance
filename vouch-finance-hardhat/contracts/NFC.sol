// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./interfaces/INFC.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";

struct NFCData {
    address[] accounts;
    string customUri;
}

contract NFC is ERC721Upgradeable, EIP712Upgradeable, OwnableUpgradeable, INFC {
    using ECDSA for bytes32;
    using Strings for uint256;

    mapping(uint256 => NFCData) private _lookup;
    mapping(address => uint256) private _reverseLookup;
    uint256 public counter;
    string internal __baseURI;

    function initialize() public initializer {
        __Ownable_init();
        __ERC721_init("Non Fungible Credit", "NFC");
        __EIP712_init("Spectral", "1");
        counter = 1;
    }

    function mint() public returns (uint256) {
        require(!isInNFC(msg.sender), "NFC_ALREADY_EXISTS");
        uint256 currentCounter = counter++;
        NFCData storage nfcData = _lookup[currentCounter];
        _reverseLookup[msg.sender] = currentCounter;
        nfcData.accounts.push(msg.sender);
        _mint(msg.sender, currentCounter);
        emit NFCCreated(currentCounter, nfcData.accounts);
        return currentCounter;
    }

    function addAccounts(address[] memory accounts, bytes[] memory signatures) public {
        require(accounts.length == signatures.length, "ARRAY_LENGTH_MISMATCH");
        uint256 id = getNFCId(msg.sender);
        NFCData storage nfcData = _lookup[id];
        for (uint256 i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            require(!isInNFC(account), _errorMsg("ALREADY_IN_NFC", account));
            require(
                verify(account, _hash(), signatures[i]),
                _errorMsg("INVALID_SIGNATURE", account)
            );
            _reverseLookup[account] = id;
            nfcData.accounts.push(account);
        }
        emit AccountsAdded(id, accounts);
    }

    function mintAndAdd(
        address[] memory accounts,
        bytes[] memory signatures
    ) external returns (uint256 id) {
        id = mint();
        addAccounts(accounts, signatures);
    }

    function merge(uint256[] memory ids, bytes[] memory signatures) external {
        require(ids.length == signatures.length, "ARRAY_LENGTH_MISMATCH");
        uint256 mergeIntoId = getNFCId(msg.sender);
        NFCData storage nfcData = _lookup[mergeIntoId];
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            address signer = ECDSA.recover(_hash(), signatures[i]);
            require(_reverseLookup[signer] == id, _errorMsg("SIGNER_NOT_IN_NFC", id));
            address[] memory accounts = _lookup[id].accounts;
            for (uint256 j = 0; j < accounts.length; j++) {
                nfcData.accounts.push(accounts[j]);
                _reverseLookup[accounts[j]] = mergeIntoId;
            }
            // cannot delete storage variable https://ethereum.stackexchange.com/a/35993
            delete _lookup[ids[i]];
            _burn(ids[i]);
            emit NFCMerged(mergeIntoId, ids);
        }
    }

    function getAddresses(uint256 id) external view returns (address[] memory) {
        return _lookup[id].accounts;
    }

    function getNFCId(address account) public view returns (uint256) {
        uint256 id = _reverseLookup[account];
        require(id != 0, "NFC_NOT_FOUND");
        return id;
    }

    function isInNFC(address account) public view returns (bool) {
        return _reverseLookup[account] != 0;
    }

    function _errorMsg(string memory err, address account) private pure returns (string memory) {
        return string(abi.encodePacked(err, ": ", uint256(uint160(account)).toHexString(20)));
    }

    function _errorMsg(string memory err, uint256 id) private pure returns (string memory) {
        return string(abi.encodePacked(err, ": ", id.toString()));
    }

    function _beforeTokenTransfer(address from, address to, uint256) internal pure {
        // removed override
        require(from == address(0) || to == address(0), "NFC_NOT_TRANSFERABLE");
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return __baseURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        __baseURI = baseURI;
        emit BaseURIUpdated(baseURI);
    }

    function setCustomURI(string calldata _customUri) external {
        uint256 tokenId = getNFCId(msg.sender);
        NFCData storage nfcData = _lookup[tokenId];
        nfcData.customUri = _customUri;
        emit CustomURIUpdated(tokenId, _customUri);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (tokenId == 0) {
            return "";
        }
        string memory uri = _lookup[tokenId].customUri;
        if (bytes(uri).length != 0) {
            return uri;
        }
        return super.tokenURI(tokenId);
    }

    function _hash() internal view returns (bytes32) {
        string memory content = "This is Spectral Team. We are verifying ownership of the wallet.";
        return
            _hashTypedDataV4(
                keccak256(abi.encode(keccak256("Value(string content)"), keccak256(bytes(content))))
            );
    }

    function verification(bytes memory _signature) external view returns (address) {
        return ECDSA.recover(_hash(), _signature);
    }

    function verify(
        address _signer,
        bytes32 _digest,
        bytes memory _signature
    ) internal view returns (bool) {
        return ECDSA.recover(_digest, _signature) == _signer;
    }

    uint256[50] private __gap;
}
