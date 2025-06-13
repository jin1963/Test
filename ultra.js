let web3;
let contract;
let g3xToken;
const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0"; 
let user;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(stakingABI, contractAddress);
    }
});

document.getElementById("connectButton").onclick = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    user = accounts[0];
    document.getElementById("walletAddress").innerText = user;
};

document.getElementById("approveButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const tokenContract = new web3.eth.Contract([
      {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[],"type":"function"}
    ], "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039");  // G3X token address
    await tokenContract.methods.approve(contractAddress, web3.utils.toWei(amount, "ether")).send({ from: user });
    alert("Approved");
};

document.getElementById("stakeButton").onclick = async () => {
    const amount = web3.utils.toWei(document.getElementById("amountInput").value, "ether");
    const duration = parseInt(document.getElementById("tierSelect").value);
    await contract.methods.stake(amount, duration).send({ from: user });
    alert("Staked Successfully");
};

document.getElementById("claimButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: user });
    alert("Claimed Successfully");
};

document.getElementById("unstakeButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: user });
    alert("Unstaked Successfully");
};
