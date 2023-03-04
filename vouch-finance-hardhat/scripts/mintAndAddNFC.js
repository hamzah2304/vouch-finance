const { ethers, network } = require("hardhat")
const fs = require("fs")
const path = require("path")
const { signNFCMessage } = require("../helpers/utils")

async function main() {
    const NFC_ADDRESS = "0x91e1156d5Fba6b1B251f396e96aFAaCE91394283"
    const dir = path.resolve(__dirname, "../artifacts/contracts/NFC.sol/NFC.json")
    const NFC_ABI = JSON.parse(fs.readFileSync(dir, "utf8")).abi

    const chainId = network.config.chainId

    const [deployer, deployer2] = await ethers.getSigners()

    const nfc = await ethers.getContractAt(NFC_ABI, NFC_ADDRESS, deployer)
    console.log("NFC address: ", nfc.address)

    let accounts = []
    let signatures = []
    const signature = await signNFCMessage(deployer, NFC_ADDRESS, chainId)
    const signature2 = await signNFCMessage(deployer2, NFC_ADDRESS, chainId)
    console.log("Signature: ", signature)
    console.log("Signature 2: ", signature2)
    console.log("Deployer address: ", deployer.address)
    console.log("Deployer address: ", deployer2.address)
    accounts.push(deployer.address)
    signatures.push(signature)
    accounts.push(deployer2.address)
    signatures.push(signature2)

    const tx = await nfc.mintAndAdd(accounts, signatures)
    const txReceipt = tx.wait(1)
    console.log(txReceipt)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
