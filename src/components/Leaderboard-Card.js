function LeaderboardCard(props)
{
    return(
        <div className="leaderboard-items-wrapper" key={props.user.id}>
            <div className="leaderboard-user-name leaderboard-item">
                <div className="leaderboard-user-wrapper">
                    <h3 className="leaderboard-userName">{props.user.name}</h3>
                    <h4 className="leaderboard-userId">{props.user.id}</h4>
                </div>

                <div className="leaderboard-userAvatar-wrapper">
                    <img className="leaderboard-userAvatar" src={props.user.avatarURL} alt="just an avatar"/>
                </div>

            </div>
            <div className="leaderboard-user-answers leaderboard-item">{Object.keys(props.user.answers).length}</div>
            <div className="leaderboard-user-created leaderboard-item">{props.user.questions.length}</div>
        </div>
    )
}

export default LeaderboardCard;