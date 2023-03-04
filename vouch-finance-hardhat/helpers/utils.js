const { ethers } = require("hardhat")
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers")
const { Signer } = require("ethers")

const signNFCMessage = async (account, nfcAddress, chainId) => {
    const content = "This is the Vouch team. We are verifying ownership of the wallet."

    return await account._signTypedData(
        // Domain
        {
            name: "Spectral NFC",
            version: "1",
            chainId: chainId,
            verifyingContract: nfcAddress,
        },
        // Types
        {
            Value: [{ name: "content", type: "string" }],
        },
        // Value
        { content }
    )
}

const signScoracleMessage = (account, scoracleAddress, chainId, nonce) => {
    return account.signMessage(
        ethers.utils.arrayify(
            ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256"],
                [account.address, scoracleAddress, chainId, nonce]
            )
        )
    )
}

const stringToBytes32 = (text) => {
    let data = ethers.utils.toUtf8Bytes(text)
    if (data.length > 32) {
        throw new Error("too long")
    }
    data = ethers.utils.zeroPad(data, 32)
    return ethers.utils.hexlify(data)
}

module.exports = {
    signNFCMessage,
    signScoracleMessage,
    stringToBytes32,
}
