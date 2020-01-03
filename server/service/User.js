const User=require('./../models/User');
const log=require('./../logger');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys=require("./../config/keys");
module.exports={
    register:(body)=>{
        const {email}=body;
        return new Promise((resolve,reject)=>{
            User.findOne({ email: email }).then(user => {
                if (user) {
                    reject({ email: "Email already exists" });
                } else {
                    const newUser = new User({
                        ...body
                    });

                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user =>
                                    resolve(user))
                                .catch(err =>{
                                        log.error(err);
                                        reject(err)
                                });
                        });
                    });
                }
            });

        })

    },
    login:({email,password})=>{
        return new Promise((resolve,reject)=>{
            User.findOne({ email:email }).then(user => {
                // Check if user exists
                if (!user) {
                    reject({ emailnotfound: "Email not found" });
                }

                // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        // Sign token
                        jwt.sign(
                            payload, keys.secretOrKey, {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                if(err){
                                    log.error(err);
                                    reject(err)
                                }
                                resolve({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                         reject({ passwordincorrect: "Password incorrect" });
                    }
                });
            }).catch(error=>{
                log.error("error ",error);
                reject(error);
            })

        })

    },
    searchUsers:  ()=> {
        return new Promise((resolve, reject) => {
            User.find(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users)
                }
            });
        })
    },
    getUserById: (id)=> {
        return new Promise((resolve, reject) => {
            User.findById(id, function (err, user) {
                if (err) reject(err)
                resolve(user);
            });
        })
    },
}