$(function() {
	$('.btn.action').on('click', function(e) {
		e.preventDefault();
		$(this).fadeOut(function() {
			$(this).parent().parent().find('.step.second').fadeIn(function() {
				$(this).delay(500).fadeOut(function() {
					$(this).parent().parent().find('.step.third').fadeIn();
				});
			});
		})
	});

	$('header .btn').on('click', function(e) {
		e.preventDefault();
		var to_height = $('header').outerHeight();
		$('body').animate({scrollTop: to_height});
	});

	$('.btn.spread').on('click', function(e) {
		e.preventDefault();
		var to_height = $('body').outerHeight();
		$('body').animate({scrollTop: to_height});
	});

	$('form').on('submit', function (e) {
		var $form = $(this);
		var $input = $form.find('.email');
		var exp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		e.preventDefault();

		if ($input.val() == "" || !exp.test($input.val())) {
			$form.addClass('invalid');
			$input.focus();

			setTimeout(function() {
				$form.removeClass('invalid');
			}, 1500);
		} else {
			// do magic
			var subscribersRef = new Firebase('https://bottomline.firebaseio.com/subscribers');
			var created = new Date();
			var email = $input.val();
			subscribersRef.push({email: email, created: created.toString()});

			$('.thanks').fadeIn(500);
		}
	});
});