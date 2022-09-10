import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { ProductsApi } from '../api/products';

import { DashboardLayout } from '../components/Layout';

const UpsertProductPage = (props) => {
    const [product_id, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (props.mode === "edit") {
            if (location.state === undefined) history.push("/products");
            else {
                setProductId(location.state.product_id.value);
                setName(location.state.name.value);
                setPrice(location.state.price.value);
            }
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "product_id") {
            setProductId(value);
        } else if (name === "name") {
            setName(value);
        } else if (name === "price") {
            setPrice(value);
        }
    }

    const handleSave = () => {
        console.log("save");
        const product = {
            name,
            price
        };

        if (product_id) product.product_id = product_id;

        ProductsApi.upsertProduct(product).then(response => {
            console.log(response);
            history.push("/products");
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <DashboardLayout>
            <h1 style={{textAlign: "center"}}>{props.mode === "add" ? "Add a new product" : "Edit a product"}</h1>
            <div style={{textAlign: "center"}}><input type="hidden" name="product_id" value={product_id} /></div><br/>
            <div style={{textAlign: "center"}}><label>Name</label><br/><input type="text" name="name" value={name} onChange={handleChange} style={{textAlign: "center"}}/></div><br/>
            <div style={{textAlign: "center"}}><label>Price</label><br/><input type="text" name="price" value={price} onChange={handleChange} style={{textAlign: "center"}}/></div><br/>
            <div style={{textAlign: "center"}}><button onClick={handleSave}>Save</button></div>

        </DashboardLayout>
    )
}

export default UpsertProductPage;