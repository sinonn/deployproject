import {Link} from 'react-router-dom';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockIcon from '@mui/icons-material/Lock';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {toast} from 'react-toastify';
import {VITE_BACKEND_URL} from '../App';
import {useState, useEffect} from 'react';

// const initialValues = {
//   email: "",
//   password: "",
// };

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith('@ctu.edu.ph')) {
      toast.warning('Please use a valid CTU email address');
      return;
    }
    console.log(email, password);

    await fetch(`${VITE_BACKEND_URL}/api/login`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userRegister");

        if (data.status === 'ok') {
          toast.success(`Login successfully`);
          window.localStorage.setItem('token', data.data);
          window.localStorage.setItem('loggedIn', true);
          setTimeout(() => {
            window.location.href = './dashboard/dashboard';
          }, 2000);
        } else if (data.status === 'notlogin') {
          toast.warning(`Login Failed. Email not registered.`);
          //   setTimeout(() => {
          //     window.location.href = '/';
          //   }, 2000);
        } else if (data.status === 'error') {
          toast.error('Login failed');
        } else {
          // Handle the case where the user is not registered
          toast.warning('User not registered. Please sign up.');
        }
        // if (data.status === 'error') {
        //   toast.error('Login failed');
        // }
      });
  };

  return (
    <>
      <div className="bg  flex justify-center items-center">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="w-[500px] h-[570px] box  p-5"
        >
          <div className="flex  items-center  justify-start">
            <Link to="/">
              <div className="iconss"></div>
            </Link>
            <h2 className="text-4xl  tracking-widest ml-4"> CTU Library</h2>
          </div>
          <div className="content mt-4">
            <h1 className="text-3xl tracking-widest">Log In</h1>
            <form
              className="flex flex-col items-start mt-3 "
              onSubmit={handleSubmit}
            >
              <div className="flex items-center">
                <MailOutlineOutlinedIcon />
                <label className="text-lg text-gray-600 ml-2">Email</label>
              </div>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className=" border-gray-400 border-2 h-12 w-full p-2  mb-3 mt-3 rounded-xl focus:outline-none"
                required
                autoComplete="off"
              />
              <div className="flex items-center">
                <LockIcon />
                <label className="text-lg text-gray-600 ml-2">Password</label>
              </div>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className=" border-gray-400 border-2 h-12 w-full p-2  mb-3 mt-3 rounded-xl focus:outline-none"
                required
                autoComplete="off"
              />
              <button
                type="submit"
                className="  w-[120px] h-[40px] text-xl bg-blue-500 rounded-[30px] mt-3  text-white hover:bg-blue-600"
              >
                Log In
              </button>

              <div className="flex  mt-[50px] w-full  justify-center">
                <p> Doesn't have an account ?</p>
                <Link className="text-blue-500 ml-2" to="/register">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
