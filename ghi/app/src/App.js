import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleList from './VehicleModelList';
import CreateVehicleForm from './CreateVehicleForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory" element={<VehicleList />} />
          <Route path="inventory/newvehicle" element={<CreateVehicleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
