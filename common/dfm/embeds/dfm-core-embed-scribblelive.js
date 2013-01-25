dfm.api("data", "scribblelive", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'scribblelive',
    parent  : 'body',
    size    : 'small',
    width   : '240',
    height  : '180',
    itemId  : '',
    themeId : ''
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
      var h='<iframe src="http://embed.scribblelive.com/Embed/v5.aspx?Id='+m.itemId+'&ThemeId='+m.themeId+'" width="'+m.width+'" height="'+m.height+'" frameborder="0" style="border: 1px solid #000"></iframe>';
      jQuery(m.parent).append(h);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
