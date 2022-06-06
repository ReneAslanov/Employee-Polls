import "../CSS/Login.css"
import { Link, useNavigate } from "react-router-dom";
import {logoutUser, setAuthedUser} from "../actions/authedUser";
import {connect, useDispatch} from "react-redux";
import {useState} from "react";

function Login(props)
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function validUser(e)
    {
        e.preventDefault();

        const isUser = props.users.find(obj => {
            if(obj.name === username && obj.password === password)
            {
                dispatch(setAuthedUser(obj));
                navigate("/home");
                return true;
            }
            return undefined
        })

        if(isUser === undefined)
        {
            dispatch(logoutUser());
            document.getElementById("user").value = "";
            document.getElementById("password").value = "";
            alert("Username or Password is incorrect, pls enter valid Username and Password");
        }
    }

    return(
        <form className="login-form" id="login-form">
            <h1 className="login-headline">Employee Polls</h1>
            <div className="login-wrapper">
                <label htmlFor="user" className="login-label">User</label>
                <input type="text" placeholder="Username" name="User" id="user" data-testid="user" className="login-input" onChange={event => setUsername(event.target.value.trim())}></input>

                <label htmlFor="password" className="login-label">Password</label>
                <input type="password" placeholder="Password" name="Password" id="password" data-testid="password" className="login-input" onChange={event => setPassword(event.target.value.trim())}></input>
            </div>


            <Link to="/home" className="login-submit" onClick={validUser} id="home-link">submit</Link>
        </form>
    )
}

function mapStateToProps({users, questions})
{
    return{
        users: Object.values(users),
        questions
    }
}

export default connect(mapStateToProps)(Login);