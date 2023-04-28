import React, { useState } from "react";


export default function CustomerForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hasCustomer, setHasCustomer] = useState(false);
    const [invalidCustomer, setInvalidCustomer] = useState(false);

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }


    async function handleSubmit(event) {
        event.preventDefault();
        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await fetch('http://localhost:8090/api/customers/', fetchConfig)
        if (response.ok) {
            await response.json();
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
            setHasCustomer(true);
        } else if (response.status !== 200) {
            setInvalidCustomer(true);
        }
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    let anotherForm = 'btn btn-primary d-none';
    let messageFailedClasses = 'alert alert-danger d-none mb-0';
    if (hasCustomer) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none'
        anotherForm = 'btn btn-primary';
    } else if (invalidCustomer) {
        messageFailedClasses ='alert alert-danger mb-0';
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Customer</h1>
                        <form onSubmit={handleSubmit} className={formClasses} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFirstNameChange} value={firstName} required type="text" name="firstname" id="firstname" className="form-control" />
                                <label htmlFor="firstname">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleLastNameChange} value={lastName} required type="text" name="lastname" id="lastname" className="form-control" />
                                <label htmlFor="lastname">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleAddressChange} value={address} required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePhoneNumberChange} value={phoneNumber} required type="number" name="phonenumber" id="phonenumber" className="form-control" maxLength="10" min="0"/>
                                <label htmlFor="phonenumber">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                            Successfully Create A New Customer!
                            <button type="button" className={anotherForm} onClick={() => {setHasCustomer(false);setInvalidCustomer(false)}}>Click here to create another customer</button>
                        </div>
                        <div className={messageFailedClasses} id="unsuccessful-message">
                            Unsuccessful creating a new model! Double Check inputs
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
