import { RECEIVE_USERS, SET_POLL_ANSWER, SET_QUESTION_ARRAY } from "../actions/shared";

const userReducer = (state = {}, action) => {
    switch(action.type)
    {
        case RECEIVE_USERS:
            return action.users

        case SET_POLL_ANSWER:
            const {authedUser, qid, answer} = action;
            return{
                ...state,
                [authedUser]: {
                    ...state[authedUser],

                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }

        case SET_QUESTION_ARRAY:
            return{
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],

                    questions: state[action.authedUser].questions.concat([action.qid])
                }
            }

        default:
            return state
    }
}


export default userReducer;