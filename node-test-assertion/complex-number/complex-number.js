/* This is a simple class to represent complex numbers.
I created this file so as to practise testing with it*/



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

function getArgument(){
  var quadrant=this.getQuadrant();
  var tmp = Math.atan(this.imaginaryPart/this.realPart);
  switch(quadrant){
    case 4:
    case 1: return tmp;
    case 2: return tmp + Math.PI;
    case 3: return tmp - Math.PI;
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
  getArgument
};

module.exports = {
  CNumber
};
