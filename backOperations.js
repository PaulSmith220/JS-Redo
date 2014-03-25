function toggleBlockSelected(params){
	blocks[params.n].selected = !blocks[params.n].selected;
	if (blocks[params.n].selected){
		params.div.css('background','red');
	} else {
		params.div.css('background', blocks[params.n].color);
	}
}

function redoBlockRemove(params){
	
}