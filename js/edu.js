$(document).ready(function() {


	/***********************************
				  LISTENERS
	***********************************/

	// open whitepaper modal
	$("a[data-modal]").click(function() {
		var whitepaperName = $(this).find(".whitepaper__title").text();
		$("div[data-modal=send-paper-modal]").find("[data-content=whitepaper-name]").text(whitepaperName);
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