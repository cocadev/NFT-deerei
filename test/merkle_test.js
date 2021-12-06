const { expect } = require("chai")
const { web3, ethers } = require("hardhat")
const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256")
const tokens = require("./tokens.json")

function hashToken(account, tokenId) {
	return Buffer.from(
		ethers.utils.solidityKeccak256(["address", "uint256"], [account, tokenId]).slice(2),
		"hex"
	)
}

let nft
let acc1
let merkleTree

describe("NFT", function () {
	beforeEach(async function () {
		let TContract = await ethers.getContractFactory("BirdPass")

		nft = await TContract.deploy()
		await nft.deployed()

		signers = await ethers.getSigners()
		acc1 = signers[1]

		merkleTree = new MerkleTree(
			Object.entries(tokens).map((token) => hashToken(...token)),
			keccak256,
			{ sortPairs: true, hashLeaves: false }
		)
	})

	it("merkle test", async function () {
		console.log("root :>> ", merkleTree.getHexRoot())

		const proof = merkleTree.getHexProof(
			hashToken("0xa3066fb8241E484c44F62b278587A0EC53f4446B", 444)
		)

		await nft.setMerkleRoot(merkleTree.getHexRoot())

		//function whitelistBuy(uint256 tokenId, bytes32[] calldata proof) external payable {
		await expect(
			nft.connect(acc1).whitelistBuy(444, proof, { value: web3.utils.toWei("0.1", "ether") })
		).to.emit(nft, "TransferSingle")
	})
})
