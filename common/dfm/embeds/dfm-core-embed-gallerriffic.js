dfm.api("data", "gallerriffic", {

  // PROPERTIES
  model : {
	id         : dfm.uuid(),
   what       : 'embed',
	type       : 'Gallerriffic',
	parent     : '.page-body .story p:nth-child(2)',
	thumbs     : '5',
	siteID     : '568_2',
	album      : '-2865',
	landing    : 'http://photos.mercurynews.com/2012/11/28/police-identify-two-girls-shot-to-death-in-oakland/',
	adURL      : 'http://photos.mercurynews.com/wp-content/themes/gridline_10_12_2010/ads/photo350x200.html?thepagetag=photo_galleries&thepagecat=',
	AdCategory : 'soundslides_sports',
	maxHeight  : '350',
	maxWidth   : '580'
  },

  // PLACEHOLDER THAT WILL EVENTUALLY REFERENCING THE NEWLY CREATED DOM ELEMENT
  view : null,

  // METHODS
  control : {
    init : function (obj){
	 	var s  = document.createElement('script');
		s.type = 'text/javascript';
		s.src  = 'http://extras.mnginteractive.com/live/js/galleriffic/jquery.galleriffic.js';
		document.getElementsByTagName('head')[0].appendChild(s);
	
		var s2  = document.createElement('script');
		s2.type = 'text/javascript';
		s2.src  = 'http://extras.mnginteractive.com/live/js/galleriffic/jquery.history.js';
		document.getElementsByTagName('head')[0].appendChild(s2);
	
		var s3  = document.createElement('script');
		s3.type = 'text/javascript';
		s3.src  = 'http://extras.mnginteractive.com/live/js/galleriffic/jquery.opacityrollover.js';
		document.getElementsByTagName('head')[0].appendChild(s3);

		//dfm.api("load","style","http://extras.mnginteractive.com/live/js/galleriffic/galleriffic-3-mngi2.css",false);
	 	//jQuery(this.root.model.parent).append('<div id="gallery"></div>');
		},

    make : function (){
      var m=this.root.model;
		var h = '<link type="text/css" href="http://extras.mnginteractive.com/live/js/galleriffic/galleriffic-3-mngi2.css" rel="stylesheet" />';
			h += '<scr'+'ipt type="text/javascript">';
			h += 'var overrideThumbsNum="'+m.thumbs+'";';
			h += 'var imageProviderDefn={ "GALLERY":"gallery", "ALBUM":"album" };';
			h += 'var siteId="'+m.siteID+'";';
			h += 'var collectionId=imageProviderDefn.ALBUM+"'+m.album+'";';
			h += 'var landingPageUri="'+m.landing+'";';
			h += 'var adURL="'+m.adURL+'";';
			h += 'var overrideAdCategory="'+m.AdCategory+'";';
			h += 'var overrideAdElementID=".sspAd";';
			h += 'var overrideAdClick="2";';
			h += 'var collectionTitle="";';
			h += 'var maxHeight="'+m.maxHeight+'";';
			h += 'var maxWidth="'+m.maxWidth+'";';
			h += '<\/scr'+'ipt>';

		jQuery('#gallery').append(h);
      m.root.view=jQuery("#"+m.id)[0];

		var s4  = document.createElement('script');
		s4.type = 'text/javascript';
		s4.src  = 'http://extras.mnginteractive.com/live/js/galleriffic/mngi-gallerific.js';
		document.getElementsByTagName('body')[0].appendChild(s4);
		
		setTimeout('$("#gallery").show()', 2000);		
    }
  },

  // DEFAULT PARAMETERS:
  defaults: null
});

