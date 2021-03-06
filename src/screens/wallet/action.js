import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { WALLET } from './type';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';

export const userWallet = () => (dispatch) => {

  const getWallet = makeRequest({
    type: WALLET,
    url: API_URL.USER.USER_WALLET,
  }, dispatch);

  return getWallet().then((res) => {
    if (res.wallet) {
      return MasterWallet.convertToListObject(res.wallet);
    }
    else return [];
  }, (err) => {
    console.log(err);
    alert(err.message);
    return false;
  });
};

export const makeSaveWallet = masterWallet => (dispatch) => {

  if (!masterWallet || masterWallet.length == 0) return false;

  const setWallet = makeRequest({
    type: WALLET,
    url: API_URL.USER.USER_WALLET,
    method: 'PUT',
    data: { wallet: JSON.stringify(masterWallet) }
  }, dispatch);

  return setWallet().then(() => {
    return true;
  }, (err) => {
    console.log(err);
    alert(err.message);
    return false;
  });
};

export const updateWallet = (oldPassword, newPassword) => {

  // get wallet
  let getWallet = makeRequest({
    type: WALLET,
    url: API_URL.USER.USER_WALLET,
  });

  let setWallet = (wallets) => makeRequest({
    type: WALLET,
    url: API_URL.USER.USER_WALLET,
    method: 'PUT',
    data: { wallet: JSON.stringify(wallets) }
  });

  return getWallet().then((res) => {
    if (res.wallet) {
      let wallets = MasterWallet.convertToListObject(res.wallet);      
      if (wallets.length > 0) {
        let newWallets = MasterWallet.updateNewPassword(oldPassword, newPassword, wallets);        
        if (newWallets.length > 0) {          
          return setWallet(newWallets)().then((res) => {            
            return true;
          }, (err) => {            
            return false;
          });          
        }
      }
    }
  }, (err) => {
    console.log('updateWallet error', err);
    return false;
  });
};

