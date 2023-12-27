import {useEffect, useState} from 'react';
import AdminHome from '../AdminHome';

import {VITE_BACKEND_URL} from '../../App';
import Booklist from '../studentside/Bookslist';

function Dashboard() {
  const [userData, setUserData] = useState('');
  const [admin, setAdmin] = useState(false);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);
  const [loading, setLoading] = useState(true); //
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/userData`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userData');
        if (data.data.userType == 'admin') {
          setAdmin(true);
        }

        setUserData(data.data);
        setLoading(false);
        if (data.data == 'token expired') {
          alert('Token expired login again');
          window.localStorage.clear();
          window.location.href = '../';
        }
      });

    //     fetch(`${VITE_BACKEND_URL}/api/getBorrowedBooksCount`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data, 'borrowedBooksCount');
    //         setBorrowedBooksCount(data.count);
    //       });
  }, []);

  if (loading) {
    // Render a loader while data is being fetched
    return <div>Loading...</div>;
  }

  return admin ? (
    <AdminHome userData={userData} borrowedBooksCount={borrowedBooksCount} />
  ) : (
    <Booklist userData={userData} borrowedBooksCount={borrowedBooksCount} />
  );
}

export default Dashboard;
