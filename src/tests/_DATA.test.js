import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from "../utils/_DATA";

describe("_saveQuestion", () => {
    it(`should return the questions object with all prior questions
        and the correctly formatted, newly added question`, async() => {
            const testQuestion = {
                author: "sarahedo",
                optionOneText: "test option one",
                optionTwoText: "test option two"
            };

            const actualQuestion = await _saveQuestion(testQuestion);
            expect(actualQuestion.author).toBe("sarahedo");
            expect(actualQuestion.optionOne.text).toBe("test option one");
            expect(actualQuestion.optionTwo.text).toBe("test option two");
        });

    it("should fail if improper/incomplete data is passed in as the argument", async() => {
        const testQuestionOne = {};
        const testQuestionTwo = {
            author: "sarahedo",
            optionOne: "test option one"
        };

        await expect(_saveQuestion(testQuestionOne)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
        await expect(_saveQuestion(testQuestionTwo)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });
});

describe("_getUsers", () => {
    it("should return an object with all Users", async() => {
        const objectKeys = ["sarahedo", "tylermcginnis", "mtsamis", "zoshikanlu"];
        const actualUsers = await _getUsers();
        const keys = Object.keys(actualUsers);

        await expect(_getUsers).toBeInstanceOf(Object);
        expect(keys.sort()).toEqual(objectKeys.sort());
    });
});

describe("_getQuestions", () => {
    it("should return an object with all questions", async() => {
        const actualQuestions = await _getQuestions();
        const testArray = ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez", "am8ehyc8byjqgar0jgpub9"];

        expect(actualQuestions).toBeInstanceOf(Object);
        expect(Object.keys(actualQuestions)).toEqual(expect.arrayContaining(testArray));
        expect(actualQuestions[testArray[0]].author).toBe("sarahedo");
    });
});

// if any test is put below the _saveQuestionAnswer test, it stops working because its trying to access the users object referenced in _saveQuestionAnswer

describe("_saveQuestionAnswer", () => {
    it(`should update the users object with the answer saved for the authed-User,
        aswell as the questions object and return true`, async() => {
            const testUser = {
                authedUser: "sarahedo",
                qid: "8xf0y6ziyjabvozdd253nd",
                answer: "optionOne"
            };

            const actualAnswer = await _saveQuestionAnswer(testUser);
            expect(actualAnswer).toBe(true);
    });

    it("should fail if improper/incomplete data is passed in as the argument", async() => {
        const testUserOne = {
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd"
        };

        const testUserTwo = [];

        await expect(_saveQuestionAnswer(testUserOne)).rejects.toEqual("Please provide authedUser, qid, and answer");
        await expect(_saveQuestionAnswer(testUserTwo)).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
});