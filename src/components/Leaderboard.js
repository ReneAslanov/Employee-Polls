import { connect} from "react-redux";
import Nav from "./Nav";
import "../CSS/Leaderboard.css";
import LeaderboardCard from "./Leaderboard-Card";
import ErrorPage from "./ErrorPage";

function Leaderboard(props)
{
    if(props.authedUser === null)
    {
        return(
            <ErrorPage/>
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