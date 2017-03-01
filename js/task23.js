/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-23 13:15:22
 * @version $Id$
 */
function Tree() {
	this.stack = [];
	this.playing = false;
	this.interator = 0;
}
Tree.prototype = {
	TraverseDF : function(node){
		this.stack.push(node);
		if (node) {
			for (var i = 0; i < node.children.length; i++) {

				this.TraverseDF(node.children[i])
				
			}
		}
	},
	TraverseBF : function(node) {
		if (node&&node.nodeName !=="SCRIPT") {
			this.stack.push(node);
			this.TraverseBF(node.nextElementSibling)
			node = this.stack[this.interator++];
			this.TraverseBF(node.firstElementChild)
		}
	},
	animation : function(search) {
		var i = 0,
			stack = this.stack,
			self = this,
			len = stack.length;
		this.interator = 0;
		this.stack = [];
		stack.forEach(function(d) {
			d.style.background = '#fff'
		})
		if (!self.playing) {
			self.playing = true;
			var timer = setInterval(function() {
				if (i<len) {
				stack[i].style.background = '#CD6600';
				}
				if (i>0) {
				stack[i-1].style.background = '#fff';
				}
				if (search) {
					if (i<len){
						if(search == stack[i].firstChild.nodeValue.trim()) {
						self.playing =false;
					
						stack[i].style.background = '#9AC0CD';
						clearInterval(timer)
						} 
					} else if (i == len) {
						self.playing =false;
						clearInterval(timer);
						alert('找不到数据')	
					};
				};
				if (i == len) {
				self.playing =false;
				clearInterval(timer);
				};
				i++;
			},500) 
		}
		
	}
};

(function(){
	var tree = new Tree();
	var btns = document.querySelectorAll('button'),
		DFBtn = btns[0],
		BFBtn = btns[1],
		DFsearchBtn = btns[2],
		BFsearchBtn = btns[3],
		search = document.querySelector('input'),
		root = document.querySelector('.root');


	addEvent(DFBtn,'click',function() {
		tree.TraverseDF(root)
		tree.animation()

	});
	addEvent(BFBtn,'click',function() {
		tree.TraverseBF(root)
		tree.animation()

	});
	addEvent(DFsearchBtn,'click',function() {
		if (search.value) {
			tree.TraverseDF(root)
			tree.animation(search.value)
		}
	});
	addEvent(BFsearchBtn,'click',function() {
		if (search.value) {
			tree.TraverseBF(root)
			tree.animation(search.value)
		}
	});


	var currying = function(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(null, newArgs);
    };
};

var getWife = currying(function() {
    var allWife = [].slice.call(arguments);
    console.log(allWife.join(";"));
}, "合法老婆");

getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");

getWife("超越韦小宝的老婆");

	 

})()
