import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, formValueSelector, destroy } from 'redux-form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { isRequired } from 'src/components/core/form/validator';
import { bindActionCreators } from 'redux';
import { PAYMENT_METHOD, EXCHANGE_DIRECTION } from 'src/screens/coin/constant';
import cx from 'classnames';
import { URL } from 'src/resources/constants/url';
import ConfirmButton from 'src/components/confirmButton';
import inputField from 'src/components/core/form/fields/input';
import { showAlert } from 'src/screens/app/redux/action';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import LabelLang from 'src/lang/components/LabelLang';
import { FaLock } from 'react-icons/fa';
import authUtil from 'src/utils/authentication';
import PhoneVerify from './components/phoneVerify';
import OrderInfo from './components/orderInfo';
import exchangeField, { exchangeValidator } from './reduxFormFields/exchange';
import paymentMethodField from './reduxFormFields/paymentMethod';
import { makeOrder, genAddress } from './redux/action';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.sell.${name}`;
const sellFormName = 'SellForm';
const SellForm = createForm({
  propsReduxForm: {
    destroyOnUnmount: false,
    form: sellFormName,
    initialValues: {
      paymentMethod: PAYMENT_METHOD.TRANSFER,
    },
  },
});
const formSelector = formValueSelector(sellFormName);

class SellCryptoCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      walletAddress: null,
      isAuth: authUtil.isLogin() || false,
      verifiedPhone: null,
    };
  }

  componentWillUnmount() {
    const { rfDestroy } = this.props;
    rfDestroy(sellFormName);
  }

  isValidToSubmit = () => {
    const { isAuth, verifiedPhone } = this.state;
    if (!isAuth) return false;
    
    const { currency, exchange: { amount, fiatAmount }, bankName, bankAccountName, bankAccountNumber, paymentMethod } = this.props;
    if (currency && amount && fiatAmount) {
      if (paymentMethod === PAYMENT_METHOD.TRANSFER && bankName && bankAccountName && bankAccountNumber) {
        return true;
      } else if (paymentMethod === PAYMENT_METHOD.TNG && verifiedPhone) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  genAddress = (currency) => {
    const { genAddress } = this.props;
    return genAddress(currency).then(walletAddress => {
      this.setState({ walletAddress });
      return walletAddress;
    }).catch(reqErrorAlert);
  }

  prepareToOrder = async () => {
    try {
      const { currency, checkAddress, showAlert } = this.props;
      const { walletAddress } = this.state;
      const isAddressValid = await checkAddress({ currency, address: walletAddress });
      if (walletAddress && isAddressValid?.hasTransaction) {
        this.makeOrder();
      } else {
        showAlert({
          message: <LabelLang id={getIntlKey('prepareOrderFailed')} />,
          type: 'danger',
          timeOut: 1000,
        });
      }
    } catch(e) {
      console.warn(e);
    }
  }

  makeOrder = () => {
    const { makeOrder, exchange, bankName, bankAccountName, bankAccountNumber, paymentMethod } = this.props;
    const { walletAddress, verifiedPhone } = this.state;
    const payload = {
      amount: String(exchange?.amount),
      currency: exchange?.currency,
      fiat_local_amount: String(exchange?.fiatAmount),
      fiat_local_currency: exchange?.fiatCurrency,
      direction: EXCHANGE_DIRECTION.sell,
      address: walletAddress,
      order_user_payment_type: paymentMethod
    };

    if (paymentMethod === PAYMENT_METHOD.TRANSFER) {
      payload.user_info = JSON.stringify({ bankName, bankAccountName, bankAccountNumber });
    }

    if (paymentMethod === PAYMENT_METHOD.TNG) {
      payload.user_info = JSON.stringify({ bankUserPhoneNumber: verifiedPhone });
    }

    makeOrder(payload)
      .then(this.orderSuccessHandler)
      .catch(this.orderFailedHandler);
  }

  orderSuccessHandler = (/* orderInfo */) => {
    const { showAlert, history } = this.props;
    showAlert({
      message: <LabelLang id={getIntlKey('orderSuccessful')} />,
      timeOut: 1000,
    });
    history.push(URL.ME_HISTORY);
  }

  orderFailedHandler = () => {
    const { showAlert } = this.props;
    showAlert({
      message: <LabelLang id={getIntlKey('orderFailed')} />,
      type: 'danger',
      timeOut: 1000,
    });
  }

  resetState = () => {
    this.setState({
      walletAddress: null
    });
  }

  onBankTransferDone = () => {
    this.resetState();
  }

  onTngVerified = (verifiedPhone) => {
    this.setState({ verifiedPhone });
  }

  renderPhoneBlock = () => {
    return (
      <div className={cx(styles.codInfo, 'mt-4')}>
        <PhoneVerify onVerified={this.onTngVerified} />
      </div>
    );
  }

  renderBankInfoInput = () => {
    const { intl: { formatMessage } } = this.props;
    return (
      <div className={cx(styles.codInfo, 'mt-4')}>
        <Field
          type="text"
          name="bankName"
          placeholder={formatMessage({ id: getIntlKey('bankName')})}
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
        <Field
          type="text"
          name="bankAccountNumber"
          placeholder={formatMessage({ id: getIntlKey('accountNumber')})}
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
        <Field
          type="text"
          name="bankAccountName"
          placeholder={formatMessage({ id: getIntlKey('accountName')})}
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
      </div>
    );
  }

  render() {
    const { supportedCurrency, exchange, currency, paymentMethod } = this.props;
    const { walletAddress, isAuth } = this.state;
    const isValid = this.isValidToSubmit();
    if (walletAddress) {
      const exchangeInfo = {
        amount: exchange?.amount,
        currency: exchange?.currency,
        fiatAmount: exchange?.fiatAmount,
        fiatCurrency: exchange?.fiatCurrency,
      };
      return (
        <OrderInfo
          generatedAddress={walletAddress}
          orderInfo={exchangeInfo}
          onMakeOrder={this.makeOrder}
        />
      );
    }
    return (
      <div className={styles.container}>
        <SellForm>
          <Field
            name="exchange"
            className='mt-4'
            component={exchangeField}
            direction={EXCHANGE_DIRECTION.sell}
            fiatCurrency={supportedCurrency[0]}
            currency={currency}
            validate={exchangeValidator}
          />
          <Field
            name="paymentMethod"
            className='mt-4'
            component={paymentMethodField}
          />
          { paymentMethod === PAYMENT_METHOD.TRANSFER && this.renderBankInfoInput() }
          { paymentMethod === PAYMENT_METHOD.TNG && isAuth && this.renderPhoneBlock() }
          <ConfirmButton
            disabled={!isValid}
            containerClassName='mt-5'
            buttonClassName={styles.submitBtn}
            label={(
              <span>
                <FaLock /> Sell {exchange?.amount || 0} {exchange?.currency}
              </span>
            )}
            onConfirm={() => this.genAddress(currency)}
          />
        </SellForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paymentMethod: formSelector(state, 'paymentMethod'),
  exchange: formSelector(state, 'exchange'),
  userAddress: formSelector(state, 'address'),
  userPhone: formSelector(state, 'phone'),
  userNote: formSelector(state, 'noteAndTime'),
  bankName: formSelector(state, 'bankName'),
  bankAccountNumber: formSelector(state, 'bankAccountNumber'),
  bankAccountName: formSelector(state, 'bankAccountName'),
  supportedCurrency: state?.app?.supportedCurrency || [],
});

const mapDispatchToProps = dispatch => ({
  makeOrder: bindActionCreators(makeOrder, dispatch),
  genAddress: bindActionCreators(genAddress, dispatch),
  rfDestroy: bindActionCreators(destroy, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

SellCryptoCoin.defaultProps = {
  exchange: {},
  currency: 'ETH',
  paymentMethod: PAYMENT_METHOD.TRANSFER,
  makeOrder: null,
  showAlert: null,
  supportedCurrency: [],
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
};

SellCryptoCoin.propTypes = {
  exchange: PropTypes.object,
  currency: PropTypes.string,
  paymentMethod: PropTypes.string,
  makeOrder: PropTypes.func,
  showAlert: PropTypes.func,
  supportedCurrency: PropTypes.array,
  rfDestroy: PropTypes.func.isRequired,
  genAddress: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  bankName: PropTypes.string,
  bankAccountName: PropTypes.string,
  bankAccountNumber: PropTypes.string,
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(SellCryptoCoin)));
