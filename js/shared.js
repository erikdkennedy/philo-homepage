jQuery.fn.extend({
	addError: function(errorString, classString) {
		return this.each(function() {
			classString = classString || "";
			if (classString.length) classString = " " + classString;

			//remove any current errors
			$(this).next(".error").remove();

			//add the error
			$(this).after("<div class='error" + classString + "'>" + errorString + "</div>");
		});
	},
	removeError: function() {
		return this.each(function() {
			$(this).next(".error").remove();
		});
	}
});

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



	/**************************************
				  FORM LISTENERS
	**************************************/

	//ON TYPING IN REQUIRED INPUT
	$("[data-required=true]").keyup(function() {
		if ($(this).val().length) $(this).removeError();
	});

	//ON DE-FOCUSING REQUIRED INPUT
	$("[data-required=true]").blur(function() {
		if ($(this).val().length === 0) {
			$(this).addError("This is a required field");
		} else {
			$(this).removeError();
		}
	});

	//ON CONTACT PAGE SUBMIT ATTEMPT
	$(".static-page form").submit(function(e) {
		attemptFormSubmit.call(this, e, function() {
			createToast("<strong>Thanks for reaching out!</strong>  We'll get back to you as soon as possible.");
		});
	});

	//ON WHITEPAPER MODAL SUBMIT
	$("[data-modal=send-paper-modal] form").submit(function(e) {
		attemptFormSubmit.call(this, e, function() {
			$.closeModal();
			createToast("<strong>Whitepaper sent!</strong>  You should see it shortly.");
		});
	});

	function attemptFormSubmit(e, onSuccess) {
		console.log($(this).children("[data-required=true]"));
		var $blankRequiredChildren = $(this).find("[data-required=true]").filter(function() {
			return $(this).val().length === 0;
		});

		if ($blankRequiredChildren.length === 0) {
			$(this).find("input[type=text], input[type=email], textarea").val("");
			e.preventDefault();
			onSuccess();

			//PLACEHOLDER: send message to server

		} else {
			$blankRequiredChildren.addError("This is a required field");
			e.preventDefault();
		}
	}



	/**************************************
					HELPERS
	**************************************/

	function createToast(innerHTML, lifespanInMS) {
		var lifespan = lifespanInMS || 3000;

		$("body").append("<div class='toast'>" + innerHTML + "</div>");
		var $toast = $(".toast");
		setStyleBeforeAnimation($toast);
		$toast.addClass("appear");

		setTimeout(function() {
			$toast
					.removeClass("appear")
					.on("transitionend", function() {
						$(this).remove();
					});
		},
		lifespan);
	}

	function setStyleBeforeAnimation($el) {
		return window.getComputedStyle($el[0]).opacity;
	}
});