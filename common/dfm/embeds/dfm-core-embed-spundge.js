dfm.api("data", "spundge", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'spundge',
    parent  : 'body',

    size    : 'small',
    width   : '240',
    height  : '180',
    src     : '',
    itemID	: '104',
    itemTitle	: 'Test Article',
    dataHideTitle : 'true',
    dataHideByline : 'true',
    dataHideFootnotes : 'true'
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
      document.write('<script data-hide-title="'+m.dataHideTitle+'" data-hide-byline="'+ m.dataHideByline+'" data-hide-footnotes="'+m.dataHideFootnotes+'" type="text/javascript" language="JavaScript" src="http://cdn.spundge.com/embed/stories/'+m.itemID+'/"></script><noscript><a href="http://cdn.spundge.com/stories/'+m.itemID+'/embedded/" target="_blank">View the article <em>'+m.itemTitle+'</em> on Spundge</a></noscript>');
    }
  }
  
});
