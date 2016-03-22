$(document).ready(function() {

	/*****************************************
					LISTENERS
	*****************************************/

	//PROTOTYPE ONLY: make sure href="#" links don't go to top of page
	$("a[href=#]").click(function(e) {
		e.preventDefault();
	});

	//PROTOTYPE ONLY: switch between Philo found and not found
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

	//on scroll
	$(document).scroll(function() {
		//add dark translucent bg to header if scrolled
		if ($(this).scrollTop() > 0) {
			$("header").addClass("is-scrolled");
		} else {
			$("header").removeClass("is-scrolled");
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
	$(".dropdown > a").click(function(e) {
		$(this).addClass("active");
		e.stopPropagation();
	});

	//click anywhere to close dropdown
	$(document).click(function() {
		$(".dropdown > a.active").removeClass("active");
	});
});