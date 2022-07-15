import React from "react";
import { Link } from "react-router-dom";

export const FacilityPanel = ({ facilityId }) => {
  const [facility, setFacility] = React.useState([]);

  const getSingleFacility = async () => {
    try {
      fetch(`http://localhost:5100/v1/facility/${facilityId}`)
        .then((response) => response.json())
        .then((data) => {
          const { facility } = data;
          setFacility((current) => (current = facility[0]));
        });
    } catch (error) {
      console.error(error);
    }
  }

    React.useEffect(() => {
      getSingleFacility();
    }, []);

    return (
      <>
        {facility && facility.length > 0 && (
          <div className="col-sm-4 sidenav">
            <div className="row">
              <div className="col-2">
                <Link className="nav-link" to="/">
                  Back
                </Link>
              </div>
              <div className="col-8">
                <h4>
                  <p className="title">{facility.name}</p>
                </h4>
              </div>
            </div>

            <div className="row content">
              <div className="col-sm-6">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/images/${facilityId}_imggolfcourse.jpg`
                  }
                  className="card-img-top w-100"
                  alt="bhuppal@hotmail.com"
                />
              </div>

              <div className="col-sm-6">
                <div className="col-sm-12 my-2 text-left">
                  <p className=" d-inline-block m-1 title">
                    {" "}
                    {facility.address}
                  </p>
                </div>

                <div className="col-sm-12 my-2  text-left">
                  <p className=" d-inline-block m-1 title">
                    {" "}
                    {facility.phonenumber}
                  </p>
                </div>

                <div className="col-sm-12 my-2  text-left">
                  <p className=" d-inline-block m-1 title">Holes: </p>
                  {facility.holes}
                </div>

                <div className="col-sm-12 my-2  text-left">
                  <p className=" d-inline-block m-1 title">Par: </p>
                  {facility.par}
                </div>

                <div className="col-sm-12 my-2  text-left">
                  <p className=" d-inline-block m-1 title">Length: </p>
                  {facility.length}
                </div>

                <div className="col-sm-12 my-2  text-left">
                  <p className=" d-inline-block m-1 title">Rating: </p>
                  {facility.rating}
                </div>

                <div className="col-sm-12 my-2  text-left">
                  <p className=" d-inline-block m-1 title">Slope: </p>
                  {facility.slope}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

export default FacilityPanel;
