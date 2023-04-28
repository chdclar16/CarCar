import React, { useState } from 'react';

function ManufacturerForm () {
    const [name, setName] = useState('');
    const [hasManufacturer, setManufacturer] = useState(false);

    const nameChange = (event) => {
        const valueName = event.target.value;
        setName(valueName);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;


        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(manufacturerUrl, fetchConfig)
        if (response.ok) {
            await response.json();

            setName('');
            setManufacturer(true);

        }
    }

    if (hasManufacturer) {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="alert alert-success mb-0" id="success-message">
                        New manufacturer successfully added
                        <div>
                            <button className="btn btn-primary" onClick={() => setManufacturer(false)}>
                                Add another Manufacturer
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
                <h1>Create a Manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input required onChange={nameChange} placeholder="name" type="text" name="name" id="name" className="form-control" value={name}/>
                    <label htmlFor="name">Manufacturer Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
    }

export default ManufacturerForm;
