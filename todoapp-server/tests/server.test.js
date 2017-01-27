const supertest = require("supertest");
const expect = require("expect");

const {app} = require("./../server.js");
const {TodoTask} = require("./../modules/Todo.js");
const {User} = require("./../modules/User.js");

beforeEach((done)=>{
  TodoTask.remove({}).then(()=>
  {
    done();
  });
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
        expect(todos.length).toBe(1);
        expect(todos[0].title).toBe(title);
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>done(e));
    });
  });
});
