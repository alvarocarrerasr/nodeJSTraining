/* This is a very basic example about a promise in JavaScript.
This is a ES6 feature.

We use two function arguments: result and reject so as to say the object is a
result (function worked well) or it is a reject (the opposite one)

Very Important: You can only execute one case: resolve or reject, but not both
or neither twice... (this is another difference to the callbacks). You are waiting
for information and when it arrives, you don't matter about the promise.

It is mandatory to have both arguments (resolve and reject) and they must be named
just like this:

*/
var aPromise = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve("It worked!");
    //reject("Unable to fulfill promise"); //reject won't be executed as long as resolve still exists
  },2500);

});
/*
  Method then (Promise method).
  Then provides callbacks methods for either success and fail cases.
  In a callback, we have one function that fire no matter what and the arguments
  allows us to differ if the function worked.
  In a promise, we have two functions and deppending what function fired, it will
  determine if the result is OK or not.
*/
aPromise.then((message)=>{
  console.log("Success:",message);
},(errorMessage)=>{
  console.log("Error:",errorMessage);
}
);
