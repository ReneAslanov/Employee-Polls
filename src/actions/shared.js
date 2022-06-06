export const RECEIVE_USERS = "RECEIVE_USERS";
export const SET_POLL_ANSWER = "SET_POLL_ANSWER";
export const SET_QUESTION_ARRAY = "SET_QUESTION_ARRAY";

export function setUserAnswer({authedUser, qid, answer})
{
    return{
        type: SET_POLL_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function setUserQuestionArray({authedUser, qid})
{
  return{
    type: SET_QUESTION_ARRAY,
    authedUser,
    qid
  }
}

export function receiveUsers(payload)
{
    return{
        type: RECEIVE_USERS,
        users: payload
    }
}
