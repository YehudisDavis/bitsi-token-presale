// Stub for @metamask/sdk — allows RainbowKit's MetaMask connector to initialise
// without the full SDK. Browser-extension users connect via window.ethereum directly.
class MetaMaskSDK {
  constructor() {}
  init() { return Promise.resolve() }
  getProvider() { return typeof window !== 'undefined' ? window.ethereum : undefined }
  terminate() {}
}

module.exports = { MetaMaskSDK }
module.exports.default = MetaMaskSDK
