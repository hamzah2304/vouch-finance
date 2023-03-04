const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { ethers, network, getNamedAccounts, deployments } = require("hardhat")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("MyContract", function () {
          let vouch, deployer
          const chainId = network.config.chainId

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture("all")
              myContract = await ethers.getContract("MyContract", deployer)
          })

          describe("calculateMacroScore", function () {
              it("should schedule MACRO score calculation", async function () {
                  const raffleState = await raffle.getRaffleState()
                  assert.equal(raffleState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"])
              })
          })
      })
