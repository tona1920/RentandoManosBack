const res = require('express/lib/response');
const User = require('../models/user');

module.exports ={

    register(req,res){

        const user = req.body; //capturar los datos que envia el cliente
        User.create(user, (err, data)=>{

            if(err){
                return res.status(501)
            }
        });
    }

};