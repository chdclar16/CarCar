import React, { useEffect, useState } from 'react';


const ManufacturerListing = () => {
    const [manufacturer, setManufacturer] = useState([])


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
                <table className="table table-striped" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturer.map((manufacturer, index) => {
                            return (
                                <tr key={index} list={manufacturer.pk}>
                                    <td>{ manufacturer.name }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }



export default ManufacturerListing;
