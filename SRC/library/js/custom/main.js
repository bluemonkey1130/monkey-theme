/**
 * Created by georgehawthorne on 04/02/2016.
 */

//ANIMATED NAV
$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-content").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
});

//SMOOTH SCROLL FUNCTION
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing');
    });
});


//SCROLL TOP
$(".button").click(function(e){

    $('html, body').animate({
        'scrollTop' : $(".target").position().top
    });
});

//SMOOTH STICKY BAR
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#content-anchor').offset().top;
    if (window_top > div_top) {

        $('#sticky').addClass('stick');

        // Get the height of #sticky
        // outerHeight() gets height including padding and borders
        var phantomHeight = $('#sticky').outerHeight();

        // Set the height of $sticky-phantom
        $('#sticky-phantom').height(phantomHeight).show();

    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-phantom').hide();
    }
}

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});