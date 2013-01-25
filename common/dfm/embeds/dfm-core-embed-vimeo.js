dfm.api("data", "vimeo", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'vimeo',
    parent  : 'body',

    size    : 'small',
    width   : '240',
    height  : '180',
    videoId	: ''
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
      var h='<iframe src="http://player.vimeo.com/video/'+m.videoId+'" width="'+m.width+'" height="'+m.height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/'+m.videoId+'">THE CAMPBELLS IN NYC</a> from <a href="http://vimeo.com/user2888790">benedict campbell</a> on <a href="http://vimeo.com">Vimeo</a>.</p>';
      jQuery(m.parent).append(h);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
