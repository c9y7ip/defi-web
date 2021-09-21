pragma solidity ^0.8.0;

contract myTContract {
    int256 bal;

    constructor() {
        bal = 1;
    }

    function getBalance() external view returns (int256) {
        return bal;
    }

    function withdraw(int256 amt) external {
        bal = bal - amt;
    }

    function deposit(int256 amt) external {
        bal = bal + amt;
    }
}
