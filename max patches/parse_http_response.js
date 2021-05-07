inlets = 1;
outlets = 1;

function anything(){
		const obj = new Dict("response");
		body = obj.get("body");
		files = [];
		for (i=0; i<body.length; i++) {
			files.push(obj.get("body[" + i + "]::_id"));
		};
		outlet(0, files);
}