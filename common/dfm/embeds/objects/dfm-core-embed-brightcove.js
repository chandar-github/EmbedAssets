dfm.api("data", "brightcove", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'brightcove',
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
        dfm.api("load","script","http://admin.brightcove.com/js/BrightcoveExperiences.js",false);
        dfm.api("load","script","http://files.brightcove.com/bc-mapi.js",false);

        if(typeof(obj.size!="undefined")) jQuery.extend(obj,this.root.defaults.getObject(obj.size));
        if(typeof(obj.src!="undefined"))  obj.src="http://www.youtube-nocookie.com/embed/"+(obj.src.qsa2ary()).getValue("v")+"?rel=0";
        jQuery.extend(this.root.model,obj);
      };
    },


    make : function (){
      var m=this.root.model;
      var h='<object id="myExperience"      class="BrightcoveExperience">'+
            '<param name="bgcolor"          value="#FFFFFF" />'+
            '<param name="width"            value="'+m.width+'" />'+
            '<param name="height"           value="'+m.height+'" />'+
            '<param name="playerID"         value="'+m.playerID+'" />'+
            '<param name="playerKey"        value="'+m.playerKey+'" />'+
            '<param name="isVid"            value="true" />'+
            '<param name="isUI"             value="true" />'+
            '<param name="dynamicStreaming" value="true" />'+
            '</object>';
      jQuery(m.parent).append(h);
      brightcove.createExperiences();
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
