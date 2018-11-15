const APP_ACTION = {

  SHOW_CONFIRM: 'SHOW_CONFIRM',
  HIDE_CONFIRM: 'SHOW_CONFIRM',

  SHOW_SCAN_QRCODE: 'SHOW_SCAN_QRCODE',
  HIDE_SCAN_QRCODE: 'HIDE_SCAN_QRCODE',

  SHOW_QRCODE_CONTENT: 'SHOW_QRCODE_CONTENT',
  HIDE_QRCODE_CONTENT: 'HIDE_QRCODE_CONTENT',

  NETWORK_ERROR: 'NETWORK_ERROR',

  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_ROOT_LOADING: 'SET_ROOT_LOADING',

  CALLING: 'CALLING',
  CALLED: 'CALLED',

  LOADING: 'LOADING',
  LOADED: 'LOADED',

  ALERT: 'ALERT',
  CLOSE_ALERT: 'CLOSE_ALERT',
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',

  MODAL: 'MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  UPDATE_MODAL: 'UPDATE_MODAL',

  NOT_FOUND_SET: 'NOT_FOUND_SET',
  NOT_FOUND_REMOVE: 'NOT_FOUND_REMOVE',

  HEADER_TITLE_SET: 'HEADER_TITLE_SET',
  HEADER_BACK_SET: 'HEADER_BACK_SET',
  HEADER_BACK_CLICK: 'HEADER_BACK_CLICK',
  HEADER_RIGHT_SET: 'HEADER_RIGHT_SET',
  HEADER_RIGHT_REMOVE: 'HEADER_RIGHT_REMOVE',
  HEADER_LEFT_SET: 'HEADER_LEFT_SET',
  HEADER_LEFT_REMOVE: 'HEADER_LEFT_REMOVE',
  HEADER_HIDE: 'HEADER_HIDE',
  HEADER_SHOW: 'HEADER_SHOW',

  IP_INFO: 'IP_INFO',

  BAN_CASH: 'BAN_CASH',
  BAN_PREDICTION: 'BAN_PREDICTION',
  BAN_CHECKED: 'BAN_CHECKED',

  SET_FIREBASE_USER: 'SET_FIREBASE_USER',
  UPDATE_APP_STATE: 'UPDATE_APP_STATE'
};

export default APP_ACTION;
