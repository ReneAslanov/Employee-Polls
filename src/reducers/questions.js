import { SET_POLL_OPTION } from "../actions/authedUser";
import { SET_QUESTIONS, CREATE_QUESTION } from "../actions/questions";

export default function questionReducer(state = [], action)
{
    switch(action.type)
    {
        case SET_QUESTIONS:
            return action.questions;

        case CREATE_QUESTION:
            return [...state, action.payload];

        case SET_POLL_OPTION:
            let {qid, answer, authedUser} = action;
            return state.map(ele => ele.id === qid ? {
                ...ele,
                [answer]: {
                    text: ele[answer].text,
                    votes: authedUser !== undefined ? [...ele[answer].votes, authedUser] : [...ele[answer].votes]
                }
            } : ele);

        default:
            return state
    }
}