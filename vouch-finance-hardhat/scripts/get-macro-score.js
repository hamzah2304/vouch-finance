const { getNamedAccounts, ethers } = require("hardhat")
const { signScoracleMessage, stringToBytes32 } = require("../helpers/utils")

async function main() {
    const SCORE_TYPE_ID = "9348f5ba3f574f65958a675e468da9c8"
    const DeFiScoreIdType = stringToBytes32(SCORE_TYPE_ID)
    const dummy_address = "0x000000000000000000000000000000000000dEaD"
    const SCORACLE_ADDRESS = "0xe953f329041dA0D5Cf23159abc4b45f6fbf8Ab17"
    const CHAIN_ID = 421613

    // const { deployer } = await getNamedAccounts()
    const [deployer] = await ethers.getSigners()
    const myContract = await ethers.getContract("MyContract", deployer)

    console.log("Contract address: ", myContract.address)

    let nonce = 4
    console.log("starting nonce: ", nonce)
    const accountSignature = await signScoracleMessage(deployer, SCORACLE_ADDRESS, CHAIN_ID, nonce)

    console.log(`Requesting MACRO score for ${deployer.address}...`)
    await myContract.calculateMacroScore(DeFiScoreIdType, accountSignature)
    console.log("ending nonce: ", nonce)
    console.log("MACRO score calculation scheduled")

    console.log(`Checking prequalification for ${deployer.address}...`)
    const { prequalified, score } = await myContract.prequalifyUser(DeFiScoreIdType)
    console.log(`Prequalification: ${prequalified} with score: ${score}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
