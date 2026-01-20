(function($){
	"use strict";

	// Header Sticky
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 120){  
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Popup Image
	$('.popup-btn').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		}
	});

	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "992"
	});

	// Go to Top
	$(function(){
		// Scroll Event
		$(window).on('scroll', function(){
			var scrolled = $(window).scrollTop();
			if (scrolled > 600) $('.go-top').addClass('active');
			if (scrolled < 600) $('.go-top').removeClass('active');
		});  
		// Click Event
		$('.go-top').on('click', function() {
			$("html, body").animate({ scrollTop: "0" },  500);
		});
	});

	// Language Switcher
	$(function(){
		var currentLang = localStorage.getItem('language') || 'en';
		
		// Initialize language on page load
		updatePageLanguage(currentLang);
		updateLanguageButton(currentLang);
		
		// Language toggle button click event
		$('#langToggle').on('click', function(e){
			e.preventDefault();
			currentLang = currentLang === 'en' ? 'zh' : 'en';
			localStorage.setItem('language', currentLang);
			updateLanguageButton(currentLang);
			updatePageLanguage(currentLang);
		});
		
		function updateLanguageButton(lang) {
			var $langText = $('#langToggle .lang-text');
			if (lang === 'zh') {
				$langText.text('EN');
			} else {
				$langText.text('ZH');
			}
		}
	});

}(jQuery));