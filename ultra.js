let web3;
let contract;
let tokenContract;
let user;

const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];
        contract = new web3.eth.Contract(stakingABI, contractAddress);
        tokenContract = new web3.eth.Contract([
            { "constant": false, "inputs": [
                { "name": "_spender", "type": "address" },
                { "name": "_value", "type": "uint256" }
            ], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }
        ], tokenAddress);
        document.getElementById("walletAddress").innerText = user;
    } else {
        alert("MetaMask not found!");
    }
});

document.getElementById("connectButton").onclick = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    user = accounts[0];
    document.getElementById("walletAddress").innerText = user;
};

document.getElementById("approveButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const weiAmount = web3.utils.toWei(amount, "ether");
    await tokenContract.methods.approve(contractAddress, weiAmount).send({ from: user });
    alert("Approved");
};

document.getElementById("stakeButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const tier = document.getElementById("tierSelect").value;
    const weiAmount = web3.utils.toWei(amount, "ether");
    await contract.methods.stake(weiAmount, tier).send({ from: user });
    alert("Stake Success");
};

document.getElementById("claimButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: user });
    alert("Claim Success");
};

document.getElementById("unstakeButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: user });
    alert("Unstake Success");
};
