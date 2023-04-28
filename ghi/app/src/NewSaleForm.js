import React, { useEffect, useState } from 'react';


export default function NewSaleForm(){
    const [autoVins, setVins] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');
    const [vin, setVin] = useState('');
    const [salesPerson, setSalesPerson] = useState('');
    const [customer, setCustomer] = useState('');
    const [hasSale, setHasSale] = useState(false);
    const [failedSale, setFailedSale] = useState(false);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value)
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value)
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value)
    }

    const fetchAllData = async () => {
        const autoResponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            setVins(data.autos)
        }

        const salesResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salesResponse.ok) {
            const data = await salesResponse.json();
            setSalesPersons(data.salespeople)
        }

        const customersResponse = await fetch('http://localhost:8090/api/customers/');
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.Customer)
        }
    }

    useEffect (() => {
        fetchAllData()
    }, [])

    const handleSubmit = async(event) => {
        event.preventDefault()
        const data = {}

        data.automobile = vin
        data.salesperson = salesPerson
        data.customer = customer
        data.price = price


        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response  = await fetch('http://localhost:8090/api/sales/', fetchConfig)
        if (response.ok) {
            const data = await response.json();
            const deleteUrl = `http://localhost:8100/api/automobiles/${data.automobile.vin}`
            const fetchDeleteConfig = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const deleteResponse = await fetch(deleteUrl, fetchDeleteConfig);
            if (deleteResponse.ok) {
                setPrice('');
                setSalesPerson('');
                setCustomer('');
                setVin('');
                setHasSale(true);
            }
        } else if (response.status !== 200) {
            setFailedSale(true);
        }
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    let messageFailedClasses = 'alert alert-danger d-none mb-0'
    let anotherForm = 'btn btn-primary d-none'
    if (hasSale) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none'
        anotherForm = 'btn btn-primary'
    } else if (failedSale) {
        messageFailedClasses = 'alert alert-danger mb-0'
    }

    return (
        <>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Record a new sale</h1>
                        <form onSubmit={handleSubmit} className={formClasses} id="record-sale-form">
                            <div className='form-floating mb-3'>
                                <select onChange={handleVinChange} value={vin} id="vin-select" name='vin-select' className='form-select' required>
                                    <option value=''>Choose an automobile VIN</option>
                                    {autoVins.filter(auto => (!auto.sold)).map(auto => {
                                        return (
                                            <option key={auto.id} value={auto.vin}>
                                                {auto.vin}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-floating mb-3'>
                                <select onChange={handleSalesPersonChange} value={salesPerson} id="salesperson" name='salesperson' className='form-select' required>
                                    <option value=''>Choose a sales person</option>
                                    {salesPersons.map(sales => {
                                        const fullName = `${sales.first_name} ${sales.last_name}`
                                        return (
                                            <option key={sales.id} value={sales.employee_id}>
                                                {fullName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-floating mb-3'>
                                <select onChange={handleCustomerChange} value={customer} id="customer" name='customer' className='form-select' required>
                                    <option value=''>Choose a customer</option>
                                    {customers.map(customer => {
                                        const fullName = `${customer.first_name} ${customer.last_name}`
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {fullName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePriceChange} value={price} placeholder="price" required type="number" name="price" id="price" className="form-control" maxLength="8"/>
                                <label htmlFor="model">Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                        Successfully Created A New Sale!
                        <div>
                        <button type="button" className={anotherForm} onClick={() => {setHasSale(false);setFailedSale(false)}}>Click here for another sale</button>
                        </div>
                        </div>
                        <div className={messageFailedClasses} id="unsuccessful-message">
                        Unsuccessful creating a new sale, price is too high! Must be under 999,999,999
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
