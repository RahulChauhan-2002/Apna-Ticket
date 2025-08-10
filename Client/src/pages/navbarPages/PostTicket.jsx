import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostTicket = () => {
  // The initial state was missing from your code, I've filled it in based on your form
  const [formData, setFormData] = useState({
    travelType: "bus",
    from: "",
    to: "",
    journeyDate: "",
    vehicleNumber: "",
    timing: "",
    seatType: "seater",
    price: "",
  });
  const navigate = useNavigate();

  // --- THIS IS THE MISSING FUNCTION ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // When travel type changes, reset seatType to a valid default
      if (name === "travelType") {
        if (value === "bus") {
          newData.seatType = "seater";
        } else if (value === "train") {
          newData.seatType = "sleeper";
        }
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // --- CORRECTED THE PORT HERE ---
      const url = "http://localhost:3000/api/v1/postTicket";

      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      console.log("Ticket posted:", response.data);
      alert("Your ticket has been posted successfully!");

      if (formData.travelType === "bus") {
        navigate("/bus-tickets");
      } else {
        navigate("/train-tickets");
      }
    } catch (error) {
      console.error(
        "Error posting ticket:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to post a ticket. Redirecting to login.");
        navigate("/login");
      } else {
        alert(
          error.response?.data?.message ||
            "An error occurred while posting the ticket."
        );
      }
    }
  };

  // Your JSX is perfect, no changes needed below this line
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Post Your Unused Ticket
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Travel Type */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Travel Type
          </label>
          <div className="flex gap-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="travelType"
                value="bus"
                checked={formData.travelType === "bus"}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Bus</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="travelType"
                value="train"
                checked={formData.travelType === "train"}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Train</span>
            </label>
          </div>
        </div>

        {/* From / To */}
        <div>
          <label
            htmlFor="from"
            className="text-sm font-semibold text-gray-600 block"
          >
            From
          </label>
          <input
            type="text"
            name="from"
            id="from"
            value={formData.from}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Delhi"
          />
        </div>
        <div>
          <label
            htmlFor="to"
            className="text-sm font-semibold text-gray-600 block"
          >
            To
          </label>
          <input
            type="text"
            name="to"
            id="to"
            value={formData.to}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Mumbai"
          />
        </div>

        {/* Journey Date */}
        <div>
          <label
            htmlFor="journeyDate"
            className="text-sm font-semibold text-gray-600 block"
          >
            Date of Journey
          </label>
          <input
            type="date"
            name="journeyDate"
            id="journeyDate"
            value={formData.journeyDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Vehicle Number (Conditional Label) */}
        <div>
          <label
            htmlFor="vehicleNumber"
            className="text-sm font-semibold text-gray-600 block"
          >
            {formData.travelType === "bus" ? "Bus Number" : "Train Number"}
          </label>
          <input
            type="text"
            name="vehicleNumber"
            id="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Timing */}
        <div>
          <label
            htmlFor="timing"
            className="text-sm font-semibold text-gray-600 block"
          >
            {formData.travelType === "bus" ? "Bus Timing" : "Train Timing"}
          </label>
          <input
            type="time"
            name="timing"
            id="timing"
            value={formData.timing}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Seat Type (Conditional Dropdown) */}
        <div>
          <label
            htmlFor="seatType"
            className="text-sm font-semibold text-gray-600 block"
          >
            Seat Type
          </label>
          <select
            name="seatType"
            id="seatType"
            value={formData.seatType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            {formData.travelType === "bus" ? (
              <>
                <option value="seater">Seater</option>
                <option value="sleeper">Sleeper</option>
              </>
            ) : (
              <>
                <option value="sleeper">Sleeper</option>
                <option value="3ac">3AC</option>
                <option value="2ac">2AC</option>
                <option value="1ac">1AC</option>
              </>
            )}
          </select>
        </div>

        {/* Price */}
        <div className="md:col-span-2">
          <label
            htmlFor="price"
            className="text-sm font-semibold text-gray-600 block"
          >
            Selling Price (₹)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="e.g., 500"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
          >
            Post My Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostTicket;