import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './CreateManufacturerForm';
import VehicleList from './VehicleModelList';
import CreateVehicleForm from './CreateVehicleForm';
import AutomobileForm from './AutoMobileForm';
import AutomobileListing from './ShowAutomobile';
import SalesPersonForm from './SalesPersonForm';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import SalesPeopleList from './SalesPeopleList';
import CustomerForm from './CreateCustomerForm';
import CustomerList from './CustomerList';
import NewSaleForm from './NewSaleForm';
import SalesList from './SalesList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import SalesPersonHistory from './SalespersonHistory';
import ServiceHistory from './ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="model" >
            <Route path="" element={<VehicleList />} />
            <Route path="new" element={<CreateVehicleForm />} />
          </Route>
          <Route path="inventory">
            <Route path="" element={<AutomobileListing />} />
            <Route path='new' element={<AutomobileForm />} />
          </Route>
          <Route path="salesperson" >
            <Route path='' element={<SalesPeopleList />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="technicians" >
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
            </Route>
          <Route path="appointments" >
            <Route path ="" element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory />} />
            </Route>
          <Route path="customers" >
            <Route path='' element={<CustomerList />} />
            <Route path='new' element={<CustomerForm />} />
          </Route>
          <Route path='sales'>
            <Route path='new' element={<NewSaleForm />} />
            <Route path='' element={<SalesList />} />
            <Route path='history' element={<SalesPersonHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
