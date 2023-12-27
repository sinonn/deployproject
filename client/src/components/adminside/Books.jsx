import {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify';
import {Card, Typography} from '@material-tailwind/react';

import Button from '@mui/material/Button';

import axios from 'axios';
import {VITE_BACKEND_URL} from '../../App';
import AdminDashboard from './AdminDashboard';

export default function Books({userType}) {
  const [data, setData] = useState([]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '../../';
  };

  const [bookname, setBookname] = useState('');
  const [booknumbercode, setBooknumbercode] = useState('');
  const [ISBNNumber, setISBNNumber] = useState('');
  const [authorname, setAuthorname] = useState('');
  const [publishername, setPublishername] = useState('');
  const [publisheddate, setPublisheddate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

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
      //   console.log(bookname, booknumbercode, ISBNNumber, authorname, publishername, publisheddate, quantity);
      await fetch(`${VITE_BACKEND_URL}/api/add-book`, {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          bookname,
          booknumbercode,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity,
          base64: image,
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

  //add modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //end add modal

  //edit modal
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);
  //end edit modal

  //deleting book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/delete-book/${id}`);
      toast.success('Delete a book successfully');
      getAllBooks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //end deleting book

  //get single book
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    bookname: '',
    booknumbercode: '',
    ISBNNumber: '',
    authorname: '',
    publishername: '',
    publisheddate: '',
    quantity: '',
    id: '',
  });

  const getSinglBook = async (
    id,
    bookname,
    booknumbercode,
    ISBNNumber,
    authorname,
    publishername,
    publisheddate,
    quantity
  ) => {
    setIsLoading(true);
    try {
      await axios.get(
        `${VITE_BACKEND_URL}/api/get-singlebook/${
          (id,
          bookname,
          booknumbercode,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity)
        }`
      );
      setBook({
        bookname: bookname,
        booknumbercode: booknumbercode,
        ISBNNumber: ISBNNumber,
        authorname: authorname,
        publishername: publishername,
        publisheddate: publisheddate,
        quantity: quantity,
        id: id,
        // image: response.data.image,
      });
      getSinglBook();
      setIsLoading(false);

      if (data.status == 'ok') {
        toast.success('get book successfully');
        setTimeout(() => {
          window.location.href = '/admin/books';
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSinglBook();
  }, []);

  //end single book

  const updateBook = async (e) => {
    if (userType == 'admin') {
      e.preventDefault();
      alert('You are not Admin');
    } else {
      e.preventDefault();
      const id = e.target[0].value;
      const bookname = e.target[1].value;
      const booknumbercode = e.target[2].value;
      const ISBNNumber = e.target[3].value;
      const authorname = e.target[4].value;
      const publishername = e.target[5].value;
      const publisheddate = e.target[6].value;
      const quantity = e.target[7].value;

      await fetch(`${VITE_BACKEND_URL}/api/updatebook/${id}`, {
        method: 'PUT',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          bookname,
          booknumbercode,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'Update-book');
          if (data.status == 'ok') {
            toast.success('Update book successfully');
            setTimeout(() => {
              window.location.href = '/admin/books';
            }, 2000);
            // getAllBooks();
          } else {
            toast.error('Something went wrong');
          }
        });
    }
  };

  //end update book

  return (
    <div className="bg-blue-gray-50 flex h-screen overflow-hideen">
      <AdminDashboard />
      <Card className="h-full p-5 w-full bg-blue-gray-50  overflow-scroll">
        <table className="w-full shadowbook bg-white  table-auto text-center">
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
                  Book Number
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
                  className="font-extrabold leading-none opacity-70 text-center "
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
                  <td className="p-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.image == '' || i.image == null ? (
                        <img
                          width={80}
                          height={80}
                          src="https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
                          alt="default image"
                          style={{width: '60', height: '60'}}
                        />
                      ) : (
                        <img width={80} height={80} src={i.image} />
                      )}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.bookname}
                    </Typography>
                  </td>
                  <td className="p-4 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {i.booknumbercode}
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
                  <td className="p-4 flex mt-4">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      className="m-2 "
                      onClick={() => {
                        getSinglBook(
                          i._id,
                          i.bookname,
                          i.booknumbercode,
                          i.ISBNNumber,
                          i.authorname,
                          i.publishername,
                          i.publisheddate,
                          i.quantity
                        );
                        handleShowedit();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => deleteBook(i._id, i.bookname)}
                      variant="contained"
                      color="error"
                      className="m-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          size="small"
          className="my-4 max-w-[100px] w-auto "
          variant="contained"
          color="success"
          onClick={handleShow}
        >
          Add Book
        </Button>
      </Card>
      {/* modal add */}
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Book Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="bookname"
                      onChange={(e) => setBookname(e.target.value)}
                      placeholder="Enter Book Name"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Book Number/Code:</Form.Label>
                    <Form.Control
                      type="number"
                      name="booknumbercode"
                      onChange={(e) => setBooknumbercode(e.target.value)}
                      placeholder="Enter Number / Code"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>ISBN Number:</Form.Label>
                    <Form.Control
                      type="number"
                      name="ISBNNumber"
                      onChange={(e) => setISBNNumber(e.target.value)}
                      placeholder="Enter ISBN Number"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Author Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="authorname"
                      onChange={(e) => setAuthorname(e.target.value)}
                      placeholder="Enter Author Name"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Publisher Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="publishername"
                      onChange={(e) => setPublishername(e.target.value)}
                      placeholder="Enter Publisher Name"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date Published:</Form.Label>
                    <Form.Control
                      type="date"
                      name="publisheddate"
                      onChange={(e) => setPublisheddate(e.target.value)}
                      placeholder="Enter Date Published"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter Quantity"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Upload Book Image:</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      name="publisheddate"
                      onChange={covertToBase64}
                      placeholder="Enter Date Published"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                style={{backgroundColor: '#e0e0e0', color: 'black'}}
                onClick={handleClose}
                className="mx-3"
              >
                Close
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
      {/*end modal add */}

      {/* modal edit */}
      <>
        <Modal
          show={showedit}
          onHide={handleCloseedit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={updateBook}>
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Book Name:</Form.Label>
                    <input
                      type="text"
                      style={{display: 'none'}}
                      name="id"
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      value={book.id}
                    />
                    <Form.Control
                      type="text"
                      value={book.bookname}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter Book Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Book Number/Code:</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.booknumbercode}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter Number or Code"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>ISBN Number:</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.ISBNNumber}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter ISBN Number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Author Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.authorname}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter Author Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Publisher Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.publishername}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter Publisher Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date Published:</Form.Label>
                    <Form.Control
                      type="date"
                      value={book.publisheddate}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter Date Published"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      value={book.quantity}
                      onChange={(e) => setBook({...book, name: e.target.value})}
                      placeholder="Enter Quantity"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                size="small"
                style={{backgroundColor: '#e0e0e0', color: 'black'}}
                onClick={handleCloseedit}
                className="mx-3 my-2"
              >
                Close
              </Button>

              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
              >
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
      {/*end modal edit */}
    </div>
  );
}
