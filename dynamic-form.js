$(function(){
  // Initial form filed with attribute: group="1"
  $("#container").children().attr("group", "1")

  // Add frame to "div.container", Add "form.form-horizontal" to frame 
  // "container-content"
  $('\
<div id="container-nav">\
  <div id="container-ul">\
    <ul id="container-ul-li" class="nav nav-tabs">\
    <li group="1" role="presentation" class="active"><a href="#">Base</a></li>\
    </ul>\
  </div>\
  <div id="container-content"></div>\
</div>').appendTo("div.container");
  $("form.form-horizontal").appendTo("#container-content");


  // Click Addition to add frame
  var g = 1;
  $('#addition').on('click', function(e){
    g += 1;
    e.preventDefault();
    $("#container-ul-li > li").removeClass();
    $("#container").children().hide();
    $('<li group="'+g+'" role="presentation" class="active"><a href="#">Addition</a></li>').appendTo("#container-ul-li");
    $('\
      <div group="'+g+'" class="form-group">\
        <label class="col-xs-2 control-label" for="id_url_rule">URL XPATH</label>\
        <div class="col-xs-3">\
          <input type="text" class="form-control" name="id_group_'+g+'_url" id="id_url_rule" placeholder="Enter URL XPath">\
        </div>\
      </div>').appendTo("#container");


    $("#container").children("input").show();
  });
  $("#container-ul-li").on("click", 'li > a',  function(e){
    e.preventDefault();


    group = $(this).parent().attr("group");
    g = parseInt(group);
    $("#container").children().each(function(){
      $("#container").children("input#selector").show();
      if($(this).attr("group")==group){
          $(this).show();
      }
      else{
          $(this).hide();
      }
    });


    // Show addtion if last
    if($(this).parent().is($("#container-ul-li li").last())){
        $("#addition").show();
    }else{
        $("#addition").hide();
    }

    $("#container-ul-li > li").removeClass("active");
    $(this).parent().addClass("active");
  });


  // Click Selector to add form field frame
  var i = 0;

  var $container = $("#container");
  $($container).on('click', 'input#selector',  function(e){
    e.preventDefault();          
    $('\
<div group="'+g+'" class="form-group">\
  <label class="col-xs-2 control-label" for="id_selector_'+i+'_name">name</label>\
  <div class="col-xs-3">\
    <input type="text" class="form-control" name="id_group_'+g+'_selector_'+i+'_name" id="id_selector_'+i+'_name" placeholder="Enter name">\
  </div>\
  <label class="col-xs-2 control-label" for="id_selector_'+i+'_value">value</label>\
  <div class="col-xs-3">\
    <input type="text" class="form-control" name="id_group_'+g+'_selector_'+i+'_value" id="id_selector_'+i+'_value" placeholder="Enter value">\
  </div>\
  <div class+"col-xs-2">\
    <input id="id_selector_'+i+'_remove" class="btn btn-default" type="button" value="remove">\
  </div>\
</div>').appendTo($container);
    i += 1;                    
  });                          
                               
  $container.on('click', 'input[id^="id_selector_"][id$="_remove"]', function(e){
    e.preventDefault();                
    $(this).parents("div.form-group").remove();
    i -= 1;                    
  });                          
});
