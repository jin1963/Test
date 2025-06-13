let web3;
let contract;
const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0"; // Ultra Contract
let userAccount;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
});

document.getElementById("connectButton").onclick = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];
    document.getElementById("walletAddress").innerText = userAccount;
};

document.getElementById("approveButton").onclick = async () => {
    const tokenAddress = await contract.methods.g3xToken().call();
    const tokenContract = new web3.eth.Contract([
        { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }
    ], tokenAddress);
    const amount = document.getElementById("amountInput").value;
    await tokenContract.methods.approve(contractAddress, web3.utils.toWei(amount, 'ether')).send({ from: userAccount });
    alert("Approved!");
};

document.getElementById("stakeButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const duration = document.getElementById("tierSelect").value;
    await contract.methods.stake(web3.utils.toWei(amount, 'ether'), duration).send({ from: userAccount });
    alert("Staked!");
};

document.getElementById("claimButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: userAccount });
    alert("Claimed!");
};

document.getElementById("unstakeButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: userAccount });
    alert("Unstaked!");
};
