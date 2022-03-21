const User = require('./user')
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const upload = require("./upload");
const fs = require('fs');
const uploadsDir = __dirname + './uploads';


module.exports = function (router) {

    // router.post('/',async(req,res)=>{
    //     console.log('hey_________post',req.body);
    //     // let user = new User();
    //     const user = await User();
    //     user.username = req.body.username
    //     user.phonenumber = req.body.phonenumber
    //     user.email = req.body.email
    //     user.password = req.body.password
    //     user.save()
    //     res.send(req.body);

    // })
    // router.get('/',(req,res)=>{
    //     res.send('Hey_____This Is get')
    // })
    router.post('/', (req, res) => {
        upload(req, res, function (err) {
            console.log("req.file---", req.file);
            console.log("req.body",req.body)
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.json({ success: false, message: 'Profile Image too large !!!' });
                } else if (err.code === 'filetype') {
                    res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!' });
                } else {
                    console.log(err);
                    res.json({ success: false, message: 'Profile Image not upload !!!' });
                }
            } else {
                if (!req.file) {
                    res.json({ success: false, message: 'No file selected !!!' });
                } else {
                    let user = new User();

                    user.name=req.body.name
                   
                    user.password=req.body.password;
                    user.email=req.body.email;
                    user.mobilenumber=req.body.mobilenumber;
                    user.profile_file = req.file.filename;
                    user.profile_url = "http://localhost:8009/uploads/"+req.file.filename;
                    user.save(function (err) {
                        if (err) {
                            console.log(err.errors.username);
                            if (err.errors.username) {
                                res.json({ success: false, message: "Name is required" });
                            }
                            else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            res.json({ success: true, message: 'Registration Successfully' });
                        }
                    });
                }
            }
        })

    })

    router.post('/book', (req, res) => {
        upload(req, res, function (err) {
            console.log("req.file---", req.file);
            console.log("req.body",req.body)
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.json({ success: false, message: 'Profile Image too large !!!' });
                } else if (err.code === 'filetype') {
                    res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!' });
                } else {
                    console.log(err);
                    res.json({ success: false, message: 'Profile Image not upload !!!' });
                }
            } else {
                if (!req.file) {
                    res.json({ success: false, message: 'No file selected !!!' });
                } else 
                {
                    let user = new User()
                    user.name = req.body.name
                    user.description = req.body.description
                    user.quantities = req.body.quantities
                    user.price=req.body.price
                    user.profile_file= req.file.filename;
                    user.profile_url = "http://localhost:8009/uploads/"+ req.file.filename;
                    user.save(function (err) {
                        if (err) {
                            console.log(err.errors.username);
                            if (err.errors.username) {
                                res.json({ success: false, message: "Name is required" });
                            }
                            else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            res.json({ success: true, message: 'Registration Successfully' });
                        }
                    });
                }
            }
        })

    })


    router.post('/userlist', (req, res) => {

    var user = new User();

        user.name = req.body.name
        user.username = req.body.username
        user.mobilenumber = req.body.mobilenumber
        user.email = req.body.email
        user.password = req.body.password
        

        if (req.body.name == null || req.body.username == null || req.body.mobilenumber == "" || req.body.email == null||req.body.password ==null ) {
            res.json({ success: false, message: 'Ensure Username,  password and email were provided' });
        } else {
            user.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.username) {
                            res.json({ success: false, message: 'Required minimum digits 3 of User Name' });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        }
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: true, message: 'Successfully Registered !' });
                }
            })
        }

    });

    
    router.post('/', (req, res) => {




        var user = new User();

        user.name = req.body.name
        user.username = req.body.username
        user.mobilenumber = req.body.mobilenumber
        user.email = req.body.email
        user.password = req.body.password
        

        if (req.body.name == null || req.body.username == null || req.body.mobilenumber == "" || req.body.email == null||req.body.password ==null ) {
            res.json({ success: false, message: 'Ensure Username,  password and email were provided' });
        } else {
            user.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.username) {
                            res.json({ success: false, message: 'Required minimum digits 3 of User Name' });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        }
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: true, message: 'Successfully Registered !' });
                }
            })
        }

    });

    router.post('/userlist', (req, res) => {

      var user = new User();

        user.name = req.body.name
        user.username = req.body.username
        user.mobilenumber = req.body.mobilenumber
        user.email = req.body.email
        
       
       

        if (req.body.name == null || req.body.username == null || req.body.mobilenumber == "" || req.body.email == null  ) {
            res.json({ success: false, message: 'Ensure Username,mobilenumber  and email were provided' });
        } 
        else
         {
            user.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.username) {
                            res.json({ success: false, message: 'Required minimum digits 3 of User Name' });
                        }
                         else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } 
                        // else if (err.errors.password) {
                        //     res.json({ success: false, message: err.errors.password.message });
                        // }
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: true, message: 'Successfully Registered !' });
                }
            })
        }

    });

    


    

    


    router.post('/login', function (req, res) {
        User.findOne({ email: req.body.email }).select('email password').exec(function (err, user) {
            if (err) throw err;
            else {
                if (!user) {
                    res.json({ success: false, message: 'email and password not provided !!!' });
                } else if (user) {
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided' });
                    } else {
                        var validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authenticate password' });
                        } else {
                            //res.send(user);
                            var token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '24h' });
                            res.json({ success: true, message: 'User authenticated!', token: token });
                        }
                    }
                }
            }
        });
    });

    router.put('/forgate', function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                // user.username = req.body.username;
                // user.phonenumber = req.body.phonenumber;
                user.password = req.body.password;
                // user.email = req.body.email;
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ success: true, message: 'Details has been updated!' });
                    }
                });
            }
        });
    })

    router.use(function (req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }
    });

    router.get('/', function (req, res) {
        User.find({}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, user: user });
            }
        });
    });

    router.get('/book', function(req, res) { 
        User.find({}, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, user: user });
            }
        });
       
    });

    router.get('/userlist', function (req, res) {
        User.find({}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, user: user });
            }
        });
    });

    router.get('/myprofile', function (req, res) {
        User.find({}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, user: user });
            }
        });
    });

    router.get('/:id', function (req, res) {
        User.findOne({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, user: user });
            }
        });
    });

    router.delete('/:id', function (req, res) {
        User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, message: 'Your Account has been delete now !!!' });
            }
        })
    });


     router.put('/:id', upload, async (req, res) => {

        User.findOne({_id: req.params.id}).exec((err, user) => {
            if(req.file == null) {
                user.name = req.body.name
                user.description = req.body.description
                user.quantities = req.body.quantities
                user.price=req.body.price
                user.save();
                console.log(err);
            } else {
                user.name = req.body.name
                user.description = req.body.description
                user.quantities = req.body.quantities
                user.price=req.body.price
                user.profile_file= req.file.filename;
                user.profile_url = "http://localhost:8009/uploads/"+ req.file.filename;
                user.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });
                res.send("update")
            }
        })
    

    })

   

    // router.put('/:id', function (req, res) {
    //     User.findOne({ _id: req.params.id }, function (err, user) {
    //         if (err) throw err;
    //         if (!user) {
    //             res.json({ success: false, message: 'No user found' });
    //         } else {
    //             user.username = req.body.username;
    //             user.mobilenumber = req.body.mobilenumber;
    //             user.email = req.body.email;
    //             user.save(function (err) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     res.json({ success: true, message: 'Details has been updated!' });
    //                 }
    //             });
    //         }
    //     });
    // })

    router.put('my/:id', function (req, res) {
        User.findOne({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user found' });
            } else {
                user.name = req.body.name
                user.username = req.body.username;
                user.mobilenumber = req.body.mobilenumber;
                user.email = req.body.email;
                user.save(function (err) {
                    if (err) {  
                        console.log(err);
                    } else {
                        res.json({ success: true, message: 'Details has been updated!' });
                    }
                });
            }
        });
    })




    return router;
}