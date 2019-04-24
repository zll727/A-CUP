function Responsive($a) {
		if ($a == true) $("#Device").css("opacity", "100");
		if ($a == false) $("#Device").css("opacity", "0");
		$('#iframe-wrap').removeClass().addClass('full-width');
		$('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
		$(this).addClass('active');
		return false;
	};