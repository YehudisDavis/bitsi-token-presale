import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying from:', deployer.address)
  console.log('Balance:', ethers.formatEther(await ethers.provider.getBalance(deployer.address)), 'ETH')

  // Use SIGNER_ADDRESS env var, or fall back to deployer for testing
  const signerAddress = process.env.SIGNER_ADDRESS || deployer.address
  console.log('Signer address:', signerAddress)

  const VoucherManager = await ethers.getContractFactory('VoucherManager')
  const contract = await VoucherManager.deploy(signerAddress)
  await contract.waitForDeployment()

  const address = await contract.getAddress()
  console.log('\n✅ VoucherManager deployed to:', address)
  console.log('\nAdd to your .env.local:')
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
