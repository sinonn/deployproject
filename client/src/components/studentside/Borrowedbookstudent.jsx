import {useEffect, useState} from 'react';

import {VITE_BACKEND_URL} from '../../App';
import Badge from 'react-bootstrap/esm/Badge';
import axios from 'axios';
import StudentDashboard from './StudentDashboard';

import {Card, Typography} from '@material-tailwind/react';
import Button from '@mui/material/Button';

export default function Borrowedbookstudent() {
  const [data, setData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(''); // Add this line
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '../../';
  };

  //get all books
  //const [isLoading, setIsLoading] = useState(false);
  //fetching all books
  // const getAllBooks = async () => {
  //   const studentid = "6531779949714d336c9f1271";
  //   await fetch(`${VITE_BACKEND_URL}/api/getStudentonlyBorrowedBooks/${studentid}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "==========bookData==========");
  //       console.log(data);
  //       setData(data.data);

  //     });
  // };

  const [userData, setUserData] = useState('');
  const [student, setStudent] = useState(false);
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
        if (data.data.userType == 'student') {
          setStudent(true);
        }

        setUserData(data.data);
        setLoggedInUserId(data.data._id); // Add this line
      });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  function getId() {
    var values = '6531779949714d336c9f1271';
    return values;
  }
  const getAllBooks = async () => {
    try {
      const id = getId();
      setIsLoading(true);
      const response = await axios.get(
        `${VITE_BACKEND_URL}/api/borrowedbooklists/${id}`
      );
      setIsLoading(false);
      if (response.data.success) {
        setData(response.data.data);
      }
      console.log('================response==============');
      console.log(response);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  //end get all books

  // useEffect(() => {
  //   const studentid = "6531779949714d336c9f1271";
  //   axios.get(`${VITE_BACKEND_URL}/api/getStudentonlyBorrowedBooks/${studentid}`)
  //     .then((res) => {
  //       setUserForm({
  //         name: res.data.data.name,
  //         email: res.data.data.email,
  //         rollno: res.data.data.rollno,
  //       });
  //     });
  // }, []);
  const handleCancelBooking = async (referenceCode, bookedByUserId) => {
    try {
      const loggedInUserId = userData._id;

      // Check if the logged-in user is the one who booked the book
      if (loggedInUserId !== String(bookedByUserId)) {
        console.log('You are not allowed to cancel this booking.');
        return;
      }

      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/cancel-booking`,
        {
          referenceCode,
        }
      );

      console.log('Cancellation response:', response.data);

      if (response.data.status === 'ok') {
        // Update the state to reflect the cancellation
        setData((prevData) =>
          prevData.filter((item) => item.referenceCode !== referenceCode)
        );
      } else {
        // Handle the case where the cancellation was not successful
        console.error('Cancellation failed');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const handleDeleteCancelledBook = async (bookId) => {
    try {
      const response = await axios.delete(
        `${VITE_BACKEND_URL}/api/deleteCancelledBook/${bookId}`
      );

      console.log('Deletion response:', response.data);

      if (response.data.status === 'ok') {
        // Update the state to reflect the deletion
        setData((prevData) => prevData.filter((item) => item._id !== bookId));
      } else {
        // Handle the case where the deletion was not successful
        console.error('Deletion failed');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className=" flex h-screen w-full overflow-hidden">
      <StudentDashboard />
      <Card className="h-full w-full p-5 bg-blue-gray-50  overflow-scroll">
        <table className="w-full bg-white shadowbook  table-auto text-center">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70 w-[80px]"
                >
                  {' '}
                  Book Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  ISBN Number
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Author Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Publisher Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Published Date
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Quantity
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Days borrowed
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Student Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70"
                >
                  {' '}
                  Reference Code
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70 text-center"
                >
                  Status
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold  leading-none opacity-70 text-center"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, index) => {
              return (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.bookname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.ISBNNumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.authorname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {i.publishername}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {i.publisheddate}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium text-center"
                    >
                      {i.quantity}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium text-center"
                    >
                      {i.daysborrow}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {i.studentName.split(' ')[0]}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {i.referenceCode}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {i.status === 'pending' ? (
                        <Badge className="py-2 px-3 text-black" bg="warning">
                          Pending
                        </Badge>
                      ) : i.status === 'approved' ? (
                        <Badge className="py-2 px-3" bg="success">
                          Approved
                        </Badge>
                      ) : (
                        <>
                          <Badge className="py-2 px-3" bg="danger">
                            Cancelled
                          </Badge>
                        </>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4">
                    {/* <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    > */}
                    {i.status === 'pending' &&
                      loggedInUserId === String(i.borrowed._id) && (
                        <Button
                          size="small"
                          className="m-2"
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleCancelBooking(i.referenceCode, i.borrowed._id)
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    {/* </Typography> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
