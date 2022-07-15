import React from "react";
import { useParams } from "react-router-dom";
import { FacilityPanel } from "./facility-panel";
import { FacilityTeeTimeSchedule } from "./facility-tee-time-schedule";

export const FacilityDetails = (props) => {
  const { facilityId } = useParams();

  return (
    <>
      <hr />
      <div className="container-fluid">   
        <div className="row content">
          <FacilityPanel facilityId={ facilityId }/>
          <FacilityTeeTimeSchedule facilityId={ facilityId } />
        </div>
      </div>
    </>
  );
};

export default FacilityDetails;
