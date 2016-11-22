var QBApp = {
  appId: 49438,
  authKey: 'Tq3NUcBPzPLV74F',
  authSecret: 'FQ5zcAqSN4mWBp5'
};

var config = {
  chatProtocol: {
    active: 2
  },
  debug: {
    mode: 1,
    file: null
  },
  stickerpipe: {
    elId: 'stickers_btn',

    apiKey: '847b82c49db21ecec88c510e377b452c',

    enableEmojiTab: false,
    enableHistoryTab: true,
    enableStoreTab: false,

    userId: null
  }
};

var QBUser1 = {
        id: 6729114,
        name: 'Adrian',
        login: 'AdrianBZG',
        pass: 'Adadad12'
    },
    QBUser2 = {
        id: 6729119,
        name: 'bloxuser',
        login: 'chatusr22',
        pass: 'chatusr22'
    };

QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, config);
