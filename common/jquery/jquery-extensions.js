/*-- ###################################################################### --*/
/*-- # JQUERY CORE EXTENSION PROPERTIES                                   # --*/
/*-- ###################################################################### --*/
//
// Property: jQuery.browser.mobile
// Overview: Boolean value.  True if navigator.userAgent, navigator.vendor or window.opera matches against any of the following regular expressions.
// Examples: var isMobile = jQuery.browser.mobile;
//
(function(a){jQuery.browser.mobile=/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


/*-- ###################################################################### --*/
/*-- # JQUERY CORE EXTENSION METHODS                                      # --*/
/*-- ###################################################################### --*/
//
// Function: jQuery.loadStyle
// Overview: Load an external stylesheet file.
// Examples: jQuery.loadStyle("http://url/to/stylesheet.css");
//
jQuery.loadStyle = function(){
  try{
    jQuery("body").append('<link rel="stylesheet" type="text/css" href="'+arguments[0]+'" />');
  } catch(err){ };
};


//
// Function: jQuery.loadScript
// Overview: Load an external javascript file.
// Examples: jQuery.loadScript("http://url/to/script.js");
//           jQuery.loadScript("http://url/to/script.js",true);
//
jQuery.loadScript = function(){
  try{
    jQuery.ajax({ url:arguments[0],async:(arguments.length==2?arguments[1]:false),dataType:"script",cache:true });
  } catch(err){ };
};


//
// Function: jQuery.loadAjax
// Overview: Load an external file.
// Examples: jQuery.loadAjax("http://url/to/file.ext", jQuery("#id-to-place-results-into"));
//           jQuery.loadAjax("http://url/to/file.ext", jQuery("#id-to-place-results-into"), asyncTrueOrFalse);
//
jQuery.loadAjax = function(){
  try{
    if(arguments.length>1){
      var err = function(jQueryXmlHttpRequest, textStatus, errorThrown){ jQuery.trace("[AJAX Error:"+"<br />\t responseText = "+jQueryXmlHttpRequest.responseText+"<br />\t statusText   = "+jQueryXmlHttpRequest.statusText+"<br />\t textStatus   = "+textStatus+"<br />\t errorThrown  = "+errorThrown+"]<br />"); };
      var url = "http://query.yahooapis.com/v1/public/yql?"+"q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(arguments[0])+"%22&format=xml'&callback=?";
      jQuery.ajax({ url:url, dataType:'json', context:arguments[1], async:(arguments.length==3?arguments[2]:false), error:err, cache:true,
                    success:function(){
                      try{
                        if(arguments.length && (typeof arguments[0].results != undefined) && (arguments[0].results.length)){
                          var htm=arguments[0].results[0]+''; htm=htm.replace("<body>",""); htm=htm.replace("</body>","");
                          $(this).html(htm);
                        }
                      } catch(err){ }
                    }
                  });
    };
  } catch(err){ };
};


//
// Function: jQuery.moveNode
// Overview: Move a element to another node in the DOM.
// Examples: jQuery.moveNode("#element-to-move","#parent-container-to-move-to");
//
jQuery.moveNode = function(oldJQueryObj, newJQueryRoot){
  jQuery(document).ready(function(){
    try{
      if(oldJQueryObj.length && newJQueryRoot.length){
        var oldJQueryRoot=oldJQueryObj.parent();
        newJQueryRoot[0].appendChild(oldJQueryRoot[0].removeChild(oldJQueryObj[0]));
      };
    } catch(err){ };
  });
};


//
// Function: jQuery.toJSON
// Overview: Convert a variable into a JSON object.
// Examples: jQuery.toJSON(variable);
// Source:   http://sites.google.com/site/jollytoad/json.js?attredirects=0
//
jQuery.toJSON = function(v){
  var s={ 'array':   function (x){ var a=['['],b,f,i,l=x.length,v; for(i=0; i<l; i+=1){ v=x[i]; f=s[typeof v]; if(f){ v=f(v); if(typeof v=='string'){ if(b) a[a.length]=','; a[a.length]=v; b=true; }; }; }; a[a.length]=']'; return(a.join('')); },
          'boolean': function (x){ return String(x); },
          'null':    function (x){ return "null"; },
          'number':  function (x){ return isFinite(x) ? String(x) : 'null'; },
          'object':  function (x){ if(x){ if(x instanceof Array){ return(s.array(x)); }; var a=['{'],b,f,i,v; for(i in x){ v=x[i]; f=s[typeof v]; if(f){ v=f(v); if(typeof v=='string'){ if(b) a[a.length]=','; a.push(s.string(i),':',v); b=true; }; }; }; a[a.length]='}'; return(a.join('')); }; return 'null'; },
          'string':  function (x){ if(/["\\\x00-\x1f]/.test(x)){ x=x.replace(/([\x00-\x1f\\"])/g, function(a, b){ var m={ '\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\' }, c=m[b]; if(c) return(c); c=b.charCodeAt(); return('\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)); }); }; return('"'+x+'"'); }
      };
  var f=(isNaN(v)?s[typeof v]:s['number']); if(f) return(f(v));
  return('');
};


//
// Function: jQuery.xxx2yyy
// Overview: Convert a variable into another data type.
// Examples: jQuery.xxx2yyy(variable);
//
jQuery.num2hex = function (){ return(arguments[0].toString(16)); };
jQuery.num2oct = function (){ return(arguments[0].toString(8)); };
jQuery.num2bin = function (){ return(arguments[0].toString(2)); };
jQuery.obj2qsa = function (){ return(jQuery.param(arguments[0])); };
jQuery.obj2jsn = function (){ return(jQuery.toJSON(arguments[0])); };
jQuery.frm2qsa = function (){ return(jQuery(arguments[0]).serialize()); };
jQuery.frm2jsn = function (){ return(jQuery.qsa2jsn(jQuery(arguments[0]).serialize())); };
jQuery.jsn2qsa = function (){ return(jQuery.obj2qsa(jQuery.jsn2obj(arguments[0]))); };
jQuery.jsn2obj = function (){ return(jQuery.parseJSON(arguments[0])); };
jQuery.qsa2jsn = function (){ return(jQuery.obj2jsn(jQuery.qsa2obj(arguments[0]))); };
jQuery.qsa2obj = function (){
  var qsa=arguments[0].split('&'),obj={},tmp=pre=suf='';
  for(var x=0; x<qsa.length; x++){
    if(qsa[x] && qsa[x].indexOf('=')>-1){
      tmp=qsa[x].split('=');
      tmp[1]=decodeURIComponent(tmp[1].replace(/\+|%20/g, ' '));
      if(tmp[0].contains('%5B|%5D')){
        pre=tmp[0].split('%5B')[0];
        suf=tmp[0].split('%5B')[1].replace(/%5D/g,'');
        if(obj[pre]==undefined) obj[pre]={};
        obj[pre][suf]=tmp[1];
      }
      else{
        obj[tmp[0]]=tmp[1];
      };
    };
  };
  return(obj);
};


/*-- ###################################################################### --*/
/*-- # JQUERY CORE PLUG-IN METHODS                                        # --*/
/*-- ###################################################################### --*/
//
// Function: jQuery.fn.scaleProportionallyByWidth
// Overview: Scale an object proportionally by width
// Examples: jQuery("object-selector").scaleProportionallyByWidth(newWidthValue).
//
jQuery.fn.scaleProportionallyByWidth = function(newWidth){
  var ow=jQuery(this).width();
  var oh=jQuery(this).height();
  var nw=newWidth;
  var nh=nw/ow*oh;
  jQuery(this).width(nw);
  jQuery(this).height(nh);
};


//
// Function: jQuery.fn.scaleProportionallyByWidth
// Overview: Scale an object proportionally by height
// Examples: jQuery("object-selector").scaleProportionallyByHeight(newHeightValue).
//
jQuery.fn.scaleProportionallyByHeight = function(newHeight){
  var ow=jQuery(this).width();
  var oh=jQuery(this).height();
  var nw=nh/oh*ow;
  var nh=newHeight;
  jQuery(this).width(nw);
  jQuery(this).height(nh);
};


//
// Function: jQuery.fn.disableEnterKey
// Overview: Disable the enter keypress on an object
// Examples: jQuery("object-selector").disableEnterKey();
//
jQuery.fn.disableEnterKey = function(){
  jQuery(this).keypress(function(event) {
    if(event && event.which!=13){ return(true);  }
    else{            this.blur(); return(false); }
  });
};


//
// Function: jQuery.fn.setFlashWmode
// Overview: Set the Flash Wmode of an object.
// Examples: jQuery("object-selector").setFlashWmode();
//
jQuery.fn.setFlashWmode = function(){
  var val=(!arguments.length)?("transparent"):(arguments[0]);
  jQuery(this).find("embed").each(function(){ jQuery(this).attr("wmode", val); });
  jQuery(this).find("object").each(function(){ for(var i=0,c=this.childNodes; i<c.length; i++) if((c[i].nodeName=="PARAM")&&(c[i].name=="wmode")) jQuery(c[i]).attr("value", val); });
};
