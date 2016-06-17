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

	//on scroll
	$(document).scroll(function() {
		ensureNavInitialization();
		updateNavState();
	});

	//on resize
	$(window).resize(function() {
		ensureNavInitialization();
		viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
		determineSectionOffsets();
		updateNavState();
	});

	//on nav click
	$("nav li a").click(function() {
		ensureNavInitialization();
		var indexOfClickedNavLink = $(this).parent().prevAll().length;
		setNavTo(indexOfClickedNavLink);
		$("html, body").scrollTop(sections[indexOfClickedNavLink] - $("header").outerHeight());
		return false;
	});

	// open whitepaper modal
	$("a[data-modal]").click(function() {
		var whitepaperName = $(this).find(".whitepaper__title").text();
		$("div[data-modal=send-paper-modal]").find("[data-content=whitepaper-name]").text(whitepaperName);
	});

	//on whitepaper modal submit
	$("[data-modal=send-paper-modal] form").submit(function(e) {
		attemptFormSubmit.call(this, e, function() {
			$.closeModal();
			createToast("<strong>Whitepaper sent!</strong>  You should see it shortly.");
		});
	});

	//attempt request-demo form submit
	$("form.request-a-demo").submit(function(e) {
		attemptFormSubmit.call(this, e, function() {
			createToast("<strong>Demo Requested!</strong>  We'll get back to you shortly.");
		});
	});



	/***********************************
				MODAL FUNCTIONS
	***********************************/

	//open modal
	$("a[data-modal]").click(function() {

		//if there's a current modal open, close it
		if ($("body").hasClass("has-modal-open")) {
			$.closeModal();
		}

		//figure out which modal we're talking about here
		var which = $(this).attr("data-modal");
		var $modal = $(".modal").filter("[data-modal=" + which + "]");

		//open the modal
		$modal.addClass("is-visible");

		//adding a class to the body allows us to lock scrolling
		$("body").addClass("has-modal-open");
	});

	//click on close button
	$(".modal a.modal__close").click(function() {
		$.closeModal();
	});

	//click on background screen to close modal
	$(".modal").click(function() {
		$.closeModal();
	});

	//click somewhere on modal window
	$(".modal__window").click(function(e) {
		e.stopPropagation(); //stop propagation so the modal isn't closed
	});

	//press Esc while modal is open
	$(document).keyup(function(e) {
		if (e.keyCode === 27 && $("body").hasClass("has-modal-open")) {
			$.closeModal();
		}
	});

	$.closeModal = function() {
		$(".modal.is-visible").removeClass("is-visible");
		$("body").removeClass("has-modal-open");
	};

});