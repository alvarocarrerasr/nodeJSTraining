const supertest = require("supertest");
const expect = require("expect");

const {app} = require("./../server.js");
const {TodoTask} = require("./../modules/Todo.js");
const {User} = require("./../modules/User.js");
var testID;

const sampleTodos=[
  {
    title:"Test 0"
  },
  {
    title:"Test 1"
  },
  {
    title:"Test 2"
  },
]; /* We need sample data to populate the database*/




beforeEach((done)=>{
  TodoTask.remove({}).then(()=>{});
  TodoTask.insertMany(sampleTodos).then(()=>{done();});
});






describe("POST /todos",()=>{
  it("It should create a new Todo",(done)=>{
    var title = "Test todo text";
    supertest(app).post("/todos").send({title})
    .expect(200).expect((res)=>{
      expect(res.body.title).toBe(title);
    }).end((err,res)=>{
      if(err){
        return done(err);
      }
      TodoTask.find().then((todos)=>{
        expect(todos.length).toBe(4);
        expect(todos[3].title).toBe(title);
        done();
      }).catch((e)=>done(e));
    });
  });

  it("It should't create a new Todo with invalid body data",(done)=>{

    supertest(app)
    .post("/todos")
    .send({})
    .expect(400)
    .expect((res)=>{
      expect(res.body.errors).toNotBe(undefined);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      TodoTask.find().then((todos)=>{
        expect(todos.length).toBe(3);
        done();
      }).catch((e)=>done(e));
    });
  });
});

describe("GET /todos",()=>{

//   it("It should return all saved Todos",(done)=>{
//     supertest(app).get("/todos/")
//     .expect(200).expect(
//       (res)=>{
//       expect(res.body.length).toBe(3);
//       done();
//       }
//   ).catch((e)=>done(e))
//   }
// );

  // it("It should return a single todo",(done)=>{
  //   TodoTask.findOne({}).then(
  //     (doc)=>{
  //       testID = doc._id
  //       supertest(app).get(`/todos/${testID}`)
  //       .expect(200).expect((res)=>{
  //         expect(res.body.length).toBe(1);
  //       }
  //     ).end(done);
  //     }
  //   );
  //
  // });


});
