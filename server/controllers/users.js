
const UserService=require('./../service/User')
// Load input validation
const validateRegisterInput = require("./../validation/register");
const validateLoginInput = require("./../validation/login");

module.exports={
    register: (req, res) => {
        // Form validation

        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        UserService.register(req.body).then(user=>{
            return res.json(user)
        }).catch(error=>{
            return res.status(400).json(error)
        })

    },

    login: (req, res) => {
        // Form validation

        const { errors, isValid } = validateLoginInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        UserService.login(req.body).then(data=>{
            return res.status(200).json(data)
        }).catch(err=>{
            return res.status(400).json(err)
        })

    },
    searchUsers:  (req, res) =>{
        UserService.searchUsers().then((users) => {
            res.status(200).json(users);
        }).catch((err) => {
            res.status(400).json({errorMessage:"User not found"})
        });
    },
    getUserById:  (req, res) =>{
        let id = req.params.id;
        UserService.getUserById(id).then(user => {
            res.status(200).json(user);
        });
    },
}