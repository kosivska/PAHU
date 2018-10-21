"use strict";

$(document).ready(function(){
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
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
		infinite: true,
	});


	let $grid = $('.grid').imagesLoaded( function() {
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

	$("html").niceScroll({
		cursorcolor:"#FECE76",
		scrollspeed: 60,
		mousescrollstep: 45,
		cursorwidth: 6,
		cursorborder: 0,
		cursorborderradius: 3
	});

	
	let $jsCalculate = $('.calculator__btn');
	let $jsNumberElem = $('.input-form');
	let $jsResult = $('.js-result');
	let $resultText = $jsResult.text();
	$jsNumberElem.on('input', function () {
		$(this).removeClass('error');
	});

	$jsCalculate.click(function () {
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
		$jsCheckbox.each(function () {
			sum += parseInt($(this).val());
		});

		sum *= parseInt($jsNumber);

		$jsResult.html(sum+' $');
	});

// 	var source   = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
// var context = {title: "My New Post", body: "This is my first post!"};
// var html    = template(context);

// console.log(html);

let source = $('#product-template').html();
let template = Handlebars.compile(source);
$.get('./data/products.json').then(function(products) {
	let htmlOutput = template(products);
	$('.js-products').html(htmlOutput);
});

});
