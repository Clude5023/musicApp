
var tmallSearch = 
	{
		init: function(callNode){
			this.app = callNode
			this.txt = this.app.getElementsByTagName("input")[0]
			this.search = this.app.getElementsByTagName("input")[1]
			this.oNode = this.app.getElementsByTagName("ul")[0]
			this.str = ""

			this.start()
			this.displayHandler()
		},

		start: function(){  
			this.txt.onkeyup = function(){
				var oScript = document.createElement("script")
				oScript.src = "https://suggest.taobao.com/sug?code=utf-8&q="+this.value+"&_ksTS=1490258855704_564&callback=tmallSearch.callback"
				document.body.appendChild(oScript)
				document.body.removeChild(oScript)
			}
			this.searchKey()
		},
		
		callback: function(data){
			data !== null ? this.success(data) : this.fail(data)
		},

		success: function(data){
			this.oNode.innerHTML = ""
			for ( var i = 0; i < data.result.length ; i++ ){
				this.str = "<li id='search-link'><a href='https://list.tmall.com/search_product.htm?q=" + data.result[i][0] + "' target='_blank'>" + data.result[i][0] + "</a></li>"
				this.oNode.innerHTML += this.str
			}
			this.show()
		},
		
		fail: function(data){
			//to do fail function
		},

		displayHandler: function(){
			document.onclick = function(e){
				var event = e || window.event
				var src = event.srcElement.nodeName.toLowerCase()
				var myStr = tmallSearch.app.getElementsByTagName('input')[0].value
				!((src == 'li' &&( event.srcElement.id == 'search-link' )) || (src == 'input' && (myStr != ''))) ? tmallSearch.hide() : tmallSearch.show()
				
			}
		},

		hide: function(){
			this.oNode.style.display = "none"
		},

		show: function(){
			this.oNode.style.display = "block"
		},

		searchKey: function(){
			this.search.onclick = function(){
				var myStr = tmallSearch.app.getElementsByTagName('input')[0].value
				myStr ? location.href="https://list.tmall.com/search_product.htm?q=" + myStr : location.href='#'
			}
		}
	}