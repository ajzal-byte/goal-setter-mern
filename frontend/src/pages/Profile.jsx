import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [image, setImage] = useState("");

  const uploadImage = (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload a file");

    // const data = new FormData();
  };

  const handleEdit = () => {};
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
