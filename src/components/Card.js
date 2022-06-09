import "../CSS/Card.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Card({question})
{
    const navigate = useNavigate();
    const date = new Date(question.timestamp)
    let hours = date.getHours();
    let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();

    let actualDate = `${hours}:${minutes} | ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    function dashboardView(event)
    {
        navigate(`/question/${event.target.value}`)
    }

    return(
        <div className="card-wrapper">
            <h2 className="card-h2">
                {question.author}
            </h2>
            <div className="card-timestamp-wrapper">
                <p className="card-timestamp">
                    {
                    actualDate
                    }
                </p>
            </div>
            <button className="card-button" onClick={dashboardView} value={question.id}>
                Show
            </button>
        </div>
    )
}

function mapStateToProps({questions})
{
    return{
        questions
    };
}

Card.propTypes = {
    question: PropTypes.object
}

export default connect(mapStateToProps)(Card);