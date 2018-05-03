import request from '../../common/request'
import {id} from '../../common/request'
import validator from '../validator'
import Response from '../../common/response'
import code from "../../common/code"

/**
 * @description Get user's balance and token allowance info.
 * @param host
 * @param contractVersion
 * @param owner
 * @returns {Promise.<*>}
 */
export function getBalance(host, {delegateAddress, owner}) {
  try {
    validator.validate({value: delegateAddress, type: 'Address'});
    validator.validate({value: owner, type: 'Address'})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  let body = {};
  body.method = 'loopring_getBalance';
  body.params = [{delegateAddress, owner}];
  body.id = id();
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Notify the relay the unlocked wallet info.
 * @param  host
 * @param owner
 * @returns {Promise}
 */
export function register(host, {owner}) {
  try {
    validator.validate({value: owner, type: 'Address'})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  let body = {};
  body.method = 'loopring_unlockWallet';
  body.params = [{owner}];
  body.id = id();
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Wallet should notify relay there was a transaction sending to eth network,
 * then relay will get and save the pending transaction immediately.
 * @param host
 * @param txHash
 * @param rawTx
 * @param from
 * @returns {Promise.<*>}
 */
export function notifyTransactionSubmitted(host, {txHash, rawTx, from}) {
  try {
    validator.validate({value: from, type: "ADDRESS"});
    validator.validate({value: rawTx, type: "TX"});
    validator.validate({value: txHash, type: "TX_HASH"});
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const {nonce, to, value, gasPrice, gasLimit, data} = rawTx;
  const body = {};
  body.method = 'loopring_notifyTransactionSubmitted';
  body.params = [{hash: txHash, nonce, to, value, gasPrice, gas: gasLimit, input: data, from,}];
  body.id = id();
  return request(host, {
    method: 'post',
    body
  })
}

/**
 * @description Get user's  transactions by given filter.
 * @param host
 * @param owner
 * @param status
 * @param txHash
 * @param pageIndex
 * @param pageSize
 * @returns {Promise.<*>}
 */
export function getTransactions(host, {owner, status, txHash, pageIndex, pageSize}) {
  status = status || 'pending';
  try {
    validator.validate({value: owner, type: "ADDRESS"});
    validator.validate({value: status, type: "RPC_TAG"});
    if (txHash) {
      validator.validate({value: txHash, type: "HASH"});
    }
    if (pageIndex) {
      validator.validate({value: pageIndex, type: 'OPTION_NUMBER'})
    }
    if (pageSize) {
      validator.validate({value: pageSize, type: 'OPTION_NUMBER'})
    }
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getTransactions';
  body.params = [{owner, status, txHash, pageIndex, pageSize}];
  body.id = id();
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Get the total frozen amount of all unfinished orders
 * @param host
 * @param owner
 * @param token
 * @returns {Promise}
 */
export function getEstimatedAllocatedAllowance(host,{owner, token}) {
  try {
    validator.validate({value: owner, type: "ADDRESS"})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getEstimatedAllocatedAllowance';
  body.params = [{owner, token}];
  body.id = id();
  return request(host,{
    method: 'post',
    body,
  })
}

/**
 * @description Get the total frozen LRC fee amount of all unfinished orders
 * @param host
 * @param owner
 * @returns {Promise}
 */
export function getFrozenLrcFee(host,{owner}) {
  try {
    validator.validate({value: owner, type: "ADDRESS"})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getFrozenLRCFee';
  body.params = [{owner}];
  body.id = id();
  return request(host,{
    method: 'post',
    body,
  })
}

/**
 * @description get Ether Token (WETH) balance of given owner, contract Address:0x2956356cD2a2bf3202F771F50D3D14A367b48070
 * @param host
 * @param owner
 * @returns {Promise.<*>}
 */
export function getOldWethBalance(host,{owner}) {
  try {
    validator.validate({value: owner, type: "ADDRESS"})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getOldVersionWethBalance';
  body.params = [{owner}];
  body.id = id();
  return request(host,{
    method: 'post',
    body,
  })
}

/**
 * @description Get user's portfolio info.
 * @param host
 * @param owner
 * @returns {*}
 */
export function getPortfolio(host,{owner}) {
  try {
    validator.validate({value: owner, type: "ADDRESS"})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getPortfolio';
  body.params = [{owner}];
  body.id = id();
  return request(host,{
    method: 'post',
    body,
  })
}
