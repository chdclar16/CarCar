import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import VehicleList from './VehicleModelList';
import ManufacturerForm from './CreateManufacturerForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="/manufacturers/new" element={<ManufacturerForm manufacturers={props.manufacturers} />} />
          <Route path="inventory" element={<VehicleList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
