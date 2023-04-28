import React, { useEffect, useState } from 'react'


export default function CreateVehicle() {
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [photo, setPhoto] = useState('');
    const [madeModel, setMadeModel] = useState(false);
    const [failedModel, setFailedModel] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault()
        const data = {}

        data.name = model
        data.picture_url = photo
        data.manufacturer_id = manufacturer

        const modelUrl = "http://localhost:8100/api/models/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            header: {
                'Content-type':'application/json'
            },
        }
        const response = await fetch(modelUrl, fetchConfig)
        if (response.ok){
            await response.json()
            setManufacturer('');
            setModel('');
            setPhoto('');
            setManufacturer('');
            setMadeModel(true);
        } else if (response.status !== 200) {
            setFailedModel(true);
        }
    }

    const handleModelChange = (event) => {
        const value = event.target.value
        setModel(value)
    }
    const handlePhotoChange =  (event) => {
        const value = event.target.value
        setPhoto(value)
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
            if (response.ok){
                const data = await response.json()
                setManufacturers(data.manufacturers)
            }
    }

    useEffect( () => {
        fetchData()
    }, [])

    let messageClasses = 'alert alert-success d-none mb-0'
    let formClasses = '';
    let messageFailedClasses = 'alert alert-danger d-none mb-0'
    let anotherForm = 'btn btn-primary d-none'
    if (madeModel) {
        messageClasses = 'alert alert-success mb-0'
        formClasses = 'd-none'
        anotherForm = 'btn btn-primary'
    } else if (failedModel) {
        messageFailedClasses = 'alert alert-danger mb-0'
    }

    return (
    <>
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a Vehicle Model </h1>
            <form onSubmit={handleSubmit} className={formClasses} id="create-vehicle-form">
                <div className="form-floating mb-3">
                <input onChange={handleModelChange} value={model} placeholder="Vehicle Model" required type="text" name="model" id="model" className="form-control" />
                <label htmlFor="model">Vehicle Name</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handlePhotoChange} value={photo} placeholder="Photo" required type="url" name="photo" id="photo" className="form-control"></input>
                <label htmlFor="photo">Picture Url</label>
                </div>
                <div className="mb-3">
                <select onChange={handleManufacturerChange} value={manufacturer} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                    <option value="">Choose a Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                            return (
                            <option key={manufacturer.href} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                            );
                        })}
                </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Successfully Created A New Model!
            </div>
            <button type="button" className={anotherForm} onClick={() => setMadeModel(false)}>Click here for another Model</button>
            <div className={messageFailedClasses} id="unsuccessful-message">
                Unsuccessful creating a new model! Double Check inputs
            </div>
            </div>
        </div>
        </div>
    </>
    )
}
