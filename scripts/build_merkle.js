const { ethers } = require("hardhat")
const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256")
const tokens = require("./tokens.json")

let merkleTree

function hashToken(account, tokenId) {
	return Buffer.from(
		ethers.utils.solidityKeccak256(["address", "uint256"], [account, tokenId]).slice(2),
		"hex"
	)
}

async function main() {
	merkleTree = new MerkleTree(
		Object.entries(tokens).map((token) => hashToken(...token)),
		keccak256,
		{ sortPairs: true, hashLeaves: false }
	)

	console.log("---------------------------------------------")
	console.log("Merkle ROOT :>> ", merkleTree.getHexRoot())
	console.log("---------------------------------------------")

	for (const [account, tokenId] of Object.entries(tokens)) {
		const proof = merkleTree.getHexProof(hashToken(account, tokenId))

		console.log(`${account} tokenId: ${tokenId} proof: ${proof}`)
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
