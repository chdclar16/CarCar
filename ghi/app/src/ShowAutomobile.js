import React, { useEffect, useState } from 'react';

const AutomobileListing = () => {
    const [automobile, setAutomobile] = useState([]);


const fetchData = async () => {
    const autoUrl = 'http://localhost:8100/api/automobiles/'
    try {
        const response = await fetch(autoUrl);
        if (response.ok) {
            const data = await response.json();
            setAutomobile(data.autos)
        }
    } catch (e) {
        console.error(e)
    }
    }
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            {automobile && automobile.length ? (
            <div className="table-responsive">
            <table className="table table-striped" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobile.map((auto) => (
                <tr key={auto.id }>
                    <td>{ auto.vin }</td>
                    <td>{ auto.color }</td>
                    <td>{ auto.year }</td>
                    <td>{ auto.model.name }</td>
                    <td>{ auto.model.manufacturer.name }</td>
                    <td>{ auto.sold ? 'Yes' : 'No'}</td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        ) : (
            <p>Inventory is empty...</p>
        )}
        </>
        )};

export default AutomobileListing;
