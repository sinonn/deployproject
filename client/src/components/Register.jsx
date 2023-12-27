import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import {signupValidation} from './SignupValidation';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useState, useEffect} from 'react';
import {VITE_BACKEND_URL} from '../App';
import AOS from 'aos';
import 'aos/dist/aos.css';

const initialValues = {
  studentid: '',
  name: '',
  course: '',
  yearandsection: '',
  email: '',
  password: '',
  confirmpassword: '',
};

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {values, handleBlur, handleChange, handleSubmit, errors} = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      console.log(values);

      try {
        setIsLoading(true);
        const response = await axios.post(
          `${VITE_BACKEND_URL}/api/register`,
          values
        );
        toast.success(`Save ${response.data.name} successfully`);
        setIsLoading(false);
        navigate('/login');
      } catch (error) {
        toast.error(error.message);
        // console.log(error)
        setIsLoading(false);
      }
      // console.log('Recieved values of form', values);
    },
  });
  useEffect(() => {
    AOS.init();
  }, []);
  // console.log(formik);

  return (
    <div className="bg flex justify-center items-center">
      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        className="box w-[900px] h-[auto] p-5"
      >
        <div className="flex  items-center  justify-center">
          <Link to="/">
            <div className="iconss"></div>
          </Link>
          <h2 className="text-4xl  tracking-widest ml-4"> CTU Library</h2>
        </div>
        <div className="content">
          <h1 className="text-3xl tracking-widest mb-4 mt-4 ">Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="reg">
              <div>
                <label className="text-lg  my-1 mr-2">Student ID</label>
                <input
                  type="number"
                  className="inputreg"
                  value={values.studentid}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="studentid"
                  autoComplete="off"
                />
                <p className=" ">
                  {errors.studentid && <small>{errors.studentid}</small>}
                </p>
              </div>

              <div>
                <label className="text-lg  my-1 mr-2">Full Name</label>
                <input
                  type="text"
                  className="inputreg"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="name"
                  autoComplete="off"
                />
                <p> {errors.name && <small>{errors.name}</small>}</p>
              </div>
            </div>
            <div className="reg">
              <div>
                <label className="text-lg  my-1 mr-2">Course</label>
                <input
                  type="text"
                  className="inputreg"
                  value={values.course}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="course"
                  autoComplete="off"
                />
                <p> {errors.course && <small>{errors.course}</small>}</p>
              </div>
              <div>
                <label className="text-lg  my-1 mr-2">Email Address</label>
                <input
                  type="email"
                  className="inputreg"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  autoComplete="off"
                />
                <p> {errors.email && <small>{errors.email}</small>}</p>
              </div>
            </div>
            <div className="reg">
              <div>
                <label className="text-lg  my-1 mr-2">Pasword</label>
                <input
                  type="password"
                  className="inputreg"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  autoComplete="off"
                />
                <p>{errors.password && <small>{errors.password}</small>}</p>
              </div>

              <div>
                <label className="text-lg  my-1 mr-2">Year & Section</label>
                <input
                  type="text"
                  className="inputreg"
                  value={values.yearandsection}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="yearandsection"
                  autoComplete="off"
                />
                <p>
                  {errors.yearandsection && (
                    <small>{errors.yearandsection}</small>
                  )}
                </p>
              </div>
            </div>

            <div className="reg">
              <div>
                <label className="text-lg  my-1 mr-2">Confirm Password</label>
                <input
                  type="password"
                  className="inputreg"
                  value={values.confirmpassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="confirmpassword"
                  autoComplete="off"
                />
                <span>
                  {errors.confirmpassword && (
                    <small>{errors.confirmpassword}</small>
                  )}
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="  mr-56 bg-blue-500 rounded-[30px] mt-[35px]  text-white hover:bg-blue-600 text-lg w-[120px] h-[40px] "
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div>
              <p className="mt-[40px] text-center">
                Already have an account ?
                <span>
                  <Link to="/" className="text-blue-500 ml-2">
                    Sign in Here
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
