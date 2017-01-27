const {mongoose} = require("./../db/mongoose-setup.js");
const {ObjectId} = require("mongodb");
const {TodoTask} = require("./../modules/Todo.js");

const id = '588b2d3e41f33d19e516aade6';

if(!ObjectId.isValid(id)){
  console.log("ID is not valid");
  mongoose.disconnect();
  return;
}

/* Two ways to perform the same operation */

// TodoTask.findOne({
//   _id : new ObjectId(id)
// }).then(
//   (doc)=>{
//     if(!doc){
//       console.log("Element not found");
//       return;
//     }
//     console.log(doc);
//   },
//   (error)=>{
//     console.log(error);
//   }
// );

TodoTask.findById(id).then(
  (doc)=>{
    if(!doc){
      console.log("ID not found");
      return;
    }
    console.log(doc);
  },
  (error)=>{
    console.log(error);
  }
).catch((e)=>console.log(e));

mongoose.disconnect();
