import { Link } from "react-router-dom";
import "../CSS/Error.css";

function ErrorPage()
{
    return(
        <div className="error-wrapper">
            <h1 className="error-header">This URL does not exist or you are not logged in</h1>
            <Link to={"/"} className="error-button">Back To Login</Link>
        </div>
    )
}

export default ErrorPage;