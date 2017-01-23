const CNumber = require("./complex-number.js");
const expect = require("expect");

/*
it is a function BDD Behaviour Driven Development,
 one of the principles Mocha was based on.

*/

/*
  Estas son pruebas de caja negra (sin ver el código).
*/

const MAXVALUE = 10;
const NUMTESTS = 600;

for (var i = 0 ; i < NUMTESTS ; i++){
  it("Compr núm 1 cuadrante",()=>{
    var x = (Math.random()*MAXVALUE);
    var y = (Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    expect(number.getQuadrant()).toBe(1);
  });

  it("Compr núm 2 cuadrante",()=>{
    var x = -(Math.random()*MAXVALUE);
    var y = (Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    expect(number.getQuadrant()).toBe(2);
  });

  it("Compr núm 3 cuadrante",()=>{
    var x = -(Math.random()*MAXVALUE);
    var y = -(Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    expect(number.getQuadrant()).toBe(3);
  });

  it("Compr núm 4 cuadrante",()=>{
    var x = (Math.random()*MAXVALUE);
    var y = -(Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    expect(number.getQuadrant()).toBe(4);
  });


it("Compr argumento 1 caso",()=>{
  var x = (Math.random()*MAXVALUE);
  var y = -(Math.random()*MAXVALUE);
  var sol = Math.atan(y/x);
  var number = new CNumber.CNumber(x,y);
  expect(number.getArgument()).toBe(sol);
});

it("Compr argumento 2 caso",()=>{
  var x = 0;
  var y = (Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = (Math.PI/2);
  expect(number.getArgument()).toBe(sol);
});

it("Compr argumento 3 caso",()=>{
  var x = - (Math.random()*MAXVALUE);
  var y = (Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = Math.atan(y/x) + (Math.PI);
  expect(number.getArgument()).toBe(sol);
});

it("Compr argumento 4 caso",()=>{
  var x = - (Math.random()*MAXVALUE);
  var y = 0 ;
  var number = new CNumber.CNumber(x,y);
  var sol = (Math.PI);
  expect(number.getArgument()).toBe(sol);
});

it("Compr argumento 5 caso",()=>{
  var x = - (Math.random()*MAXVALUE);
  var y =  - (Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = Math.atan(y/x) - (Math.PI);
  expect(number.getArgument()).toBe(sol);
});

it("Compr argumento 6 caso",()=>{
  var x = 0;
  var y = - (Math.random()*MAXVALUE) ;
  var number = new CNumber.CNumber(x,y);
  var sol = (-(Math.PI)/2);
  expect(number.getArgument()).toBe(sol);
});


}
