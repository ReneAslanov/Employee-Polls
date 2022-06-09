import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import "../CSS/New.css";
import { connect, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { createQuestion } from "../actions/questions";
import { _saveQuestion } from "../utils/_DATA";
import { handleCreateQuestion } from "../actions/questions";
import {setLocation, setUserQuestionArray} from "../actions/shared"
import Login from "./Login";

function New({authedUser})
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

    function dispatchQuestion(e)
    {
        e.preventDefault();

        let optionOne = document.getElementById("option-1").value;
        let optionTwo = document.getElementById("option-2").value;

        if(optionOne === "" || optionTwo === "")
        {
            return alert("please provide both options");
        }
        _saveQuestion(handleCreateQuestion(optionOne, optionTwo, authedUser.id))
        .then(actualQuestion => {
            dispatch(setUserQuestionArray({
                authedUser: actualQuestion.author,
                qid: actualQuestion.id
            }));
            return dispatch(createQuestion(actualQuestion))

        })
        setTimeout(navigate, 600, "/home");
    }

    return(
        <div>
            <Nav/>
            <form className="new-card-wrapper">
                <h1 className="new-h1">Would You Rather</h1>
                <h3 className="new-subtitle">Create Your Own Poll</h3>

                <label htmlFor="option-1" className="new-label">First Option</label>
                <input type="text" placeholder="First Option" id="option-1" className="new-option-input" data-testid="option-1"></input>

                <label htmlFor="option-2" className="new-label">Second Option</label>
                <input type="text" placeholder="Second Option" id="option-2" className="new-option-input" data-testid="option-2"></input>

                <Link to="/home" className="new-submit" onClick={dispatchQuestion}>Submit</Link>
            </form>
        </div>
    )
}

function mapStateToProps({authedUser})
{
    if(authedUser === null)
    {
        return{
            authedUser: null
        }
    }

    return{
        authedUser,
    }
}

export default connect(mapStateToProps)(New);