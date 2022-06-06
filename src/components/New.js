import Nav from "./Nav";
import { Link } from "react-router-dom";
import "../CSS/New.css";
import { connect, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { createQuestion } from "../actions/questions";
import { _saveQuestion } from "../utils/_DATA";
import { handleCreateQuestion } from "../actions/questions";
import {setUserQuestionArray} from "../actions/shared"
import ErrorPage from "./ErrorPage";

function New(props)
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(props.authedUser === null)
    {
        return(
            <ErrorPage/>
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
        _saveQuestion(handleCreateQuestion(optionOne, optionTwo, props.authedUser.id))
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