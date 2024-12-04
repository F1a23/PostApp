import { Link } from "react-router-dom";
import "../App.css";
import done from "../images/done.png";
import Login from "./Login";
import { Button } from "reactstrap";
const Completeregister = () => {
  return (
    <div className="login-container">
      <form className="box">
        <img src={done} className="img1"></img>
        <br></br>

        <p className="ph">Registration has been completed successfully.</p>
        <Button>
          <Link to="/Login" className="loginbutton">
            Login
          </Link>
        </Button>
      </form>
    </div>
  );
};

export default Completeregister;
