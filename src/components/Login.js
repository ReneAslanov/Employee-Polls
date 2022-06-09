import "../CSS/Login.css"
import { Link, useNavigate } from "react-router-dom";
import {logoutUser, setAuthedUser} from "../actions/authedUser";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import { setLocation } from "../actions/shared";
import PropTypes from "prop-types";
import ErrorPage from "./ErrorPage";

function Login({users, questions, location})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validLocations, setValidLocations] = useState(["/home", "/leaderboard", "/add", "/"].concat(questions.map(question => {
        return `/question/${question.id}`;
    })))

    useEffect(() => {
        setValidLocations(["/home", "/leaderboard", "/add", "/"].concat(questions.map(question => {
            return `/question/${question.id}`;
        })))
    }, [questions])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function validUser(e)
    {
        e.preventDefault();

        const isUser = users.find(obj => {
            if(obj.name === username && obj.password === password)
            {
                dispatch(setAuthedUser(obj));
                if(location !== null && validLocations.includes(location))
                {
                    navigate(location);
                    dispatch(setLocation(null))
                    return true;
                }
                if(location !== null)
                {
                    dispatch(setLocation(null))
                    return(
                        <ErrorPage />
                    )
                }

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

Login.propTypes = {
    users: PropTypes.array,
    questions: PropTypes.array,
    location: PropTypes.string
}

function mapStateToProps({users, questions, location})
{
    return{
        users: Object.values(users),
        questions,
        location
    }
}

export default connect(mapStateToProps)(Login);