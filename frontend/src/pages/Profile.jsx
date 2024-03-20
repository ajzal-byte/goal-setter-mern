import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { editUser, profileUpdate } from "../features/auth/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate, dispatch]);

  const [image, setImage] = useState("");

  const uploadImage = (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload a file");

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "kmhi9kva");
    data.append("cloud_name", "dl7uommqj");

    fetch("https://api.cloudinary.com/v1_1/dl7uommqj/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(profileUpdate(data.url));
      })
      .catch((err) => toast.error(err));
  };

  const handleEdit = (userId, name, email) => {
    const newName = prompt("Enter new name:", name);
    const newEmail = prompt("Enter new email", email);

    if ((newName && newName !== newName.trim()) || newName && newName.length <= 0) {
      return toast.error("Name cannot be empty or contain only whitespaces.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newEmail && !emailRegex.test(newEmail)) {
      return toast.error("Invalid email format.");
    }

    if (newEmail && newName)
      dispatch(editUser({ userId, name: newName, email: newEmail }));
  };

  return (
    <div>
      <div>
        <h3>User Dashboard</h3>
      </div>
      <div className="profile">
        <div className="profile-image">
          <img
            src={
              user?.profileUrl
                ? user.profileUrl
                : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
            }
            alt="profile"
          />
        </div>

        <div className="profile-card">
          <div className="profile-info">
            <p>Name : {user && user.name}</p>
            <p> Email : {user && user.email}</p>
          </div>

          <div className="profile-buttons">
            <button
              onClick={() => handleEdit(user._id, user.name, user.email)}
              className="btn-1 upload-btn"
            >
              {" "}
              Edit profile
            </button>

            <div className="upload-button">
              <div class="custom-file-upload">
                <label for="profile" class="custom-button">
                  Choose File
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name="profile"
                  id="profile"
                  class="hidden-input"
                />
              </div>

              <button className="upload-btn btn" onClick={uploadImage}>
                Upload!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
