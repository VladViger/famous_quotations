$('.btn-about').on('click', function() {
	$('.description').toggleClass('hide-xs');
	$('.btn-about .icon').toggleClass('flaticon-cross');
});

$('.sort').on('click', function() {
	$(this).toggleClass('active');
	$('.toolbar [class*="sort-"]').toggleClass('mobile-height');
});