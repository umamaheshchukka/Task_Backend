const User = require("../models/usermodal")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator")
const usersCntrl = {}
usersCntrl.register = async (req, res) => {
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const user = new User(body)
    try {
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword
        const response = await user.save()
        res.status(201).json(response)
    } catch (err) {
        console.log(err)
    }
}
usersCntrl.login = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(402).json({errors:errors.array()})
    }
    const body = req.body
    try {
        const user = await User.findOne({ email: body.email })
        console.log(user, 'user')
        if (!user) {
            return res.status(404).json({ error: "email or password wrong" })
        }
        const password = await bcryptjs.compare(body.password, user.password)
        if (!password) {
            return res.status(401).json({ error: "email or password is wrong" })
        }
        const tokenData = {
            id: user._id,
            role: user.role
        }
        const token = jwt.sign(tokenData, process.env.SECRET_JWT, { expiresIn: "12d" })
        res.status(200).json({ token: token })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: "internal server error" })
    }
}
module.exports = usersCntrl