import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';

interface PayPalButtonInterface {
    totalValue: string,
    invoice: string
}

export const PayPalButton : React.FC<PayPalButtonInterface> = ({invoice, totalValue}) => {
    return (
        <PayPalButtons 
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: invoice,
                            amount: {
                                value: totalValue,
                            }
                        }
                    ]
                })
            }}

            onApprove={async (data, actions) => {
                const order = await actions.order?.capture();
                console.log("order", order)
            }}
        />
    )
}
