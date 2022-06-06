import "../CSS/Home.css";
import Card from "./Card";
import Nav from "./Nav";
import { connect } from "react-redux";
import ErrorPage from "./ErrorPage";

function Home(props)
{

    if(props.authedUser === null)
    {
        return(
            <ErrorPage />
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
            return a.timestamp - b.timestamp
        })
    }
}

export default connect(mapStateToProps)(Home);