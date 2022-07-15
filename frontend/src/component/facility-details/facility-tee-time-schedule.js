import React from "react";
import Input from "../form-components/Input";
import Alert from "../ui-components/Alert";
import { Button, DisabledButton } from "../style/Button.style";
import { Link, useLocation, useParams } from "react-router-dom";

export const FacilityTeeTimeSchedule = ({ facilityId }) => {
  let initialDataRegistation = {
    facilityId: facilityId,
    pgaMemberId: "",
    firstName: "",
    lastName: "",
    teeTimeDate: "",
    teeTimeTime: "",
    create_date: new Date().toDateString(),
  };

  let initialDataAlert = {
    type: "d-none",
    message: "",
  };

  const [registrationDetails, setRegistrationDetails] = React.useState(
    initialDataRegistation
  );

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState("None");

  const [teeTimeBookingDetails, setTeeTimeBookingDetails] = React.useState([]);

  const [validationErrors, setValidationErrors] = React.useState([]);
  const [alert, setAlert] = React.useState(initialDataAlert);
  const [error, setError] = React.useState(null);

  const handleFormChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    setRegistrationDetails((prevState) => {
      prevState = {
        ...prevState,
        [name]: value,
      };
      return prevState;
    });
  };

  const SubmitTeeTimeBooking = (evt) => {
    evt.preventDefault();
    let errors = [];
    if (
      registrationDetails.firstName === "" ||
      registrationDetails.firstName.length === 0
    ) {
      errors.push("firstName");
    }
    if (
      registrationDetails.lastName === "" ||
      registrationDetails.lastName.length === 0
    ) {
      errors.push("lastName");
    }

    if (
      registrationDetails.pgaMemberId === "" ||
      registrationDetails.pgaMemberId.length > 8
    ) {
      errors.push("pgaMemberId");
    }

    if (selectedTime === "None") {
      setAlert((current) => {
        let alertErrorMessage = {
          type: "alert-danger",
          message:
            "Tee Time is not selected, please select Tee Time from available slot.",
        };
        current = alertErrorMessage;
        return current;
      });

      return false;
    }
    setValidationErrors((current) => (current = errors));

    if (validationErrors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: myHeaders,
    };

    fetch("http://localhost:5100/v1/teetimebooking", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlert((current) => {
            let alertErrorMessage = {
              type: "alert-danger",
              message: data.message,
            };
            current = alertErrorMessage;
            return current;
          });
        } else {
          setAlert((current) => {
            let alertSuccessMessage = {
              type: "alert-success",
              message: data.message,
            };
            current = alertSuccessMessage;
            return current;
          });
        }
      });

    setRegistrationDetails((current) => (current = initialDataRegistation));
    setSelectedTime((current) => (current = "None"));
    getTeeTimeBookingByFacility();
    displayAllTeeTime();
  }

  const hasError = (key) => {
    return validationErrors.indexOf(key) !== -1;
  };

  const handleTeeTimeDateClick = (e) => {
    e.preventDefault();
    let date = new Date(selectedDate);
    if (e.target.name === "prev") {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1);
    }
    setSelectedDate((current) => (current = date));
    getTeeTimeBookingByFacility();
    displayAllTeeTime();
  };

  const getSelectedTime = (e) => {
    setSelectedTime((current) => (current = e.target.name));
  };

  const displayAllTeeTime = () => {
    let listOfTeeTimeBooked = [];
    if (teeTimeBookingDetails && teeTimeBookingDetails.length > 0) {
      listOfTeeTimeBooked = teeTimeBookingDetails.map(
        (item) => item.teetimetime
      );
      console.log("Contains data:", listOfTeeTimeBooked);
    }
  
    let hrs = ["09", "10", "11"];
    let mins = ["00", "10", "20", "30", "40", "50"];
    return hrs.map((h) => {
      return mins.map((m) => {
        return (
          <React.Fragment key={h + m}>
            <div className="col-6">
              <small className="pt-2">
                {h}:{m} AM
              </small>
            </div>
            <div className="col-6">
              {listOfTeeTimeBooked.find((item) => item === `${h}:${m} AM`) !=
              undefined ? (
                <>
                  <DisabledButton
                    className="mt-1"
                    name={`${h}:${m} AM`}
                    id={`${h}:${m} AM`}
                  >
                    Unavailable
                  </DisabledButton>
                </>
              ) : (
                <>
                  <Button
                    className="mt-1"
                    name={`${h}:${m} AM`}
                    id={`${h}:${m} AM`}
                    onClick={(e) => getSelectedTime(e)}
                  >
                    Available
                  </Button>
                </>
              )}
            </div>
          </React.Fragment>
        );
      });
    });
  };

  const getTeeTimeBookingByFacility = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          facilityId: facilityId,
          teeTimeDate: selectedDate,
        }),
        headers: myHeaders,
      };

      fetch(
        `http://localhost:5100/v1/facility/${facilityId}/teetimebooking`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setAlert((current) => {
              let alertErrorMessage = {
                type: "alert-danger",
                message: data.message,
              };
              current = alertErrorMessage;
              return current;
            });
          } else {
            const apiData = data.facilityTeeTimeBookingDetails;
            setTeeTimeBookingDetails((current) => (current = apiData));
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getTeeTimeBookingByFacility();
  }, []);

  return (
    <>
      <div className="col-sm-4">
        <div className="row ">
          <div className="col-12">
            <h4>
              <small className="pt-2">All Tee Time Schedule</small>
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col-2">
            <a href="#">
              <img
                id="prev"
                name="prev"
                onClick={(e) => handleTeeTimeDateClick(e)}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACIUlEQVRoge2XTWgTQRiGn9ld60+ttR4sFFLwhypeGgRBIVAUiULAsx704FFUkEjTQy/eDYV686ZiEQuCB7UKLRSkF0GjqFiRHqIEKmhMo1ZqMuNFhdrONurMrpV5bsu3+873sLMzs+BwOBxxIsKK+fF0QvrBAIo00BJRTz+oKhhVQvblUiOTupu0AvnxdEJ6QQHYYKW9xil7stad7bn3erGip3tK+sEA8TcP0Ka8IK8ragW+T5t/AgUHdDW9QPRzPox1ukKYwLLACcSNE4ibwETI2dStedfn72dC72/yV7N/ywluv9Qu7w0T+RtoX7uVo8lBdmzcZyTPyBtoDMHOjkP0bDqOL8wNG4nAmhWtHOw6w+a2XcazrQt0rk+S6crS3GTnWGVNwBM+uxOH2dN5BBF+av8rrAi0rmons62XjpbtNuLnYUXgWPICK4NmG9ELWPYbmRWBy4VTlKovbEQvwIpA5cs01570MlEcQqFsDPETa1NIqjoTxasMP+3n09x7W8PY/waKHwpcenSSqfIDK/mRfMSfv1a48ewcY1MXqaua0ewIVyHFw9JNhh5nKc+WjKVGvoxOf3zFlcJpnr8dM5JnZCNb6vz/K3P1WSP/AuA2svhxAnHzXwtUI+tiKQQVXUkroGDUTjd/gOKurqQXELIPKFtp6HdQ6p2sqayurBXIpUYmPVnrFjAMzFhpLpwZ4Lqsk8ztvfMmhvEdDoejAb4BSTOFWTCfnXMAAAAASUVORK5CYII="
              />
            </a>
          </div>
          <div className="col-8">
            <h4>
              <small>
                <p className="pt-3">
                  {selectedDate.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </small>
            </h4>
          </div>
          <div className="col-2">
            <a href="#">
              <img
                id="next"
                name="next"
                onClick={(e) => handleTeeTimeDateClick(e)}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACIklEQVRoge2YP2gTURjAf3c5RaW1RoRCoBmKYEExUXApAdEhDqKDIEjFrm4uFVInF6fiEajSrZMgqKNEY7FCQFAQJJOYUBVaKVTQmMb6pybvueiQ0ncm+t6dlffbju/d930/7v3jwGKxWKLECQr6peyAiHl5JFmgN6SeftGQMCsdMZ7LFCuqQUoBv5QdEK5XBnYaaa9zaq5opsYOzyysF3RVb4mYlyf65gHi0vV8VVAp8HPa/BNIOKaKqQXCn/NBbFcFggQ2BFYgaqxA1Hg6kpwYusTM3CTfmiuB4y5mCm3PVx8f/+vaWr7Anl0ZRtPXSPQO6UjXFdqmUN+Wfs7sn2A4eRYn+IqlFa1rwHViDCdHOL3vCj2bw7mFGFnEyR1pRg9cZzB+yET6NoztQts29XFq72WODp4n5mjZK9bF8DbqcDBxkpGUT3xrwkiFUM6B/p7dnEtPGsm94Q+yUASWPs1xo3zBSG5zqwsAyfPFu5TeTNOSTSMVjAl8/l6nWM3zuvbMVAnAkMD8xzKFqs/K6gcT6dvQKiBki6cLt3gyfxOJ1JlaiTaB+tclCpUJFhsvdaXsCC0CL9494uGrKVZbX3Sk6wotAveqyt82bei4/6/FHmRRYwWi5r8WaITWxe9wqKtCSgEJs2a6+QMkD1QhtYAjxoGakYa6Qcr3oinHVGGlQC5TrLiimXLgDrBspLlgloHbokU6d+T+2wjqWywWSwf8AM7WhVIoxD8QAAAAAElFTkSuQmCC"
              />
            </a>
          </div>
        </div>

        <div className="row anyClass" id="divTeeTime" name="divTeeTime">{displayAllTeeTime()}</div>
        <div className="col mt-3"></div>
        <div className="col">
          <Button>
            <p className="mt-2">
              Selected Tee Time:
              {selectedTime === "" ? (
                <>None</>
              ) : (
                <>
                  {selectedDate.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {" -- "}
                  {selectedTime}
                </>
              )}
            </p>
          </Button>
        </div>
      </div>
      <div className="col-sm-4 ">
        <h4>
          <small>Registration</small>
        </h4>

        <>
          <hr />
          <div className="container">
            <div className="row">
              <div className="col">
                <Alert alertType={alert.type} alertMessage={alert.message} />
                <form onSubmit={(evt) => SubmitTeeTimeBooking(evt)}>
                  <input
                    type="hidden"
                    name="facilityId"
                    id="facilityId"
                    value={facilityId}
                  />

                  <input
                    type="hidden"
                    name="teeTimeDate"
                    id="teeTimeDate"
                    value={selectedDate.toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />

                  <input
                    type="hidden"
                    name="teeTimeTime"
                    id="teeTimeTime"
                    value={selectedTime.replace(" AM", ":00")}
                  />
                  <Input
                    title={"First Name"}
                    className={hasError("firstName") ? "is-invalid" : ""}
                    type={"text"}
                    name={"firstName"}
                    value={registrationDetails.firstName}
                    handleChange={(evt) => handleFormChange(evt)}
                    errorDiv={hasError("firstName") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a first name"}
                  />

                  <Input
                    title={"Last Name"}
                    className={hasError("lastName") ? "is-invalid" : ""}
                    type={"text"}
                    name={"lastName"}
                    value={registrationDetails.lastName}
                    handleChange={(evt) => handleFormChange(evt)}
                    errorDiv={hasError("lastName") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a last name"}
                  />

                  <Input
                    title={"PGA Member ID"}
                    className={hasError("pgaMemberId") ? "is-invalid" : ""}
                    type={"number"}
                    name={"pgaMemberId"}
                    value={registrationDetails.pgaMemberId}
                    handleChange={(evt) => handleFormChange(evt)}
                    errorDiv={
                      hasError("pgaMemberId") ? "text-danger" : "d-none"
                    }
                    errorMsg={
                      "Please enter a valid PGA Member ID, 8 characters Max and only numbers."
                    }
                  />

                  <button className="btn btn-primary">Save</button>
                  <Link to="/" className="btn btn-warning ms-1">
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </>
        <hr />
      </div>
    </>
  );
};

export default FacilityTeeTimeSchedule;