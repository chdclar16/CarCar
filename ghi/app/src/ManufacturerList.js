import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ManufacturerListing = (props) => {
    const [manufacturer, setManufacturer] = useState([])

const deleteManufacturer = async (pk) => {
    const manufacturerUrl = `http://localhost:8100/api/manufacturers/${pk}/`
    const response = fetch(manufacturerUrl, {method: 'DELETE'})
    if (response.ok) {
        const data = (await response).json();
}}

const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturer(data.manufacturers)
            }
        } catch (e) {
            console.error(e)
        }
};

    useEffect(() => {
        fetchData();
    }, []);

        return (
            <>
                <table className="tabel table-striped">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturer.map(manufacturer => {
                            return (
                                <tr>
                                    <td>{ manufacturer.name }</td>
                                    <td><button onClick={() => deleteManufacturer(manufacturer.pk)}/>Delete</td>
                                </tr>
                            )
                            })}
                    </tbody>
                </table>
            </>
        )
    }



export default ManufacturerListing;