// -----------------------OBJET countdown : PROPRIETES ET METHODES---------------------------

// Création de l'objet countdown (compte à rebours et fonctionnement de la réservation)
var countdown = {

    init              : function() {

        this.compteRebours();
    },

    compteRebours      : function() {

        // Si la variable de session existe et n'est pas vide
        if (typeof sessionStation != 'undefined' && sessionStation != null) {

            //On fait apparaitre le bouton 'réservation en cours' et la section si un sessionStorage existe
            $('.navResaInactive').removeClass('navResaInactive')
                                 .addClass('navResaActive') ;
            $('.reservation').removeAttr('id', 'reservationInactive')
                             .attr('id', 'reservationActive');

            // On affiche les informations liées à la réservation
            $('#reservationActive h2').text('Votre réservation en cours de validité');
            $('.infosReservation')    .html('Vous avez réservé 1 Vélo\'v à la station <strong>n\°' + sessionStation + '</strong>');
            $('.fa-bicycle')          .css('color', '#28A745');
            $('.annulerResa')         .css('display', 'block');
            $('.autreResa')           .css('display', 'none');
            $('.confirmation')        .css('display', 'none');
            $('.retour')              .css('display', 'none');
            $('.confirmationTexte')   .css('display', 'none');

            //On annule la réservation au clic sur le bouton dédié
            $('.annulerResa').click(function() {

                $('.confirmationTexte').css('display', 'block');
                $('.confirmation')     .css('display', 'inline-block');
                $('.retour')           .css('display', 'inline-block');
                $('.annulerResa')      .css('display', 'none');

                //En cas de confirmation de l'annulation
                $('.confirmation').click(function() {

                    // On vide les variables de session et on réinitialise le compte à rebours
                    sessionStorage.clear();
                    clearInterval(decompte);

                    // On affiche les informations liées à l'annulation de la réservation
                    $('#reservationActive h2').text('Votre réservation a été annulée');
                    $('.infosReservation')    .html('Vous aviez réservé 1 Vélo\'v à la station <strong>n\°' + sessionStation + '</strong>');
                    $('.decompteReservation') .html('<strong>La réservation a bien été annulée mais vous pouvez toujours réservez un autre Vélo\'v !</strong>');
                    $('.fa-bicycle')          .css('color', '#FB0000');
                    $('.autreResa')           .css('display', 'block');
                    $('.confirmationTexte')   .css('display', 'none');
                    $('.confirmation')        .css('display', 'none');
                    $('.retour')              .css('display', 'none');
                }); 

                // En cas d'abandon de l'annulation
                $('.retour').click(function() {

                    // Retour à l'état initial
                    $('.confirmationTexte').css('display', 'none');
                    $('.confirmation')     .css('display', 'none');
                    $('.retour')           .css('display', 'none');
                    $('.annulerResa')      .css('display', 'block');
                });
            });
                
            // Lancement du compte à rebours de 20 minutes
            var decompte = setInterval(function(){

                // On récupére l'heure actuelle en secondes
                var temps = new Date().getTime(); 
                // On fait la différence entre l'heure actuelle et l'heure de la réservation
                var differenceTemps = temps - Number(sessionHeure);
                // On initialise le compteur à 20 minutes (1.200.000 millisecondes)
                var compteur = Math.round((1200000 - differenceTemps) / 1000);
                // On calcule les minutes et les secondes restantes
                var minutes = Math.floor(compteur / 60);
                var secondes = compteur % 60;

                // On affiche le compteur en fonction du temps qu'il reste
                if (minutes > 0) {
                    $('.decompteReservation').html('La réservation expirera dans <strong>' + minutes + ' minutes</strong> et <strong>' + secondes + ' secondes</strong>');
                } else {
                    $('.decompteReservation').html('La réservation expirera dans <strong>' + secondes + ' secondes</strong>');
                }

                // Une fois le compte à rebours terminé
                if(minutes <= 0 && secondes <= 0) {

                    // On affiche les informations liées à l'expiration de la réservation
                    $('#reservationActive h2').text('Votre réservation a expirée');
                    $('.infosReservation')    .html('Vous aviez réservé 1 Vélo\'v à la station <strong>n\°' + sessionStation + '</strong>');
                    $('.decompteReservation') .html('<strong>La réservation a expiré mais vous pouvez toujours réservez un autre Vélo\'v !</strong>');
                    $('.fa-bicycle')          .css('color', '#FB0000');
                    $('.annulerResa')         .css('display', 'none');
                    $('.autreResa')           .css('display', 'block');

                    // On vide la session
                    sessionStorage.clear();
                }
            }, 0);
        }
    }
};