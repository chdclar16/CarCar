import React, { useEffect, useState } from 'react';

const AppointmentList = () => {
    const [appointment, setAppointment] = useState([]);

const finishAppointment= async (pk) => {
    const finishUrl = `http://localhost:8080/api/appointments/${pk}/finish`
    const response = fetch(finishUrl, {method: 'PUT'})
    if (response.ok) {
        await response.json();
}}

const cancelAppointment= async (pk) => {
    const cancelUrl = `http://localhost:8080/api/appointments/${pk}/cancel`
    const response = fetch(cancelUrl, {method: 'PUT'})
    if (response.ok) {
        await response.json();
}}

const fetchData = async () => {
    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    try {
        const response = await fetch(appointmentUrl);
        if (response.ok) {
            const data = await response.json();
            setAppointment(data.appointments);
        }
    } catch (e) {
        console.error(e)
    }
}
useEffect (() => {
    fetchData()
}, []);

return (
    <>
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
            </tr>
        </thead>
        <tbody>
            {appointment.map((appointment, index) => {
                if (appointment.status !== "Canceled" && appointment.status !== "Finished") {
                return (
                    <tr key={index} list={appointment.pk}>
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer }</td>
                        <td>{ appointment.date }</td>
                        <td>{ appointment.time }</td>
                        <td>{ appointment.technician.first_name } { appointment.technician.last_name } ({ appointment.technician.employee_id })</td>
                        <td>{ appointment.service_reason }</td>
                        <td>{ appointment.vip ? 'Yes' : 'No' }</td>
                        <td><button onClick={() => cancelAppointment(appointment.id)}>Canceled</button></td>
                        <td><button onClick={() => finishAppointment(appointment.id)}>Finished</button></td>
                    </tr>
                )
                } else {
                    return null;
                }
            })}
        </tbody>
    </table>
    </>
)
}


export default AppointmentList;
