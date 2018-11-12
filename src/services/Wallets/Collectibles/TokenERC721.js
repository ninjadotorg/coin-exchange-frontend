import axios from 'axios';
import { Wallet } from '@/services/Wallets/Wallet.js';
import { StringHelper } from '@/services/helper';
import { Ethereum } from '@/services/Wallets/Ethereum.js';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = [{
  constant: true, inputs: [], name: 'name', outputs: [{ name: '_name', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '_tokenId', type: 'uint256' }], name: 'getApproved', outputs: [{ name: '_approved', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_tokenId', type: 'uint256' }], name: 'approve', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'implementsERC721', outputs: [{ name: '_implementsERC721', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '_totalSupply', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_tokenId', type: 'uint256' }], name: 'transferFrom', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_index', type: 'uint256' }], name: 'tokenOfOwnerByIndex', outputs: [{ name: '_tokenId', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '_tokenId', type: 'uint256' }], name: 'ownerOf', outputs: [{ name: '_owner', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '_tokenId', type: 'uint256' }], name: 'tokenMetadata', outputs: [{ name: '_infoUrl', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: '_balance', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_owner', type: 'address' }, { name: '_tokenId', type: 'uint256' }, { name: '_approvedAddress', type: 'address' }, { name: '_metadata', type: 'string' }], name: 'mint', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'symbol', outputs: [{ name: '_symbol', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_tokenId', type: 'uint256' }], name: 'transfer', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'numTokensTotal', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'getOwnerTokens', outputs: [{ name: '_tokenIds', type: 'uint256[]' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  anonymous: false, inputs: [{ indexed: true, name: '_to', type: 'address' }, { indexed: true, name: '_tokenId', type: 'uint256' }], name: 'Mint', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: true, name: '_from', type: 'address' }, { indexed: true, name: '_to', type: 'address' }, { indexed: false, name: '_tokenId', type: 'uint256' }], name: 'Transfer', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: true, name: '_owner', type: 'address' }, { indexed: true, name: '_approved', type: 'address' }, { indexed: false, name: '_tokenId', type: 'uint256' }], name: 'Approval', type: 'event',
}];

export class TokenERC721 extends Ethereum {
  constructor() {
    super();
    this.className = 'TokenERC721';
    this.isToken = true;
    this.contractAddress = '';
    this.decimals = 0;
    this.customToken = true;
    this.title = '';
    this.name = '';
    this.isCollectibles = true;
    this.icon = 'collectible.svg';
  }

  createFromWallet(wallet) {
    this.network = wallet.network;
    this.address = wallet.address;
    this.chainId = wallet.chainId;
    this.coinType = wallet.coinType;
    this.privateKey = wallet.privateKey;
    this.protected = wallet.protected;
    this.mnemonic = wallet.mnemonic;
  }

  getContractInfo(contractAddress) {
    return true;
  }

  async getBalance() {
    const web3 = this.getWeb3();
    const contract = new web3.eth.Contract(
      abi,
      this.contractAddress,
    );

    const balanceOf = await contract.methods.balanceOf(this.address).call();

    const tokenBalance = new BigNumber(balanceOf) / Math.pow(10, this.decimals);

    return tokenBalance;
  }

  async transfer(toAddress, tokenID) {
    return 'Not support yet ...';
  }
}

export default { TokenERC721 };
