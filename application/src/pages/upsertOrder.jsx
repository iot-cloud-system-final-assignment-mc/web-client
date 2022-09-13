import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { OrdersApi } from '../api/orders';
import authUtils from "../utils/authUtils";

import { DashboardLayout } from '../components/Layout';

const UpsertOrderPage = (props) => {
    const [order_id, setOrderId] = useState("");
    const [username, setUsername] = useState(authUtils.getIdTokenPayload()["cognito:username"]);
    const [product_name, setProductName] = useState("");
    const [product_id, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [total_price, setTotalPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState("pending");
    const history = useHistory();
    const location = useLocation();
    const paylod = authUtils.getIdTokenPayload();
    const isAdmin = paylod['cognito:groups'] && paylod['cognito:groups'].includes('SystemAdmins'); 

    useEffect(() => {
        if (props.mode === "edit") {
            if (location.state === undefined) history.push("/orders");
            else {
                setOrderId(location.state.order_id.value);
                setUsername(location.state.username.value);
                setQuantity(location.state.quantity.value);
                setProductId(location.state.product_id.value);
                setStatus(location.state.status.value);
                setTotalPrice(location.state.total_price.value);
            }
        } else {
            setProductId(location.state.product_id);
            setTotalPrice(location.state.price);
        }
        setProductName(location.state.name);
        setPrice(location.state.price);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "quantity" && value >= 1) {
            setQuantity(value);
            setTotalPrice(value * price);
        } else if (name === "status") {
            setStatus(value);
        }
    }

    const handleSave = () => {
        const order = {
            username,
            product_id,
            quantity,
            status
        };

        if (order_id) order.order_id = order_id;

        OrdersApi.upsertOrder(order).then(response => {
            console.log(response);
            history.push("/orders");
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <DashboardLayout>
            <h1 style={{ textAlign: "center" }}>{props.mode === "add" ? "Add a new order" : "Edit a order"}</h1>
            <div><input type="hidden" name="order_id" value={order_id} /></div>
            <div style={{ textAlign: "center" }}><label>Product:</label><br /><input type="text" readOnly name="product-id" value={product_id} style={{ textAlign: "center" }} /></div><br />
            <div style={{ textAlign: "center" }}><label>Quantity</label><br /><input readOnly={props.mode === "edit" && status !== "pending"} type="number" name="quantity" value={quantity} onChange={handleChange} style={{ textAlign: "center" }} /></div><br />
            <div style={{ textAlign: "center" }}><label>Total Price</label><br /><input type="number" readOnly name="total-price" value={total_price} style={{ textAlign: "center" }} /></div><br />
            <div style={{ textAlign: "center" }}><label>Status</label><br />
                {
                    isAdmin ?
                        (
                            <select readOnly={props.mode === "edit"} name="status" value={status} onChange={handleChange} style={{ textAlign: "center" }}>
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        ) :
                        (<p>{status}</p>)
                }</div><br />
            <div style={{ textAlign: "center" }}><button onClick={handleSave}>Save</button></div>

        </DashboardLayout>
    )
}

export default UpsertOrderPage;