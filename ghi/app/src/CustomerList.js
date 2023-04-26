import React, { useState, useEffect } from 'react'

export default function CustomerList() {
    const [customers, setCustomer] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/customers/')
            if (response.ok) {
                const data = await response.json();
                setCustomer(data.Customer);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [customers])

    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Customers</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => {
                            return (
                                <tr key="customer">
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
