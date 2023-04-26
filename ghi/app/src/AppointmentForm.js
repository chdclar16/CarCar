import React, { useEffect, useState } from 'react';

function AppointmentForm () {
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    const vinChange = (event) => {
        const valueVin = event.target.value;
        setVin(valueVin);
    }

    const dateChange = (event) => {
        const valueDate = event.target.value;
        setDate(valueDate);
    }

    const timeChange = (event) => {
        const valueTime = event.target.value;
        setTime(valueTime);
    }

    const customerChange = (event) => {
        const valueCustomer = event.target.value;
        setCustomer(valueCustomer);
    }

    const reasonChange = (event) => {
        const valueReason = event.target.value;
        setReason(valueReason);
    }

    const technicianChange = (event) => {
        const valueTechnician = event.target.value;
        setTechnician(valueTechnician);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.vin = vin;
        data.customer = customer;
        data.date = date;
        data.time = time;
        data.technician = technician;
        data.service_reason = reason;
        data.status = 1;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(appointmentUrl, fetchConfig)
        if (response.ok) {
            const data = await response.json();

            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setTechnicians([]);
            setReason('');

        }
    }
    const fetchData = async () => {
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
            console.log(data)
        }
    }
    useEffect (() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a service appointment</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                        <input onChange={vinChange} placeholder="Automobile Vin" required type="text" name="vin" id="vin" className="form-control" value={vin}/>
                        <label htmlFor="vin">Automobile Vin</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={customerChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" value={customer}/>
                        <label htmlFor="customer">Customer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={dateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" value={date}/>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={timeChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" value={time}/>
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="mb-3">
                        <select required onChange={technicianChange} id="technician" name="technician" className="form-select" value={technician}>
                            <option value="">Choose a technician</option>
                            {technicians.map(technician => {
                                const technicianName = `${technician.first_name} ${technician.last_name}`;
                                return (
                                    <option key={technician.id} value={technician.id}>
                                        {technicianName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea onChange={reasonChange} placeholder="Reason" required type="text" name="service_reason" id="service_reason" className="form-control" rows="5" value={reason}></textarea>
                        <label htmlFor="starts">Reason</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AppointmentForm;
