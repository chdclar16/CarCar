import React, { useState, useEffect } from 'react'

export default function SalesPersonHistory() {
    const [salesPersons, setSalesPersons] = useState([]);
    const [sales, setSales] = useState([]);
    const [salePerson, setSalePerson] = useState('')

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalePerson(value);
    }

    const fetchData = async () => {
        const salesPeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
        const saleResponse = await fetch('http://localhost:8090/api/sales/');
        if (salesPeopleResponse.ok && saleResponse.ok) {
            const salesPersondata = await salesPeopleResponse.json();
            const saleData = await saleResponse.json();
            setSalesPersons(salesPersondata.salespeople);
            setSales(saleData.Sales)
        }
    };

    useEffect( () => {
        fetchData();
    }, [salePerson])

    let filteredSales = sales;
    if (salePerson) {
        filteredSales = sales.filter((sale) => sale.salesperson.id === parseInt(salePerson))
    }

    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Salesperson History</h1>
                <select onChange={handleSalesPersonChange} value={salePerson} required name='salesperson' id='salesperson' className='form-select'>
                    <option value=''>Choose A Sales Person</option>
                    {salesPersons.map(salesperson => {
                        const fullSalesPersonName = `${salesperson.first_name} ${salesperson.last_name}`
                        return (
                            <option key={salesperson.id} value={salesperson.id}>
                                {fullSalesPersonName}
                            </option>
                        )
                    })}
                </select>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale) => {
                            const fullSalesName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`
                            const fullCustomerName = `${sale.customer.first_name} ${sale.customer.last_name}`
                            return (
                                <tr key={sale.id}>
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
