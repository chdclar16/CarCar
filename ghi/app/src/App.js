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

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="inventory" element={<VehicleList />} />
          <Route path="createmodel" element={<CreateVehicleForm />} />
          <Route path="/automobile" element={<AutomobileListing />} />
          <Route path="inventory/create" element={<AutomobileForm />} />
          <Route path="salesperson">
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="technicians" element={<TechnicianList />} />
            <Route path="/technicians/new" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
