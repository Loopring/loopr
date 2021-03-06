import React, { Component } from 'react';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import model from './EthTxModel'
const namespace =  model.namespace
let keys = Object.keys(model.reducers)
keys = keys.map(key=>key.replace(`${namespace}/`,''))
const actionCreators = window.REDUX.getActionCreators(namespace,keys);

@connect(
  ({ethTxs})=>({ethTxs})
)
export default class Container extends React.Component {
  render() {
    const { children,dispatch,ethTxs,id,...rest} = this.props
    let data = ethTxs[id] || {}
    const actions = bindActionCreators(actionCreators,dispatch)
    const childProps = {
      ...rest,
      ethTx:{
        ...data,
        ...actions,
      }
    }
    return (
      <div>
        {
          React.Children.map(this.props.children, child => {
              return React.cloneElement(child, {...childProps})
          })
        }
      </div>
    )
  }
}
