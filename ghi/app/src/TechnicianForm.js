import React, { useState } from 'react';

function TechnicianForm () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [hasTechnician, setHasTechnician] = useState(false);

    const firstNChange = (event) => {
        const valueFirst = event.target.value;
        setFirstName(valueFirst);
    }

    const lastNChange = (event) => {
        const valueLast = event.target.value;
        setLastName(valueLast);
    }

    const employeeChange = (event) => {
        const valueEmployee= event.target.value;
        setEmployeeId(valueEmployee);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(technicianUrl, fetchConfig)
        if (response.ok) {
            await response.json();

            setFirstName('');
            setLastName('');
            setEmployeeId('');
            setHasTechnician(true);

        }
    }

    if (hasTechnician) {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="alert alert-success mb-0" id="success-message">
                        New technician successfully added
                        <div>
                            <button className="btn btn-primary" onClick={() => setHasTechnician(false)}>
                                Add another Technician
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Technician</h1>
                <form onSubmit={handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input required onChange={firstNChange} placeholder="first_name" type="text" id="first_name" className="form-control" value={firstName}/>
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required onChange={lastNChange} placeholder="last_name" type="text" id="last_name" className="form-control" value={lastName}/>
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required onChange={employeeChange} placeholder="employee_id" type="text" id="employee_id" className="form-control" value={employeeId}/>
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <div>
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
    }

export default TechnicianForm;
