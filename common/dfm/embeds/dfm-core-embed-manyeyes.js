dfm.api("data", "manyeyes", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'manyeyes',
    parent  : 'body',
    size    : 'small',
    width   : '425',
    height  : '350',
	scriptSrc	: 'http://www-958.ibm.com/me/visualizations/f97c588ef6fa11e18a2e000255111976/comments/f98ecda2f6fa11e18a2e000255111976.js'
	
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
      var dimemsion = (m.size == 'small')?"width="+m.width+"&height="+m.height:'';
      document.write('<script type="text/javascript" src="'+m.scriptSrc+'"></script>');
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" }]
});
