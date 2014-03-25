_event = function(name){
	this.name = name || '';
	this.backOperation = '';
	this.backParams = {};
	return this;
};


history_object = function(){
	this.log = [];
	this.save = function(event){
		this.log.push(event);
		console.log(this.log);
	};
	this.redo = function(){
		if (this.log.length > 0){
			var ev = this.log[this.log.length-1];
			window[ev['backOperation']](ev.backParams);
			console.info('Отменено: ' + ev.name);
			this.log.pop();
		} else {
			console.warn('Нет сохранённой истории изменений!');
		}
	}

}
history = new history_object();