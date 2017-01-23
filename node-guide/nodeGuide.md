# Guía personal de NodeJS
Por favor, lee el fichero README.md, ubicado en esta carpeta para entender el propósito de esta guía.

Una de las cosas más importantes es que no hay un orden predefinido or el momento (para eso existe Ctrl+F) y que la iré actualizando cuando tenga tiempo y descubra cosas nuevas.

Obviamente, la guía puede contener errores. En ese caso, te agradecería que abrieras una issue desde la opción correspondiente del repositorio.

## Características de Node JS
* I/O no bloqueante.
* Una fantástica comunidad de desarrolladores en www.npmjs.com
* Guiado por eventos.

## Variables globales de Node JS
* global: Contiene información general del sistema sobre el que se está ejecutando la instancia de NodeJS.

* process: vienen definidas funciones que podemos utilizar sin necesidad de estar haciendo require.

* module: nos centraremos en exports, que nos permitirá exportar objetos para usarlos en otros módulos. Además, contiene otra información importante sobre el fichero o módulo sobre el que se ejecuta.

## Paso por argumentos en la ejecución de NodeJS

La variable global process contiene un argumento, argv que nos permite obtener los argumentos incluidos en la consola del sistema para iniciar nuestra aplicación node.

## Ejecución de instrucciones en NodeJS
NodeJS cuenta con tres ED con las que se basa a la hora de ejecutar las diferentes instrucciones del código:

* Call stack (pila): es donde se colocarán cada una de las variables, objetos y llamadas a funciones/procedimientos que se hagan en el ámbito de ejecución del método, ** y que se vayan a ejecutar/tratar en el momento ** .

* Node APIS: en esta parte se almacenarán aquellas llamadas a funciones que se hagan de forma asíncrona (así pues, las llamadas a setTimeout (function,time) pasarán por esta parte).

* Callback-Queue: La cola de callbacks estará formada por todas aquellas funciones/procedimientos de tipo asíncrono que ya se hayan ejecutado (obtenido información de una Base de Datos, hecha una petición HTTP... ).

A su vez, tendremos el **event-loop** que, si detecta que la pila está vacía (IDLE), procederá a extraer el más antiguo elemento de la Callback-Queue.

Es decir, a diferencia de una instrucción bloqueante (síncrona) que entraría en la pila y no dejaría que se ejecutara la siguiente instrucción, las no-bloqueante (asíncrona) esperarían en la Callback-Queue una vez tengan los recursos que se les solicita, antes de pasar a la pila y, por tanto, no pasarán a la pila hasta que el conjunto de instrucciones de la pila se hayan procesado.

## Extendiendo Node JS y la API de NodeJS
Desde la URL www.npmjs.com podemos encontrar un enorme repositorio de módulos desarrollados por terceros que nos pueden resultar muy útiles para nuestra aplicación.

Similarmente, la API de NodeJS, cuya documentación se encuentra en la URL https://nodejs.org/api/index.html incluye muchos de los módulos que encontraríamos en cualquier lenguaje de programación actual. Para poder usarlos, primero deberemos guardar el contenido de los módulos en una variable, que por lo general suele ser constante, ya que no nos interesará modificar los métodos.
Así pues, con la instrucción:
``` javascript
const constante=require('os');
```
Importaríamos todos los métodos y variables del módulo ‘OS’.

Es importante indicar que require obtiene los argumentos de una forma relativa a la path en la que se encuentre el usuario, así, si deseamos requerir un fichero en la misma carpeta escribiremos

``` javascript
require("./fichero.js");
```

Recordar que solo tendremos acceso a los métodos y variables que estén dentro de module.exports.

## Tratamiento de excepciones en NodeJS (muy importante)

NodeJS trata de una forma distinta las funciones asíncronas de las síncronas y, por consiguiente, también los errores que estas puedan producir. Así bien, las funciones asíncronas (con callback) tendrán un argumento (la función) con dos mensajes: err y data:

```javascript
var textoLeido=readData("fichero.txt", function(err,data){
	if(err){ return "Error" }
	 return data;
});

```
Sin embargo, las funciones síncronas seguirán utilizando los try, catch que podemos tener en Java o C++:

```javascript
try{
var textoLeido=readDataSync("fichero.txt");
}
catch(Exception){
	console.log("Error");
}
```

Más información en https://www.joyent.com/node-js/production/design/errors.

## Debugging en NodeJS
NodeJS cuenta con un Debugger llamado debug y ejecutable mediante el comando debug: node debug [file].

Contaremos con los siguientes comandos:

* c: para continuar, esto es, para seguir ejecutando el código hasta la siguiente instrucción debugger en nuestro código o hasta el final de la aplicación.

* n: para ejecutar la siguiente sentencia.

* repl: para pasar al modo entrada-ejecución (modo REPL).

* quit: para salir del debugger.

## Testing en NodeJS

### Aserción con MochaJS

Para testear nuestro código utilizaremos el framework MochaJS. MochaJS nos permitirá ejecutar los tests de forma automática, de tal forma que, a medida que añadimos nuevo código a nuestro desarrollo, resultará muy sencillo testearlo, sin tener que pensar caso por caso.
```bash
Nota: ver apartado MochaJS, en módulos NPM
```

Los ficheros de testeo suenen tener la extensión .test.js y suelen colocarse en el mismo directorio donde está el código fuente que deseamos probar.

Para automatizar los tests, modificaremos la línea tests, de package.json, de tal forma que quede así:
```javascript
"scripts": {
	"test": "mocha **/*.test.js"
	...
}
```

Los test se escriben por escenarios, de tal forma que un escenario englobará un conjunto de casos que tienen un resultado que está relacionado:

``` javascript  
it("DESCRIPCIÓN DEL ESCENARIO",()=>{
	/* PRUEBA*/
	if (/*COMPROBACIÓN DE LA PRUEBA*/){
		throw new Error (`Expected *,  but got ${sol}`);
	}
});
```
No hará falta importar nada, aunque deberemos correr el fichero de prueba con el comando:

```bash
npm test
```
Y el mismo NPM, con la línea de código insertada anteriormente, ya comprobará qué ficheros debe testear (extensión .test.js).

Similarmente, podremos ejecutar tests de manera automática, cada vez que se guarde el código. Para ello utilizaremos Nodemon (ver módulos NPM), utilizando el siguiente comando:
```bash
nodemon --exec 'npm test'
```

De esta forma podremos modificar package.json con el siguiente código:
```javascript
"scripts": {
	"test": "mocha **/*.test.js",
	"test-watch":"nodemon --exec \"npm test\""
},
```
Y se ejecutará con:
```bash
npm run test-watch
```

De esta forma automatizaremos totalmente nuestros tests.

### Librerías de aserción

El problema fundamental de utilizar Mocha es que se duplica mucho código. Todo esto se puede hacer de una manera muy sencilla con una librería de aserción, como es Expect (https://github.com/mjackson/expect) e instalable, al igual que con Mocha con
```bash
npm install --save-dev expect
```
Expect incluye ya numerosos métodos que nos van a permitir asertar que dos valores son iguales, equivalentes, diferentes e incluso, si está contenido (caso de objetos). Los métodos más importantes son:

* expect(obj0).toBe(obj1); : solo es válido si obj0 es exactamente igual a obj1. **Atención:** cuidado con los objetos, al igual que pasa en Java. Comprueba obj0 == obj1.
* expect(obj0).toNotBe(obj1):  solo es válido si obj0 no es exactamente igual a obj1.
* expect(obj0).toEqual(obj1); : solo es válido si obj0 es igual a obj1. **Se utilizará en objetos, al igual que pasa en Java**.
* expect(obj0).toNotEqual(obj1):  solo es válido si obj0 no es igual a obj1.
* expect(obj0).toBeA("string"): comprueba que obj0 es de tipo string, lo mismo para el caso de number, boolean... Similarmente, si en vez de recibir como parámetro un String, recibiera un constructor, comprobaría que obj0 fuera instancia de ese constructor.
* expect(obj0).toNotBeA("string"): lo contrario al caso anterior.
* expect(obj0).toInclude(obj1): comprueba que el objeto obj1 esté contenido en obj0, por ejemplo, en el caso de que obj0 fuera un array. En el caso de que fuera un objeto comprobaría que las propiedades de obj1 estuvieran contenidas en obj0.
* expect(obj0).toExclude(obj1): lo contrario a lo anterior.


Recordar que se ejecutan los test exactamente igual que en el caso anterior con Mocha (npm test) y el fichero package.json contendrá la misma información (excepto que ahora tenemos el módulo Expect instalado en las dependencias de desarrollo).

### Testing en aplicaciones asíncronas
En el caso de aplicaciones asíncronas no debemos entender que Expect se amolde inmediatamente a ella, ya que por defecto entenderá que la respuesta es correcta y el test no servirá de nada. Para ello, habrá que ejecutar la función done(), por medio de una callback, por ejemplo:

```javascript
it("DESCRIPCIÓN",(done)=>{
  /* EL RESULTADO QUE DEBERÍA SER
	var res=3;
	*/
  number.getArgument((answer)=>{
    expect(answer).toBe(res);
    done();
  })
});
```
Del código anterior, se destaca la función cuyo único argumento es done, que será la función que se ejecute cuando la función callback se haya ejecutado correctamente.

Cuando veamos el resultado del test, si los tiempos de respuesta son muy altos, veremos estos en color rojo. Esto sirve para indicar que quizá haya algún error (por la gran cantidad de tiempo empleada), aunque en el ejemplo que se encuentra en el código fuente esto es debido a que uso la función setTimeout().

Podremos agrupar los tests mediante la función describe:
```javascript
describe(StringDescripción,()=>{
	//tests
});
```
### Spies

Los spies son métodos que sustituyen a otros por motivos de testeo, son, de hecho, como "Man In The Middle" en programación, pues será una función que sustituya a la original, tomando todos los argumentos que a ella le pasen.

Rewire nos permite fácilmente sustituir el funcionamiento de las funciones y, junto con Expect, que nos genera los spies, está todo hecho:

```javascript
var app = rewire("./app");
var db = {
	saveUser: expect.createSpy()
}
app.__set__('db',db);
```
El código anterior, coge el funcionamiento del módulo db importado en app y lo sustituye por las funciones que se encuentran en el objeto (saveUser). De esta forma, si llamamos ahora a db.saveUser(), obtendremos el comportamiento de expect.createSpy();

Métodos de Expect que serán útiles:

* expect(spy).toHaveBeenCalled(): el aserto será cierto sí y solo sí, el espía spy ha sido llamado.
* expect(spy).toNotHaveBeenCalled(): lo contrario a lo anterior.
* expect(spy).toHaveBeenCalledWith(args): el aserto será cierto sí y solo sí, el espía spy ha sido llamado con los argumentos args.
* expect(spy).toNotHaveBeenCalledWith(args): lo contrario a lo anterior.

## Módulos en NPMJS
NPMJS nos permite instalar módulos de terceros en nuestro proyecto NodeJS.
Comandos:
* npm -v: retorna la versión de NodeJS instalada.

* npm init: para iniciar el repositorio y poder usar NPM en el proyecto. Nos pedirá ciertos detalles como la versión del software, nombre o punto de entrada y terminará generando un fichero package.json, con esta configuración.

* npm install [nombreMódulo]--save: para instalar un módulo de NPM en nuestro directorio y (--save) actualizar el fichero package.json, para poder utilizar nuestro nuevo módulo en nuestro directorio de NodeJS. ¡Ya podremos hacer un require()!. Instala los módulos en la carpeta node_modules, que se encuentra dentro de ..
* npm install --save-dev [nombreMódulo]: para instalar un módulo de NPM en nuestro directorio y (--save) actualizar el fichero package.json. Nota: la bandera --save-dev indica que se instale con únicamente propósito de desarrollo, es decir, mientras el software se encuentre en fase de desarrollo. Por ejemplo, en Heroku, **no se instalarán**.
* npm install: para volver a instalar los módulos listados en package.json (ver nota importante que hay a continuación).
* npm install [nombreMódulo] -g: para instalar un módulo globalmente, esto es, que se va a utilizar en el contexto de Node. Instala los módulos en $HOME/node_modules.

### Nota importante sobre la utilización de NPM
Muy importante: la carpeta node_modules que genera NPM nunca se deberá compartir. Esto es debido a que incluye código ejecutable únicamente por el computador en el que se está ejecutando el proyecto, por lo que si deseamos compartir el proyecto deberemos borrar previamente esta carpeta.

Una vez copiada, se podrá recuperar de nuevo todos los contenidos (y volver a compilar el código para nuestro ordenador) utilizando el comando npm install (sin más argumentos), que buscará en el fichero package.json las dependencias a instalar.

### Módulos interesantes de NPM
#### Lodash
Lodash (https://lodash.com/docs/) es un interesante módulo de NPM que cuenta con una gran cantidad de utilidades.
```bash
npm install lodash --save
```
#### Nodemon.
Nodemon (https://www.npmjs.com/package/nodemon) es un módulo que sirve para actualizar Node cada vez que hagamos un cambio en nuestro código. Resulta muy útil para no tener que ir parando NodeJS y volviendo a arrancar. Se instala con la bandera -g (--global).

* Para arrancar un proyecto con Nodemon:
``` bash
nodemon [fichero.js]
```
* Instalación de Nodemon:
```bash
npm install nodemon -g
```
Nota: Me ha hecho falta ejecutarlo con sudo. Por lo visto, es un error bastante común y se debe a que hay directorios que no tienen suficientes permisos. Se soluciona con sudo chown -R $USER /usr/local

#### Yargs
Yargs es un módulo muy interesante en cuanto al manejo de argumentos de consola se refiere. Estos, se almacenan en process.argv, pero con una sintaxis un poco especial, sobretodo si nos planteamos utilizar argumentos del tipo clave-valor (--titulo="Hola mundo").
Yargs nos facilita mucho la cosa, ofreciéndonos la constante yargs.argv, que almacenará los valores con la sintaxis atributo-valor, como si de un simple diccionario se tratase.
``` bash
npm install yargs@4.7.1 --save
```
Nota: en el curso se ha utilizado la versión 4.7.1 y es por eso por lo que lo indico ahí.

Yargs cuenta además con muchas utilidades adicionales, como por ejemplo, nos da la posibilidad de generar páginas de ayuda (comando --help) o crear alias de comandos, así como sus correspondientes descripciones.
	Ver el ejemplo de yargsSettings en NotesNode.
Más información en https://www.npmjs.com/package/yargs.

### Requests
Requests, módulo NPM descargable desde https://www.npmjs.com/package/request, permite realizar solicitudes HTTP, contra un servidor.
Este módulo, usado de una forma asíncrona devuelve en la callback tres objetos:
* err: Que indica el error que se haya producido. En caso de no haberlo será null.
* response: Que incluye la inforamacón de vuelta del servidor.
* body: que incluye el cuerpo de la solicitud de respuesta.
Métodos HTTP:

Ejemplos:
* Método GET. Ejemplo:
``` javascript
	const request = require("request");
	var objReq={
		method:"GET",
		url:"http://wwww.google.es",
		qs: {
			/*Aquí pondremos los Query Strings*/
			q="Universidad de Valladolid"
		}
	};
	request(objReq,(err,request,data)=>{
		if(err | request.statusCode!="200"){
			/// Tratamiento del error
		}
		else{
			///Tratar con data
		}
	});
```
* Método POST. Ejemplo:
``` javascript
	const request = require("request");
	var objReq={
		method:"POST",
		url:"http://",
		form: {
			/*Datos de un formulario*/
			q="Universidad de Valladolid"
		}
	};
	request(objReq,(err,request,data)=>{
		if(err | request.statusCode!="200"){
			/// Tratamiento del error
		}
		else{
			///Tratar con data
		}
	});
```

### Axios

Axios (https://www.npmjs.com/package/axios) es un módulo, muy similar a Request, pero permite realizar la solicitud por medio de Promises, lo que simplifica mucho las solicitudes Web.

### Express.JS
Express.JS (http://expressjs.com/) es un framework Web de Node que permite crear servidores en NodeJS.

Una vez hecho el require realizaremos todas las operaciones sobre el framework mediante la variable app
```javascript
var app = express();
```
Métodos:
* app.get(): para enviar texto (JSON, HTML...)
``` javascript
 app.get(URI, (request,response)=>{
	response.send("text");
	});

	/* Si usamos plantillas */
	app.get(URI, (request,response)=>{
	 response.send({
		 nombre: "kjdj",
		 edad:392842
	 }}));

```
* app.listen(NumPuerto): para hacer que el servidor escuche en un determinado puesto
* app.use(express.static("./public_content")): para utilizar un directorio donde almacenar archivos estáticos (ficheros CSS, JS, HTML...).

### HBS
HBS (https://www.npmjs.com/package/hbs) es un módulo de NodeJs que nos permite utilizar plantillas, muy útiles si tenemos un conjunto de ficheros estáticos y queremos crear un sitio dinámico.

```javascript
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials"); /* para indicar donde están los partials (cabeceras, footers...)*/

```

Se basa en la sintaxis de HandleBarsJS (http://handlebarsjs.com/)

### MochaJS

Mocha es uno de los más importantes frameworks de testing de código fuente.
Se instala mediante
``` bash
npm install --save-dev mocha
```
porque queremos instalarlo únicamente con propósitos de desarrollo.

Nota: Ver Testing en NodeJS.

### Expect
Expect (https://github.com/mjackson/expect) es una librería de testing con muchísimas utilidades, que nos permite, entre otras cosas, hacer spies (funciones espía), agrupar tests y realizar los mismos tests.
También permite testear funciones asíncronas.
Se instala como:
```bash
npm install --save-dev expect
```

Nota: ver apartado de Testing en NodeJS

### Rewire

Rewire (https://www.npmjs.com/package/rewire) es un módulo que nos permite modificar el comportamiento de los módulos importados en Node, con el fin de testear nuestras aplicaciones.

Nota: ver apartado de Testing en NodeJS

## Bases de Datos NoSQL: MongoDB

MongoDB es un Gestor de Bases de Datos no relacional, es decir, no tenemos una relación cabecera-tuplas, o lo que es lo mismo, los datos no se encuentran estructurados.

Cada una de las entradas de una Base de Datos Mongo se denomina Documento y contienen una serie de atributos. Son bastante similares a un objeto JavaScript, en el sentido de que, al no tener una estructura específica debemos indicar para cada documento cada uno de los atributos o propiedades que este va a tener.

``` bash
El puerto por defecto de conexión con MongoDB es 27017.
```

Mongo se instala en su versión Community Server, desde https://www.mongodb.com. Descomprimimos el fichero y copiamos la carpeta que contiene, renombrada a mongo a $HOME. A continuación creamos una carpeta llamada mongo-data, también en $HOME.
Una vez hayamos hecho esto ejecutaremos Mongo. Para ello, accedemos al directorio $HOME/mongo/bin y ejecutamos el servidor Mongo con:
``` bash
./mongod --dbpath="$HOME/mongo-data/"
```
De esta forma, la base de datos se almacenará en la path indicada en el argumento --dbpath.

Para finalizar tenemos dos opciones, o bien ejecutar una consola de Mongo y escribir sobre la misma los comandos de I/O sobre la BBDD:

``` bash
./mongod
```
, o bien, podremos recurrir a Robomongo (https://robomongo.org/download), una aplicación que es básicamente una GUI del SGBD, de tal forma que nos permita realizar las consultas de una forma mucho más visual. Robomongo tampoco requiere instalación, basta con descomprimir el directorio.

### Estructura de un documento.
Por definición, una BBDD no relacional no tiene estructura, es decir, no hay un número de campos fijo que deban tener todos los documentos, sino que las propiedades se definen para cada uno. Sin embargo, todos contarán con un campo único, que actuará como clave del mismo (como la Primary Key en SQL), que es el ObjectID, que consiste en un código alfanumérico único.
### Consultas en Mongo.

Las consultas hasta ahora vistas son:
* insert:
```javascript
db.BaseDatosPrueba.insert({text:"Hello World!"})
```
,que devuelve un objeto de tipo WriteResult, junto con el número de documentos insertados.

* find:
```javascript
db.BaseDatosPrueba.find()
```
,que devuelve todas los documentos almacenados en ese nivel de la BBDD.
