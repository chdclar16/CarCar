# CarCar

Team:

* Stephen Zhu - Service
* Chad Manuel - Sales

## Design
![Design](project-beta-Diagram.png)

## Running the Project

### Requirements:

* Docker
* Google Chrome or any browser

### Installation
1. Fork Project by clicking Fork on top right of project(Login Required)
2. Press Clone to grab URL from Forked project page then open up a terminal and run the git clone command.
```
git clone "URL HERE"
```
3. Once the clone finishes, navigate to the correct directory by running this command in your terminal.
```
cd project-beta
```
4. While the terminal and run the following commands(Ensure Docker is running)
```
    1. docker volume create beta-data
    2. docker-compose build
    3. docker-compose up
```
5. There should be 7 containers that are running(The containers should be green)
6. Open up Chrome(Browser) and type in `http://localhost:3000/` in the address bar.
## API Routes
<details>
<summary>Salespeople API</summary>

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List salespeople | GET | `http://localhost:8090/api/salespeople/` |
| Create a salespeople | POST | `http://localhost:8090/api/salespeople/` |
| Delete a salespeople | DELETE | `http://localhost:8090/api/salespeople/:id` |

</details>
<details>
<summary>Customer API</summary>

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Customers | GET | `http://localhost:8090/api/customers/` |
| Create a Customer | POST | `http://localhost:8090/api/customers/` |
| Delete a Customer | DELETE | `http://localhost:8090/api/customers/:id` |

</details>

<details>
<summary>Technician API</summary>

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Technicians | GET | `http://localhost:8090/api/technicians/` |
| Create a Technician | POST | `http://localhost:8090/api/Technicians/` |
| Delete a Technician | DELETE | `http://localhost:8090/api/Technicians/:id` |

</details>

<details>
<summary>Appointments API</summary>

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Appointments | GET | `http://localhost:8090/api/Appointments/` |
| Create an Appointment | POST | `http://localhost:8090/api/Appointments/` |
| Delete an Appointment | DELETE | `http://localhost:8090/api/Appointments/:id` |
| Set Appointment to canceled | PUT | `http://localhost:8090/api/Appointments/:id/cancel` |
| Set Appointment to finished | PUT | `http://localhost:8090/api/Appointments/:id/finish` |

</details>

## Inventory Microservice

## Service Microservice

The service microservice is made up of the following three models: AutomobileVO, Technician, and Appointment.

The `AutomobileVO` model has the properties of `import_href`, `color`, `year`, and `vin`.  This value object is used to represent the `Automobile model` in the **inventory microservice** by way of polling; because data is pulled from the **inventory microservice** to be used to update or create the value object for use.

The `Technician` model has the properties of `first_name`, `last_name`, and `employee_id`.  This model is used to create and store all data related to the technician(s).

The `Appointment` model has the properties of `date`, `time`, `service_reason`, `vin`, `customer`, `vip`, `status`, and `technician`.  This model is used to create and store data for all appointments made.  The date, time, service_reason, and customer fields are used to fill I basic information of appointment.  The vin is used to to keep track of the vehicle vin while also being used in conjunction with the vip property to check whether a vehicle is in the inventory and does it get **vip treatment**.  The technician Foreignkey  so that when the appointment is made there is a technician employee chosen as there can’t be an appointment if there’s no one designated to check the vehicle.

Extra Note:
The `status` property is set to **default** on `“Created”` when an appointment is made so that it can be kept track of alongside with the options to change to `“Finished”` or `“Canceled”`.

The `vip` property is **default** set to `“False”` because there are cases where the vehicle designated for the appointment was not from the dealership inventory.

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Technicians | GET | `http://localhost:8080/api/technicians/` |
| Create a Technician | POST | `http://localhost:8080/api/technicians/` |
| Delete a Technician | DELETE | `http://localhost:8080/api/technicians/:id` |

<details>
<summary>GET: Listing of technicians</summary>

Returns:
```
  {
	"technicians": [
		{
			"id": 1,
			"first_name": "James",
			"last_name": "Dun",
			"employee_id": "AC773L"
		}
	]
}
```
</details>

<details>
<summary>POST: Creating new technician</summary>

```
  {
	"first_name": "James",
	"last_name": "Dun",
	"employee_id": "AC773L"
}
```
Returns:
```
    {
	"id": 1,
	"first_name": "James",
	"last_name": "Dun",
	"employee_id": "AC773L"
}
```
</details>

<details>
<summary>DELETE: Deleting a technician by id, not employee_id</summary>

Returns:
```
  {
	"message": "Technician successfully deleted"
}
```
</details>

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Appointments | GET | `http://localhost:8080/api/appointments/` |
| Create an Appointment | POST | `http://localhost:8080/api/appointments/` |
| Delete an Appointment | DELETE | `http://localhost:8080/api/appointments/:id` |
| Set Appointment to canceled | PUT | `http://localhost:8080/api/Appointments/:id/cancel` |
| Set Appointment to finished | PUT | `http://localhost:8080/api/Appointments/:id/finish` |

<details>
<summary>GET: List of appointments</summary>

Returns:
```
  {
	"appointments": [
		{
			"id": 11,
			"customer": "Gabriel M",
			"date": "12-30-2023",
			"time": "11:00:00",
			"service_reason": "Check Engine Light",
			"vin": "7D345DFKL",
			"vip": false,
			"status": "Created",
			"technician": {
				"id": 1,
				"first_name": "James",
				"last_name": "Dun",
				"employee_id": "AC773L"
			},
		}
	]
}
```
</details>

<details>
<summary>POST: Creating a new appointment | Note: the status will show false unless a Automobile is created in the inventory first</summary>

```
  {
	"customer": "Gabriel M",
	"date": "12-30-2023",
	"time": "11:00:00",
	"service_reason": "Check Engine Light",
	"vin": "7D345DFKL",
	"technician": 1
}
```
Returns:
```
    {
	"id": 11,
	"customer": "Gabriel M",
	"date": "12-30-2023",
	"time": "11:00:00",
	"service_reason": "Check Engine Light",
	"vin": "7D345DFKL",
	"vip": false,
	"status": "Created",
	"technician": {
		"id": 1,
		"first_name": "James",
		"last_name": "Dun",
		"employee_id": "AC773L"
	},
}
```
</details>

<details>
<summary>DELETE: Deleting a appointment</summary>

Returns:
```
  {
	"message": "Appointment successfully deleted"
}
```
</details>

<summary>PUT: Updating status of appointment</summary>

Returns:
```
  {
	"id": 11,
	"customer": "Gabriel M",
	"date": "12-30-2023",
	"time": "11:00:00",
	"service_reason": "Check Engine Light",
	"vin": "7D345DFKL",
	"vip": false,
	"status": "Finished",
	"technician": {
		"id": 1,
		"first_name": "James",
		"last_name": "Dun",
		"employee_id": "AC773L"
	},
}
```
</details>
## Sales Microservice

Explain your models and integration with the inventory
microservice, here.
