import { SET_AUTHED_USER, SET_POLL_OPTION } from "../actions/authedUser";
import { LOGOUT } from "../actions/authedUser";
import { CREATE_QUESTION } from "../actions/questions";

export default function authedUser(state = null, action)
{
    switch(action.type)
    {
        case SET_AUTHED_USER:
            return{
               id: action.id,
               avatar: action.avatar,
               answers: action.answers,
               questions: action.questions
            };

        case LOGOUT:
            return null

        case CREATE_QUESTION:
            return{
                ...state,
                questions: state.questions.concat(action.payload.id)
            }

        case SET_POLL_OPTION:

            const {qid, answer} = action;
            return{
                ...state,
                answers: {
                    ...state.answers,
                    [qid]: answer
                }
            }

        default:
            return state;
    }
}