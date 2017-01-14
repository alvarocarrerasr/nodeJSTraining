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

## Módulos en NPMJS
NPMJS nos permite instalar módulos de terceros en nuestro proyecto NodeJS.
Comandos:
* npm -v: retorna la versión de NodeJS instalada.

* npm init: para iniciar el repositorio y poder usar NPM en el proyecto. Nos pedirá ciertos detalles como la versión del software, nombre o punto de entrada y terminará generando un fichero package.json, con esta configuración.

* npm install [nombreMódulo]--save: para instalar un módulo de NPM en nuestro directorio y (--save) actualizar el fichero package.json, para poder utilizar nuestro nuevo módulo en nuestro directorio de NodeJS. ¡Ya podremos hacer un require()!. Instala los módulos en la carpeta node_modules, que se encuentra dentro de ..

* npm install: para volver a instalar los módulos listados en package.json (ver nota importante que hay a continuación).
* npm install [nombreMódulo] -g: para instalar un módulo globalmente, esto es, que se va a utilizar en el contexto de Node. Instala los módulos en $HOME/node_modules.

### Nota importante sobre la utilización de NPM
Muy importante: la carpeta node_modules que genera NPM nunca se deberá compartir. Esto es debido a que incluye código ejecutable únicamente por el computador en el que se está ejecutando el proyecto, por lo que si deseamos compartir el proyecto deberemos borrar previamente esta carpeta.

Una vez copiada, se podrá recuperar de nuevo todos los contenidos (y volver a compilar el código para nuestro ordenador) utilizando el comando npm install (sin más argumentos), que buscará en el fichero package.json las dependencias a instalar.

### Módulos interesantes de NPM
#### Lodash
Lodash (https://lodash.com/docs/) es un interesante módulo de NPM que cuenta con una gran cantidad de utilidades.
	npm install lodash --save

#### Nodemon.
Nodemon (https://www.npmjs.com/package/nodemon) es un módulo que sirve para actualizar Node cada vez que hagamos un cambio en nuestro código. Resulta muy útil para no tener que ir parando NodeJS y volviendo a arrancar. Se instala con la bandera -g (--global).

* Para arrancar un proyecto con Nodemon:
``` bash
nodemon [fichero.js]
```
* Instalación de Nodemon:
npm install nodemon -g
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
