const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports ={

    login(req,res){
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser)=>{

            if(err){
                return res.status(501).json({ 
                    success: false,
                    message: 'Hubo un error con la búsqueda del usuario'
                });
            }

            if(!myUser){
                return res.status(401).json({ //El cliente no tiene autorizacion para realizar esta peticion
                    success: false,
                    message: 'El email no fue encontrado',
                    error:err
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey,{ });

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname : myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    Image: myUser.image,
                    session_token : `JWT ${token}`
                }

                return res.status(201).json({
                    success:true,
                    message : 'El usuario fue autenticado',
                    data: data //El id del nuevo usuario que se registro
                });
            }
            else {
                return res.status(401).json({ //El cliente no tiene autorizacion para realizar esta peticion
                    success: false,
                    message: 'El password es incorrecto',
                    error:err
                });
            }

            
        });

    },

    register(req,res){

        const user = req.body; //capturar los datos que envia el cliente
        User.create(user, (err, data)=>{

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error:err
                });
            }

            return res.status(201).json({
                success:true,
                message : 'El registro se realizo exitosamente',
                data: data //El id del nuevo usuario que se registro
            });
        });
    }

};