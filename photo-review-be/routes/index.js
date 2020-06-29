module.exports = function (app) {
    console.log("hello", app)
    app.use("/student", require("./Student/student.js"))
    app.use("/teacher", require("./Teacher/teacher.js"))
    app.use("/admin", require("./Admin/admin.js"))

}