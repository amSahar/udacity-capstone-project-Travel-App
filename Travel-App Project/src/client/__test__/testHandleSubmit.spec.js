import 'babel-polyfill'

import { handleSubmit } from "../js/app"


describe("Testing the submit functionality", () => {

    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    })
});