var ww = window.innerWidth;

$(document).ready(function() {
	
	// Add navigation__link--parent class
	$(".navigation__inner li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("navigation__link--parent");
		};
	});
	
	// Add navigation__more class
	$('<div class="navigation__more"></div>').insertBefore($('.navigation__link--parent'));
	
	// Toggle Navigation
	$(".navigation__icon").click(function(e) {
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
		$(".navigation__inner li").unbind('mouseenter mouseleave');
		$(".navigation__inner li a.navigation__link--parent").unbind('click');
		$(".navigation__inner li .navigation__more").unbind('click').bind('click', function() {
			$(this).parent("li").toggleClass("is-hovered");
		});
	} 
	else if (ww > 800) {
		$(".navigation__inner li").removeClass("is-hovered");
		$(".navigation__inner li a").unbind('click');
		$(".navigation__inner li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
			// must be attached to li so that mouseleave is not triggered when is-hovered over submenu
			$(this).toggleClass("is-hovered");
		});
	}
}