dfm.api("data", "scripts", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'scripts',
    parent  : 'body',
    name    : '',
    
    size    : 'small',
    width   : '240',
    height  : '180',
	scriptSrc : '',
	
	//Timeline JS
	imgSrc	: '',
	
	//Scribd JS
	docID   : '',
    akey    : '',
    dType   : "write",
    
    //Spundge JS
    itemID	: '104',
	itemTitle	: 'Test Article',
	
	//Storify JS
	accountID	: 'DigitalFirst',
	storyID	: 'best-big-bird-memes',
	templateID : 'slideshow',
	
	//Timeline JS
	imgSrc	: 'http://s4.thingpic.com/images/8f/KNXyLmGjr7hxDrrXu87H.png#tl-310144494286667777;626328886',
	scriptSrc	: '//cdn.thinglink.me/jse/embed.js'
	
  },

  // PLACEHOLDER THAT WILL EVENTUALLY REFERENCING THE NEWLY CREATED DOM ELEMENT
  view : null,

  // METHODS
  control : {
    init : function (obj){
      if(typeof(obj!="undefined")){
        jQuery.extend(this.root.model,obj);
        if(typeof(obj.size!="undefined")) jQuery.extend(obj,this.root.defaults.getObject(obj.size));
      };
    },
    
    preload : function(obj){
		switch(obj.name){
			
			case 'scribd':
				if(typeof(obj!="undefined")){
				dfm.api("load","script","http://www.scribd.com/javascripts/scribd_api.js",false);
				if(typeof(obj.src!="undefined"))  obj.src="http://www.youtube-nocookie.com/embed/"+(obj.src.qsa2ary()).getValue("v")+"?rel=0";
			  };
			break;
			
			default:
				//Do Nothing
			break;
		}
		
	},
    make : function (){
      var m=this.root.model;
      var output = '';
      var write = 1 ;
      switch(m.name){
		  case 'manyeyes':
			var output = '<script type="text/javascript" src="'+m.scriptSrc+'"></script>';
		  break;
		  
		  case 'scribd':
		    this.control.preload(this.root.model);
			var h='<div id="scribeD1"></div>';
			jQuery(m.parent).append(h);
			setTimeout(function(){
					var doc = scribd.Document.getDoc(this.root.model.docID, this.root.model.aKey);
					doc.addParam('jsapi_version', this.root.model.dType);
					doc.addParam('height', this.root.model.height);
					doc.addParam('width', this.root.model.width);
				},300);
			m.root.view=jQuery("#"+m.id)[0];
			write = 0;
			dType=='write' ? doc.write(output) : doc.seamless(output);
		  break;
		  
		  case 'spundge':
			var output = '<script data-hide-footnotes type="text/javascript" language="JavaScript" src="http://cdn.spundge.com/embed/stories/'+m.itemID+'/"></script><noscript><a href="http://cdn.spundge.com/stories/'+m.itemID+'/embedded/" target="_blank">View the article <em>'+m.itemTitle+'</em> on Spundge</a></noscript>';
		  break;
		  
		  case 'storify':
			var output = '<script src="http://storify.com/'+m.accountID+'/'+m.storyID+'.js?template='+m.templateID+'"></script><noscript>[<a href="http://storify.com/DigitalFirst/best-big-bird-memes" target="_blank">View the story "Best Big Bird memes after Romney\'s debate remarks" on Storify</a>]</noscript>';
		  break;
		  
		  case 'timeline':
			var output = '<img src="'+m.imgSrc+'" width="'+m.width+'"px class="alwaysThinglink" /><script async charset="utf-8" src="'+m.scriptSrc+'"></script>';
		  default:
				//Do Nothing
		  break;
		  
	  }
	  
	  if(write)
		document.write(output);
    }
  },
  
  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
  
});
