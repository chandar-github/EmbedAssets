dfm.api("data", "googlemap", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'googlemap',
    parent  : 'body',

    size    : 'small',
    width   : '240',
    height  : '180',
    src     : ''
  },

  // PLACEHOLDER THAT WILL EVENTUALLY REFERENCING THE NEWLY CREATED DOM ELEMENT
  view : null,

  // METHODS
  control : {
    init : function (obj){
      if(typeof(obj!="undefined")){
        if(typeof(obj.size!="undefined")) jQuery.extend(obj,this.root.defaults.getObject(obj.size));
        jQuery.extend(this.root.model,obj);
      };
    },


    make : function (){
      var m=this.root.model;
      var h='<iframe width="'+m.width+'" height="'+m.height+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+m.src+'"></iframe><br /><a href="'+m.src+'">View Larger Map</a>';
      jQuery(m.parent).append(h);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
