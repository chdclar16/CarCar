import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturers/new">Create a Manufacturer</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="model">Models</NavLink>
          </li>
          <li>
          <NavLink className='nav-link' to="model/new">Create Vehicle Model</NavLink>
          </li>
          <li>
          <NavLink className='nav-link' to="/inventory">Automobiles</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="inventory/new">Add Automobile To Inventory</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="salesperson">Sales People</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="salesperson/new">Create Sales Person</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="/technicians">Technicians</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="/appointments">Service Appointments</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="appointments/new">Create a Service Appointments</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to="technicians/new">Add a Technician</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='customers/new'>Create Customer</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='customers'>Customer List</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='/servicehistory'>Service History</NavLink>
            </li>
          <li>
            <NavLink className='nav-link' to='sales/new'>Add a sale</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='sales'>Sale List</NavLink>
          </li>
          <li>
            <NavLink className='nav-link' to='sales/history'>Salesperson History</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
