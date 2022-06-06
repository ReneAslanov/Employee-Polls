import Leaderboard from "../components/Leaderboard";
import store from "../store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { _getUsers } from "../utils/_DATA";
import { receiveUsers } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";

describe("setAuthedUser", () => {
    it("should create an Object, which is then passed to the reducer", async() => {
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

        const testObject = setAuthedUser(testAuthedUser);
        expect(testObject).toBeInstanceOf(Object);
        expect(testObject.id).toBe("sarahedo");
        expect(testObject.questions.length).toEqual(2);
    })
})

describe("receiveUsers", () => {
    it("should return an object with all the users", async() => {
        const users = await _getUsers();
        const testUserArray = ["sarahedo", "tylermcginnis", "mtsamis", "zoshikanlu"];

        expect(users).toBeInstanceOf(Object);
        expect(Object.keys(users)).toEqual(testUserArray);
    })
})

describe("Leaderboard", () => {
    it("should render the Leaderboard component properly", async() => {
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

        await _getUsers().then(data => {
            store.dispatch(setAuthedUser(testAuthedUser));
            store.dispatch(receiveUsers(data));
            return true;
        });

         let view = render(
        <Provider store={store}>
            <BrowserRouter>
                <Leaderboard />
            </BrowserRouter>
        </Provider>);

        const wrapper = screen.getByTestId("leaderboard-wrapper");
        expect(view).toMatchSnapshot();
        expect(wrapper).toBeInTheDocument();
    })
})