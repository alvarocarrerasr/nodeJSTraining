const yargs=require('yargs');

var titleOps={
	alias:'t',
	describe:"Title of note",
	demand:true
}

var bodyOps={
	alias:'b',
	describe:"Body of note",
	demand:true
}


var configureArguments= () => {
	return yargs.command("add","Add a note",{
		title:titleOps,
		body:bodyOps
	})
	.command("list","List all saved notes")
	.command("remove","Delete a note",{
		title:titleOps
	})
	.command("read", "Read a single note",{
		title:titleOps
	})
	.help()
	.argv;
};

module.exports={
	configureArguments
};
