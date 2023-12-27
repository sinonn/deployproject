import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import {VITE_BACKEND_URL} from '../../App';
import StudentDashboard from './StudentDashboard';
import {Card, Typography} from '@material-tailwind/react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Booklist() {
  const [userData, setUserData] = useState('');
  const [student, setStudent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '../../';
  };

  //convert to base64 format
  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  //end convert to base64 format

  //get all books

  useEffect(() => {
    getAllBooks();
  }, []);

  //fetching all user
  const getAllBooks = async () => {
    await fetch(`${VITE_BACKEND_URL}/api/getAllBooks`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'bookData');
        setData(data.data);
      });
  };

  //end get all books

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

        if (data.data == 'token expired') {
          alert('Token expired login again');
          window.localStorage.clear();
          window.location.href = '../';
        }
      });
  }, []);

  //reference code below

  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  //end reference code below

  ///console.log(makeid(5));

  const [bookname, setBookname] = useState('');
  const [ISBNNumber, setISBNNumber] = useState('');
  const [authorname, setAuthorname] = useState('');
  const [publishername, setPublishername] = useState('');
  const [publisheddate, setPublisheddate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [daysborrow, setDaysborrow] = useState('');
  const [studentName, setStudentname] = useState('');
  const [studentid, setStudentId] = useState({});
  const [referenceCode, setReferencecode] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleDaysBorrowChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 2) {
      toast.warning('Maximum allowed length is 2 digits');
    } else {
      setDaysborrow(inputValue);
    }
  };

  //add borrow book
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookname = e.target[0].value;
    console.log('=======bookname=======');
    console.log(bookname);

    const ISBNNumber = e.target[1].value;
    console.log('=======ISBNNumber=======');
    console.log(ISBNNumber);

    const authorname = e.target[2].value;
    console.log('=======authorname=======');
    console.log(authorname);

    const publishername = e.target[3].value;
    console.log('=======publishername=======');
    console.log(publishername);

    const publisheddate = e.target[4].value;
    console.log('=======publisheddate=======');
    console.log(publisheddate);

    const quantity = e.target[5].value;
    console.log('=======quantity=======');
    console.log(quantity);

    const daysborrow = e.target[6].value;
    console.log('=======daysborrow=======');
    console.log(daysborrow);

    const studentName = e.target[7].value;
    console.log('=======studentName=======');
    console.log(studentName);

    const studentid = e.target[8].value;
    console.log('=======studentid=======');
    console.log(studentid);

    const referenceCode = e.target[9].value;
    console.log('=======referenceCode=======');
    console.log(referenceCode);
    if (!daysborrow) {
      toast.warning('Please enter the number of days you want to borrow.');
      return;
    }
    // Convert daysborrow to integer
    const daysToBorrow = parseInt(daysborrow, 10);
    if (daysToBorrow > 14) {
      toast.warning('Maximum borrow limit is 14 days.');
      return;
    }

    e.preventDefault();
    await fetch(`${VITE_BACKEND_URL}/api/add-borrowbook`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        bookname,
        ISBNNumber,
        authorname,
        publishername,
        publisheddate,
        quantity,
        daysborrow,
        studentName,
        studentid,
        referenceCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          toast.success('Add borrow book successfully');
          setTimeout(() => {
            window.location.href = '/student/booklists?';
          }, 2000);

          const updatedData = data.data.map((item) => {
            if (item.ISBNNumber === ISBNNumber) {
              return {...item, quantity: item.quantity - 1};
            }
            return item;
          });
          setData(updatedData);

          getAllBooks();
        } else if (data.status === 'error') {
          if (data.message === 'Book out of stock') {
            toast.warning('Book out of stock. Cannot borrow.');
          } else {
            toast.error('Something went wrong');
          }
        }
      })
      .catch((error) => {
        console.error(error);
        // toast.error('Error occurred while processing your request');
      });
  };

  // Filtered data based on search term
  const filteredData = data.filter((item) => {
    const booknameLower = item.bookname.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return booknameLower.includes(searchTermLower);
  });

  //end add borrow book
  return (
    <div className=" flex h-screen w-full overflow-hidden">
      <StudentDashboard />

      <Card className="h-full p-5 bg-blue-gray-50  w-full overflow-scroll">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="w-full  pl-3 py-2 text-lg text-black  mr-0 mt-3 mb-3   bg-transparent border-2  border-gray-400  focus:outline-none"
            placeholder="Search Books Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <SearchIcon
            style={{fontSize: '2.5rem'}}
            className="hover:cursor-pointer"
          /> */}
        </div>
        <table className="w-full bg-white shadowbook table-auto text-center">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Image
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Book Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  ISBN Number
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Author Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Publisher Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Published Date
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Quantity
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70 text-center"
                >
                  Choose borrowing duration
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((i) => {
              return (
                <tr key={i.ISBNNumber} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.image == '' || i.image == null ? (
                        <img
                          width={150}
                          height={150}
                          src="https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
                          alt="default image"
                          //   style={{width: '60', height: '60'}}
                          className="img-size"
                        />
                      ) : (
                        <img
                          width={80}
                          height={80}
                          src={i.image}
                          onClick={() => handleImageClick(i.image)}
                        />
                      )}
                      <Modal
                        open={isModalOpen}
                        onClose={closeModal}
                        aria-labelledby="book-cover-modal"
                        aria-describedby="book-cover-modal-description"
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'white',
                            boxShadow: 24,
                            p: 4,
                            width: '400px',
                            height: '500px',
                          }}
                        >
                          {selectedImage && (
                            <img
                              src={selectedImage}
                              alt="selected book cover"
                              style={{width: '100%', height: '100%'}}
                            />
                          )}
                        </Box>
                      </Modal>
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-md"
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
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
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
                      <Form
                        onSubmit={handleSubmit}
                        className="flex justify-center"
                      >
                        <input
                          type="hidden"
                          name="bookname"
                          onChange={(e) =>
                            setBookname({
                              bookname,
                              name: e.target.value,
                            })
                          }
                          value={i.bookname}
                        />
                        <input
                          type="hidden"
                          name="ISBNNumber"
                          onChange={(e) =>
                            setISBNNumber({
                              ISBNNumber,
                              name: e.target.value,
                            })
                          }
                          value={i.ISBNNumber}
                        />
                        <input
                          type="hidden"
                          name="authorname"
                          onChange={(e) =>
                            setAuthorname({
                              authorname,
                              name: e.target.value,
                            })
                          }
                          value={i.authorname}
                        />
                        <input
                          type="hidden"
                          name="publishername"
                          onChange={(e) =>
                            setPublishername({
                              publishername,
                              name: e.target.value,
                            })
                          }
                          value={i.publishername}
                        />
                        <input
                          type="hidden"
                          name="publisheddate"
                          onChange={(e) =>
                            setPublisheddate({
                              publisheddate,
                              name: e.target.value,
                            })
                          }
                          value={i.publisheddate}
                        />
                        <input
                          type="hidden"
                          name="quantity"
                          onChange={(e) =>
                            setQuantity({
                              quantity,
                              name: e.target.value,
                            })
                          }
                          value={i.quantity}
                        />

                        <input
                          type="number"
                          name="daysborrow"
                          onChange={(e) => {
                            setDaysborrow(e.target.value);
                            handleDaysBorrowChange(e);
                          }}
                          className="w-[50px]  h-[30px] p-3 text-center  border-2 m-1 border-gray-600 quantity"
                          min={1}
                          defaultValue={0}
                          max={99}
                          maxLength={2}
                        />

                        {/* Days to Borrroww */}

                        <input
                          type="hidden"
                          name="studentName"
                          onChange={(e) =>
                            setStudentname({
                              studentName,
                              name: e.target.value,
                            })
                          }
                          value={userData.name}
                        />
                        <input
                          type="hidden"
                          name="studentid"
                          onChange={(e) =>
                            setStudentId({
                              studentid,
                              name: e.target.value,
                            })
                          }
                          value={userData._id}
                        />
                        <input
                          type="hidden"
                          name="referenceCode"
                          onChange={(e) =>
                            setReferencecode({
                              referenceCode,
                              name: e.target.value,
                            })
                          }
                          value={makeid(8)}
                        />

                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          type="submit"
                          className="m-1"
                        >
                          Borrow
                        </Button>
                      </Form>
                    </Typography>
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
