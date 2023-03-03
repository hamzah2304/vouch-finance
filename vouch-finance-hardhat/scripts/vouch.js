const { ethers } = require("hardhat")

async function main() {
    const [voucher, vouchee] = await ethers.getSigners()

    console.log("Voucher: ", voucher.address)
    console.log("Vouchee: ", vouchee.address)
    const vouch = await ethers.getContract("Vouch", voucher)

    console.log("Contract address: ", vouch.address)

    let vouched
    console.log("Calling vouchLookup immediately...")
    vouched = await vouch.vouchLookup(voucher.address, vouchee.address)
    console.log("Vouched? ", vouched)

    console.log("Vouching for vouchee...")
    const vouchTx = await vouch.vouch(vouchee.address)
    const vouchTxReceipt = vouchTx.wait(1)
    vouched = await vouch.vouchLookup(voucher.address, vouchee.address)
    console.log("Vouched? ", vouched)

    console.log("Unvouching for vouchee...")
    const unvouchTx = await vouch.unvouch(vouchee.address)
    const unvouchTxReceipt = unvouchTx.wait(1)
    vouched = await vouch.vouchLookup(voucher.address, vouchee.address)
    console.log("Vouched? ", vouched)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
