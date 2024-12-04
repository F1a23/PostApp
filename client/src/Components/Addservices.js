// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Axios from "axios";
import { useState, useEffect } from "react";
import addService from "../Features/ServicesSlice";

const Addservices = () => {
  const [ServiceId, setServiceId] = useState();
  const [Service_name, setService_name] = useState();
  const [ServiceInfo, setServiceInfo] = useState();
  const [Servicetype, setServicetype] = useState();
  const [Serviceprice, setServiceprice] = useState();
  const [responseMsg, setresponseMsg] = useState("");

  const addService = () => {
    Axios.post("http://localhost:3001/addService", {
      ServiceId: ServiceId,
      Service_name: Service_name,
      ServiceInfo: ServiceInfo,
      Servicetype: Servicetype,
      Serviceprice: Serviceprice,
    })
      .then((res) => {
        //alert("It worked");
        setresponseMsg(res.data);
        console.log(res);
      })
      .catch((err) => {
        //alert("Did not worked");
        console.log(err);
      });
  };

  const updateprodtypes = (e) => {
    //console.log(prodtypes);
    Servicetype(e.target.value);
  };
  return (
    <div>
      <div className="continare-fluid">
        <div className="register-form">
          <table className="table">
            <tr>
              <td colSpan="2">
                <h1 className="display-6">Services Registration</h1>
              </td>
            </tr>
            <tbody>
              <tr>
                <td>Service ID</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setServiceId(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Service name</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setService_name(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Service information</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setServiceInfo(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Service type</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setServicetype(e.target.value);
                    }}
                  ></input>
                </td>
                <td>Service price</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setServiceprice(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td colSpan="2" id="bt">
                  <button className="btn btn-info" onClick={addService}>
                    Add Service
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>{responseMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default Addservices;
