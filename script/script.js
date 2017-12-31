$(document).ready(function(){
  'use strict';

  var dropSuccess = [false, false, false, false];

  $(".reset").click(function(){
    $('.drag').animate({
      top: "0px",
      left: "0px"
    });
    $('.drag').css({
      "background-color": "#c3c3c3",
      "cursor": "grab"
    });
    $('.item.donut.drag').css({
      "border-color": "#c3c3c3",
      "background": "none"
    });
    $('.drag').draggable("enable");
    $('.drag').toggleClass("dropped");
});

  $('.modal').dialog({
    minHeight: 300,
    minWidth: 450,
    position:{
      my: "center",
      at: "center",
      of: ".container"
    },
    autoOpen: false
  });

  $('.drag').draggable({
    revert: function(){
      if($(this).hasClass("dropped") == true) return false;
      else {
        $('.fail')
          .dialog("open")
          .delay(2000)
          .queue(function(next){
            $(this).dialog("close");
            next();
          });
          return true;
        }
    },
    snap: '.drop',
    snapMode: "inner",
    drag: function(event, ui){
      $(this).css("cursor", "grabbing");
    }
  });

  $(".item.square.drop").droppable({
    accept: ".item.square.drag",
    //tolerance: "fit",
    drop: function(event, ui) {
      ui.draggable.toggleClass("dropped");
      ui.draggable.css({
        "background-color": "#3366cc",
        "cursor": "default"
      });
      var drop_pos = $(this).offset();
      var drag_pos = ui.draggable.offset();
      var left_end = drop_pos.left - drag_pos.left;
      var top_end = drop_pos.top - drag_pos.top;
      ui.draggable.animate({
        top: '+=' + top_end,
        left: '+=' + left_end
      });
      ui.draggable.draggable("disable");
      dropSuccess[0] = true;
      endGame();
      }
  });

  $(".item.donut.drop").droppable({
    accept: ".item.donut.drag",
    //tolerance: "fit",
    drop: function(event, ui) {
      ui.draggable.toggleClass("dropped");
      ui.draggable.css("border-color", "#ff6666");
      var drop_pos = $(this).offset();
      var drag_pos = ui.draggable.offset();
      var left_end = drop_pos.left - drag_pos.left;
      var top_end = drop_pos.top - drag_pos.top;
      ui.draggable.animate({
        top: '+=' + top_end,
        left: '+=' + left_end
      });
      ui.draggable.draggable("disable");
      dropSuccess[1] = true;
      endGame();
    }
  });

  $(".item.diamond.drop").droppable({
    accept: ".item.diamond.drag",
    //tolerance: "pointer",
    drop: function(event, ui) {
      ui.draggable.toggleClass("dropped");
      ui.draggable.css("background-color", "#ffcc66");
      var drop_pos = $(this).offset();
      var drag_pos = ui.draggable.offset();
      var left_end = drop_pos.left - drag_pos.left;
      var top_end = drop_pos.top - drag_pos.top;
      ui.draggable.animate({
        top: '+=' + top_end,
        left: '+=' + left_end
      });
      ui.draggable.draggable("disable");
      dropSuccess[2] = true;
      endGame();
    }
  });

  $(".item.ball.drop").droppable({
    accept: ".item.ball.drag",
    //tolerance: "fit",
    drop: function(event, ui) {
      ui.draggable.toggleClass("dropped");
      ui.draggable.css("background-color", "#00cc99");
      var drop_pos = $(this).offset();
      var drag_pos = ui.draggable.offset();
      var left_end = drop_pos.left - drag_pos.left;
      var top_end = drop_pos.top - drag_pos.top;
      ui.draggable.animate({
        top: '+=' + top_end,
        left: '+=' + left_end
      });
      ui.draggable.draggable("disable");
      dropSuccess[3] = true;
      endGame();
    }
  });

  function endGame(){
    var i;
    var n = 0;
    for (i = 0; i < 4; i++){
      if(dropSuccess[i] === true) n++;
    }
    if(n == 4){
      $('.success')
        .dialog("open")
        .delay(4000)
        .queue(function(next){
          $(this).dialog("close");
          next();
        });
      $('.drag').animate({
        top: "0px",
        left: "0px"
      });
      $('.drag').css({
        "background-color": "#c3c3c3",
        "cursor": "grab"
      });
      $('.item.donut.drag').css({
        "border-color": "#c3c3c3",
        "background": "none"
      });
      $('.drag').draggable("enable");
      for (i = 0; i < 4; i++){
        dropSuccess[i] = false;
      }
      $('.drop')
      .queue(function(next){
        next();
        $('.drag').toggleClass("dropped");
      });
    }
  }

});
