const { ethers } = require("hardhat")

async function main() {
    const [voucher, vouchee] = await ethers.getSigners()

    console.log("Voucher: ", voucher)
    console.log("Vouchee: ", vouchee)
    const vouch = await ethers.getContract("Vouch", voucher)

    console.log("Contract address: ", vouch.address)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
