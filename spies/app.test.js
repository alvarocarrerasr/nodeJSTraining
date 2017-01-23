const expect = require("expect");
const rewire = require("rewire");

var app = rewire("./app");

describe("App",()=>{

  var db = {
    saveUser: expect.createSpy()
  }
  app.__set__('db',db);

  it("it should call the spy correctly",()=>{
    const spy = expect.createSpy();
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it("it should call the spy correctly with specific arguments",()=>{
    const spy = expect.createSpy();
    spy("Álvaro",20);
    expect(spy).toHaveBeenCalledWith("Álvaro",20);
  });

  it("Should call saveUser with user object",()=>{
    var email = "eiiuva@uva.es";
    var password = "6789";
    app.handleSignup(email,password);
    expect(db.saveUser).toHaveBeenCalledWith({email,password});
  });
});
