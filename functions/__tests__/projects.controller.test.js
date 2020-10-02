const projects = require("../controllers/projects.controller.js");

jest.mock('firebase', ()=>{
    const
})

test("Creates a project", () => {
    const req = {
        body: {
            projectName: "Josh",
            projectDesc: "Test project",
            projectTags: ["Test"],
            projectBody: "for testing purposes only"
        },
        params: {
            userId:"00000001"
        }
    }
    expect(projects.createProject(req).catch(e=>console.log(e))).toBe("Project created for user: " + req.params.userId);
});