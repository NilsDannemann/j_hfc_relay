var ww = window.innerWidth;

$(document).ready(function() {
	
	// Add nav__link--parent class
	$(".nav__inner li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("nav__link--parent");
		};
	});
	
	// Add nav__more class
	$('<div class="nav__more"></div>').insertBefore($('.nav__link--parent'));
	
	// Toggle Navigation
	$(".nav__icon").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("is-active");
	});

	adjustMenu();
})

$(window).bind('resize orientationchange', function() {
	ww = window.innerWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww < 800) {
		$(".nav__inner li").unbind('mouseenter mouseleave');
		$(".nav__inner li a.nav__link--parent").unbind('click');
		$(".nav__inner li .nav__more").unbind('click').bind('click', function() {
			$(this).parent("li").toggleClass("is-hovered");
		});
	} 
	else if (ww > 800) {
		$(".nav__inner li").removeClass("is-hovered");
		$(".nav__inner li a").unbind('click');
		$(".nav__inner li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
			// must be attached to li so that mouseleave is not triggered when is-hovered over submenu
			$(this).toggleClass("is-hovered");
		});
	}
}