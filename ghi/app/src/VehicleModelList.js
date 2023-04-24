import React, { useEffect, useState } from 'react'


export default function VehicleList(){
    const [vehicleModel, setVehicleModel] = useState([])

    const fetchData = async () => {

        try {
            const response = await fetch('http://localhost:8100/api/models/')
            if (response.ok) {
                const data = await response.json();
                setVehicleModel(data.models)
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Vehicle Model</th>
                            <th>Manufacturer</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleModel.map((vehicle) =>{
                            return (
                                <tr key={vehicle.id}>
                                    <td>{vehicle.name}</td>
                                    <td>{vehicle.manufacturer.name}</td>
                                    <td><img src={vehicle.picture_url} className='img-fluid'></img></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
