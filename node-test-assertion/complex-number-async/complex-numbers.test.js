const CNumber = require("./complex-number.js");
const expect = require("expect");

/*
it is a function BDD Behaviour Driven Development,
 one of the principles Mocha was based on.

*/

/*
  Estas son pruebas de caja negra (sin ver el código).
*/

/*
  23th January
  I've just modified tests so as to support asyncronous function testing.
*/

const MAXVALUE = 10;
const NUMTESTS = 6;

for (var i = 0 ; i < NUMTESTS ; i++){

  describe("Tests related to the calculus of quadrant",()=>{
    it("Compr núm 1 cuadrante",(done)=>{
      var x = (Math.random()*MAXVALUE);
      var y = (Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      number.getQuadrantAs((quadr)=>{
        expect(quadr).toBe(1);
        done();
      })
    });

    it("Compr núm 2 cuadrante",(done)=>{
      var x = -(Math.random()*MAXVALUE);
      var y = (Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      number.getQuadrantAs((quadr)=>{
        expect(quadr).toBe(2);
        done();
      })
    });

    it("Compr núm 3 cuadrante",(done)=>{
      var x = -(Math.random()*MAXVALUE);
      var y = -(Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      number.getQuadrantAs((quadr)=>{
        expect(quadr).toBe(3);
        done();
      })
    });

    it("Compr núm 4 cuadrante",(done)=>{
      var x = (Math.random()*MAXVALUE);
      var y = -(Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      number.getQuadrantAs((quadr)=>{
        expect(quadr).toBe(4);
        done();
      })
    });
  });

  describe("Tests related to the calculus of complex number argument",()=>{
    it("Compr argumento 1 caso",(done)=>{
      var x = (Math.random()*MAXVALUE);
      var y = -(Math.random()*MAXVALUE);
      var sol = Math.atan(y/x);
      var number = new CNumber.CNumber(x,y);
      number.getArgument((answer)=>{
        expect(answer).toBe(sol);
        done();
      })
    });

    it("Compr argumento 2 caso",(done)=>{
      var x = 0;
      var y = (Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      var sol = (Math.PI/2);
      number.getArgument((answer)=>{
        expect(answer).toBe(sol);
        done();
      })
    });

    it("Compr argumento 3 caso",(done)=>{
      var x = - (Math.random()*MAXVALUE);
      var y = (Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      var sol = Math.atan(y/x) + (Math.PI);
      number.getArgument((answer)=>{
        expect(answer).toBe(sol);
        done();
      })
    });

    it("Compr argumento 4 caso",(done)=>{
      var x = - (Math.random()*MAXVALUE);
      var y = 0 ;
      var number = new CNumber.CNumber(x,y);
      var sol = (Math.PI);
      number.getArgument((answer)=>{
        expect(answer).toBe(sol);
        done();
      })
    });

    it("Compr argumento 5 caso",(done)=>{
      var x = - (Math.random()*MAXVALUE);
      var y =  - (Math.random()*MAXVALUE);
      var number = new CNumber.CNumber(x,y);
      var sol = Math.atan(y/x) - (Math.PI);
      number.getArgument((answer)=>{
        expect(answer).toBe(sol);
        done();
      })
    });

    it("Compr argumento 6 caso",(done)=>{
      var x = 0;
      var y = - (Math.random()*MAXVALUE) ;
      var number = new CNumber.CNumber(x,y);
      var sol = (-(Math.PI)/2);
      number.getArgument((answer)=>{
        expect(answer).toBe(sol);
        done();
      })
    });
  });
}
