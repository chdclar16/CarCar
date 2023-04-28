import React, { useEffect, useState } from 'react';


const TechnicianList = () => {
    const [technician, setTechnician] = useState([]);

const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnician(data.technicians)
        }
    } catch (e) {
        console.error(e)
    }
}

useEffect(() => {
    fetchData();
}, []);

return (
    <>
    <table className="table table-striped" style={{ width: "100%" }}>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
            {technician.map((technician, index) => {
                return (
                    <tr key={index} list={technician.pk}>
                        <td>{ technician.employee_id }</td>
                        <td>{ technician.first_name }</td>
                        <td>{ technician.last_name }</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </>
)
}

export default TechnicianList;
