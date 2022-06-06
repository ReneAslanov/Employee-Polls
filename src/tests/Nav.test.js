import Nav from "../components/Nav";
import store from "../store";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

describe("Nav", () => {
    it("should have all the links present", async() => {
        const testAuthedUser = {
            id: "sarahedo",
            avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_juC_cG7iLmwAaK4Mxxy-OtJ52335hZfHhiS5eSHGp9a0C9OY67183F9TV4t01DNILs&usqp=CAU",
            answers: {
                "8xf0y6ziyjabvozdd253nd": 'optionOne',
                "6ni6ok3ym7mf1p33lnez": 'optionOne',
                "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                "loxhs1bqm25b708cmbf3g": 'optionTwo'
              },
            questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
        }

        store.dispatch(setAuthedUser(testAuthedUser));

        const view = render(
            <MemoryRouter initialEntries={["/home"]}>
                <Provider store={store}>
                    <Nav />
                </Provider>
            </MemoryRouter>
        );
        expect(view).toMatchSnapshot();

        const home = screen.getByText("Home");
        const leaderboard = screen.getByText("Leaderboard");
        const newLink = screen.getByText("New");
        const logout = screen.getByText("Logout");

        expect(home).toBeInTheDocument();
        expect(leaderboard).toBeInTheDocument();
        expect(newLink).toBeInTheDocument();
        expect(logout).toBeInTheDocument();
    })

})