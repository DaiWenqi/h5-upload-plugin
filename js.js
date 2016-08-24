function UpLoad(){
	this.config = {
		wrap : '.pic-list',
		addBtn : '.js-add',
		deleteBtn : '.js-delete',
		fileBtn : '.js-file',
		limitSize : 6
	}

	this.size = 0;
}

UpLoad.prototype.init = function(opts){
	this.config = $.extend({},this.config,opts||{});
	this.bindEvent();
}

UpLoad.prototype.bindEvent = function(){
	var that = this,config = that.config;
	//添加
	$(config.fileBtn).on('change',function(event){
		var file = event.currentTarget.files[0];
		that.doAdd(file);
		event.currentTarget.value = '';
	});

	//删除
	$(config.wrap).on('click',config.deleteBtn,function(event){
		var obj = event.currentTarget;
		that.doDelete(obj);
		that.size --;
	});
}

UpLoad.prototype.doAdd = function(file){
	var config = this.config;
	if (!file || this.size >= config.limitSize) return;

	this.size ++;

	var $addBtn = $(config.addBtn);
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(){
		var tpl = '<li class="pic-item"><img class="img" src="'+ this.result +'"><i class="js-delete"></i></li>';
		$(tpl).insertBefore($addBtn);
	}
}

UpLoad.prototype.doDelete = function(obj){
	$(obj).parent().remove();
}