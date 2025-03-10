import React, { useState } from "react";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { Spinner } from "./Spinner";
import axios from "axios";

const UpdateForm = ({ userData, onUpdateSuccess }) => {
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth.split('T')[0]); // Ensure date format is correct
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(userData.gender);
  const [about, setAbout] = useState(userData.about);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name,
        age: parseInt(age), 
        dateOfBirth: new Date(dateOfBirth).toISOString(), 
        password,
        gender,
        about
      };
      const response = await axios.put("http://localhost:3000/api/v1/user/update", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("User updated successfully");
      onUpdateSuccess(response.data.user);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6  rounded-lg shadow-lg w-96 bg-white">
      <h2 className="text-xl font-bold mb-4">Update Your Information</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <InputBox value={name} onChange={(e) => setName(e.target.value)} label={"Name"} placeholder="Ex: sachin.." />
          <InputBox value={age} onChange={(e) => setAge(e.target.value)} label={"Age"} placeholder="Ex: 30" type="number" />
          <InputBox value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} label={"Date of Birth"} placeholder="Ex: 1995-05-15" type="date" />
          <InputBox value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder="78#$%$#$6s" type="password" />
          <label className="block text-gray-900 text-left mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <InputBox value={about} onChange={(e) => setAbout(e.target.value)} label={"About"} placeholder="Tell us about yourself" />
          <div className="pt-4 px-20">
            <Button onClick={handleUpdate} label={"Save Information"} />
          </div>
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </>
      )}
    </div>
  );
};

export default UpdateForm;