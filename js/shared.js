$(document).ready(function() {

	//PROTOTYPE ONLY: make sure href="#" links don't go to top of page
	$("a[href=#]").click(function(e) {
		e.preventDefault();
	});

	function hideAllDropdowns() {
		$("li.dropdown > a.active").removeClass("active");
	}

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
});