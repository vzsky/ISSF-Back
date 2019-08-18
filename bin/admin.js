const path = require('path')
const __bin = path.join(__dirname, '../bin')
const User = require(path.join(__bin, 'models', 'users'))
const Project = require(path.join(__bin, 'models', 'project'))
const Schema = require(path.join(__bin, 'validation'))
const bcrypt = require('bcryptjs')
const jsonify = require(path.join(__bin, 'jsonify'))
const devlog = require(path.join(__bin, 'log'))

async function userRegist (req, res) {

    // req.body.project contains project code
    // send req.body.project = _id
    if (req.body.hasOwnProperty("project")) {
        ProjectFromCode = await Project.findOne({code : req.body.project})
        if (!ProjectFromCode) {
            return jsonify(res, "project not found", {httpcode : 400})
        }
        req.body.project = ProjectFromCode._id
    }

    // console.log(typeof req.body.project)
    // console.log(req.body.project)
    let Validation = Schema.RegistValidate(req.body)
    if (Validation.error){
        return jsonify(res, Validation.error.details[0].message, {httpcode : 400})
    }
    let valid = Validation.value

    let UserExist = await User.findOne({username : valid.username})
    if (UserExist) {
        return jsonify(res, "username already used", {httpcode : 400})
    }

    //hasing
    let salt = await bcrypt.genSalt(10)
    let hashedPass = await bcrypt.hash(valid.password, salt)

    let user = new User({
        username: valid.username,
        password : hashedPass,
        permission : valid.permission,
        name : valid.name,
        school : valid.school,
        country : valid.country,
        email : valid.email,
        project : valid.project,
    })

    try {
        let savedUser = await user.save()
        devlog('"'+user.username+'" is created')
        return jsonify(res, null, {user: savedUser})
    }catch (e){
        return jsonify(res, e, {httpcode : 400})
    }
}

async function projectRegist (req, res) {

    let Validation = Schema.ProjectValidate(req.body)
    if (Validation.error){
        return jsonify(res, Validation.error.details[0].message, {httpcode : 400})
    }
    let valid = Validation.value

    let ProjectExist = await Project.findOne({username : valid.username})
    if (ProjectExist) {
        return jsonify(res, "Project already exist", {httpcode : 400})
    }

    let project = new Project({
        name : valid.name,
        branch : valid.branch,
        code : valid.code,
    })

    try {
        let savedProject = await project.save()
        devlog(`${savedProject.code}is created`)
        return jsonify(res, null, {project: savedProject})
    }catch (e){
        return jsonify(res, e, {httpcode : 400})
    }
}

module.exports = {
    userRegist : userRegist,
    projectRegist : projectRegist,
}