// const express = require('express')
// const router = express.Router();

// router.get('/', (req,res) =>{
//     res.json([])
// })
// module.exports.router;
const User = require ('../models/user')

module.exports = function (app) {
    app.get('/users', (req, res) => {
        User.getUsers((error,data)=>{
            res.json(data)
        })
    })

    app.post('/users',(req,res)=>{
        const userData ={
            iduser:null,
            name:req.body.name,
            lastname:req.body.lastname
        }

        User.insertUser(userData, (error,data)=>{
            if(data && data.InsertID){
                res.json({
                    success:true,
                    message:'Usuario Insertado Correctamente',
                    data
                })
            }else{
                res.status(500).json({
                    success:false,
                    message:'error',
                    data
                })
            }
        })
    })

    app.put('/users/:iduser',(req,res) =>{
        const userData ={
            iduser:req.params.iduser,
            name:req.body.name,
            lastname:req.body.lastname
        }

        console.log(userData);
        User.updateUser(userData,(error,data) => {
            if(data && data.message){
                res.json(data)
            }else{
                res.json({
                    success:false,
                    message:'Error al actualizar'
                })
            }
        })
    })

    app.delete('/users/:iduser', (req,res) =>{
        const idToDelete = req.params.iduser
        User.deleteuser(idToDelete,(error,data)=>{
            if(data && data.code === 'deleted' || data.code === 'notexists'){
                res.json({
                    success:true,
                    message:'Eliminado correctameente',
                    data
                })
            }else{
                res.json({
                    success:false,
                    message:"Erro",
                    data
                })
            }
        })
    })
}