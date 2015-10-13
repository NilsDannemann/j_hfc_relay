<script>
	var ww = document.body.clientWidth;

	$(document).ready(function() {
	  $(".nav__inner li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("nav__link--parent");
			};
		})
		
		$(".nav__icon").click(function(e) {
			e.preventDefault();
			$(this).toggleClass("is-active");
			$(".nav__inner").toggle();
		});
		adjustMenu();
	})

	$(window).bind('resize orientationchange', function() {
		ww = document.body.clientWidth;
		adjustMenu();
	});

	var adjustMenu = function() {
		if (ww < 768) {
		// if "more" link not in DOM, add it
		if (!$(".more")[0]) {
		$('<div class="more">&nbsp;</div>').insertBefore($('.nav__link--parent')); 
		}
			$(".nav__icon").css("display", "inline-block");
			if (!$(".nav__icon").hasClass("is-active")) {
				$(".nav__inner").hide();
			} else {
				$(".nav__inner").show();
			}
			$(".nav__inner li").unbind('mouseenter mouseleave');
			$(".nav__inner li a.nav__link--parent").unbind('click');
		$(".nav__inner li .more").unbind('click').bind('click', function() {
				
				$(this).parent("li").toggleClass("hover");
			});
		} 
		else if (ww >= 768) {
		// remove .more link in desktop view
		$('.more').remove(); 
			$(".nav__icon").css("display", "none");
			$(".nav__inner").show();
			$(".nav__inner li").removeClass("hover");
			$(".nav__inner li a").unbind('click');
			$(".nav__inner li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
				// must be attached to li so that mouseleave is not triggered when hover over submenu
				$(this).toggleClass('hover');
			});
		}
	}
</script>