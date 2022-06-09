function LeaderboardCard({user})
{
    return(
        <div className="leaderboard-items-wrapper" key={user.id}>
            <div className="leaderboard-user-name leaderboard-item">
                <div className="leaderboard-user-wrapper">
                    <h3 className="leaderboard-userName">{user.name}</h3>
                    <h4 className="leaderboard-userId">{user.id}</h4>
                </div>

                <div className="leaderboard-userAvatar-wrapper">
                    <img className="leaderboard-userAvatar" src={user.avatarURL} alt="just an avatar"/>
                </div>

            </div>
            <div className="leaderboard-user-answers leaderboard-item">{Object.keys(user.answers).length}</div>
            <div className="leaderboard-user-created leaderboard-item">{user.questions.length}</div>
        </div>
    )
}

export default LeaderboardCard;