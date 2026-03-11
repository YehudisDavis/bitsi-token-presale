// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title VoucherManager — BITSI presale voucher contract on Sepolia
contract VoucherManager is Ownable {
    using ECDSA for bytes32;

    address public signer;
    uint256 private _nextVoucherId;

    // voucherType (0–3) => price in wei
    mapping(uint256 => uint256) public voucherPrices;

    // voucherId => redeemed
    mapping(uint256 => bool) public redeemedVouchers;

    // ── Events ─────────────────────────────────────────────────────────────

    event VoucherPurchased(
        address indexed buyer,
        uint256 indexed voucherId,
        uint256 voucherType
    );

    event VoucherRedeemed(
        uint256 indexed voucherId,
        address indexed redeemer
    );

    // ── Constructor ─────────────────────────────────────────────────────────

    constructor(address _signer) Ownable(msg.sender) {
        signer = _signer;
        _nextVoucherId = 1;

        // Sepolia testnet prices (small ETH values for testing)
        voucherPrices[0] = 0.001 ether;  // Type 0 → $100 tier
        voucherPrices[1] = 0.005 ether;  // Type 1 → $500 tier
        voucherPrices[2] = 0.010 ether;  // Type 2 → $1,000 tier
        voucherPrices[3] = 0.100 ether;  // Type 3 → $10,000 tier
    }

    // ── Purchase ─────────────────────────────────────────────────────────────

    /// @notice Purchase a voucher of the given type by sending the required ETH.
    /// @param voucherType  0 = $100, 1 = $500, 2 = $1,000, 3 = $10,000
    function purchaseVoucher(uint256 voucherType) external payable {
        require(voucherPrices[voucherType] > 0, "Invalid voucher type");
        require(msg.value >= voucherPrices[voucherType], "Insufficient ETH");

        uint256 voucherId = _nextVoucherId++;

        emit VoucherPurchased(msg.sender, voucherId, voucherType);

        // Refund excess
        uint256 excess = msg.value - voucherPrices[voucherType];
        if (excess > 0) {
            (bool sent, ) = msg.sender.call{value: excess}("");
            require(sent, "Refund failed");
        }
    }

    // ── Redeem ───────────────────────────────────────────────────────────────

    /// @notice Redeem a voucher using a backend-issued ECDSA signature.
    /// @param voucherId  The on-chain voucher ID emitted in VoucherPurchased
    /// @param signature  Backend signature of keccak256(abi.encodePacked(voucherId, msg.sender))
    function redeemVoucher(uint256 voucherId, bytes calldata signature) external {
        require(!redeemedVouchers[voucherId], "Voucher already redeemed");

        // Reconstruct the signed hash and recover the signer
        bytes32 hash = keccak256(abi.encodePacked(voucherId, msg.sender));
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(hash);
        address recovered = ECDSA.recover(ethHash, signature);

        require(recovered == signer, "Invalid signature");

        redeemedVouchers[voucherId] = true;
        emit VoucherRedeemed(voucherId, msg.sender);
    }

    // ── Admin ─────────────────────────────────────────────────────────────────

    function setSigner(address _signer) external onlyOwner {
        signer = _signer;
    }

    function setPrices(uint256[] calldata types, uint256[] calldata prices) external onlyOwner {
        require(types.length == prices.length, "Length mismatch");
        for (uint256 i = 0; i < types.length; i++) {
            voucherPrices[types[i]] = prices[i];
        }
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Withdraw failed");
    }
}
