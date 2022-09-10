import React, { useEffect, useState } from 'react';

import { DashboardLayout } from '../components/Layout';
import { BaseTable } from '../components/baseTable';

import { ProductsApi } from '../api/products';
import { useHistory } from "react-router-dom";

const ProductsPage = () => {
    const [values, setValues] = useState([]);
    const history = useHistory();
    const columns = ["product_id", "name", "price", "updated_at"];

    useEffect(() => {
        ProductsApi.getProducts().then(response => {
            //console.log(response);
            const data = response.map((product) => {
                return {
                    product_id: {
                        value: product.product_id,
                        url: `/product/${product.product_id}`
                    },
                    name: {
                        value: product.name
                    },
                    price: {
                        value: product.price
                    },
                    updated_at: {
                        value: product.updated_at
                    },
                    buttons: [
                        {
                            "icon": "plus",
                            "onClick": "actionOne",
                            "args": {product_id: product.product_id, name: product.name, price: product.price}
                        }
                    ]
                };
            });
            setValues(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    
    const handleAdd = (args) => {
        history.push("/order/add", args);
    }

    return (
        <DashboardLayout>
            <h1 style={{textAlign: "center"}}>Products</h1>
            <BaseTable columns={columns} values={values} actionOne={handleAdd} buttons={true}/><br/>
            <div style={{textAlign: "center"}}><button onClick={() => history.push("/product/add")}>Add</button></div>
        </DashboardLayout>
    )
}

export default ProductsPage;