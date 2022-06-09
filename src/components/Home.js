import "../CSS/Home.css";
import Card from "./Card";
import Nav from "./Nav";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setLocation } from "../actions/shared";
import Login from "./Login";

function Home(props)
{
    const dispatch = useDispatch();
    const location = useLocation();

    if(props.authedUser === null)
    {
        dispatch(setLocation(location.pathname));

        return(
            <Login />
        )
    }

    function newQuestions()
    {
        let unansweredQuestions = [];
        let answeredQuestions = [];
        props.questions.forEach(element => {
            props.answers.includes(element.id) ? answeredQuestions.push(element) : unansweredQuestions.push(element);
        });

        return{
            answered: answeredQuestions,
            unanswered: unansweredQuestions
        };
    }

    let filteredQuestions = newQuestions();

    return(
        <div>
            <Nav/>
            <div className="home-wrapper">
                <div className="home-card-wrapper">
                    <div className="home-h1-wrapper">
                        <h1>New Question</h1>
                    </div>

                    <div className="home-content-wrapper">
                        {
                            filteredQuestions.unanswered.map(element => {
                                return <Card question={element} key={element.id}/>
                            })
                        }
                    </div>
                </div>

                <div className="home-card-wrapper">
                    <div className="home-h1-wrapper">
                        <h1>Done</h1>
                    </div>

                    <div className="home-content-wrapper">
                        {
                            filteredQuestions.answered.map(element => {
                                return <Card question={element} key={element.id}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({authedUser, questions})
{
    if(authedUser === null)
    {
        return {
            authedUser: null
        };
    }

    return{
        answers: authedUser.answers !== null ? Object.keys(authedUser.answers) : null,
        questions: questions.sort((a, b) => {
            return b.timestamp - a.timestamp
        })
    }
}

export default connect(mapStateToProps)(Home);