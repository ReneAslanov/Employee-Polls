export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT = "LOGOUT";
export const SET_POLL_OPTION = "SET_POLL_OPTION";

export function setAuthedUser(payload)
{
    return{
        type: SET_AUTHED_USER,
        id: payload.id,
        avatar: payload.avatarURL,
        answers: payload.answers,
        questions: payload.questions
    }
}

export function logoutUser()
{
    return{
        type: LOGOUT
    }
}

export function setPollOption({qid, answer})
{
    return{
        type: SET_POLL_OPTION,
        qid,
        answer
    }
}