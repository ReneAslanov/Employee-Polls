import { connect, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../CSS/Error.css";
import { setLocation } from "../actions/shared";
import Login from "./Login";

function ErrorPage({authedUser})
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    if(authedUser === null)
    {
        dispatch(setLocation(location.pathname));

        return(
            <Login />
        )
    }

    function toHome()
    {
        dispatch(setLocation(location.pathname));
        setTimeout(navigate, 1000, "/home");
    }

    return(
        <div className="error-wrapper">
            <h1 className="error-header">This URL does not exist</h1>
            <Link to={"/home"} className="error-button" onClick={toHome}>Back To Homepage</Link>
        </div>
    )
}

function mapStateToProps({authedUser})
{
    return{
        authedUser
    }
}

export default connect(mapStateToProps)(ErrorPage);