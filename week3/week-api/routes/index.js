var express = require('express');
var router = express.Router();
var mongo=require('mymongo1610');
var mongodb=require('mongodb');
var mon=require('mymongo1610/utils/getCollection.js');

/* GET home page. */
router.get('/api/getList', function(req, res, next) {
      mongo.find('week',function(err,result){
            if(err){
              res.json({code:0,msg:err})
            }else{
              res.json({code:1,msg:result})
            }
      })
});
router.post('/api/addList', function(req, res, next) {
   var  title=req.body.title,
        con=req.body.con;
        console.log(con,title)

  mongo.insert('week',{"title":title,"con":con},function(err,result){
        if(err){
          res.json({code:0,msg:err})
        }else{
          res.json({code:1,msg:'添加成功'})
        }
  })
});
router.post('/api/cList', function(req, res, next) {
  var  title=req.body.title,
       con=req.body.con,
       id=req.body.id;
 mongo.update('week',{"_id":id},{"title":title,"con":con},function(err,result){  
  if(err){
         res.json({code:0,msg:err})
       }else{
         res.json({code:1,msg:'修改成功'})
       }
 })
});
router.get('/api/delList', function(req, res, next) {
  var  id=req.query.id;
     console.log(1)
 mongo.delete('week',{_id:mongodb.ObjectId(id)},function(err,result){
       if(err){
         res.json({code:0,msg:err})
       }else{
         res.json({code:1,msg:'删除成功'})
       }
 })
})

// router.post('/api/cList',function(req,res,next){
//   var  title=req.body.title,
//        con=req.body.con,
//        id=req.body.id;
//        console.log(id,title)
//       mon('week',function(err,con,col){
//          if(err){
//             res.json({code:0,msg:err})
//          }else{
//             col.updateOne({"_id":mongodb.ObjectID(id)},{$set:{"title":title}},function(error,result){
//                 if(error){
//                   res.json({code:0,msg:error})
//                 }else{
//                   res.json({code:1,msg:result})
//                 }
//                 con.close();
//             })
//          }
//       })
// })


module.exports = router;
