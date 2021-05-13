
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Components/Navbar';
import Nav from './Components/Nav';
import EmployeeList from './pages/EmployeeList';
function App() {
  return (
   
    <BrowserRouter>
    
   <Navbar/>
<Nav/>
<div className="container mt-2">
   <Switch>
      <Route exact path="/employees" component={EmployeeList}/>
    </Switch>
    </div>
   </BrowserRouter>
  );
}

export default App;
