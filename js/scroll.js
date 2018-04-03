// Script pour agrandir ou retrecir le menu de navigation au dela du top de la page
$(window).scroll(function() {

    // Supression de l'animation pour les tablettes et mobiles
    if ($(window).width() > 1024) {

        if ($(window).scrollTop() > 50) {

        	$('nav').addClass('sticky');
        	$('.logoAccueil a img').addClass('logoAccueilRedim');
        	$('.navigation').removeClass('navigationInactive');

        } else {

            $('nav').removeClass('sticky');
            $('.logoAccueil a img').removeClass('logoAccueilRedim');
            $('.navigation').addClass('navigationInactive');
        }
    }
});

// Script de repositionnement des boutons de navigations en fonction de leur nombre (2 ou 3)
var $parent = $('.navResaInactive').parent();

if ($(window).width() > 714) {

    $parent.css('margin-top', '8px');

} else if ($(window).width() < 714 && $(window).width() > 528) {
    
    $parent.css('margin-top', '40px');
}
        

// Script pour initialiser le défilement fluide via les ancres
$(document).on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();

    $('html, body').animate({
    	scrollTop: $($.attr(this, 'href')).offset().top
    }, 650);
});


// Script pour colorer les boutons de la barre de navigation en fonction de la position de l'utilisateur sur la page
$(window).scroll(function() {

    var windowHeight = $(window).height();
    var scroll = $(window).scrollTop();
    
    var $navigationTop = $('.navigation li:nth-child(1) a');
    var $navigationResa = $('.navigation li:nth-child(2) a');
    var $navigationNow = $('.navigation li:nth-child(3) a');

    if (scroll >= windowHeight * 0.7 && scroll < windowHeight * 1.5) {
        $navigationTop.css('color', 'black');
        $navigationResa.css('color', '#FB0000');
        $navigationNow.css('color', 'black');
    } else if (scroll >= windowHeight * 1.5) {
        $navigationTop.css('color', 'black');
        $navigationResa.css('color', 'black');
        $navigationNow.css('color', '#FB0000');
    } else {
        $navigationTop.css('color', '#FB0000');
        $navigationResa.css('color', 'black');
        $navigationNow.css('color', 'black');
    }
});