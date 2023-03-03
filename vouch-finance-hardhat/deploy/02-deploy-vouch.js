const { network } = require("hardhat")
const { verify } = require("../helpers/verify")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")

    const arguments = []
    const vouch = await deploy("Vouch", {
        from: deployer,
        arguments: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    console.log(`Deployed at: ${vouch.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(vouch.address, [])
    }
}

module.exports.tags = ["all", "vouch"]
