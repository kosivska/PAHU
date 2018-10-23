"use strict";

$(document).ready(function() {

	$(".header").sticky({topSpacing:0,
		zIndex: 8888});

	$(function() {
		$('.menu__icon').on('click', function() {
			$(this).closest('.header__nav')
			.toggleClass('menu_state_open');
		});

		$('.nav__item').on('click', function() {
      // do something

      $(this).closest('.header__nav')
      .removeClass('menu_state_open');
  });
	});

	$(".nav__item-link").click(function(e) {
		e.preventDefault();
		var elementClick = $(this).attr("href")
		var destination = $(elementClick).offset().top;
		jQuery("html,body").animate({
			scrollTop: destination
		}, 600);
		return false;
	});
	$('.main-slider').slick({
		slide: '.main-slider__slide',
		prevArrow: ".main-slider__arrow--left",
		nextArrow: ".main-slider__arrow--right",
		// autoplay: true,
		// autoplaySpeed: 3000,
		dots: false,
		infinite: true,
	});
	let $grid = $('.grid').imagesLoaded(function() {
        // init Isotope after all images have loaded
        $grid.isotope({
            // options...
            itemSelector: '.grid_item',
        });
    });

	$('.project-slider').slick({
		slide: '.project-slider__slide',
		prevArrow: ".project-slider__arrow--left",
		nextArrow: ".project-slider__arrow--right",
		dots: false,
		slidesToShow: 4,
		infinite: true,
	});

	let $jsCalculate = $('.calculator__btn');
	let $jsNumberElem = $('.input-form');
	let $jsResult = $('.js-result');
	let $resultText = $jsResult.text();
	let $form = $('.js-calculator__form');
	$form.submit(function(e) {
		e.preventDefault();
	});
	$jsNumberElem.on('input', function() {
		$(this).removeClass('error');
	});
	$jsNumberElem.on('keypress', function(e) {
		if (e.which == 10 || e.which == 13) {
			$jsCalculate.click();
		}
	});

	$jsCalculate.click(function() {
		let $jsNumber = $jsNumberElem.val();
		let $jsCheckbox = $('.checkboxes input:checked');
		let $jsSelect = $('.select').val();
		$jsResult.text($resultText);
		if (isNaN($jsNumber) || $jsNumber.length === 0) {
			$jsNumberElem.addClass('error');
			return;
		} else {
			$jsNumberElem.removeClass('error');
		}
		let sum = 0;

		sum += parseInt($jsSelect);
		$jsCheckbox.each(function() {
			sum += parseInt($(this).val());
		});

		sum *= parseInt($jsNumber);

		$jsResult.html(sum + ' $');
	});

	let source = $('#product-template').html();
	let template = Handlebars.compile(source);
	$.get('./js/data/products.json').then(function(products) {
		let htmlOutput = template(products);
		$('.js-products').html(htmlOutput);
	});

	let $videoPlay = $('.popup-youtube');
	let $dialogVideo = $('.dialog-video');
	$videoPlay.click(function(e) {
		e.preventDefault();
		$dialogVideo.dialog({
			width: '55rem',
			modal: true,
			closeOnEscape: true,
			beforeClose: function() {
				$('body').removeClass('scroll-frozen');
				$('.video-player').get(0).pause();
			},
			close: function() {
				$('.video-player').get(0).load();
			},
			open: function(event, ui) {
				$('body').addClass('scroll-frozen');
				$('.ui-widget-overlay').on('click', function() {
					$dialogVideo.dialog('close');
				});
				$('.video-player').get(0).play();
			},
			show: {
				effect: "fade",
				duration: 500
			},
			hide: {
				effect: "fade",
				duration: 500
			}


		});
		$('.close').on('click', function() {
			$dialogVideo.dialog('close');

		});
		$(".ui-dialog-titlebar").hide();
	});



	let $formBtn = $('.popup-form');
	let $dialogForm = $('.dialog-form');
	$formBtn.click(function(e) {
		e.preventDefault();
		$dialogForm.dialog({
			width: '55rem',
			beforeClose: function() {
				$('body').removeClass('scroll-frozen');
			},
			modal: true,
			closeOnEscape: true,
			open: function(event, ui) {
				$('body').addClass('scroll-frozen');
				$('.ui-widget-overlay').on('click', function() {
					$dialogForm.dialog('close');
				});
			},
			show: {
				effect: "fade",
				duration: 500
			},
			hide: {
				effect: "fade",
				duration: 500
			}


		});


		$('.close').on('click', function() {
			$dialogForm.dialog('close');

		});
		$(".ui-dialog-titlebar").hide();
	});



	let $jsFormValidate = $('.js-form-validate');
	let $dialogSuccess = $('.success');
	let $inputForm = $('.js-input-form');
	$jsFormValidate.submit(function(e) {
		e.preventDefault();
		let $form = $(this);

		if (isFormValid($form)) {
			$('.dialog-form').dialog('destroy');
			clearFormFields($form);
			$dialogSuccess.dialog({
				width: '45rem',
				modal: true,
				open: function(event, ui) {
					setTimeout(function() {
						$dialogSuccess.dialog('close')
					}, 3000);
				},
				show: {
					effect: "fade",
				},
				hide: {
					effect: "fade",
				}

			});
			$(".ui-dialog-titlebar").hide();
		}
	});

	function isFormValid($form) {
		let $requiredInputs = $form.find('input:required'),
		isValid = true;

		$requiredInputs.each(function () {
			let $requiredInput = $(this),
			requiredInputValue = $requiredInput.val();

			if (requiredInputValue && requiredInputValue.trim().length === 0) {
				isValid = false;
				return;
			}
		});

		return isValid;
	}

	function clearFormFields($form) {
		let $inputs = $form.find('input, textarea');

		$inputs.each(function () {
			$(this).val('');
		});
	}

	let $mapBtn = $('.js-btn-map');
	let $dialogMap = $('.dialog-map');
	$mapBtn.click(function(e) {
		e.preventDefault();
		$dialogMap.dialog({
			width: '55rem',
			beforeClose: function() {
				$('body').removeClass('scroll-frozen');
			},
			modal: true,
			closeOnEscape: true,
			open: function(event, ui) {
				$('body').addClass('scroll-frozen');
				$('.ui-widget-overlay').on('click', function() {
					$dialogMap.dialog('close');
				});
			},
			show: {
				effect: "fade",
				duration: 500
			},
			hide: {
				effect: "fade",
				duration: 500
			}
			

		});


		$('.close').on('click', function() {
			$dialogMap.dialog('close');
		});
		$(".ui-dialog-titlebar").hide();
	});
});