function attemptFormSubmit(e, onSuccess) {
	var $blankRequiredChildren = $(this).find("[data-required=true]").filter(function() {
		return $(this).val().length === 0;
	});
	console.log($blankRequiredChildren);

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

function createToast(innerHTML, lifespanInMS) {

	function setStyleBeforeAnimation($el) {
		return window.getComputedStyle($el[0]).opacity;
	}

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
});