dfm.api("data", "youtube", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'youtube',
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
        if(typeof(obj.src!="undefined"))  obj.src="http://www.youtube-nocookie.com/embed/"+(obj.src.qsa2ary()).getValue("v")+"?rel=0";
        jQuery.extend(this.root.model,obj);
      };
    },


    make : function (){
      var m=this.root.model;
      var h='<iframe id="'+m.id+'" width="'+m.width+'" height="'+m.height+'" src="'+m.src+'" frameborder="0" allowfullscreen></iframe>';
      jQuery(m.parent).append(h);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
