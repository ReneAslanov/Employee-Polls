import Login from "../components/Login";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
    it("should render the Login component properly", () => {
        let view = render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>);

        const userName = screen.getByTestId("user");
        const password = screen.getByTestId("password");
        expect(view).toMatchSnapshot();
        expect(userName).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    })
})