import { _saveQuestionAnswer } from "../utils/_DATA.js"
import { SET_POLL_OPTION } from "./authedUser.js";

export const SET_QUESTIONS = "SET_QUESTIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";

export function setQuestions(questions)
{
    return{
        type: SET_QUESTIONS,
        questions : Object.values(questions)
    }
}

export function createQuestion(question)
{
    return{
        type: CREATE_QUESTION,
        payload: question
    }
}

export function handleCreateQuestion(optionOne, optionTwo, author)
{

    return{
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author
    }
}

export function handleQuestionAnswer({authedUser, qid, answer})
{
    return (dispatch) => {
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(data => {
            return dispatch(setPollAnswer({authedUser, qid, answer}))
        })

    }
}

export function setPollAnswer({qid, answer, authedUser})
{
    return{
        type: SET_POLL_OPTION,
        qid,
        answer,
        authedUser
    }
}