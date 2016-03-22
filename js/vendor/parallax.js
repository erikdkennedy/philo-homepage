$(document).ready(function() {

    //initialize parallax elements
    $("[data-parallax]").each(function() {
        var offset = $(this).offset().top - 0.5*$(window).height();
        var speed = $(this).attr("data-speed");
        var translation = -offset*speed;

        $(this).attr("data-offset", offset);

        if ($(this).attr("data-axis") === "x") {
            $(this).css("transform", "translateX(" + translation + "px)");
        } else {
            $(this).css("transform", "translateY(" + translation + "px)");
        }
    });

    //on scroll, adjust positions
    $(window).on("scroll resize", function() {
        var scrollDist = $(window).scrollTop();

        $("[data-parallax]").each(function() {
            var offset = $(this).attr("data-offset");
            var speed = $(this).attr("data-speed");
            var translation =  -(offset-scrollDist)*speed;

            if ($(this).attr("data-axis") === "x") {
                $(this).css("transform", "translateX(" + translation + "px)");
            } else {
                $(this).css("transform", "translateY(" + translation + "px)");
            }
        });

        $("[data-background-parallax").each(function() {
            var speed = $(this).attr("data-speed");
            var translation = scrollDist*speed;
            var translationInPx = "0 " + translation + "px";

            $(this).css("background-position", translationInPx);
        });
    });
});