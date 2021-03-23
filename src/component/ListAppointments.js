import React from "react";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";

const ListAppointments = (props) => {
  return (
    <div>
      {props.apts.map((apt, index) => (
        <div
          className="appointment-list item-list mb-3 bg-light border border-secondary border-1"
          key={index}
        >
          <div className="pet-item row d-flex justify-content-center  align-items-center media  py-3">
            <div className="col-2 ">
              <div>
                <button
                  className="pet-delete btn btn-danger"
                  onClick={() => props.deleteAppointment(apt)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="col-8">
              <div className="pet-info media-body">
                <div className="pet-head d-flex">
                  <span
                    className="pet-name"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      props.updateInfo("petName", e.target.innerText, index);
                    }}
                  >
                    {apt.petName}
                  </span>
                  <span className="apt-date ml-auto">
                    <Moment
                      date={apt.aptDate}
                      parse="YYYY-MM-dd hh:mm"
                      format=" h:mma D/MM"
                    />
                  </span>
                </div>

                <div className="owner-name">
                  <span className="label-item">Owner: </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      props.updateInfo("ownerName", e.target.innerText, index);
                    }}
                  >
                    {apt.ownerName}
                  </span>
                </div>
                <div
                  className="apt-notes"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    props.updateInfo("aptNotes", e.target.innerText, index);
                  }}
                >
                  {apt.aptNotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListAppointments;
