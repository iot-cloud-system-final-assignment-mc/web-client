import React, { useEffect, useState } from 'react';

import { DashboardLayout } from '../components/Layout';
import { BaseTable } from '../components/baseTable';

import { OrdersApi } from '../api/orders';
// import { useHistory } from "react-router-dom";


const OrdersPage = () => {
    const [values, setValues] = useState([]);
    // const history = useHistory();
    const columns = ["order_id", "product_id", "username", "quantity", "total_price", "status", "updated_at"];

    useEffect(() => {
        OrdersApi.getOrders().then(response => {
            //console.log(response);
            const data = response.map((order) => {
                return {
                    order_id: {
                        value: order.order_id,
                        url: `/order/${order.order_id}`
                    },
                    product_id: {
                        value: order.product_id
                    },
                    username: {
                        value: order.username
                    },
                    quantity: {
                        value: order.quantity
                    },
                    total_price: {
                        value: order.total_price
                    },
                    status: {
                        value: order.status
                    },
                    updated_at: {
                        value: order.updated_at
                    },
                    buttons: []
                };
            });
            setValues(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <DashboardLayout>
            <h1 style={{textAlign: "center"}}>Orders</h1>
            <BaseTable columns={columns} values={values} buttons={false}/><br/>
            {/* <div><button onClick={() => history.push("/order/add")}>Add</button></div> */}
        </DashboardLayout>
    )
}

export default OrdersPage;