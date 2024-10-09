//在这里定义和用户相关的路由处理函数,供router/user.js模块使用

const bcrypt = require('bcryptjs');
const db = require('../db/index');
const jwt = require('jsonwebtoken')
const config = require('../config')
const uuid = require('uuid');
module.exports.regUser = (req,res)=>{
    //获取客户端提供的用户数据
    const userinfo = req.body
    
    if(!userinfo.username || !userinfo.password){
        return res.send({status:1,message:'用户名或者密码不能为空'})
    } 
    let sqlStr = `select * from users where username=?`;
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            return res.send({status:1,message:err.message})
        }
        if(results.length>0){
            return res.send({status:1,message:'用户名被占用'})
        }
    })
    //调用bcrpyt.hashSync()对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password,10);
    let insertSql = 'insert into users set ?';
    db.query(insertSql,{id: uuid.v1(),username:userinfo.username,password:userinfo.password,user: userinfo.username},(err,results)=>{
        if(err){
            return res.cc(err)
        } 
        if(results.affectedRows !== 1){
            return res.send({status:1,message:'注册失败'})
        }
        res.send({status: 0, message: '成功'})
})
}
exports.login = (req,res)=>{
    const userinfo = req.body;
    const sql = `select * from users where username=?`;
    
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length !==1)return res.cc('账号或密码错误')
        //判断密码是否正确
       const compare = bcrypt.compareSync(userinfo.password,results[0].password.toString())
       
       if(!compare)return res.cc('密码错误')

       const user = {...results[0],password:'',user_pic:''} 
       //对用户名的信息进行加密
       const tokenStr = jwt.sign(user,config.jwtSecreKey,{expiresIn:'10h'})
       const sql2= `update users set token = '${tokenStr}' where username = '${userinfo.username}'`;
       
       db.query(sql2,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows !==1)return res.cc('登录失败')
            res.send({status:0,message:'登录成功',
                token:tokenStr
            })
       })

    })   
}
exports.exit = (req,res)=>{
    const userinfo = req.body;
    const sql = `select * from users where username= '${userinfo.username}'`;
    console.log(sql);
    
    db.query(sql,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        console.log(results);
        if(results.length !==1)return res.cc('用户不存在')
        const sql2 = `update users set token = '' where username = ${db.escape(userinfo.username)}`;
        console.log(sql2);
        
    db.query(sql2,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows !==1)return res.cc('退出失败')
        res.send({status:0,message:'退出成功'})
    })
    })   
}