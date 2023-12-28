import {useState, useEffect} from 'react';
import {Card, Typography} from '@material-tailwind/react';
import Button from '@mui/material/Button';
import {toast} from 'react-toastify';
import AdminDashboard from './adminside/AdminDashboard';
import {VITE_BACKEND_URL} from '../App';

export default function AdminHome({userData}) {
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(null);
  const [totalStudentsCount, setTotalStudentsCount] = useState(null);
  const [allStudents, setAllStudents] = useState([]);

  const fetchBorrowedBooksCount = async () => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/getBorrowedBooksCount`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const count = data.data;
      console.log('Borrowed Books Count:', data.data);
      // Update your state or perform other actions with the count data
      setBorrowedBooksCount(count);
    } catch (error) {
      console.error('Error fetching borrowed books count:', error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/delete-user/${userId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      toast.success('User deleted successfully');

      // Update the state or perform other actions as needed
      // For example, you can fetch the updated user list after deletion
      fetchAllStudents();
      fetchStudentCount();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const fetchTotalBooksCount = async () => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/getTotalBooksCount`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const count = data.data;

      // Update the state with the fetched count
      setTotalBooksCount(count);
    } catch (error) {
      console.error('Error fetching total books count:', error.message);
    }
  };

  const fetchStudentCount = async () => {
    fetch(`${VITE_BACKEND_URL}/api/getTotalStudentsCount`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setTotalStudentsCount(data.data);
        } else {
          console.error('Error fetching total students count:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching total students count:', error);
      });
  };

  const fetchAllStudents = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/getAllStudents`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === 'ok') {
        setAllStudents(data.data);
      } else {
        console.error('Error fetching all students:', data.error);
      }
    } catch (error) {
      console.error('Error fetching all students:', error.message);
    }
  };

  useEffect(() => {
    fetchBorrowedBooksCount();
    fetchTotalBooksCount();
    fetchStudentCount();
    fetchAllStudents();
  }, []);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '../../';
  };

  return (
    // h-[calc(100vh-2rem)]
    <>
      <div className={'flex bg-blue-gray-50 '}>
        <AdminDashboard />
        <div className=" w-full p-5 ">
          <div>
            <div className="flex justify-between">
              <div className="shadowbook bg-white w-[600px] h-[200px] flex items-center justify-center">
                {/* <AdminPanelSettingsIcon style={{fontSize: '100px'}} /> */}
                <div className="person"></div>
                <p className="text-3xl mt-4 ml-3">Welcome! {userData.name}</p>
              </div>
              <div className="shadowbook bg-white w-[600px] h-[200px]  flex items-center justify-center ">
                <div className="stackbooks"></div>
                <p className="text-3xl mt-1 ml-5">
                  Total Books: {totalBooksCount}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-5 ">
              <div className="shadowbook bg-white w-[600px] h-[200px] flex items-center justify-center">
                <div className="borrowed"></div>
                <p className="text-3xl mt-4 ml-3">
                  Borrowed Books: {borrowedBooksCount}
                </p>
              </div>
              <div className="shadowbook bg-white w-[600px] h-[200px] flex items-center justify-center">
                <div className="student"></div>
                <p className="text-3xl mt-4 ml-3">
                  Total Students:{' '}
                  {totalStudentsCount ? totalStudentsCount - 1 : 'Loading...'}
                </p>
              </div>
            </div>

            {/* Display */}
            <Card className="h-full w-full mt-5 shadowbook overflow-hidden">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Student ID
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Student Name
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Course
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Year & Section
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Email
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Created At
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold leading-none opacity-70"
                      >
                        Action
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allStudents.map(
                    (student) =>
                      // Check if the student's name is not 'admin' before displaying
                      student.name.toLowerCase() !== 'admin' && (
                        <tr
                          key={student._id}
                          className="even:bg-blue-gray-50/50"
                        >
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {student.studentid}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {student.name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {student.course.toUpperCase()}
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
                              {student.yearandsection}
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
                              {student.email}
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
                              {new Date(student.createdAt).toLocaleDateString()}
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
                              <Button
                                size="small"
                                onClick={() => deleteUser(student._id)}
                                variant="contained"
                                color="error"
                              >
                                Delete
                              </Button>
                            </Typography>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
