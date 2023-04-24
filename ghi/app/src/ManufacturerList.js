import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManufacturerList(props) {
    const [manufacturer, setManufacturer] = useState

    const deleteManufacturer = async (pk) => {
        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${pk}/`
        const response = fetch(manufacturerUrl, {method: 'DELETE'})
        if (response.ok) {
            const data = (await response).json();
        }
    }

    return (
        <>
            <table className="tabel table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {props.manufacturers.map(manufacturer => {
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

export default ManufacturerList;
