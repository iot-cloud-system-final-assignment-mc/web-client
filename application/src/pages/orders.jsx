import React, { useEffect, useState } from 'react';

import { DashboardLayout } from '../components/Layout';
import { BaseTable } from '../components/baseTable';

import { OrdersApi } from '../api/orders';
import authUtils from '../utils/authUtils';
// import { useHistory } from "react-router-dom";


const OrdersPage = () => {
    const [values, setValues] = useState([]);
    // const history = useHistory();
    const columns = ["order_id", "product_id", "username", "quantity", "total_price", "status", "updated_at"];
    const paylod = authUtils.getIdTokenPayload();
    const isAdmin = paylod['cognito:groups'] && paylod['cognito:groups'].includes('SystemAdmins'); 

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        OrdersApi.getOrders().then(response => {
            //console.log(response);
            const data = response.map((order) => {
                const buttons = [];
                if (order.status !== "cancelled" && order.status !== "delivered") {
                    if (isAdmin) {
                        if (order.status === "pending")
                            buttons.push(
                                {
                                    "icon": "send",
                                    "onClick": "actionOne",
                                    "args": { ...order, status: 'shipped' }
                                }
                            );
                        if (order.status === "shipped")
                            buttons.push(
                                {
                                    "icon": "check",
                                    "onClick": "actionTwo",
                                    "args": { ...order, status: 'delivered' }
                                }
                            );
                    }
                    buttons.push(
                        {
                            "icon": "trash",
                            "onClick": "actionThree",
                            "args": { ...order, status: 'cancelled' }
                        }
                    );
                } else {
                    buttons.push(
                        {
                            "icon": "plus",
                            "onClick": "actionFour",
                            "args": { ...order, status: 'pending' }
                        }
                    );
                }
                return {
                    order_id: {
                        value: order.order_id,
                        url: order.status === "pending" ? `/order/${order.order_id}` : null
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
                    buttons: buttons
                };
            });
            setValues(data);
        }).catch(error => {
            console.log(error);
        });
    };

    const cloneOrder = (args) => {
        delete args.order_id;
        OrdersApi.upsertOrder(args).then(response => {
            getOrders();
        }).catch(error => {
            console.log(error);
        });
    };

    const setShipped = (args) => {
        OrdersApi.upsertOrder(args).then(response => {
            getOrders();
        }).catch(error => {
            console.log(error);
        });
    };

    const setDelivered = (args) => {
        OrdersApi.upsertOrder(args).then(response => {
            getOrders();
        }).catch(error => {
            console.log(error);
        });
    };

    const setCancelled = (args) => {
        OrdersApi.upsertOrder(args).then(response => {
            getOrders();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <DashboardLayout>
            <h1 style={{ textAlign: "center" }}>Orders</h1>
            <BaseTable columns={columns} values={values} buttons={true} actionOne={setShipped} actionTwo={setDelivered} actionThree={setCancelled} actionFour={cloneOrder} /><br />
            {/* <div><button onClick={() => history.push("/order/add")}>Add</button></div> */}
        </DashboardLayout>
    )
}

export default OrdersPage;