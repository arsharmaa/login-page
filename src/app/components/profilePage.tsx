import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage: React.FC = () => {
  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1 className="text-primary display-4 mb-4">Profile Page</h1>
      
        <h2 className="text-primary">Username</h2>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Personal Information</h5>
                <p className="card-text">Name: example name</p>
                <p className="card-text">Email: example@example.com</p>
                <p className="card-text">Age: 30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
