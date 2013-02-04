dfm.api("data", "storify", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'storify',
    parent  : 'body',

    width   : '240',
    height  : '180',
    accountID	: 'DigitalFirst',
	storyID	: 'best-big-bird-memes',
	templateID : 'slideshow'
	
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
      document.write('<script src="http://storify.com/'+m.accountID+'/'+m.storyID+'.js?template='+m.templateID+'"></script><noscript>[<a href="http://storify.com/DigitalFirst/best-big-bird-memes" target="_blank">View the story "Best Big Bird memes after Romney\'s debate remarks" on Storify</a>]</noscript>');
    }
  }
  
});
