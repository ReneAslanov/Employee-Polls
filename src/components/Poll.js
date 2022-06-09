import { connect, useDispatch } from "react-redux";
import Nav from "./Nav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../CSS/Poll.css";
import { handleQuestionAnswer } from "../actions/questions";
import { setPollOption } from "../actions/authedUser";
import { PieChart, Pie, ResponsiveContainer, Legend } from "recharts";
import { setLocation, setUserAnswer } from "../actions/shared";
import Login from "./Login";


const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{location, navigate, params}} />;
    };

    return ComponentWithRouterProp;
}

function Poll(props)
{
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();

    if(props.authedUser === null)
    {
        dispatch(setLocation(location.pathname));

        return(
            <Login />
        )
    }

    const question = props.questions.find(ele => ele.id === props.id.id);

    function saveAnswer(event)
    {
        event.preventDefault();

        dispatch(setPollOption({
            qid: question.id,
            answer: event.target.value
        }));

        dispatch(setUserAnswer({
            authedUser: props.authedUser.id,
            qid: question.id,
            answer: event.target.value
        }));

        dispatch(handleQuestionAnswer({
            authedUser: props.authedUser.id,
            qid: question.id,
            answer: event.target.value
        }));

        navigate("/home");

    }

    if(Object.keys(props.authedUser.answers).includes(question.id) !== false)
    {
        let questionVotes =
        question.optionOne.votes.includes(props.authedUser.id) ? question.optionOne.votes.length === 1 ? `One person voted for this option` :
        `${question.optionOne.votes.length} people voted for this option` :
        question.optionTwo.votes.length === 1 ? `One person voted for this option` :
        `${question.optionTwo.votes.length} people voted for this option`;

         let questionPercentage = question.optionOne.votes.includes(props.authedUser.id) ? `${question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length ) * 100}% voted for this option` :
                        `${question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length ) * 100}% voted for this option`;

        let pieData = [
            {   name: question.optionOne.text, value: question.optionOne.votes.length, fill: "#b06bff"  },
            {   name: question.optionTwo.text, value: question.optionTwo.votes.length, fill: "#00ff00"   }
        ]

        //this helper function is an adjusted version of the first answer from "https://stackoverflow.com/questions/55247126/recharts-pie-chart-w-value-labels-inside"

        const renderCustomizedLabel = ({
            x, y, percent
          }) => {

            return (
              <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
                {(percent * 100).toFixed(0)}%
              </text>
            );
          };

        return(
            <div>
                <Nav/>
                <div className="poll-options-done-wrapper">
                    <div className="poll-option-text">{question.optionOne.votes.includes(props.authedUser.id) ? question.optionOne.text : question.optionTwo.text}</div>
                    <div className="poll-option-votes">{questionVotes}</div>
                    <div className="poll-option-perc">{questionPercentage}</div>
                    <ResponsiveContainer width="100%" height={420}>
                        <PieChart className="poll-piechart" width={100} height={100}>
                            <Legend verticalAlign="top" align="center" className="poll-legend" layout="horizontal"/>
                            <Pie data={pieData} fill="#b06bff" dataKey="value" label={renderCustomizedLabel}  nameKey="name" cx="50%" labelLine={false} cy="50%" position="center" legendType="" innerRadius={20} outerRadius={100}/>

                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )

    }

    return(

        <div>
            <Nav/>
            <div className="poll-wrapper">
                <h1 className="poll-headline">Poll by {question.author}</h1>
                <h2 className="poll-option">Would you rather</h2>
                <div className="poll-options-wrapper">
                    <div className="poll-options">
                        <div className="poll-option-text">{question.optionOne.text}</div>
                        <button className="poll-button" value="optionOne" onClick={saveAnswer}>Submit</button>
                    </div>

                    <div className="poll-options">
                        <div className="poll-option-text">{question.optionTwo.text}</div>
                        <button className="poll-button" value="optionTwo" onClick={saveAnswer}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({authedUser, questions}, props)
{
    if(authedUser === null)
    {
        return{
            authedUser: null
        }
    }

    const id = props.router.params
    return{
        id: id,
        authedUser,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(Poll));