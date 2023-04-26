import React, { useState, useEffect } from 'react'


function ServiceHistory () {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(appointments);

    const searchChange = (event) => {
        const valueSearch = event.target.value;
        setSearch(valueSearch);
        event.preventDefault()
    }

    const searchFilter = (event) => {
        event.preventDefault();
        setFiltered(appointments.filter((appointment) => appointment.vin.includes(search)));
    };

    const fetchData = async () => {
        const appointmentUrl = 'http://localhost:8080/api/appointments/';

        try {
            const response = await fetch(appointmentUrl);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect (() => {
        fetchData();
    }, []);

    return (
        <>
            <form onSubmit={searchFilter} >
                <div className="input-group" >
                    <div className="form-outline" style={{ width: "90%" }}>
                        <input onChange={searchChange} id="search" type="search" className="form-control" value={search} />
                        <label htmlFor="search">Search</label>
                    </div>
                    <div>
                        <button id="search-button" type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
                <div>
                <table className="table table-striped" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>VIP</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((appointment, index) => {
                            return (
                                <tr key={index} list={appointment.pk}>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.time }</td>
                                    <td>{`${appointment.technician.first_name} ${appointment.technician.last_name} (${appointment.technician.employee_id})`}</td>
                                    <td>{ appointment.service_reason }</td>
                                    <td>{ appointment.vip ? 'Yes' : 'No' }</td>
                                    <td>{ appointment.status.name }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ServiceHistory;
