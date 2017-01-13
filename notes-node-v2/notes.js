const fs = require('fs');
const database="data.json";
var notes={};

if(fs.existsSync(database)){
	var notes="";
	try{
		var dbstr=dbstr=fs.readFileSync(database);
		notes=JSON.parse(dbstr);
	}catch(e){
		console.log("Error while reading database");
	}
	
}

function writeDataToDb(){
	fs.writeFile(database,JSON.stringify(notes), function(error,data){
		if(error)
			console.log("Error while writing into database. Data wasn't written");
		else return data;

	});

}


var addNote = (title,body) => {
	if(!notes.hasOwnProperty(title)){
		notes[title]=body;
		writeDataToDb();
		return true;
	}
	return false;
};

var listAll = () => {
	return notes;
}

var removeNoteByTitle = (title) => {
	delete notes[title];
	writeDataToDb();
}

var readNoteByTitle=(title)=>{
	return notes[title];
}

/*Exporting objects*/
module.exports={
	addNote,
	listAll,
	removeNoteByTitle,
	readNoteByTitle
};
