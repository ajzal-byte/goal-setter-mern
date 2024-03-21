import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  adminLogout,
  reset,
  getUsers,
  searchUser
} from "../../features/adminAuth/adminAuthSlice";
import { FaSearch } from "react-icons/fa";
import UsersList from "../../components/UsersList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminAuth);

  const onLogout = () => {
    dispatch(adminLogout());
    dispatch(reset());
    navigate("/admin/login");
  };

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!admin) navigate("/admin/login");

    if (searchQuery) dispatch(searchUser(searchQuery));
    else dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, admin, navigate, searchQuery]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const onAddUser = (e) => {
    e.preventDefault();
    navigate("/admin/adduser")
  };
  return (
    <div className="container-1">
      <div className="nav">
        <h3>Admin Dashboard</h3>

        <div style={{ display: "flex" }} className="form-group">
          <input
            style={{ height: "35px" }}
            className="form-control"
            placeholder="username/email"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            style={{ height: "35px", marginLeft: "10px" }}
            className="btn-1"
          >
            {" "}
            <FaSearch /> Search
          </button>
        </div>
      </div>

      <div className="profile">
        <div className="profile-image">
          <img
            src={
              admin?.profileUrl
                ? admin.profileUrl
                : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
            }
            alt="profile"
          />{" "}
        </div>
        <div className="profile-card">
          <div className="profile-info">
            <p>Name : {admin && admin.name}</p>
            <p> Email : {admin && admin.email}</p>
          </div>
          <div className="profile-buttons">
            <button onClick={onAddUser} className="btn-1">
              {" "}
              Add User
            </button>
            <button onClick={onLogout} className="btn">
              {" "}
              Logout
            </button>
          </div>
        </div>
      </div>

      <UsersList />
    </div>
  );
};

export default AdminDashboard;
