(function(){
  var a=[],v=[],c=jQuery.cookie('lsg'); if(c) for(var x=0,v=c.split('s'); x<v.length; x++) if(v[x]!='0') a.push(v[x]);
  var pid = dfm.api("data","aptPubId");                     pid=pid!=undefined?pid:"20484550943";
  var sid = dfm.api("data","aptSiteName");                  sid=sid!=undefined?sid:"www.benningtonbanner.com";
  var cil = dfm.api("data","aptContentTopicIdList");        cil=cil!=undefined?cil:["20201001"];
  var ccl = dfm.api("data","aptCustomContentCategoryList"); ccl=ccl!=undefined?ccl:[""]; ccl=ccl.concat(a);
  var rtl = dfm.api("data","aptReportingTagList");          rtl=rtl!=undefined?rtl:["Home"];
  var ctl = dfm.api("data","aptContentTypeList");           ctl=ctl!=undefined?ctl:["fn_news"];
  var csl = dfm.api("data","aptCustomSectionList");         csl=((window.location+'').indexOf('ci_')>-1)?(["article"]):(csl);
  var afl = ["Standard Graphical","Rich Media"];
  yld_mgr = {
    pub_id                : pid,
    content_topic_id_list : cil,
    cstm_sctn_list        : csl,
    site_name             : sid,
    container_type        : "js",
    request_type          : "ac",
    clk_dest              : "_blank",
    ad_output_encoding    : "utf-8",
    max_count             : 3,
    content_lang          : "en-US",
    disable_content_send  : "0",
    slots                 : {
      adPos0   : { ad_size_list:["728x90"],  cstm_content_cat_list:ccl, ad_delivery_mode:"ipatf", ad_format_list:afl, content_type_list:ctl, reporting_tag_list:rtl }, // 728x90 & 970x90 Top Leaderboard
      adPos3   : { ad_size_list:["1x1"],     cstm_content_cat_list:ccl, ad_delivery_mode:"ipatf", ad_format_list:afl, content_type_list:ctl, reporting_tag_list:rtl }, // 1x1 Ad
      adPos10  : { ad_size_list:["160x600"], cstm_content_cat_list:ccl, ad_delivery_mode:"ipatf", ad_format_list:afl, content_type_list:ctl, reporting_tag_list:rtl }, // 160x600 Ad
      adPos14  : { ad_size_list:["728x90"],  cstm_content_cat_list:ccl, ad_delivery_mode:"ipbtf", ad_format_list:afl, content_type_list:ctl, reporting_tag_list:rtl }, // 728x90 & 970x90 Bottom Leaderboard
      adPosBox : { ad_size_list:["300x250"], cstm_content_cat_list:ccl, ad_delivery_mode:"ipbtf", ad_format_list:afl, content_type_list:ctl, reporting_tag_list:rtl }  // 300x250 Daily Deals
    }
  };
  if(typeof(reg_data)!='undefined'){
    yld_mgr.user_city    = reg_data.user_city;
    yld_mgr.user_dma     = reg_data.user_dma;
    yld_mgr.user_state   = reg_data.user_state;
    yld_mgr.user_zip     = reg_data.user_zip;
    yld_mgr.user_country = reg_data.user_country;
    yld_mgr.user_age     = reg_data.user_age;
    yld_mgr.user_gender  = reg_data.user_gender;
    yld_mgr.user_income  = reg_data.user_income;
  };
})();
