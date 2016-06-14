$(document).ready(function() {

	/*****************************************
				 VARIABLES & HELPERS
	******************************************/

	var viewportWidth = window.innerWidth;
	var viewportHeight = window.innerHeight;

	var sections = [];

	function determineSectionOffsets() {
		sections = $("section").map(function(i, section) {
			return $(section).offset().top;
		}).toArray();
	}

	function updateNavState() {
		if (isDesktop()) {
			for (var i=0; i<sections.length; i++) {
				if (scrolledPastPoint(sections[i]) && !scrolledPastPoint(sections[i+1])) {
					setNavTo(i);
					break;
				}
			}
		}
	}

	function isDesktop() {
		return window.matchMedia("(min-width: 769px)").matches;
	}

	function scrolledPastPoint(offset) {
		return window.scrollY + 0.75*viewportHeight > offset;
	}

	function setNavTo(index) {
		$("nav li a")
				.removeClass("active")
				.eq(index).addClass("active");
	}

	function ensureNavInitialization() {
		if (!sections.length) {
			determineSectionOffsets();
			updateNavState();
		}
	}



	/*****************************************
					 LISTENERS
	******************************************/

	$(document).scroll(function() {
		ensureNavInitialization();
		updateNavState();
	});

	$(window).resize(function() {
		ensureNavInitialization();
		viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
		determineSectionOffsets();
		updateNavState();
	});

	$("nav li a").click(function() {
		ensureNavInitialization();
		var indexOfClickedNavLink = $(this).parent().prevAll().length;
		setNavTo(indexOfClickedNavLink);
		$("html, body").scrollTop(sections[indexOfClickedNavLink] - $("header").outerHeight());
		return false;
	});



	/*****************************************
				   INITIALIZATION
	******************************************/


});