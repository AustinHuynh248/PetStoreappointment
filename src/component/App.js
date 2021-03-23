import "../css/App.css";
import React, { useState, useEffect } from "react";
import AddAppointment from "./AddAppointment";
import ListAppointments from "./ListAppointments";
import SearchAppoinments from "./SearchAppoinments";

import { without } from "lodash";

function App() {
  const [myappointments, setMyAppointments] = useState([]);
  const [myName, setMYName] = useState("duc");
  const [formDisplay, setFormDisplay] = useState(false);
  const [orderBy, setOrderBy] = useState("petName");
  const [queryText, setQueryText] = useState("");
  const [orderDir, setOrderDir] = useState("desc");

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          return item;
        });
        setMyAppointments(apts);
      });
  }, []);

  // Form toggle
  const toggleForm = () => {
    setFormDisplay(!formDisplay);
  };

  // delete appointment function
  const deleteAppointment = (apt) => {
    let tempApts = myappointments;
    tempApts = without(tempApts, apt);
    setMyAppointments((myappointments: tempApts));
  };

  // adding an appointment
  const addAppointment = (apt) => {
    let tempApts = myappointments;
    tempApts.unshift(apt);
    setMyAppointments((myappointments: tempApts));
  };

  // filter search appointment input
  let order;
  // filterapts get assign to equal the current appointment
  let filterApts = myappointments;
  // order conditions
  orderDir === "asc" ? (order = 1) : (order = -1);

  const filteredApts = filterApts
    .sort((a, b) => {
      if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    })
    .filter((apt) => {
      return (
        apt["petName"].toLowerCase().includes(queryText) ||
        apt["ownerName"].toLowerCase().includes(queryText) ||
        apt["aptDate"].toLowerCase().includes(queryText) ||
        apt["aptNotes"].toLowerCase().includes(queryText)
      );
    });

  // onclick change order event
  const changeOrder = (order, dir) => {
    setOrderBy(order);
    setOrderDir(dir);
  };

  // onChange search appointment
  const searchApts = (search) => {
    setQueryText(search);
  };

  // Update Info
  const updateInfo = (name, value, id) => {
    let tempApts = myappointments;
    tempApts[id][name] = value;
    setMyAppointments(tempApts);
  };
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointment
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addAppointment={addAppointment}
              />
              <SearchAppoinments
                orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                searchApts={searchApts}
              />
              <ListAppointments
                apts={filteredApts}
                name={myName}
                deleteAppointment={deleteAppointment}
                updateInfo={updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
