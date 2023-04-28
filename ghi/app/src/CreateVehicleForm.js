import React, { useEffect, useState } from 'react'


export default function CreateVehicle() {
    const [manufacturers, setManufacturers] = useState([])
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const [photo, setPhoto] = useState('')

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


    return (
    <>
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a Vehicle Model </h1>
            <form onSubmit={handleSubmit} id="create-vehicle-form">
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
            </div>
        </div>
        </div>
    </>
    )
}
