var Bitcore_ = {
  divi: require('divicore-lib'),
  // btc: require('divicore-lib'),
  // bch: require('bitcore-lib-cash')
};

var _ = require('lodash');

function AddressTranslator() {
};


AddressTranslator.getAddressCoin = function(address) {
  try {
    new Bitcore_['divi'].Address(address);
    return 'divi';
  } 
  // catch (e) {
  //   try {
  //     new Bitcore_['bch'].Address(address);
  //     return 'bch';
  //   } catch (e) {
  //     try {
  //       new Bitcore_['btc'].Address(address);
  //       return 'btc';
  //     } 
  catch (e) {
        return;
      }
    // }
  // }
};

AddressTranslator.translate = function(addresses, coin, origCoin) {
  var wasArray = true;
  if (!_.isArray(addresses)) {
    wasArray = false;
    addresses = [addresses];
  }
  origCoin = origCoin || AddressTranslator.getAddressCoin(addresses[0]);
  var ret =  _.map(addresses, function(x) {
    var orig = new Bitcore_[origCoin].Address(x).toObject();
    return Bitcore_[coin].Address.fromObject(orig).toString();
  });

  if (wasArray) 
    return ret;
  else 
    return ret[0];

};

AddressTranslator.translateInput = function(addresses) {
  return addresses;
}

AddressTranslator.translateOutput = function(addresses) {
  return addresses;
}




module.exports = AddressTranslator;
