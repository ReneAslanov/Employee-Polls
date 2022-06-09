import { SET_LOCATION } from "../actions/shared";

function locationReducer(state = null, action)
{
    switch(action.type)
    {
        case SET_LOCATION:
            return action.location;

        default:
            return state;
    }
}

export default locationReducer;