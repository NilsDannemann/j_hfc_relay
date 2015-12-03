var ww = window.innerWidth;

$(document).ready(function() {
	
	// Add mnav__link--parent class
	$(".mnav__inner li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("mnav__link--parent");
		};
	});
	
	// Add mnav__more class
	$('<div class="mnav__more"></div>').insertBefore($('.mnav__link--parent'));
	
	// Toggle Navigation
	$(".mnav__icon").click(function(e) {
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
		$(".mnav__inner li").unbind('mouseenter mouseleave');
		$(".mnav__inner li a.mnav__link--parent").unbind('click');
		$(".mnav__inner li .mnav__more").unbind('click').bind('click', function() {
			$(this).parent("li").toggleClass("is-hovered");
		});
	} 
	else if (ww > 800) {
		$(".mnav__inner li").removeClass("is-hovered");
		$(".mnav__inner li a").unbind('click');
		$(".mnav__inner li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
			// must be attached to li so that mouseleave is not triggered when is-hovered over submenu
			$(this).toggleClass("is-hovered");
		});
	}
}