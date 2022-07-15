import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../style/Button.style";
import Alert from "../ui-components/Alert";

export const AppMain = (props) => {
  const [facilityDetails, setFacilityDetails] = React.useState([]);
  let initialDataAlert = {
    type: "d-none",
    message: "",
};
  const [alert, setAlert] = React.useState(initialDataAlert);

  const getAllFacility = async () => {
    try {
      fetch(`http://localhost:5100/v1/facility`)
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
            setFacilityDetails((current) => (current = data.facility));
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllFacility();
  }, []);

  return (
    <>
      <hr />
      <div className="row">
        <div className="col">
          <Alert alertType={alert.type} alertMessage={alert.message} />
        </div>
      </div>
      <h3 className="mb-8 font-black text-7 sm:text-10 text-navy">
        Find Golf courses near You
      </h3>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th scope="col" className="text-start">
                Facility Name
              </th>
              <th scope="col" className="text-start">
                Address
              </th>
              <th scope="col" className="text-start">
                Phone
              </th>
              <th scope="col" className="text-start">
                holes
              </th>
              <th scope="col" className="text-start">
                Par
              </th>
              <th scope="col" className="text-start">
                Length
              </th>
              <th scope="col" className="text-start">
                Rating
              </th>
              <th scope="col" className="text-start">
                Slope
              </th>
              <th scope="col" className="text-start border-0"></th>
            </tr>
          </thead>
          <tbody>
            {facilityDetails &&
              facilityDetails.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <th scope="row" className="text-start">
                      {item.name}
                    </th>
                    <td className="text-start">{item.address}</td>
                    <td className="text-start">{item.phonenumber}</td>
                    <td className="text-start">{item.holes}</td>
                    <td className="text-start">{item.par}</td>
                    <td className="text-start">{item.length}</td>
                    <td className="text-start">{item.rating}</td>
                    <td className="text-center">{item.slope}</td>
                    <td className="text-start border-0">
                      <NavLink
                        to={`/facilitydetails/${item.facility_id}`}
                        key={item.id}
                        state={{ singleFacilityRecord: item }}
                      >
                        <Button>Book Tee Time</Button>
                      </NavLink>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppMain;
