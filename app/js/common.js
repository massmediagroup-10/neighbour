'use strict';

function swipeSidebar() {
  $('.show-sidebar').on('click', function (e) {
    e.preventDefault();
    $('.sidebar').addClass('active');
  });
  $('.hide-sidebar').on('click', function (e) {
    e.preventDefault();
    $('.sidebar').removeClass('active');
  });
  $( 'body' ).on( "swiperight", function( event ) {
    $('.sidebar').addClass('active');
  })
  $( 'body' ).on( "swipeleft", function( event ) {
    $('.sidebar').removeClass('active');
  })
}

function indexHeight() {
  $('.index').css({
    'min-height' : $(window).height()
  });
}

(function ($) {
  swipeSidebar();
  indexHeight();
  
  $(window).resize(function () {
    indexHeight();
  })
})(jQuery)
