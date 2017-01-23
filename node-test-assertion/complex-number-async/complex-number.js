/* This is a simple class to represent complex numbers.
I created this file so as to practise testing with it*/


/*
  I modified the class so as to make the functions getArgument and getQuadrant
  asyncronous, as I am interesting in learning how to set up Testing in asyncronous
  functions.

  That delay could be originated due to, for instance, a simple MySQL database
  query or whatelse.

  It's very important the amount of time I set up as delay, because if it is enough
  big and tests are not modified to support asyncronous functions, Mocha will
  determine the function fails.
*/
const DELAYTIME=100;

function CNumber(realPart,imaginaryPart){
  /* Builder to set up a new Complex number using the binomical way*/
  this.realPart=realPart || 0;
  this.imaginaryPart=imaginaryPart || 0;
}

function getBinomicalString(){
  return `${this.realPart} ${this.imaginaryPart}*i`;
}

function getPolarString(){
  var module=Math.sqrt(Math.pow(this.realPart,2)+Math.pow(this.imaginaryPart,2));
  var arg = this.getArgument();
  return `${module} theta= ${arg}`;
}

function getArgument(callback){
  var quadrant=this.getQuadrant();
  var tmp = Math.atan(this.imaginaryPart/this.realPart);
  switch(quadrant){
    case 4:
    case 1:{
      setTimeout(()=>{
        callback(tmp);
      },DELAYTIME);
      break;
    }
    case 2:{
        setTimeout(()=>{
          callback(tmp + Math.PI);
        },DELAYTIME);
      break;
    }
    case 3:{
        setTimeout(()=>{
          callback(tmp - Math.PI);
        },DELAYTIME);
      break;
    }
  }
}

function getQuadrantAs(callback){
  if(this.realPart >= 0 && this.imaginaryPart >= 0){
      setTimeout(()=>{
        callback(1);
      },DELAYTIME);
  }else if(this.realPart <= 0 && this.imaginaryPart >= 0){
      setTimeout(()=>{
        callback(2);
      },DELAYTIME);
  }else if(this.realPart < 0 && this.imaginaryPart <= 0){
      setTimeout(()=>{
        callback(3);
      },DELAYTIME);
  }else{
      setTimeout(()=>{
        callback(4);
      },DELAYTIME);
  }
}

function getQuadrant(){
  if(this.realPart >= 0 && this.imaginaryPart >= 0){
    return 1;
  }else if(this.realPart <= 0 && this.imaginaryPart >= 0){
    return 2;
  }else if(this.realPart < 0 && this.imaginaryPart <= 0){
    return 3;
  }else{
    return 4;
  }
}

CNumber.prototype = {
  getBinomicalString,
  getPolarString,
  getQuadrant,
  getArgument,
  getQuadrantAs
};

module.exports = {
  CNumber
};
