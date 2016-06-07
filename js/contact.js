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
			$(".toast").addClass("appear");
			$(this).find("input, textarea").val("");
			e.preventDefault();
		} else {
			$blankRequiredChildren.addError("This is a required field");
			e.preventDefault();
		}
	});

	//ON TOAST TRANSITION END
	$(".toast").on("transitionend", function() {
		setTimeout(function() {
			$(".toast").removeClass("appear");
		}, 3000);
	});
});