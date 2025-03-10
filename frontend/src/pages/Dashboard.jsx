import React, { useState } from "react";
import Appbar from "../components/Appbar";
import { Button } from "../components/Button";
import UpdateForm from "../components/UpdateForm";
import ConfirmationModal from "../components/ConfirmationModal";
import { Spinner } from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showCard, setShowCard] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      console.log("Token:", token); // Print the token
      const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setUserData(response.data);
      setShowCard(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3000/api/v1/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User deleted successfully");
      setShowCard(false);
      setUserData(null);
      navigate("/register");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateSuccess = (updatedUser) => {
    setUserData(updatedUser);
    setShowUpdateForm(false);
    setShowCard(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDeleteUser = async () => {
    setShowConfirmationModal(false);
    await handleDeleteUser();
  };

  return (
    <div className="relative">
      <Appbar />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-center text-3xl font-bold mb-4">
          Welcome back to your FinacPlus account
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
          <div className="align-centre">
          <Button label={"View your information"} onClick={handleButtonClick} />
          </div>
          
            {showCard && userData && !showUpdateForm && (
              <div className="mt-6 p-6  rounded-lg shadow-lg w-100 bg-white">
                <h2 className="text-xl font-bold mb-4">Your Information</h2>
                <div className="mb-4">
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Age:</strong> {userData.age}</p>
                  <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {userData.gender}</p>
                  <p><strong>About:</strong> {userData.about}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleConfirmDelete}
                  >
                    Delete User
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleUpdateUser}
                  >
                    Update Information
                  </button>
                </div>
              </div>
            )}
            {showUpdateForm && userData && (
              <UpdateForm userData={userData} onUpdateSuccess={handleUpdateSuccess} />
            )}
            {showConfirmationModal && (
              <ConfirmationModal
                message="Are you sure you want to delete your profile?"
                onConfirm={handleConfirmDeleteUser}
                onCancel={handleCancelDelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;