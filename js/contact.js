jQuery.fn.extend({
	addError: function(errorString, classString) {
		return this.each(function() {
			classString = classString || "";
			if (classString.length) classString = " " + classString;

			//remove any current errors
			$(this).next(".error").remove();

			//add the error
			$(this).after("<p class='error" + classString + "'>" + errorString + "</p>");
		});
	},
	removeError: function() {
		return this.each(function() {
			$(this).next(".error").remove();
		});
	}
});

$(document).ready(function() {

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

	//ON SUBMIT ATTEMPT
	$("form").submit(function(e) {
		var $blankRequiredChildren = $(this).children("[data-required=true]").filter(function() {
			return $(this).val().length === 0;
		});

		if ($blankRequiredChildren.length === 0) {
			createToast("<strong>Thanks for reaching out!</strong>  We'll get back to you as soon as possible.");
			$(this).find("input[type=text], input[type=email], textarea").val("");
			e.preventDefault();

			//send message to server

		} else {
			$blankRequiredChildren.addError("This is a required field");
			e.preventDefault();
		}
	});



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