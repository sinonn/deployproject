import {useEffect, useState} from 'react';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import {toast} from 'react-toastify';

import {Card, Typography} from '@material-tailwind/react';
import Button from '@mui/material/Button';

import axios from 'axios';
import {VITE_BACKEND_URL} from '../../App';
import MyForm from 'react-bootstrap/Form';
import AdminDashboard from './AdminDashboard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Borrowedbooks({userType}) {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   const style = {
  //     position: 'absolute',
  //     top: '50%',
  //     left: '50%',
  //     transform: 'translate(-50%, -50%)',
  //     width: 400,
  //     bgcolor: 'background.paper',
  //     border: '2px solid #000',
  //     boxShadow: 24,
  //     p: 4,
  //   };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '../../';
  };

  // const [id, setId] = useState("");

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

  // add book
  const handleSubmit = async (e) => {
    if (userType == 'admin') {
      e.preventDefault();
      alert('You are not Admin');
    } else {
      e.preventDefault();
      await fetch(`${VITE_BACKEND_URL}/api/add-book`, {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'Admin-added');
          if (data.status == 'ok') {
            toast.success('Add book successfully');
            setTimeout(() => {
              window.location.href = '/admin/books';
            }, 2000);

            getAllBooks();
          } else {
            toast.error('Something went wrong');
          }
        });
    }
  };
  //end add book

  //get all books

  useEffect(() => {
    getAllBooks();
  }, []);

  //fetching all user
  const getAllBooks = async () => {
    await fetch(`${VITE_BACKEND_URL}/api/getAllBorrowedBooks`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'bookData');
        setData(data.data);
      });
  };

  //end get all books

  //edit modal
  const [smShow, setSmShow] = useState(false);
  //  const handleCloseedit = () => setShowedit(false);

  //end edit modal

  //deleting book
  const deleteborrowedBook = async (id, bookname, status) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/delete-borrowedbook/${id}`);
      const toastMessage =
        status === 'canceled'
          ? `Delete canceled book "${bookname}" successfully`
          : `Delete book "${bookname}" successfully`;
      toast.success(toastMessage);
      getAllBooks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //end deleting book

  //get single borrowed book
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    status: '',
    id: '',
  });

  const getSingleborrowedBook = async (id, status) => {
    // alert(status)

    setIsLoading(true);
    try {
      await axios.get(
        `${VITE_BACKEND_URL}/api/get-singleborrowedbook/${(id, status)}`
      );
      setStatus({
        status: status,
        id: id,
      });
      getSingleborrowedBook();
      setIsLoading(false);

      if (data.status == 'ok') {
        toast.success('get borrowed book successfully');
        setTimeout(() => {
          window.location.href = '/admin/borrowedbooks';
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleborrowedBook();
  }, []);

  //end single borrowed book

  //update borrowed book
  const updateBorrowedBook = async (e) => {
    if (userType == 'admin') {
      e.preventDefault();
      alert('You are not Admin');
    } else {
      e.preventDefault();
      const id = e.target[0].value;
      const status = e.target[1].value;

      await fetch(`${VITE_BACKEND_URL}/api/updateborrowedbook/${id}`, {
        method: 'PUT',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'Update-book');
          if (data.status == 'ok') {
            toast.success('Update borrowed book successfully');
            setTimeout(() => {
              window.location.href = '/admin/borrowedbooks';
            }, 2000);
            // getAllBooks();
          } else {
            toast.error('Something went wrong');
          }
        });
    }
  };

  //end update borrowed book

  return (
    <div className=" flex h-screen w-full overflow-hidden">
      <AdminDashboard />

      <Card className="h-full p-4 bg-blue-gray-50  w-full overflow-scroll ">
        <table className="w-full shadowbook bg-white   table-auto text-center">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className=" font-extrabold ] leading-none opacity-70"
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
              <th className="border-b border-blue-gray-100  bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Days borrowed
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
                  Reference Code
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70"
                >
                  Status
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-extrabold leading-none opacity-70 text-center"
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
                      className="font-normal w-[100px] "
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
                      className="font-medium"
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
                      className="font-medium"
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
                  <td className="p-2">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {i.status === 'pending' ? (
                        <Badge className="py-2 px-3  text-black" bg="warning">
                          Pending
                        </Badge>
                      ) : i.status === 'approved' ? (
                        <Badge className="py-2 px-3 " bg="success">
                          Approved
                        </Badge>
                      ) : (
                        <Badge className="py-2 px-3 " bg="danger">
                          Canceled
                        </Badge>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4 w-full h-full flex items-center  justify-center  ">
                    {i.status !== 'canceled' ? (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            getSingleborrowedBook(i._id, i.status);
                            setSmShow(true);
                          }}
                          color="primary"
                          className="m-1"
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            deleteborrowedBook(i._id, i.bookname, i.status)
                          }
                          color="error"
                          className="m-1"
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <DeleteOutlineIcon
                        onClick={() =>
                          deleteborrowedBook(i._id, i.bookname, i.status)
                        }
                        className="mt-2"
                        style={{
                          cursor: 'pointer',
                          width: '70px',
                          height: '30px',
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* modal edit */}
      <Modal
        size="sm"
        show={smShow}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h5>Edit Borrowed Book</h5>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateBorrowedBook}>
          <Modal.Body className="min-h-[100px]  max-h-[auto] flex items-center ">
            <input
              type="text"
              style={{display: 'none'}}
              name="id"
              onChange={(e) => setStatus({...status, name: e.target.value})}
              value={status.id}
            />
            <MyForm.Select
              name="status"
              value={status.status}
              onChange={(e) => setStatus({...status, name: e.target.value})}
              aria-label="Default select example"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </MyForm.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="small"
              variant="contained"
              style={{backgroundColor: '#eeeeee', color: 'black'}}
              onClick={() => setSmShow(false)}
              className="m-1"
            >
              Close
            </Button>

            <Button
              size="small"
              variant="contained"
              type="submit"
              color="primary"
              className="m-1"
            >
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/*end modal edit */}
    </div>
  );
}
