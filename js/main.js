$(document).ready(function() {

	/*****************************************
					LISTENERS
	*****************************************/

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

	//click links that scroll to "Bring Philo to You"
	$("a[href=#bring-philo-to-you]").click(function() {
		$(document.body).animate({
			'scrollTop': $('#bring-philo-to-you').offset().top
		}, 1000);
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