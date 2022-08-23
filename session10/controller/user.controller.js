const async = require("hbs/lib/async")
const userModel = require("../database/models/user.model")
class User {
    static addPost = (req,res) => {
        res.render("addPost", {pageTitle:"add user post"})
    }
    static addPostLogic = async(req, res) =>{
        try {
            const userData = new userModel (req.body);
            await userData.save();
            res.redirect('/')
        }
        catch (e) {
            // res.send(e)
            res.render('addPost', {e: e.errors, pageTitle: 'add User', data: req.body})
        }
    }
    static all = async(req, res)=>{
        try {
            const users = await userModel.find();
            res.render('all', {
                users,
                pageTitle: 'all Users',
                hasUsers: users.length
            });
        }
        catch (e) {
            res.send(e.message);
        }
    }
    static single = (req, res)=>{
        const userId = req.params.id

    }
    static edit =  (req, res)=>{
        const userId = req.params.id
        try{
            const user = await userModel.findById(userId)
            res.render("edit",{
                user,
                pageTitle:"single user"
            })
        }
        catch(e){
            res.send(e)
        }
    }
    static editLogic = async(req, res)=>{
        const userId = req.params.id
        try{
            const user = await userModel.findById(userId)
            for(let prop in req.body){
                user[prop]= req.body[prop]
            }
            await user.save()
            res.redirect(`/single/${userId}`)
        }
        catch(e){
            res.send(e.message)
        }
    }
    static del = (req, res)=>{
        const userId = req.params.id
        try{
            const user = await userModel.findByIdAndDelete(userId)
            res.redirect("/")
        }
        catch(e){
            res.send(e)
        }
    }
}
module.exports = User