const contractABI = [{
    "constant": true,
    "inputs": [],
    "name": "data",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "string",
        "name": "_data",
        "type": "string"
    }],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}];
const contractAddress = '0xe01Ee400640F6AFD339e8A05d4252BcD139FA9Ea'

//var SetGetContract = require('web3-eth-contract');
//var version = web3.version.api;
//console.log(version);

// set provider for all later instances to use
//SetGetContract.setProvider('http://localhost:9080');

//var setgetContract = new Contract(contractABI, contractAddress);

const web3 = new Web3('http://localhost:9545');
var version = web3.version.api;
console.log(version);
const setgetContract = new web3.eth.Contract(contractABI, contractAddress);

document.addEventListener('DOMContentLoaded', () => {
    const $setString = document.getElementById('setString');
    const $string = document.getElementById('string');
    let accounts = [];

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
        });

    const getData = () => {
        setgetContract.methods
            .get()
            .call()
            .then(result => {
                $string.innerHTML = result;
            })
    };
    getData();


    $setString.addEventListener('submit', e => {
        e.preventDefault();
        const string = e.target.elements[0].value;
        setgetContract.methods
            .set(string)
            .send({ from: accounts[0] })
            .then(getData);
    });

});
