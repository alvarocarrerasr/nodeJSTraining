const notes=require("./notes.js");
const yargsSettings=require("./yargsSettings.js"); /* Load all argument app settings */


const argv = yargsSettings.configureArguments();
var command = argv._[0];

function printNote(noteTitle){
	var note=notes.readNoteByTitle(title);
	console.log("************\n");
	if(note){
		console.log("\t Title: \n \t", argv.title, "\n");
		console.log("\t Body: \n \t", note, "\n");
	}
	else{
		console.log("\t\tError. Note doesn't exist\n");
	}
}

if(command==='add'){
	var title=argv.title;
	var body=argv.body;
	var result=notes.addNote(title,body);
	if(result){
		console.log("\t Note added successfully\n");
	}else{
		console.log("\t Note already exists. It wasn't added\n");
	}
}
else if(command==='list'){
	var allNotes=Object.keys(notes.listAll());
	allNotes.forEach((note)=>console.log("\t",(note)));
}
else if (command==='remove' && hasTitle()){
	var title=argv.title;
	notes.removeNoteByTitle(title);
}
else if(command==='read' && hasTitle()){
	var title=argv.title;
	printNote(title);
}
