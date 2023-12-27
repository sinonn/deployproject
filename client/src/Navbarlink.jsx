import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import Books from './components/adminside/Books';
import Borrowedbooks from './components/adminside/Borrowedbooks';
import Bookslist from './components/studentside/Bookslist';
import Borrowedbookstudent from './components/studentside/Borrowedbookstudent';
import Login from './components/Login';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      {isUserSignedIn && (
        <Route path="/dashboard/dashboard" element={<Dashboard />} />
      )}
      {isUserSignedIn && <Route path="/admin/books" element={<Books />} />}
      {isUserSignedIn && (
        <Route path="/admin/borrowedbooks" element={<Borrowedbooks />} />
      )}

      {isUserSignedIn && (
        <Route path="/student/booklists" element={<Bookslist />} />
      )}
      {isUserSignedIn && (
        <Route
          path="/student/borrowedbooklists"
          element={<Borrowedbookstudent />}
        />
      )}
    </Routes>
  );
}

export default App;
