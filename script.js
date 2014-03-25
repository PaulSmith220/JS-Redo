
Array.prototype.remove = function (n) {
            return this.slice(0, n).concat(this.slice(n + 1, this.length));
        }
var blocks = [];
block = function(text){
	this.position = {x:undefined, y:undefined};
	this.color = "#" + getRandInt(6);
	this.borderColor = "#" + getRandInt(6);
	this.text = text;
	this.id = text;
	this.selected = false;
}


$(document).ready(function(){
	var container = $("#container");
	$('body').keypress(function(e){ keyListen(e); });

	function createBlocks(){
		for (var i = 0; i <= Math.round(Math.random()*5)+5; i++)
		{
			blocks.push(new block('_'+(i+1)));
		}
	}
	function drawBlocks(){
		container.html('');
		for (var i = 0; i < blocks.length; i++){
			var block_div = '<div class="blocks" id="' + blocks[i].text + '"></div>';
			container.append(block_div);
			container.children('.blocks:last').css('background', blocks[i].color);
			container.children('.blocks:last').css('border-color', blocks[i].borderColor);
			container.children('.blocks:last').html(blocks[i].text);
			container.children('.blocks:last').css('position', 'relative' );
			if (blocks[i].selected)
				container.children('.blocks:last').css('background', 'red');
		}
		$(".blocks").click(function(){
			var id = searchBlockById($(this).attr('id'));
			blocks[id].selected = !blocks[id].selected;
			if (blocks[id].selected){
				$(this).css('background', 'red');
			} else {
				$(this).css('background', blocks[id].color);
			}
			// History
			var ev = new _event('Выделение блока');
			ev.backOperation = 'toggleBlockSelected';
			ev.backParams = {n: id, div: $(this)};
			history.save(ev);

		});
	}

	$("#minus").click(function(){
		var rm = 0;
		var tmp = blocks;
		for(var i = 0; i < blocks.length; i++){
			if (blocks[i].selected){
				tmp = tmp.remove(i-rm);
				rm++;
			}
		}
		blocks = tmp;
		drawBlocks();
	});

	$("#plus").click(function(){
		var txt = "_" + (blocks.length+1);
		blocks.push(new block(txt));
		drawBlocks();
	})

	
	


	createBlocks();
	drawBlocks();

	console.log(blocks);
	

});


getRandInt =  function(size){
	var res = '';
	for (var i = 0; i < size; i++){
		res += '' + Math.round(Math.random()*9);
	}
	return res;
}

searchBlockById = function(id){
	for (var i = 0; i < blocks.length; i++){
		if (blocks[i].id == id)
			return i;
	}
	return false;
}

