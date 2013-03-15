dfm.api("data", "documentcloud", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'documentcloud',
    parent  : 'body',
    size    : 'large',
    width   : '600',
    height  : '500',
	scriptSrc : 'http://s3.documentcloud.org/viewer/loader.js',
	docCloudUrl : 'http://www.documentcloud.org/documents/5205-concerning-the-interview.js'
	
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
      document.write('<script type="text/javascript" src="'+ m.scriptSrc +'"></script>');
	  document.write('<script type="text/javascript"> DV.load("'+ m.docCloudUrl +'", {container : "'+ m.parent +'", embedded  : true,  width: '+ m.width +', height: '+ m.height +' }); </script>');
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" }]
});
