dfm.api("data", "seeclickfix", {

  // PROPERTIES
  model : {
    id      : dfm.uuid(),
    what    : 'embed',
    type    : 'seeclickfix',
    parent  : 'body',
    size    : 'small',
    width   : '240',
    height  : '180',
    lat  : '',
    lng : '',
    num_results : '',
    search : '',
    statusOpen : '',
    token : '',
    zoom : ''
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
      var h='<iframe width="'+m.width+'" height="'+m.height+'" src="http://www.seeclickfix.com/issues/iframe?above_map=issue_report&h='+m.height+'&lat='+m.lat+'&lng='+m.lng+'&num_results='+m.num_results+'&search='+m.search+'&start=24&statusOpen='+m.statusOpen+'&token='+m.token+'&w='+m.width+'&zoom='+m.zoom+'" scrolling="no" marginheight="0" frameborder="0" marginwidth="0" allowtransparency="true" hspace="0" vspace="0"></iframe>';
      jQuery(m.parent).append(h);
      m.root.view=jQuery("#"+m.id)[0];
    }
  },

  // DEFAULT PARAMETERS:
  defaults: [{ size:"small",  width:"300", height:"250" },
             { size:"medium", width:"400", height:"300" },
             { size:"large",  width:"500", height:"400" }]
});
