const CNumber = require("./complex-number.js");

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
    var quadrant= number.getQuadrant();
    if (quadrant != 1){
      throw new Error (`Expected 1,  but got ${quadrant}`);
    }
  });

  it("Compr núm 2 cuadrante",()=>{
    var x = -(Math.random()*MAXVALUE);
    var y = (Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    var quadrant= number.getQuadrant();
    if (quadrant != 2){
      throw new Error (`Expected 2,  but got ${quadrant}`);
    }
  });

  it("Compr núm 3 cuadrante",()=>{
    var x = -(Math.random()*MAXVALUE);
    var y = -(Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    var quadrant= number.getQuadrant();
    if (quadrant != 3){
      throw new Error (`Expected 3,  but got ${quadrant}`);
    }
  });

  it("Compr núm 4 cuadrante",()=>{
    var x = (Math.random()*MAXVALUE);
    var y = -(Math.random()*MAXVALUE);
    var number = new CNumber.CNumber(x,y);
    var quadrant= number.getQuadrant();
    if (quadrant != 4){
      throw new Error (`Expected 4,  but got ${quadrant}`);
    }
  });


it("Compr argumento 1 caso",()=>{
  var x = (Math.random()*MAXVALUE);
  var y = -(Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = Math.atan(y/x);
  if (sol != number.getArgument()){
    throw new Error (`Wrong argument x= ${x} y=${y}`);
  }
});

it("Compr argumento 2 caso",()=>{
  var x = 0;
  var y = (Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = (Math.PI/2);
  if (sol != number.getArgument()){
    throw new Error (`Wrong argument x= ${x} y=${y}`);
  }
});

it("Compr argumento 3 caso",()=>{
  var x = - (Math.random()*MAXVALUE);
  var y = (Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = Math.atan(y/x) + (Math.PI);
  if (sol != number.getArgument()){
    throw new Error (`Wrong argument x= ${x} y=${y}`);
  }
});

it("Compr argumento 4 caso",()=>{
  var x = - (Math.random()*MAXVALUE);
  var y = 0 ;
  var number = new CNumber.CNumber(x,y);
  var sol = (Math.PI);
  if (sol != number.getArgument()){
    throw new Error (`Wrong argument x= ${x} y=${y}`);
  }
});

it("Compr argumento 5 caso",()=>{
  var x = - (Math.random()*MAXVALUE);
  var y =  - (Math.random()*MAXVALUE);
  var number = new CNumber.CNumber(x,y);
  var sol = Math.atan(y/x) - (Math.PI);
  if (sol != number.getArgument()){
    throw new Error (`Wrong argument x= ${x} y=${y}`);
  }
});

it("Compr argumento 6 caso",()=>{
  var x = 0;
  var y = - (Math.random()*MAXVALUE) ;
  var number = new CNumber.CNumber(x,y);
  var sol = (-(Math.PI)/2);
  if (sol != number.getArgument()){
    throw new Error (`Wrong argument x= ${x} y=${y}`);
  }
});


}
