import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationNew({ date }) {
  const history = useHistory();
  const [error, setError] = useState(null);

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "",
    people: "1",
  });

  // Function to handle mobile number input change
  const handleMobileNumberChange = (event) => {
    const inputValue = event.target.value;

    // Use a regular expression to filter out non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    setReservation({
      ...reservation,
      mobile_number: numericValue,
    });
  };

  // submitHandler
  const submitHandler = (event) => {
    event.preventDefault();
    createReservation({
      ...reservation,
      people: Number(reservation.people),
    })
      .then(() => {
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setError);
  };

  return (
    <main>
      <ErrorAlert error={error} />
      <h1>Create a New Reservation</h1>
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
        handleMobileNumberChange={handleMobileNumberChange}
      />
    </main>
  );
}

export default ReservationNew;
