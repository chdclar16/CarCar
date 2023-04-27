# CarCar

Team:

* Stephen Zhu - Service
* Chad Manuel - Sales

## Design
![Design](project-beta-Diagram.png)

---
## Running the Project

#### Requirements:

* Docker
* Google Chrome or any browser

#### Installation
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
6. Wait until the terminal shows `You can now view app in the browser.`
7. Open up Chrome(Browser) and type in `http://localhost:3000/` in the address bar.
---
## API Routes

#### Salespeople API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List salespeople | GET | `http://localhost:8090/api/salespeople/` |
| Create a salespeople | POST | `http://localhost:8090/api/salespeople/` |
| Delete a salespeople | DELETE | `http://localhost:8090/api/salespeople/:id` |

#### Customer API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Customers | GET | `http://localhost:8090/api/customers/` |
| Create a Customer | POST | `http://localhost:8090/api/customers/` |
| Delete a Customer | DELETE | `http://localhost:8090/api/customers/:id` |

#### Sales API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Sales | GET | `http://localhost:8090/api/sale/` |
| Create a Sale | POST | `http://localhost:8090/api/sale/` |
| Delete a Sale | DELETE | `http://localhost:8090/api/sale/:id` |

#### Technician API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Technicians | GET | `http://localhost:8080/api/technicians/` |
| Create a Technician | POST | `http://localhost:8080/api/Technicians/` |
| Delete a Technician | DELETE | `http://localhost:8080/api/Technicians/:id` |


#### Appointments API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Appointments | GET | `http://localhost:8080/api/Appointments/` |
| Create an Appointment | POST | `http://localhost:8080/api/Appointments/` |
| Delete an Appointment | DELETE | `http://localhost:8080/api/Appointments/:id` |
| Set Appointment to canceled | PUT | `http://localhost:8080/api/Appointments/:id/cancel` |
| Set Appointment to finished | PUT | `http://localhost:8080/api/Appointments/:id/finish` |


#### Manufacturers API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List manufacturers | GET | `http://localhost:8100/api/manufacturers/` |
| Create a manufacturers | POST | `http://localhost:8100/api/manufacturers/` |
| Delete a manufacturers | DELETE | `http://localhost:8100/api/manufacturers/:id` |



#### Models API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List models | GET | `http://localhost:8100/api/models/` |
| Create a models | POST | `http://localhost:8100/api/models/` |
| Delete a models | DELETE | `http://localhost:8100/api/models/:id` |

#### Automobiles API

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List automobiles | GET | `http://localhost:8100/api/automobiles/` |
| Create a automobile | POST | `http://localhost:8100/api/automobiles/` |
| Delete a automobile | DELETE | `http://localhost:8100/api/automobiles/:id` |


---

## Inventory Microservice

#### Manufacturer


---
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


---
## Sales Microservice


#### Sales People
The Salesperson model has two properties:

* "name": Salesperson's name
* "employee_number": Salesperson's unique employee number.

<details>
<summary>Salespeople List</summary>

To get access to the Sales Person list, a **GET** request must be made to `http://localhost:8090/api/salespeople/`

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List salespeople | GET | `http://localhost:8090/api/salespeople/` |



The Json returned should be as follows:
```
{
	"salespeople": [
		{
			"first_name": "Chad",
			"last_name": "Sales",
			"employee_id": "CSales",
			"id": 1
		},
		{
			"first_name": "Shannon",
			"last_name": "Kears",
			"employee_id": "SKears",
			"id": 2
		}
	]
}

```
</details>



<details>
<summary>Create Sales Person</summary>

To create a new sales person, a **POST** request must be made to `http://localhost:8090/api/salespeople/`

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| Create Sales Person| POST | `http://localhost:8090/api/salespeople/` |

The Json body inputted to create a sales person should be as follows:
```
{
	"first_name": "Michelle",
	"last_name": "Jackson",
	"employee_id": "MJackson"
}
```

Once successfully created, the output should be as follows:
```
{
	"salespeople": {
		"first_name": "Michelle",
		"last_name": "Jackson",
		"employee_id": "MJackson",
		"id": 3
	}
}
```
</details>

#### Customers
The Customer model has three properties:

* "first_name": Customer's first name
* "last_name": Customer's last name
* "address": Customer's address
* "phone": Customer's phone number

<details>
<summary>Customer List</summary>

To get access to the Customer list, a **GET** request must be made to `http://localhost:8090/api/customers/`

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List salespeople | GET | `http://localhost:8090/api/customers/` |


The Json returned should be as follows:
```
{
	"Customer": [
		{
			"first_name": "Justin",
			"last_name": "Henry",
			"address": "3990 School Street",
			"phone_number": "209-944-4227",
			"id": 1
		}
	]
}

```
</details>

<details>
<summary>Create Customer</summary>

To create a new customer, a **POST** request must be made to `http://localhost:8090/api/customers/`

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| Create Sales Person| POST | `http://localhost:8090/api/customers/` |

The Json body inputted to create a customer should be as follows:
```
{
	"first_name": "Israel",
	"last_name": "Sellers",
	"address": "3170 Bell Street New York, NY",
	"phone_number": "212-271-2646"
}
```

Once successfully created, the output should be as follows:
```
{
	"Customer": {
		"first_name": "Israel",
		"last_name": "Sellers",
		"address": "3170 Bell Street New York, NY",
		"phone_number": "212-271-2646",
		"id": 2
	}
}
```
</details>

### Sale
The Sale model consolidates the information from other models such as the salesperson, customer, and automobileVO models. Overall, the sale model has four properties:

* "automobile": Vin number of the automobile in the inventory
* "salesperson": Sales person's ID
* "customer": Customer's name
* "price": Price of the vehicle

<details>
<summary>Sale List</summary>

To get access to the Sale list, a **GET** request must be made to `http://localhost:8090/api/sales/`

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List salespeople | GET | `http://localhost:8090/api/sales/` |


The Json returned should be as follows:
```
{
	"Sales": [
		{
			"customer": {
				"first_name": "Gloria",
				"last_name": "Mayo",
				"address": "1567 Weekley Street San Antonio, TX",
				"phone_number": "210-389-3813",
				"id": 1
			},
			"automobile": {
				"vin": "2374678236478e34",
				"id": 1,
				"sold": false
			},
			"salesperson": {
				"first_name": "Louella",
				"last_name": "Sullivan",
				"employee_id": "LSullivan",
				"id": 1
			},
			"price": 132423,
			"id": 1
		},
    ]
}
```
</details>

<details>
<summary>Creating a Sale</summary>

To create a sale, a **POST** request must be made to `http://localhost:8090/api/sales/`

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| Create salespeople | POST | `http://localhost:8090/api/sales/` |


The Json body inputted to create a sale should be as follows:
```
{
  "automobile": "AUTO VIN",
  "salesperson": "Salesperson ID",
  "customer": "customer ID",
  "price": "price"
}
```

Once successfully created, the output should be as follows:
```
{
	"customer": {
		"first_name": "Customer First Name",
		"last_name": "Customer Last Name",
		"address": "4679 Jett lane Santa Ana, CA",
		"phone_number": "310-76-6405",
		"id": 1
	},
	"automobile": {
		"vin": "2374678236478e34",
		"id": 1,
	},
	"salesperson": {
		"first_name": "Sales Person First Name",
		"last_name": "Sales Person Last Name",
		"employee_id": "Sales Person Employee ID",
		"id": 1
	},
	"price": "Price of Automobile",
	"id": 3
}
```

</details>

### AutomobileVO (Value Object)

