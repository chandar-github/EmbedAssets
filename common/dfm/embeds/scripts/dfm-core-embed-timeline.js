dfm.api("data", "timeline", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'timeline',
    parent  : 'body',

    size    : 'small',
    width   : '240',
    height  : '180',
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
      };
    },


    make : function (){
      var m=this.root.model;
      document.write('<img src="'+m.imgSrc+'" width="'+m.width+'"px class="alwaysThinglink" /><script async charset="utf-8" src="'+m.scriptSrc+'"></script>');
    }
  }
  
});
