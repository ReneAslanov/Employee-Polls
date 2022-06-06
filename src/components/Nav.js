import { Link , useNavigate} from "react-router-dom";
import "../CSS/Nav.css";
import { connect } from "react-redux";

function Nav(props)
{
    const navigate = useNavigate();
    function logout()
    {
        navigate("/");
    }

    return(
        <div className="nav-wrapper">
            <div className="nav-routes">
                <ul className="nav-list">
                   <Link to="/home">Home</Link>
                   <Link to="/leaderboard">Leaderboard</Link>
                   <Link to="/add">New</Link>
                </ul>
            </div>
            <div className="nav-user">
                <ul className="nav-list">
                    <div className="nav-img-wrapper">
                        <img src={props.authedUser.avatar} alt="just an avatar" className="nav-avatar"/>
                    </div>
                    <p className="nav-userName">
                        {props.authedUser.id}
                    </p>
                    <Link to="/" onClick={logout}>Logout</Link>
                </ul>
            </div>
        </div>
    )
}

function mapStateToProps({authedUser})
{
    return{
        authedUser
    }
}

export default connect(mapStateToProps)(Nav);