import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  fetchServices,
  addService,
  deleteService,
  updateService,
} from "../Features/ServicesSlice";

const Manageservice = () => {
  const [listOfServices, setlistOfServices] = useState([]);
  const [countRecords, setcountRecords] = useState(0);
  const [searchKey, setsearchKey] = useState("");

  const deleteService = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setlistOfServices(
        listOfServices.filter((val) => {
          return val._id != id;
        })
      );
      console.log(response);
      setcountRecords(response.data.count);
    });
  };

  const searchService = (e) => {
    Axios.get(`http://localhost:3001/search/${searchKey}`)
      .then((response) => {
        setlistOfServices(response.data.result);
        console.log(response.data.result);
        setcountRecords(response.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchServiceonChange = (e) => {
    setsearchKey(e.target.value);
    Axios.get(`http://localhost:3001/search/${searchKey}`)
      .then((response) => {
        setlistOfServices(response.data.result);
        setcountRecords(response.data.count);
        console.log(response.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/manage")
      .then((response) => {
        setlistOfServices(response.data.result);
        setcountRecords(response.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="listServices">
        <h1 className="display-6" id="k">
          <br></br>Manage Services
        </h1>
        <br></br>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Service Id</th>
              <th>Service name</th>
              <th>Service Info</th>
              <th>Service type</th>
              <th>Service price</th>
            </tr>
          </thead>
          <tbody>
            {listOfServices.map((Service) => (
              <tr>
                <td>{Service.ServiceId}</td>
                <td>{Service.Service_name}</td>
                <td>{Service.ServiceInfo}</td>
                <td>{Service.Servicetype}</td>
                <td>{Service.Serviceprice}</td>

                <td>
                  <Link
                    to={`/update/${Service.ServiceId}`}
                    className="nav-link"
                  >
                    <button className="btn btn-info"> Update </button>
                  </Link>
                </td>
                <td>
                  <button
                    id="removeBtn"
                    className="btn btn-warning"
                    onClick={() => deleteService(Service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
          <h3 id="k">Number of Records: {countRecords}</h3>
          <br></br> <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Manageservice;
