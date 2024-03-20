import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { adminLogin, reset } from "../../features/adminAuth/adminAuthSlice";
import { Spinner } from "../../components";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminAuth
  );

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || admin) navigate("/admin");

    dispatch(reset());
  }, [admin, isError, isSuccess, dispatch, navigate, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format.");
    }

    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters long.");
    }

    const adminData = {
      email,
      password,
    };

    dispatch(adminLogin(adminData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="adminLogin-card">
        <section className="heading">
          <h1>
            <FaUser />
            Admin Login
          </h1>
          <p>Authorized login only</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default AdminLogin;
