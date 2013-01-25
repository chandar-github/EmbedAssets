/*-- ###################################################################### --*/
/*-- # DFM CORE OBJECT DEFINITION                                         # --*/
/*-- ###################################################################### --*/
var dfm = {
  //
  // Property: dfm.$
  // Overview: Abstract reference to jQuery object
  // Examples: dfm.$("#selector");
  //
  $ : jQuery,

  //
  // Property: dfm.urls
  // Overview: Array of external files loaded with dfm.load.
  // Examples: dfm.urls[0];
  //
  urls : new Array(),


  //
  // Property: dfm.env
  // Overview: Information about this object and the client's rendering environment.
  // Examples: var isSmartPhone = dfm.env.isMobile && dfm.env.isHtml5;
  //           console.dir(dfm.env);
  //           alert("This page loaded in " + dfm.env.loadTime);
  //
  env : {
    loadTime    : new Date(),
    width       : jQuery(window).width(),
    height      : 0,
    geolocation : !!navigator.geolocation,
    canvas      : !!document.createElement('canvas').getContext,
    html5       : !!document.createElement('canvas').getContext&&!!navigator.geolocation,
    touch       : (typeof(window.Touch)!='undefined')?true:false,
    mobile      : jQuery.browser.mobile,
    desktop     : (!jQuery.browser.mobile)&&(jQuery(window).width()>1024),
    tablet      : ( jQuery.browser.mobile)&&(jQuery(window).width()>=768)&&(jQuery(window).width()<=1024),
    phone       : ( jQuery.browser.mobile)&&(/Android|iPhone|iPod/i.test(navigator.userAgent)),
    device      : "desktop",
    debug       : true,
    version     : '0',
    revision    : '1',
    build       : '1b',
    release     : 'alpha',
    codename    : 'asimov'
  },

  //
  // Property: dfm.events
  // Overview: Events array loader and execution object.
  // Examples: dfm.events.add(function, priorityOrder);
  //
  events : {
    aryWin:[],
    aryDoc:[],
    idx:{ "prep":0, "preload":1, "init":2, "normal":3, "postload":4, "cleanup":5 },
    add:function(){
      var num=((dfm.type(arguments[1])=="string")?(this.idx[arguments[1]]):(arguments[1]));
      var ary=((num<4)?(this.aryDoc):(this.aryWin));
      ary.push({ event:arguments[0], order:num });
    },
    run:function(){
      var ary=((arguments[0]=="document")?(this.aryDoc):(this.aryWin));
      ary.sort(this.sort);
      dfm.$.each(ary, function(){ this.event(); });
    },
    sort:function(a,b){
      if(a.order < b.order) return(-1);
      if(a.order > b.order) return(1);
      return(0);
    }
  },


  //
  // Function: dfm.new
  // Overview: Create a new instance of a dfm.data object
  // Examples: var myObject = dfm.new({ "type":"youtube" [, optionalKey:optionalValue ...] });
  //
  newdfmobject : function (){
    var obj = new Object();
    if(arguments.length && dfm.type(arguments[0])=="object" && dfm.type(arguments[0].type)!="undefined"){
      obj=new dfm.data(arguments[0].type);
      obj.control.root=obj.model.root=obj;
      obj.control.init(arguments[0]);
      if(arguments.length>1) obj.control.make();
    };
    return(obj);
  },


  //
  // Function: dfm.api
  // Overview: API pass through function.  Will eventually contain the following functionality:
  //           1. Logging information of what calls where made, when any by which referrer;
  //           2. The ability to override any call that results in harming the rest of the document;
  // Examples: dfm.api("function-name");
  //           dfm.api("function-name","arguments");
  //
  api : function(){
    try{
      if((arguments.length)&&(typeof dfm[arguments[0]]=='function')){
        for(var a=[],x=1; x<arguments.length; x++) a[x-1]=arguments[x];
        return(dfm[arguments[0]].apply(this,a));
      };
    } catch(err){ };
    return(-1);
  },


  //
  // Function: dfm.type
  // Overview: Return the type of a variable;
  // Examples: dfm.type(myVariable);
  //
  type : function(){
    if((typeof(arguments[0])!='undefined')&&(typeof(arguments[0].constructor)!='undefined')){
      var c=((arguments[0]).constructor+'').toLowerCase();
      if(c){
        var t=["array","boolean","date","function", "number","object","string"];
        for(var i=0; i<t.length; i++) if(c.indexOf("function "+t[i])>-1) return(t[i]);
      };
      if(c) return(c.replace(/\[|\]| |object/g,''));
    };
    return('undefined');
  },


  //
  // Function: dfm.uuid
  // Overview: Return a universally unique identifier
  // Examples: var myUuid = dfm.uuid();  =>  "5b00d6a0-7313-11e1-b0c4-0800200c9a66"
  //
  uuid : function(){
    for(var h='',x=0; x<6; x++) h+=((Math.random()*0xFFFFFF<<0).toString(16));
    h=h.split(''); h[8]=h[13]=h[18]=h[23]='-';
    return(h.join(''));
  },


  //
  // Function: dfm.convert
  // Overview: Convert a variable from one type to another.
  // Examples: myVariable = dfm.convert("what2what", myVariable);
  //
  convert : function(){
    try{
      if(typeof dfm.$[arguments[0]]=='function') return(dfm.$[arguments[0]](arguments[1]));
    } catch(err){ };
    return('');
  },


  //
  // Function: dfm.trace
  // Overview: Write out debugging information.
  // Examples: dfm.trace(data);
  //
  trace : function(){
    if(this.env.debug){
      var a=((arguments.length)?(arguments[0]):(''));
      var c=((typeof(console)=='object')&&(typeof(console.dir)=='function')&&(typeof(console.info)=='function')&&(typeof(console.trace)=='function'));
      var h='';
      if(c){
        if(typeof(a)=='object') console.dir(a);
        else if(a)              console.info(a);
        else                    console.trace();
      }
      else{
        var d=dfm.$("#trace"); if(!d.length) dfm.$('body').append('<div id="trace"></div>');
        if(typeof(a)=='object') for(var p in a) h+='['+p+' = '+a[p]+']<br />';
        else                    h=a+'<br />';
        dfm.$('#trace').append("<h5>Debugger</h5>"+h);
      };
    };
  },


  //
  // Function: dfm.load
  // Overview: Load an external file into the current document.  Will eventually contain the following functionality:
  //           1. The ability to timeout if a successful response is not returned in a given time;
  //           2. The ability to retry the call a given number of times;
  //           3. The ability to load the file synchronously or asynchronous;
  //           4. The ability to set a load priority or force somethings to load before others;
  //           5. The ability to set a load a file in conjunction with another file (i.e. wait until both are loaded before proceeding);
  // Examples: dfm.api("load", "apt",       "positionNumber", "#div-id-to-put-results-in");
  //           dfm.api("load", "dart",      "uniqueID", "dimensions", "#div-id-to-put-results-in");
  //           dfm.api("load", "event",     function [, priorityOrder]);
  //           dfm.api("load", "style",     "http://url/to/style.css");
  //           dfm.api("load", "script",    "http://url/to/script.js"[, booleanAsync]);
  //           dfm.api("load", "component", "http://url/to/component.ext"[, "#div-id-to-put-results-in", asyncTrueOrFalse]);
  //           dfm.api("load", "embed",     "youtube", "300x300", "http://www.youtube.com/watch?v=XteCjXG3VWA&feature=g-vrec", "#div-id");
  load : function(){
    try{
      if(dfm.type(arguments[0])=="object"){
          var obj =arguments[0];
          var type=obj.type;
          var load="jQuery.load" + obj.type.capitalize();
          eval(load)(obj);
      }
      else switch(arguments[0]){
      case 'event':     if(dfm.type(arguments[1])=="function"){
                          this.events.add(arguments[1],((arguments.length==3)?(arguments[2]):(3)));
                        };
                        break;

      case 'embed':     if(arguments[1]=="youtube"){
                          if(dfm.$.inArray(arguments[3], dfm.urls)==-1){
                            dfm.$.loadYoutube({ what:"embed", type:arguments[1], parent:arguments[4], src:arguments[3], size:arguments[2] });
                            dfm.urls.push(arguments[3]);
                          };
                        };
                        break;

      case 'style':     if(dfm.$.inArray(arguments[1], dfm.urls)==-1){
                          dfm.$.loadStyle(arguments[1]);
                          dfm.urls.push(arguments[1]);
                        };
                        break;

      case 'script':    if(dfm.$.inArray(arguments[1], dfm.urls)==-1){
                          dfm.$.loadScript(arguments[1],(arguments.length==3?arguments[2]:false));
                          dfm.urls.push(arguments[1]);
                        };
                        break;

      case 'component': if(arguments[1].indexOf("|")>-1){
                          var ary=arguments[1].split("|");
                          dfm.$.ajax({
                            url:     ary[0], type:'HEAD',
                            error:   function(){ dfm.$.loadAjax(ary[1], dfm.$(arguments[2]), function(data){ if(data.results.length) this.append(data.results[0].replace(/<body>|<\/body>/gi,'')); }, (arguments.length==4?arguments[3]:false)) },
                            success: function(){ dfm.$.loadAjax(ary[0], dfm.$(arguments[2]), function(data){ if(data.results.length) this.append(data.results[0].replace(/<body>|<\/body>/gi,'')); }, (arguments.length==4?arguments[3]:false)) }
                          });
                        }
                        else{
                            dfm.$.loadAjax(arguments[1],dfm.$(arguments[2]),function(data){ if(data.results.length) this.append(data.results[0].replace(/<body>|<\/body>/gi,'')); }, (arguments.length==4?arguments[3]:false));
                        };
                        break;
      };
    } catch(err){ };
  },


  //
  // Function: dfm.data
  // Overview: Store and retrieve any piece of data.  Will eventually contain the following functionality:
  //           1. Save as cookie data;
  //           2. Save as "localStorage" (i.e. Persistant information, unique to each domain);
  //           3. Save as "sessionStorage" (i.e. Information accessibly across any page loaded in the same window);
  //           4. Save as "openDatabase" (i.e. SQLite database);
  // Examples: dfm.api("data","variable-name","variable-value");
  //           dfm.api("data","variable-name");
  //
  data : function(){
    try{
      if(arguments.length==2) return(dfm.$(dfm).data(arguments[0],arguments[1]));
      else                    return(dfm.$(dfm).data(arguments[0]));
    }
    catch(err){ };
    return(-1);
  },


  //
  // Function: dfm.done
  // Overview: Perform any actions needed after the page has finished rendering.
  // Examples: dfm.done();
  //
  documentReady : function(){
    dfm.env.height = dfm.$(window).height();
    dfm.events.run("document");
  },


  windowLoaded : function(){
    dfm.env.height   = dfm.$(window).height();
    dfm.env.loadTime = ((new Date().getTime())-(dfm.env.loadTime))+'ms';
    dfm.events.run("window");
  },


  //
  // Function: dfm.init
  // Overview: Initialize all dfm object.
  // Examples: dfm.init();
  //
  init : function(){
    if     (this.env.phone) { this.env.device="phone";   }
    else if(this.env.tablet){ this.env.device="tablet";  }
    else                    { this.env.device="desktop"; }

    dfm.$(document).ready(dfm.documentReady);
    dfm.$(window).load(dfm.windowLoaded);
  }
};



/*-- ###################################################################### --*/
/*-- # DFM CORE INITIALIZATION                                            # --*/
/*-- ###################################################################### --*/
dfm.init();
