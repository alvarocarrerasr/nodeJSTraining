# Guía personal de JS
Por favor, lee el fichero README.md, ubicado en esta carpeta para entender el propósito de esta guía.

Una de las cosas más importantes es que no hay un orden predefinido or el momento (para eso existe Ctrl+F) y que la iré actualizando cuando tenga tiempo y descubra cosas nuevas.

Obviamente, la guía puede contener errores. En ese caso, te agradecería que abrieras una issue desde la opción correspondiente del repositorio.

## Incrustar un fichero JS en HTML
Para incrustar un fichero JS en un fichero HTML utilizaremos la siguiente instrucción HTML:

```html
<script language="javascript" src="fichero.js"></script>
```

## Todo son objetos (o una primitiva)
En JS, todo lo que podemos construir son, o bien objetos, o bien primitivas. Así pues, JS es uno de los pocos lenguajes de programación que podemos emplear para construir closures o funciones de primer orden. Sin embargo, a pesar de esto, cada “tipo” tiene una serie de propiedades.

Es importante destacar la importancia de la propiedad prototipo, que podemos encontrar en los objetos. Es la forma de utilizar herencia en JavaScript y se verá en la parte “POO en JavaScript”.

Con la definición escrita arriba, es fácil darse cuenta de que es posible que los objetos contengan funciones y, a su vez, estas, otros objetos...
## Propiedades de las funciones:

* Nombre (opcional): es el nombre de la función. Es inexistente (undefined) cuando la función es anónima.
Code: donde se albergará el código a ejecutar cuando llamemos a la función. Es invocable mediante () o call()/apply().

* Call, Apply, Bind: ver el apartado correspondiente.

## Objetos en objetos
La sintaxis ES6 de JS nos permite guardar objetos en objetos solo usando el nombre del mismo. Así pues, ambas variables son equivalentes:

``` javascript
var var1={
	obj1:obj1,
	obj2:obj2
};
```
y

``` javascript
var var2={
	obj1,
	obj2
};
```

### Creación de variables a partir de propiedades de objetos

ES6 nos propone una forma de extraer o crear una variable a partir de una propiedad de un objeto:
Por ejemplo:
```javascript
var user = {name:"Álvaro",surname:"Carreras"};
var {name} = user;
```

## Closures and Callbacks
* Closures: closures son funciones que retornan otras funciones. Por ejemplo:
	```javascript
	function raiz (indice){
		return function (raiz){
			return Math.pow(raiz,1/indice);
		}
	}

	var raizCuadrada = raiz(2); /* Se ha creado un contexto de ejecucion en el que el índice queda instanciado a 2*/
	var raizCuadradaDeDos = raiz(2,2); //1.41...

	```
* Callbacks: callbacks son funciones que se ejecutan cuando se ha efectuado una operación, son muy utilizadas en JavaScript para indicar, por ejemplo, cuándo una operación asíncrona se ha ejecutado. En las versiones más recientes, sustituiremos callbacks por Promises, ya que estas últimas permiten concatenar mucho mejor el tratamiento de errores.
Además, las Promises solo pueden tener un estado (acierto/fallo).
```javascript
function suma(a,b, callback){
	if (typeof a != Number || typeof b!= Number){
		callback("Wrong arguments");
	}else{
		callback(undefined,(a+b));
	}
}

suma(3,2,function (error,acierto){
	if(!error){
		console.log(acierto);
		return;
	}
	console.log("Error",error);
	}
);
```

## Programación funcional en JS
Con el simple hecho de que en JS todas las funciones sean objetos, y estos pueden ser pasados por argumentos, la programación funcional se simplifica exponencialmente (a niveles que ya le gustaría a Haskell xDDD).
Las tres operaciones más básicas de la programación funcional son map, filter and reduce:

* map: Se utiliza para aplicar una cierta operación a todos los elementos de la colección.
	```javascript
	var array0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	function mapForEach(arr, funct){
		var arrayToReturn=[];
		for(var i=0;i<arr.length;i++){
			arrayToReturn.push(funct(arr[i]));
		}
		return arrayToReturn;
		}

	var array2=mapForEach(array0,function(value){
		return value*value;
		});
	```
* filter: se utiliza para filtrar elementos de una colección, basándose en que cumplan una cierta condición.
	```javascript
	function filter(arr,func){
	var arrayToReturn=[];
	for(var i=0;i<arr.length;i++){
		if(func(arr[i])) arrayToReturn.push(arr[i]);
	}

	return arrayToReturn;
	}

	var array0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

	var array3=filter(array0,function(value){
		if(value%2==0) return true;
		return false;
	} // array3 solo tendrá aquellos elementos de array0 que fueran pares.
	);
	```
* reduce: se utiliza para devolver un único valor que viene determinado por los valores de la colección:
```javascript
function reduce(arr,func){
var valueToReturn = 0;
for(var i=0;i<arr.length;i++){
	valueToReturn+=func(arr[i]);
}

return arrayToReturn;
}

var array0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

var array4=reduce(array0,function(value){
	if(value%2==0) return value;
	return 0;
} // array4 tendrá la suma de todos los elementos pares de la colección.
);
```
## Call, apply and bind
Call, apply y bind son tres propiedades (en concreto, funciones) que tienen todos los objetos funciones en JavaScript:

* call(objetoJS, argumentos...): Es equivalente a indicar objetoJS(argumentos...). Es decir, ejecuta la función.

* apply(objetoJS, [argumentos…]): similar a call, pero en vez de pasar los argumentos separados por comas, se deberán pasar como un array.

* bind(objetoJS): se utiliza para unir un objeto a una función. Es decir, supongamos que tenemos una función cualquiera y queremos “unirla” al contexto de un objeto. Bind crearía una copia del objeto función y lo “uniría al objeto”. Bind no ejecuta la función.

Ejemplo:

``` javascript
function imprimeDatos(){
	return "Edad="+this.getEdad();
}

var persona={edad:20, function getEdad(){return this.edad}};

var ejecutaFunc=imprimeDatos.bind(persona);
ejecutaFunc(); //resultado= Edad=20
```

## Function borrowing
Con apply() y call() podemos realizar function borrowing, es decir, que una función tenga acceso a métodos que no tiene declarados ella misma, sino que utiliza los de otros objetos.

Ex:
``` javascript
var persona2={edad:19};
var functBorr=persona.getEdad(persona2);
functBorr(); //resultado= Edad=19
```

## Function currying
Este fenómeno se produce cuando utilizamos bind acompañado de una serie de argumentos y se utiliza para “fijar” los argumentos de una determinada función.
Por ejemplo:

``` javascript
function raiz(valorA,valorB){
	return Math.pow(valorB, (1/valorA));
}
```
Supongamos que ahora quiero tener una función que realice raíces cuadradas, pero también raíces quintas. Una posible alternativa sería realizando una función general y pasarle como parámetro 3 o 5. También puedo realizar:

``` javascript
var raizCuadrada=raiz.bind(this,2); /* ahora todas las llamadas a raizCuadrada(X) me devolverán la raíz cuadrada de X.
*/
```

y
```javascript
var raizQuinta=raiz.bind(this,5);
```
Function Currying crea una copia de una función, fijando los argumentos que se hayan prefijado.

## JSON
XML y JSON son dos formatos de transferencia de información por Internet. Sin embargo, el segundo es hoy en día mucho más usado que el primero porque este exige enviar mucha más información (la estructura se envía por duplicado).

Los objetos en JSON (JavaScript Object Notation), que son, al fin y al cabo, meros Strings son algo muy distinto a los objetos en JavaScript y es, de hecho, un error muy común confundirlos.

La diferencia principal entre JSON y un objeto en JavaScript es que las propiedades en JSON deben ir entrecomilladas, al igual que los valores que son cadenas de caracteres.

Cualquier objeto JSON puede ser interpretado como un objeto JS, pero no al revés.

Similarmente, tampoco podremos generar un String JSON a partir de un objeto JS que contenga una función.

Debido a la alta popularidad de JSON y lo fácil que resulta utilizarlo y entenderlo para los programadores de JS, el mismo lenguaje contiene dos funciones built-in que manejan JSON:

* JSON.stringify(objetoJS, valorReemplazo, espacioEntreElementos): convertirá el objeto en uno en formato JSON (String correspondiente).

* JSON.parse(objetoJSON): convertirá un objeto en formato JSON en uno en formato JS.

## Otra forma de definir funciones en JS
Podemos definir funciones en JS de dos formas:

* Clásica:

``` javascript
function [nombrefuncion](argumentos){}
```
El nombre de la función no tiene por qué aparecer (puede ser anónima).

* Arrow functions:
  * Notación 1:  
  ``` javascript
  (argumentos)=>{}
  ```
No puedo acceder a las propiedades de this.
No puedo acceder a la variable “arguments”
Es preferible por ser mucho más visible
  * Notación 2:
  ``` javascript
  () {}
  ```
Puedo acceder a las propiedades de this.
Puedo acceder a la variable arguments.

## POO en JavaScript
### Creación de objetos en JS
Primeramente deberemos definir el constructor
``` javascript
function Persona(nombre,apellidos,edad){
	this.nombre=nombre;
	this.apellidos=apellidos;
	this.edad=edad;
}
```
Nota: es muy importante el uso de la variable this para referirse al objeto actual.

Y generar un objeto nuevo:
``` javascript
var nuevoObjeto = new Persona('Álvaro','Carreras',edad);
```
### Los prototipos
Javascript no utiliza el paradigma clásico de orientación a objetos (aquel del extend) en el que una clase hereda de otra y los objetos que son instancia de la misma heredan todos estos atributos.

En JS existen los prototipos y se basan fundamentalmente en contextos de ejecución. Así pues, cuando ejecutemos un determinado método, JS primero buscará entre todos aquellos del objeto y, en caso de no encontrarlo allí, buscará dentro del prototipo y luego dentro del prototipo del prototipo, y así sucesivamente.

De esta forma, es muy fácil hacer que un objeto herede los métodos de otro. Simplemente deberemos escribir de la función constructora:

``` javascript
Persona.prototype=objetoDesdeElQueHeredar;
```

El prototipo básico de cualquier función es Empty() y el de cualquier objeto, Object{}.

Cabe destacar la función hasOwnProperty(property), que comprueba si un objeto tiene una determinada propiedad. Es decir, devolverá true si esa propiedad está en el mismo objeto (no en uno de sus prototipos). También se puede iterar por el conjunto de propiedades de un objeto (y de sus prototipos):

``` javascript
for(entrada in objeto){
	console.log(entrada);
}
```
### Métodos de instancia en JS
Similarmente, es posible crear métodos que modelen el comportamiento del objeto recién creado:

``` javascript
Persona.prototype.getNombre=function(){
	return this.nombre;
}
```
Ejecutándose por:

``` javascript
	var nuevoObjeto=new Persona("w","k",9);
	console.log(nuevoObjeto.getNombre());
```

o incluso,

``` javascript
Persona.prototype.setNombre=function(nombreNuevo){
	this.nombre=nombreNuevo;
}
```
### "Herencia" en Underscore.JS
La librería UnderscoreJS (http://underscorejs.org/) , muy útil en el desarrollo de aplicaciones JS, y que cuenta con un alto número de métodos utilizables en programación funcional, cuenta con una función denominada extend

```javascript
_.extend(objetoDestino,objetoOrigen...);
```

que copia todas las propiedades del conjunto de atributos que le pasemos en objetoOrigen... en el objeto objetoDestino.

He entrecomillado herencia, ya que no es una herencia propiamente dicha, ni utiliza la POO al estilo JavaScript (con prototipos).

## Promesas

Las promesas son una característica tíipica de ES6, aunque es posible encontrar esta misma caracterísitca usando módulos adicionales en otras versiones de JS.
Las promesas son una alternativa a las callbacks y resultan muy útiles para indicar de manera única, si ha habido éxito o fracaso en la operación, a diferencia de las callbacks. Es decir, cuando una promesa ha sido settled (fijada) no podemos cambiar el valor de éxito o fracaso de la misma.
Para construir una promesa utilizaremos el constructor:
```javascript
//solo escenario de éxito
var aPromise = new Promise((resolve,reject)=>{
    resolve("It worked!");
});

//o, solo escenario de fracaso
var aPromise = new Promise((resolve,reject)=>{
    reject("Unable to fulfill promise");
});
```
Muy importante destacar que deben existir dos argumentos (resolve y reject), se deben llamar así y que estos solo aceptan **1 argumento**.

Otra de las diferencias con las callbacks, es que con estas últimas inferíamos el éxito o fracaso de la operación dependiendo de qué argumento ha sido instanciado. En las promesas solo ejecutaremos el método adecuado, por lo que la comprobación es mucho más sencilla:
```javascript
aPromise.then((message)=>{
  console.log("Success:",message);
	},(errorMessage)=>{
  console.log("Error:",errorMessage);
	}
);
```
