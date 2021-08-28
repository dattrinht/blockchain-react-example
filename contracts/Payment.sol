// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Payment{
    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}