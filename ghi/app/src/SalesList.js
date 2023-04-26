import React, { useState, useEffect } from 'react'

export default function SalesList() {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/')
            if (response.ok) {
                const data = await response.json();
                setSales(data.Sales);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect( () => {
        fetchData()
    }, [])

    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Sales</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) =>{
                            const fullSalesName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`
                            const fullCustomerName = `${sale.customer.first_name} ${sale.customer.last_name}`
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.employee_id}</td>
                                    <td>{fullSalesName}</td>
                                    <td>{fullCustomerName}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
