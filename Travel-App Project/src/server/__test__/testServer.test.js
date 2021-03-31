import 'babel-polyfill'

const req = require ('supertest')
const app = require ('../server')


describe("testing server side", () => {
    it("Should response the GET method", (done) => {
        req(app).get("/")
        .then((response) => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })

    test("Error for the wrong path", async () => {
        const response = await req(app).get("/sahar");
        expect(response.statusCode).toBe(404);
    });
})