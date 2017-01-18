/* Advanced Promises.
This is a exercise very similar to the basic one, but this time I gonna use
I/O.
*/

/*
  a = índice de la raíz.
  b = radicando de la raíz
*/
var funcRaiz = (a,b) => {
  return new Promise((resolve,reject)=>{
    if(typeof a != "number" || typeof b != "number"){
      reject("Tanto a como b deben ser números");
    }else if(a < 1){
      reject("El índice debe ser, al menos, 1")
    }else if( a % 2 == 0 && b < 0){
      /* Si a es par (índice par) entonces a debe ser positivo*/
      reject ("No permitimos números imaginarios");
    }else{
      resolve(Math.pow(b,1/a));
    }
  });
};

funcRaiz(2,16.5).then(
  (okMessage)=>{
    console.log("OK:",okMessage);
  },
  (errMessage)=>{
    console.log("Error:",errMessage);
  }
);
