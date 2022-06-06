import New from "../components/New";
import store from "../store";
import {setAuthedUser} from "../actions/authedUser";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("New", () => {
    it("should render the component properly and the input fields should have proper values when changed", () => {
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
                    <New/>
                </Provider>
            </MemoryRouter>
        )

        expect(view).toMatchSnapshot();
        expect(screen.getByText("Would You Rather")).toBeInTheDocument();

        const inputOne = screen.getByTestId("option-1");
        const inputTwo = screen.getByTestId("option-2");

        fireEvent.change(inputOne, {target: {value: "test option one"}});
        fireEvent.change(inputTwo, {target: {value: "test option two"}});

        expect(inputOne.value).toEqual("test option one");
        expect(inputTwo.value).toEqual("test option two");
    })

})