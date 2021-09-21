import React, { useEffect, useState } from "react";
// import MyContract from "./build/contracts/myContract.json";
import MyContract from "./build/contracts/myTContract.json";
import "./style.css";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [investedBalance, setInvestedBalance] = useState("");
  const [amount, setAmount] = useState(0);
  const web3 = new Web3(window.ethereum);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.eth_requestAccounts;
        var accounts = await web3.eth.getAccounts();
        var weiBalance = await web3.eth.getBalance(accounts.toString());
        var eBalance = web3.utils.fromWei(weiBalance.toString(), "ether");
        await setAccount(accounts[0]);
        setBalance(eBalance);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getBlanace = () => {
    const contract = new web3.eth.Contract(
      MyContract.abi,
      "0x88DED825434cA66FAA0Dd30ea421041278226d81"
    );
    contract.methods
      .getBalance()
      .call()
      .then((bal) => {
        setInvestedBalance(bal);
      });
  };

  const deposit = () => {
    const contract = new web3.eth.Contract(
      MyContract.abi,
      "0x88DED825434cA66FAA0Dd30ea421041278226d81"
    );
    contract.methods.deposit(amount).send({ from: account });
  };

  const withdraw = () => {
    const contract = new web3.eth.Contract(
      MyContract.abi,
      "0x88DED825434cA66FAA0Dd30ea421041278226d81"
    );
    console.log(amount);
    contract.methods.withdraw(amount).send({ from: account });
  };

  useEffect(() => {
    connect();
    getBlanace();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h3>Your Address</h3>
        <p>{account}</p>
        <h3>Your Ether coins : ETH</h3>
        <p>{balance}</p>
        <h3>Your invested balance: ETH</h3>
        <p>{investedBalance}</p>
        <input
          onChange={async (e) => {
            setAmount(e.target.value);
            console.log(e.target.value);
          }}
          placeholder="Amount"
        ></input>
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
