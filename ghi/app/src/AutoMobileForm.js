import React, { useEffect, useState } from "react";


export default function AutomobileForm(){
    const [models, setModels] = useState([]);
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {}

        data.color = color
        data.year = year
        data.vin = vin
        data.model_id = model

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(automobileUrl, fetchConfig)
        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }
    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    }
    const handleYearChange = (event) => {
        const value = event.target.value
        setYear(value)
    }
    const handleVinChange = (event) => {
        const value = event.target.value
        setVin(value)
    }
    const handleModelChange = (event) => {
        const value = event.target.value
        setModel(value)
    }
    const fetchData = async () => {
        const response = await fetch("http://localhost:8100/api/models/")
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }
    useEffect( () => {
        fetchData()
    }, [])

    return (
    <>
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Add an Automobile Into Inventory </h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Vehicle Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control" maxLength="4"></input>
                <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleVinChange} value={vin} placeholder="Vehicle Vin" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">Vin</label>
                </div>
                <div className="mb-3">
                <select onChange={handleModelChange} value={model} required name="models" id="models" className="form-select">
                    <option value="">Choose a Model</option>
                    {models.map(model => {
                            return (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                            );
                        })}
                </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
        </div>
    </>
    )

}
