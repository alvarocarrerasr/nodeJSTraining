# Guía personal de NodeJS
Por favor, lee el fichero README.md, ubicado en esta carpeta para entender el propósito de esta guía.

Una de las cosas más importantes es que no hay un orden predefinido or el momento (para eso existe Ctrl+F) y que la iré actualizando cuando tenga tiempo y descubra cosas nuevas.

Obviamente, la guía puede contener errores. En ese caso, te agradecería que abrieras una issue desde la opción correspondiente del repositorio.


Links adicionales recomendados:

* PostMan (https://www.getpostman.com/): es un software gratuito que nos permite probar APIS, realizando las sucesivas solicitudes HTTP que deseemos contra una URL.
* Robomongo (https://robomongo.org/): es una GUI que nos permite visualizar la información almacenada en una base de datos Mongo, así como realizar consultas como modificación, creación y borrado de documentos.
* mLab (https://mlab.com/): una plataforma SaaS que nos ofrece bases de datos Mongo gratuitas.
* Heroku (https://dashboard.heroku.com/) nos va a permitir tener instancias de máquinas virtuales donde alojar nuestros proyectos Node.
* Yarn (https://yarnpkg.com/): el instructor del curso que hago en Udemy propone un gestor de paquetes llamado Yarn como alternativa a NPM. En la siguiente URL hay una serie de vídeos explicativos: http://www.mead.io/yarn/

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

Instalación:
```bash
npm install --save-dev rewire
```
### Node MongoDB Native

https://github.com/mongodb/node-mongodb-native (Node MongoDB Native) es el conector oficial de Mongo para NodeJS.
Tiene una documentación muy buena accesible desde el mismo proyecto de GitHub.
Instalación:
```bash
npm install mongodb --save
```
### Mongoose
Mongoose es un framework que nos permite utilizar muy fácilmente bases de datos Mongo con NodeJS.

Instalación:

```bash
npm install mongoose --save
```

Nota: ver apartado correspondiente.

### BodyParser

BodyParser (https://www.npmjs.com/package/body-parser) nos permite parsear el cuerpo de las solicitudes HTTP para procesarlas como objetos y así, acceder de una manera mucho más sencilla a la información.
Resulta muy útil para elaborar una API, como un middleware, junto con el framework ExpressJS.

Instalación:
```bash
npm install body-parser --save
```

### Validator

Validator (https://www.npmjs.com/package/validator) es un módulo de NodeJS que nos va a permitir validar distintos valores, como correos electrónicos, fechas, ISBNs, URLs...

Instalación:
```bash
npm install validator --save
```

### Cryto-JS

Cryto-JS (https://www.npmjs.com/package/crypto-js) es un módulo de NodeJS que nos va a permitir calcular Hashes, así como cifrar. Realmente es muy completo.


Instalación:
```bash
npm install crypto-js --save
```
Ejemplo:
``` javascript
const {SHA1} = require("crypto-js");
var message = "";

console.log(message);
console.log("Hasheado:",SHA1(message).toString());
```
### JSON Web Token

JSON Web Token (https://www.npmjs.com/package/jsonwebtoken) es un módulo NodeJS que nos va a permitir implementar de una forma bastante sencilla la idea sobre la que está basada el RFC7519 (https://tools.ietf.org/html/rfc7519), por el que se sugiere un método seguro y bastante moderno (Mayo de 2015) para la transferencia de información en formato JSON por medio de Internet.

El funcionamiento más basico hará uso de una sal (una palabra que solo conoce el servidor)  y de un método de hashing, para comprobar que efectivamente la información transferida no ha sido manipulada en la transferencia.

El módulo consiste en dos funciones: una para generar el token y otra para verificarlo.

Más información del funcionamiento : https://jwt.io/introduction/

Instalación
```bash
npm install jsonwebtoken --save
```
### Bcrypt

Bcrypt (https://www.npmjs.com/package/bcryptjs) es un módulo fantástico para implementar el almacenamiento seguro de contraseñas. Utiliza una sal, al igual que algoritmos de hasheado para generar el String que se almacenará en la base de datos.

Instalación
```bash
npm install bcryptjs --save
```

### SocketIO
SocketIO (https://www.npmjs.com/package/socket.io) nos va a permitir implementar los Web sockets. Son un tipo especial de sockets que mantienen la conexión en ambos extremos, intercambiando información de forma continua.
Son muy útiles, por ejemplo, en caso de querer hacer un chat, en el que los usuarios no tengan que refrescar la página continuamente para ver nuevas actualizaciones (aunque se podría hacer en AJAX también).

Más información, más adelante.

Instalación:

```bash
npm install socket.io --save
```
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
Por definición, una BBDD no relacional no tiene estructura, es decir, no hay un número de campos fijo que deban tener todos los documentos **(un conjunto de documentos se denomina colección)**, sino que las propiedades se definen para cada uno. Sin embargo, todos contarán con un campo único, que actuará como clave del mismo (como la Primary Key en SQL), que es el ObjectID, que consiste en un código alfanumérico único.
### Consultas en Mongo.

Las consultas hasta ahora vistas son:
* insert:

MongoDB Command:
```javascript
db.BaseDatosPrueba.insert({text:"Hello World!"})
```
,que devuelve un objeto de tipo WriteResult, junto con el número de documentos insertados.

Ejemplo de código Node que inserta el objeto en la BBDD:

```javascript
const mongodb = require("mongodb").MongoClient;
const mongoURL="mongodb://localhost:27017/Test";

mongodb.connect(mongoURL,function(error,db){
	if(error)//Tratamiento error
	else
	//DB es el objeto de BBDD, sobre el que podemos tratar.
	db.collection("nombreColección").insertOne(objToInsert,function (error,result){
		if(error) //Tratamiento del error
		else {
			//result.ops contiene el objeto insertado
		}
	})
}
);
```

**Nota**
```bash
A diferencia de otro tipo de Bases de Datos, por ejemplo MySQL, Mongo no necesita que primero exista la base de datos sobre la que se escribe, sino que la crea "al vuelo".
```
* find:
```javascript
db.BaseDatosPrueba.find()
```
,que devuelve todas los documentos almacenados en ese nivel de la BBDD.

Ejemplo de código Node que busca un documento en la BBDD:

```javascript
const {MongoClient} = require("mongodb");

MongoDB.connect(dbDetails,(error,db)=>{
	if(error) //Tratamiento del error
	else {
		db.collection(/*collection name */).find(/*FILTRO*/).toArray().then(
			(docs)=>{
				//successfully data
			},
			(error)=>{
				//Tratamiento error
			}
		)
		db.close();
	}
})
```

De esta forma, podemos encontrar cualquier dato en la Base de Datos, el filtro indicado es simplemente un objeto JS con la propiedad que queremos comprobar.
Así pues, un filtro:
```javascript
const {ObjectID} = require("mongodb");
{
	_.id: new ObjectID("ObjectID que queremos buscar");
}
```
nos permitirá encontrar el objeto cuyo identificador (ObjectID) es el que hemos indicado.

**Nota importante**
La función find(/*FILTRO*/) nos devuelve un cursor (http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html), es decir, es simplemente un puntero hacia el lugar de la Base de Datos donde se encuentra el documento que buscamos. La ventaja de que aquí nos devuelva el cursor es que es mucho más fácil implementar determinadas funciones, como la devolución de la información en formato array (ya visto, con el método toArray()), o incluso los métodos count(), min(), max().
Similarmente, en la documentación de MongoDB (https://docs.mongodb.com/manual/reference/operator/query-comparison/) podemos encontrar muchos comparadores que pueden resultar muy útiles en las consultas.

* delete: para borrar documentos en NodeJS contamos con varios métodos:
	* deleteMany: para borrar varios documentos a la vez.
	```javascript
	db.collection("todos").deleteMany({}).then(
	  (result)=>{
	    console.log(result);
	  },
	  (error)=>{
	    console.log(error);
	  }
	);
	```
	* deleteOne: solo para borrar un solo documento.
	```javascript
	db.collection("todos").deleteOne({}).then(
	  (result)=>{
	    console.log(result.result);
	  },
	  (error)=>{
	    console.log(error);
	  }
	);
	```
	* findOneAndDelete: permite borrar un solo documento, pero antes devuelve ese valor. **Muy similar a la operación pop de una pila**.
	```javascript
	db.collection("todos").findOneAndDelete({}).then(
	  (result)=>{
	    console.log(result);
	  },
	  (error)=>{
	    console.log(error)
	  }
	);
	```
Las operaciones anteriores si no se les proporciona un cuarto argumento (callback), devuelven una Promise.

* update: la actualización de documentos es la tercera operación más importante. Contamos con varios métodos que nos permiten realizarla, al igual que teníamos en el caso de la eliminación:
	* findOneAndUpdate(filter,update,options...): busca un único documento que cumpla el filtro y lo actualiza, dependiendo de las condiciones impuestas en update. Devuelve el documento antes de ser modificado.
	```javascript
	const {MongoClient, ObjectID} = require("mongodb");

	const dbName="";
	const dbURL="mongodb://localhost:27017/"


	MongoClient.connect(`${dbURL}${dbName}`,(err, db)=>{
	  if(err){
	    console.log("Error while connecting to DB Server");
	    return;
	  }
	    console.log("Connected successfully to DB Server");

	    db.collection("todos").findOneAndUpdate(
	      {_id:new ObjectID("588731d2c41e13104fc79df1")},
	      {
	        $set:{
	          Universidad:"Universidad de Valladolid"}
	        }
	    ).then(
	      (result)=>{
	        console.log(result);
	      },
	      (error)=>{
	        console.log(error);
	      }
	    );
	    db.close();
	});
	```
	**Importante**:
	ver el uso del operador de actualización $set (explicado en nota importante más abajo).

	* updateMany(filter,update,options...): similar al anterior, pero actualiza todos los documentos que cumplen el filtro
	* updateOne(filter,update,options...): similar al primero (findOneAndUpdate), pero este no requiere un bloqueo.

Las operaciones anteriores, al igual que en el caso de delete, si no se les proporciona un cuarto argumento (callback), devuelven una Promise.

**Nota importante**:
Son necesarios los operadores de actualización (https://docs.mongodb.com/manual/reference/operator/update-field/), para el campo de update. En caso de no utilizarlos, podríamos perder la información almacenada en ese documento.

### ObjectID en MongoDB

ObjectID es un código alfanumérico que identifica de manera única al documento en concreto. Se diseñó así, en vez de ser autoincremental para facilitar la escalabilidad, ya que así, no es necesario que los diversos servidores que dan soporte a nuestra BBDD se tengan que sincronizar para tener una clave autoincremental.

Las partes de un ObjectID, de doce dígitos son:

* Los cuatro primeros bytes es un timestamp, de tal forma que identifica de manera única el instante de tiempo en el que fue creado. Podemos obtener el timestamp concreto ejecutando la función getTimestamp() sobre la propiedad _ .id.
* Los siguientes tres bytes son el identificador de la máquina sobre el que fue creado.
* Los siguientes dos bytes son el número de proceso  sobre el que fue creado.
* Los siguientes tres bytes son un valor aleatorio.

Si bien es verdad que lo normal es dejar a Mongo que cree el identificador (así además, garantizamos la unicidad del mismo), es posible indicarlo nosotros mismos, añadiendo esa propiedad (_ .id) al objeto cuando se ejecute el método InsertOne.

MongoDB native Client también nos permite generar de manera única ID's sin necesidad de tener que usar una BBDD Mongo. Es tan fácil como utilizar la función ObjectID, que es una propiedad de MongoDB:
```javascript
const {ObjectID} = require("mongodb");
var obj = new ObjectID();
```
### Cerrar la BBDD
Al igual que ocurre en cualquier lenguaje de programación con ficheros, consultas HTTP, BBDD... es necesario cerrar la BBDD, sino el proceso estará a la espera de nuevas consultas.
```javascript
db.close();
```

## Mongoose

Mongoose es un fantástico framework que nos permitirá gestionar aún mejor los documentos en una base de datos Mongo. Mongoose permite la creación de Modelos, validación...

Documentación: http://mongoosejs.com/docs/guide.html

### Un primer ejemplo de Mongoose
```javascript
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");
```
En las líneas anteriores podemos ver que es recomendable indicar que queremos usar las Promises de JavaScript y no unas de terceros. Esto es porque Mongoose se puede instalar en varias versiones de JavaScript y las Promises, en cuanto a Core se refiere, solo están implementadas en las últimas versiones del lenguaje de programación.

A continuación, podremos, por ejemplo, definir un modelo:
```javascript
var Tarea = mongoose.model("NOMBRE DE LA COLECCIÓN",
{
  title:{
    type : String
  },
  description:{
    type : String
  },
  completed:{
    type : Boolean
  },
  completedAt:{
    type : Number
  }
});
```
**Importante:** Mongoose, creará una nueva colección en la BBDD, con el nombre que hayamos estipulado al modelo (primer argumento), con el nombre en minúsucula y pluralizado, esto es, si la colección se llama "Nota", creará una nueva colección que se llame "notas".

Seguidamente, podemos crear un nuevo documento, utilizando el modelo:
```javascript
var anotherTodo = new Tarea({
  title:"This is another Todo Example",
  description:"Hey there!",
  completed:true,
  completedAt:(new Date()).getTime()
});
```

Para finalizar guardándola en la Base de Datos, utilizando una Promise:
```javascript
anotherTodo.save().then(
  (result)=>{
    console.log(result);
  },
  (error)=>{
    console.log(error);
  }
);
```
Concluimos, cerrando la conexión:
```javascript
mongoose.disconnect();
```

### Mongoose con Validación, Tipos y Valores por defecto

#### Schemas en Mongoose:
A diferencia de un Modelo (que nos permiten interactuar con los datos), los Schemas (http://mongoosejs.com/docs/guide.html) definirán parte o un documento de forma completa, de tal forma que podamos añadir propiedades adicionales como obligación de tipos, validación... En definitiva, estamos pasando un Schema en el segundo argumento de creación de un modelo.

A su vez, también podremos indicar que :
* se realicenciertas operaciones (http://mongoosejs.com/docs/schematypes.html) a los valores como trim, que elimina los caracteres en blanco en las últimas posiciones:
	``` javascript
	title:{
		type : String,
		required: true,
		trim: true
	}
	```
* se tome un valor por defecto:
	```javascript
	completed:{
		type : Boolean,
		default: false
	}
	```
	etcétera...
#### Validación en Mongoose
Validar en Mongoose (http://mongoosejs.com/docs/validation.html), puede llegar a resultar muy útil. A diferencia de una BBDD como MySQL, en la que debemos indicar el tipo, longitud (por ejemplo, caso de TEXT o VARCHAR)... Una base de datos no relacional no permite, por ejemplo, comprobar estas propiedades, por lo que, en ese caso estamos perdiendo caracterísitcas bastante comunes en un software de gestión de datos.
Mongoose soluciona estos problemas añadiendo los validadores, que nos permitirán comprobar estos datos, antes de que sean guardados, por lo que en caso de que no cumplan con la condición estipulada, Mongoose devolverá un error.
Mongoose viene con algunos validadores por defecto, por ejemplo, dependiendo del tipo de dato almacenado:
* Números: podemos comprobar que el número sea mayor o menor de determinado valor.
* Strings: tamaño de la cadena de caracteres (mayor o menor), igualdad a un valor...

También podremos definir la obligación de un valor, con el parámetro required:
```javascript
var TodoTask = mongoose.model("TodoApp Task",
{
  title:{
    type : String,
    required: true
  },
  description:{
    type : String,
    required: true
  },
  completed:{
    type : Boolean,
    required: true
  },
  completedAt:{
    type : Number
  }
});
```

Además, nos permite definir nuestros propios validadores.

#### La importancia de los modelos en Mongoose. operaciones y métodos.
Con un modelo en Mongoose podemos realizar todas las operaciones sobre documentos del mismo, como:
* listar:
	```javascript
	TodoTask.findOne({
	  _id : new ObjectId(id)
	}).then(
	  (doc)=>{
	    console.log(doc);
	  },
	  (error)=>{
	    console.log(error);
	  }
	);
	```
* buscar por ID (el identificador del documento): es, de hecho, más recomendable utilizar este método que listando por _ id (caso anterior):
	```javascript
	TodoTask.findById(id).then(
	  (doc)=>{
	    console.log(doc);
	  },
	  (error)=>{
	    console.log(error);
	  }
	);
	```
	**Nota importante:**: tanto si buscamos por ID, como si listamos (e incluso si queremos filtrar usando otro campo), si el elemento no existe, no se retorna un error, sino null o undefined, por lo que tendremos que añadir un if.
	Ejemplo:
	```javascript
	TodoTask.findById(id).then(
	  (doc)=>{
	    if(!doc){
	      console.log("ID not found");
	      return;
	    }
	    console.log(doc);
	  },
	  (error)=>{
	    console.log(error);
	  }
	);
	```
* añadir nuevos documentos:
	```javascript
	var newTodo = new TodoTask({
		title:req.body.title
	});
	newTodo.save().then(
		(req)=>{
			console.log(req);
		},
		(error)=>{
			console.log(error);
		}
	)
	```
* borrar.
	```javascript
	TodoTask.remove(query).then(
    (worked)=>{

    },
    (err)=>{

    }
  )
	};
	```
* modificar:
	```javascript
	TodoTask.findByIdAndUpdate(query,{$set:{/*Data to modify*/}}).then(
		(doc)=>{
			if(doc){

			}else{
				//doc doesn't exist into database
			}
		},
		(error)=>{
			//doc couldn't be retrieved from database
		}
	);
	```
Es decir, podremos ejecutar las mismas operaciones que teníamos con el conector oficial de Mongo, pero esta vez, enfocadas al tipo de documento.

## WebSocket's con SocketIO

SocketIO nos permitirá crear sockets WebSocket. Son conexiones que se mantienen en ambos sentidos y, por lo tanto, deberemos tener un servicio en el lado del servidor y otro en el lado del cliente escuchando y enviando información.

En ambos casos, tanto en el lado del cliente como en el servidor, la función socket.on("CASO",callback); nos permitirá monitorizar o capturar los eventos que ocurran entre ambos extremos.

### Configuración en el lado del cliente.
En el lado del cliente, deberemos embeber el siguiente código, entre las etiquetas **body**:
```html
<script src="/socket.io/socket.io.js"></script>
<script>
	var socket = io();
	socket.on("connect",function (){
		console.log("Connected to server");
	});
	socket.on("disconnect",function (){
		console.log("Ups... it seems server has been disconnected");
	});
</script>
```
El fichero indicado (socket.io.js) contiene los métodos que podremos utilizar en el lado del cliente.

El código anterior, conecta el documento HTML con el servidor, por medio de un WebSocket y establece una conexión (línea var socket = io()). Posteriormente, monitoriza las futuras conexiones por medio de la función on("connect",callback). Utilizamos además, **funciones tradicionales**, y no arrow functions. Esto es porque no todos los navegadores las tienen implementadas.

Utilizando las herramientas de desarrollador Google Chrome podemos observar que el navegador Web envía cada cierto tiempo paquetes que intentan comprobar si la conexión sigue activa. En caso de desconectar el servidor, se seguirán enviando paquetes, pero estos no llegarán y se marcarán como de color rojo.

Muy importante la variable socket, la cual nos servirá para comunicarnos con el servidor y efectuar las operaciones que sean necesarias.

### Configuración en el lado del servidor
Similarmente, en el lado del servidor también tendremos que realizar cierta configuración:
```javascript
const socketio = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketio(server);

io.on("connection",(socket)=>{
  console.log("New user connected!");
});

server.listen(PORT,()=>{
  console.log("Server is currently listening on port",PORT);
});
```
El código anterior crea una aplicación Express (será el framework que utilizaremos como servidor HTTP), crea un servidor HTTP, utilizando la librería de serie de NodeJS (lo necesitaremos para poder conectar Socket.IO con Express), establece una conexión con los clientes Socket.io (io.on("connection",callback)) y, por último, activa el servidor Express.
### Envío y escucha de eventos
Socket.IO funciona emitiendo y capturando eventos que ocurran en el sistema.
Las operaciones que nos permitirán enviar/recibir eventos son:
* Enviar: Utilizaremos la función emit de socket, que toma como primer argumento el nombre del evento y como segundo argumento, el objeto que se desee enviar (recordar que en JS un objeto es TODO).
```javascript
io.emit("newStudent",
	{
		name:"Álvaro",
		Universidad:"Universidad de Valladolid"
});
```
* Recibir: Utilizaremos la función on de socket, que toma como primer argumento el nombre del evento y como segundo argumento, una función cuyos argumentos sean aquellos objetos que hayan sido enviados en el otro extremo.
```javascript
socket.on("newEmail",function(email){
  console.log("New email",email);
});
```
### La diferencia entre usar io o socket en el lado del servidor
Hay una diferencia fundamental entre usar la variable io o la variable socket, que se nos instancia con cada nueva conexión y es justamente quién es el dispositivo que recibirá el mensaje.
Así pues, enviar un mensaje (io.emit) usando io, hará que llegue a todos los peers. Sin embargo, en socket (socket.emit), solo llegará al peer que tiene esa instancia de socket. Esto es así excepto en el caso de broadcast.

#### Obtención de dirección IP
Viendo que por el momento la documentación de Socket.io (o mejor dicho, de Engine.io) no es muy buena, añado a continuación el código para obtener la dirección IP del peer conectado, lo que puede resultar útil en ciertas ocasiones, por ejemplo, en casos de querer hacer un log:
```javascript
const address = socket.handshake.address;
```
Como curiosidad, aunque no tenga que ver con Node y Socket.io, me parece reseñable indicar que todas las conexiones de prueba que hice se hicieron por medio de IPv6.
#### Broadcasting de un mensaje a todos los peers excepto a uno.
La forma más sencilla de enviar un mensaje a todos los peers, excepto a uno en concreto, por ejemplo, en el caso de que estemos haciendo un chat de grupo y nos interese enviar un mensaje de bienvenida al peer que se acabe de conectar, podremos usar el método broadcast de socket:
```javascript
io.on("connection",(socket)=>{
  socket.broadcast.emit("newPeer",{
    /*Message to be sent to the new Peer*/
  });
});
```
### ACK's a.k.a. Acknowledgment message
También es posible implementar ACKs, o mejor dicho, mensajes de confirmación de recepción por ambas partes.
* En el lado del cliente: Habría que añadir un tercer argumento a la función emit que fuera una callback:
```javascript
function sendNewMessage(){
  socket.emit("sendMessage",{
    /*Data bla bla bla*/
  }, function(){
    addText("ACK: ","Message has been successfully sent");
  });
}
```
* En el lado del servidor: Habría que añadir un tercer argumento a la función on y llamar a esa callback.
```javascript
socket.on("sendMessage",(message, callback)=>{
	console.log("New message",message);
	callback();
});
```
Similarmente, si en ambas funciones añadiéramos un argumento, podríamos intercambiar información entre ambos extremos, haciendo la comunicación mucho más útil (por ejemplo, podríamos enviar un mensaje de error, en caso de que no se haya formado bien el mensaje inicial...).
Ambas notaciones las intercambiaremos dependiendo de en qué lugar queremos tener el ACK (y quién envía la información).
