dfm.api("data", "dipity", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'dipity',
    parent  : 'body',

    size    : 'small',
    width   : '240',
    height  : '180',
    src     : 'http://www.dipity.com/StevePro/Ron-Paul-2012/',
    mode	: 'embed',
    z		: '0',
    bgcolor	: '%23ffffff',
    bgimg	: '/images/white_grad_up.png',
    title	: 'tl'
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
      var h='<iframe src="'+m.src+'?mode='+m.mode+'&z='+m.z+'&bgcolor='+m.bgcolor+'&bgimg='+m.bgimg+'#'+m.title+'" width="'+m.width+'" height="'+m.height+'"  style="border:1px solid #CCC;"></iframe><p style="margin:0;font-family:Arial,sans;font-size:13px;text-align:center"><a href="'+m.src+'">Ron Paul 2012</a> on <a href="http://www.dipity.com/" />Dipity</a>.</p>';
      jQuery(m.parent).append(h);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
