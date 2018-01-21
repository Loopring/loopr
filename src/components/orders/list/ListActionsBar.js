import React from 'react';
import ListFiltersForm from './ListFiltersForm'
import {Button,Modal} from 'antd'

export default function ListActionsBar({actions={},LIST={}}){
  const cancelAllOrders = ()=>{
    Modal.confirm({
        title: 'Do you Want to cancel all orders?',
        content: 'Some descriptions',
        onOk:()=>{
          // TODO
          // actions.cancelAll()
        },
        onCancel:()=>{},
        okText:'Yes',
        cancelText:'No',
    })
  }
  return (
    <div>
        <div className="row">
            <div className="col-auto">
                <ListFiltersForm actions={actions} LIST={LIST} />
            </div>
            <div className="col">

            </div>
            <div className="col-auto">
                <Button type="primary" onClick={cancelAllOrders}>Cancel All</Button>
            </div>
        </div>
    </div>
  )
}

