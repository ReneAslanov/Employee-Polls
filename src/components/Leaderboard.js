import { connect, useDispatch} from "react-redux";
import Nav from "./Nav";
import "../CSS/Leaderboard.css";
import LeaderboardCard from "./Leaderboard-Card";
import Login from "./Login";
import { useLocation } from "react-router-dom";
import { setLocation } from "../actions/shared";

function Leaderboard(props)
{
    const location = useLocation();
    const dispatch = useDispatch();

    if(props.authedUser === null)
    {
        dispatch(setLocation(location.pathname));

        return(
            <Login/>
        )
    }

    return(
        <div>
            <Nav />
            <div className="leaderboard-wrapper" data-testid="leaderboard-wrapper">
                <div className="leaderboard-head">
                    <div className="leaderboard-users first-item">Users</div>
                    <div className="leaderboard-users">Answered</div>
                    <div className="leaderboard-users">Created</div>
                </div>
                {
                    props.users.map(user => {
                        return <LeaderboardCard user={user} key={user.id}/>
                    })
                }
            </div>
        </div>
    )
}

function mapStateToProps({authedUser, users})
{
    if(authedUser === null)
    {
        return{
            authedUser: null
        }
    }

    return{
        users: Object.values(users).sort((a, b) => {
           return (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
        })
    }

}

export default connect(mapStateToProps)(Leaderboard);