import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/ChibiFighters.json');

export class ChibiFighters extends TokenERC721 {
  constructor() {
    super();
    this.className = 'ChibiFighters';
    this.isToken = true;
    this.contractAddress = '0x71c118b00759b0851785642541ceb0f4ceea0bd5';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'ChibiFighters';
    this.name = 'CBF';
  }
}

export default { ChibiFighters };
