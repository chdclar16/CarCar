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

Explain your models and integration with the inventory
microservice, here.

## Sales Microservice

Explain your models and integration with the inventory
microservice, here.
