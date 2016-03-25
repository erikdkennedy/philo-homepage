$(document).ready(function() {

	//PROTOTYPE ONLY: make sure href="#" links don't go to top of page
	$("a[href=#]").click(function(e) {
		e.preventDefault();
	});

	//PROTOTYPE ONLY: switch between Philo found/not found and cookie found/not found
	$(document).keyup(function(e) {
		//switch if "p" is pressed
		if (e.keyCode === 80) {
			$("body").toggleClass("philo-no");
		}

		//switch if "c" is pressed
		if (e.keyCode === 67) {
			$("body").toggleClass("cookie-yes");
		}
	});

	//click page down button
	$(".page-down").click(function() {
		var $nextDivOffset = $(this).parent().next().offset().top;
		var animationTimeInMS = 750;

		$("body, html").animate({
			"scrollTop": $nextDivOffset
		}, animationTimeInMS);
	});

	//click dropdown link
	$(".dropdown > a").click(function(clickEvent) {
		if ($(this).hasClass("active")) {
			hideAllDropdowns();
		} else {
			hideAllDropdowns();
			$(this).addClass("active");
			clickEvent.stopPropagation();
		}
	});

	//click anywhere to close dropdown
	$(document).on("click touchstart", function() {
		hideAllDropdowns();
	});

	function hideAllDropdowns() {
		$("li.dropdown > a.active").removeClass("active");
	}

    //on scroll, update parallaxed positions
    $(window).on("scroll resize", function() {

    	if (Modernizr.touch) return;

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
    });

	//initialize parallax elements
    $("[data-parallax]").each(function() {

    	if (Modernizr.touch) return;

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
});