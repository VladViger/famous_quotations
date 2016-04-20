$('.btn-about').on('click', function() {
	$('.description').toggleClass('hide-xs');
	$(this).find('.icon').toggleClass('flaticon-cross');
});

$('.sort').on('click', function() {
	$(this).toggleClass('active');
	$('.toolbar [class*="sort-"]').toggleClass('mobile-height');
});

var USER_IP;
$.getJSON("http://jsonip.com/",
	function(data){
		USER_IP = data.ip;
});