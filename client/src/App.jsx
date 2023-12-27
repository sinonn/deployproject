import {BrowserRouter as Routers} from 'react-router-dom';
import Navbarlink from './Navbarlink';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <Routers basename="/">
      <Navbarlink />
      <ToastContainer />
    </Routers>
  );
}

export default App;
