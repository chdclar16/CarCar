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
                    <th scope="col">Vin</th>
                    <th scope="col">Color</th>
                    <th scope="col">Year</th>
                    <th scope="col">Model</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Sold</th>
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
                    <td>{ auto.sold }</td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        ) : (
            <p>Loading inventory...</p>
        )}
        </>
        )};

export default AutomobileListing;
