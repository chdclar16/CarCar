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
import SalesPeopleList from './SalesPeopleList';
import CustomerForm from './CreateCustomerForm';
import CustomerList from './CustomerList';
import NewSaleForm from './NewSaleForm';
import SalesList from './SalesList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="model" >
            <Route path="" element={<VehicleList />} />
            <Route path="new" element={<CreateVehicleForm />} />
          </Route>
          <Route path="/automobile" element={<AutomobileListing />} />
          <Route path="inventory/create" element={<AutomobileForm />} />
          <Route path="salesperson" >
            <Route path='' element={<SalesPeopleList />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers" >
            <Route path='' element={<CustomerList />} />
            <Route path='new' element={<CustomerForm />} />
          </Route>
          <Route path='sales'>
            <Route path='new' element={<NewSaleForm />} />
            <Route path='' element={<SalesList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
