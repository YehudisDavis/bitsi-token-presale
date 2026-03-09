// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BITSI_TokenSale {
    mapping(bytes32 => bool) public redeemedVouchers;
    address public signer;

    event VoucherRedeemed(bytes32 voucherId, address wallet, uint discount);

    constructor(address _signer) {
        signer = _signer;
    }

    function redeemVoucher(address wallet, bytes32 voucherId, uint discount, bytes32 nonce, bytes memory signature) public {
        require(signature.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        bytes32 message = keccak256(abi.encodePacked(wallet, voucherId, discount, nonce));
        bytes32 ethSignedMessage = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));

        require(ecrecover(ethSignedMessage, v, r, s) == signer, "Invalid signature");
        require(!redeemedVouchers[voucherId], "Voucher already redeemed");

        redeemedVouchers[voucherId] = true;

        // Apply discount to token purchase logic here
        // For demo, just emit event
        emit VoucherRedeemed(voucherId, wallet, discount);
    }
}
