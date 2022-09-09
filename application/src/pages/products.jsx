import React, { useEffect, useState } from 'react';

import { DashboardLayout } from '../components/Layout';
import { BaseTable } from '../components/baseTable';

import { ProductsApi } from '../api/products';
import { useHistory, useLocation } from "react-router-dom";

const columns = ["product_id", "name", "price"];

const ProductsPage = () => {
    const [values, setValues] = useState([]);
    const history = useHistory();

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
                    }
                };
            });
            setValues(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <DashboardLayout>
            <h1>Products</h1>
            <BaseTable columns={columns} values={values} />
            <div><button onClick={() => history.push("/product/add")}>Add</button></div>
        </DashboardLayout>
    )
}

export default ProductsPage;