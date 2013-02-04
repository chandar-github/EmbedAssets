dfm.api("data", "scribd", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'scribd',
    parent  : 'body',

    size    : 'small',
    width   : '240',
    height  : '180',
    src     : '',

    docID   : '',
    akey    : '',
    dType   : "write"
  },

  // PLACEHOLDER THAT WILL EVENTUALLY REFERENCING THE NEWLY CREATED DOM ELEMENT
  view : null,

  // METHODS
  control : {
    init : function (obj){
      if(typeof(obj!="undefined")){
				dfm.api("load","script","http://www.scribd.com/javascripts/scribd_api.js",false);

        if(typeof(obj.size!="undefined")) jQuery.extend(obj,this.root.defaults.getObject(obj.size));
        if(typeof(obj.src!="undefined"))  obj.src="http://www.youtube-nocookie.com/embed/"+(obj.src.qsa2ary()).getValue("v")+"?rel=0";
        jQuery.extend(this.root.model,obj);
      };
    },

    done : function (docID, aKey, dType, embed_height, embed_width, parent){
	    var doc = scribd.Document.getDoc(docID, aKey);
	    doc.addParam('jsapi_version', 2);
	    doc.addParam('height', embed_height);
	    doc.addParam('width', embed_width);
	    dType=='write' ? doc.write(parent) : doc.seamless(parent);
    },

    make : function (){
      var m=this.root.model;
      var h='<div id="scribeD1"></div>';
      jQuery(m.parent).append(h);
	  setTimeout(this.control.done("+this.root.model.docID+", '"+this.root.model.aKey+"', '"+this.root.model.dType+"', '"+this.root.model.height+"', '"+this.root.model.width+"', '"+this.root.model.parent+"'), 300);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
