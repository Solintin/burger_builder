import React, { Component } from 'react'

import OrderedBurger from '../../Components/Order/OrderedBurger'
export class Order extends Component {
    render() {
        return (
            <div>
                
                <OrderedBurger />
                <OrderedBurger />
            </div>
        )
    }
}

export default Order



