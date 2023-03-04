const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { ethers, network, getNamedAccounts, deployments } = require("hardhat")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Vouch", function () {
          let vouch, voucher, vouchee
          const chainId = network.config.chainId

          beforeEach(async function () {
              const [voucher, vouchee] = await ethers.getSigners()
              await deployments.fixture("all")
              myContract = await ethers.getContract("MyContract", voucher)
              vouch = await ethers.getContract("Vouch", voucher)
          })

          describe("constructor", function () {
              it("should initialise the raffle correctly", async function () {
                  const raffleState = await raffle.getRaffleState()
                  assert.equal(raffleState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"])
              })
          })
      })
