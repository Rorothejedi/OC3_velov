// Script pour agrandir ou retrecir le menu de navigation au dela du top de la page

var navigation = {

        init : function() {
            this.animationHauteur();
            this.positionBoutons();
            this.colorerBoutons();
        },

        // Méthode de redimentinnemlent de la barre de navigation en fonction de la hauteur de la fenêtre
        animationHauteur : function() {

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
        },

        // Méthode de repositionnement des boutons de navigations en fonction de leur nombre (2 ou 3)
        positionBoutons : function() {

            var $parentInactive = $('.navResaInactive').parent();


            if ($(window).width() > 714) {

                $parentInactive.css('margin-top', '8px');

            } else if ($(window).width() <= 648 && $(window).width() > 528) {
                
                $parentInactive.css('margin-top', '40px');

            } else if ($(window).width() <= 528 && $(window).width() > 486) {

                $parentInactive.css('margin-top', '0');
            } 


            var $parentActive = $('.navResaActive').parent();

             if ($(window).width() <= 648 && $(window).width() > 486) {

               $parentActive.css('margin-top', '0');

            } else if ($(window).width() <= 486 && $(window).width() >= 320) {

                $parentActive.css('margin-top', '0');
                $parentActive.css('font-size', '0.65rem');
                $parentActive.children().children().css('padding-right', '4px');
                $parentActive.children().children().css('padding-left', '4px');
            } 
        },

        // Méthode pour colorer les boutons de la barre de navigation en fonction de la position de l'utilisateur sur la page
        colorerBoutons : function() {

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
        }
};

navigation.init();



// Initialisation de l'objet defilementFluide pour la fonction smoothscroll
var defilementFluide = {

    // Méthode pour initialiser le défilement fluide via les ancres
    init : function() {

        $(document).on('click', 'a[href^="#"]', function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 650);
        });
    }
};

defilementFluide.init();