const { ethers } = require("hardhat")
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers")
const { Signer } = require("ethers")

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
    signScoracleMessage,
    stringToBytes32,
}
