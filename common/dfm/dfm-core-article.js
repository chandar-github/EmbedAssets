dfm.api("data","initMenus", function(){
  try{
    // INITIALIZE BUBBLE NAVIGATION
    var lis = dfm.$(".navigation>ul>li>.menu");
    lis.each(function(index, item){
      if(item.id!=''&&item.id!='list'){
        var topics    = $(item).find('.topics')[0];
        var headlines = $(item).find('.headlines')[0];
        var feed      = new google.feeds.Feed(item.id);
        feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
        feed.includeHistoricalEntries();
        feed.setNumEntries(7);
        feed.load(function(result){
          if(!result.error && result.feed.entries.length){
            var html = '<ul>';
            var item = result.feed.entries[0];
            if(typeof item.xmlNode!=undefined && item.xmlNode.children!=undefined && item.xmlNode.children.length>3 && typeof item.xmlNode.children[3].attributes!=undefined && item.xmlNode.children[3].attributes.length && typeof item.xmlNode.children[3].attributes[0].value!=undefined){
              html+='<img src="'+result.feed.entries[0].xmlNode.children[3].attributes[0].value+'" />';
            }
            html+='<h3><a href="'+item.link+'">'+item.title+'</a></h3><p>'+item.content+'</p>';
            $(topics).html(html+'</ul>');
             for(var x=1,html='<ul>'; x<result.feed.entries.length; x++){
              item=result.feed.entries[x];
              html+='<li><a href="'+item.link+'">'+item.title+'</a></li>';
            };
            $(headlines).html(html+'</ul>');
          };
        });
      };
    });
    // INITIALIZE MENU HOVER
    if(dfm.env.device=='desktop'){
      dfm.$('.desktop>.page>.page-head>.foot>.margin>.navigation>ul>li').hoverIntent({ timeout:0, interval:200, out:function (){ $(this).find($('.menu')).hide(); }, over:function (){ $(this).find($('.menu')).show(); } });
      dfm.$('.desktop>.page>.page-head>.foot>.margin>.navigation>ul>li>a').one('mouseover',function(){
        var id = jQuery(".navigation>ul>li").index(jQuery(this).parent());
        var sz = "300x250";
        var or = Math.random()*10000000000000000;
        var ad = '<a href="http://ad.doubleclick.net/jump/'+dfm.api("data","siteDomain")+'/;kv=articlenavtab'+(id+1)+';sz='+sz+';ord='+or+'?" target="_blank" ><img src="http://ad.doubleclick.net/ad/'+dfm.api("data","siteDomain")+'/;kv=articlenavtab'+(id+1)+';sz='+sz+';ord='+or+'?" border="0" alt="" /></a>'
        jQuery(this).parent().find('.advertisement').html(ad);
      });
    }
    else{
      dfm.$('.page>.page-head>.foot>.margin>.navigation>ul>li>a').removeAttr('href');
      dfm.$('.page>.page-head>.foot>.margin>.navigation>ul>li').click(function(){ $(this).find($('.menu')).toggle(); });
      dfm.$('.page>.page-head>.foot>.margin>.navigation>ul>li>a').one('click',function(){
        var id = jQuery(".navigation>ul>li").index(jQuery(this).parent());
        var sz = "300x250";
        var or = Math.random()*10000000000000000;
        var ad = '<a href="http://ad.doubleclick.net/jump/'+dfm.api("data","siteDomain")+'/;kv=articlenavtab'+(id+1)+';sz='+sz+';ord='+or+'?" target="_blank" ><img src="http://ad.doubleclick.net/ad/'+dfm.api("data","siteDomain")+'/;kv=articlenavtab'+(id+1)+';sz='+sz+';ord='+or+'?" border="0" alt="" /></a>'
        jQuery(this).parent().find('.advertisement').html(ad);
      });
    }
  } catch(err){ };
});
