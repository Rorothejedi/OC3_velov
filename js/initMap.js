// Fonction initMap permettant le fonctionnement de la Google Map

var sessionStation;
var sessionHeure;

function initMap() {

    // Déclaration du style de la Google Map au format JSON
    var styledMapType = new google.maps.StyledMapType(
    [   
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ],{name: 'Emplacement des relais Vélo\'v'});

    // On définit les options de la Google Map
    var mapOptions = {
        zoom: 13,
        gestureHandling: 'greedy',
        center: new google.maps.LatLng(45.76,4.855),
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['styled_map']
        }
    }

    // On instancie la Google Map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // On instancie le nouveau style de la map
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // On instancie la librairie spiderfier
    var oms = new OverlappingMarkerSpiderfier(map);

    // On crée l'objet stations
    var Stations = '';

    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9590be8e47d7154bf9cc5784f23eb168c68e79ef", function (reponse) {
        // Création de l'objet Stations
        Stations = JSON.parse(reponse);

        
        var markers = [];

        for (var i = 0; i < Stations.length; i++) {

            var icon;
            // On calcule le pourcentage de vélo disponible à chaque station et on modifie l'icône du marqueur en fonction
            var operation = (Stations[i].available_bikes * 100) / Stations[i].bike_stands;

            if (Stations[i].status != 'OPEN') {
                icon = 'img/poi-chantier.png';
            } else if (operation === 100) {
                icon = 'img/station-100.png';
            } else if (operation < 100 && operation >= 66) {
                icon = 'img/station-75.png';
            } else if (operation < 66 && operation >= 33) {
                icon = 'img/station-50.png';
            } else if (operation < 33 && operation > 0) {
                icon = 'img/station-25.png';
            } else if (operation === 0 ) {
                icon = 'img/station-0.png';
            }

            // On définit les marqueurs
            var marker = new google.maps.Marker({
                // parseFloat nous permet de transformer la latitude et la longitude en nombre décimal
                position: {lat: parseFloat(Stations[i].position.lat), lng: parseFloat(Stations[i].position.lng)},
                title: Stations[i].name,
                station: Stations[i].name,
                address: Stations[i].address,
                available_bikes: Stations[i].available_bikes,
                available_bike_stands: Stations[i].available_bike_stands,
                status: Stations[i].status,
                last_update: Stations[i].last_update,
                icon: icon,
                map: map
            });
            markers.push(marker);
            oms.addMarker(marker);
        }

        var markerClusterer = new MarkerClusterer(map, markers, {
            gridSize: 120,
            maxZoom: 16,
            styles: [{
                url: 'img/m1.png',
                textColor: 'white',
                width: 70,
                height: 70
            }]
        });

        var infoWindow = new google.maps.InfoWindow();
        oms.addListener('click', function(marker, event) {

            // On repositionne l'écran de l'utilisateur sur la carte
            $('html,body').animate({scrollTop: $("#carte").offset().top}, 'slow');



            // On initialise le volet d'information
            $('#voletInfos').fadeOut('fast');

            infoWindow.setContent(marker.station);
            infoWindow.open(map, marker);

            // Réinitialisation du canvas
            $('.blocCanva').fadeOut('fast', function() {
                $('.remplacementCanva').fadeIn();
            });

            // Centrage de la carte sur le marqueur cliqué
            window.setTimeout(function() {

                // Centrage fluide du marqueur
                map.panTo(marker.getPosition());
                
                // Apparition des informations du volet droit
                $('#voletInfos').fadeIn();

                // Condition d'affichage de l'arrondissement ou de la commune
                var regexNombre = /([0-9]+)/.exec(marker.station);
                var $arrondissement = $('.arrondissement');

                if (marker.station.substr(0, 2) == 12 && regexNombre[0].length == 5) {

                    $arrondissement.text('Vaulx-en-Velin');

                } else if (marker.station.substr(0, 2) == 11 && regexNombre[0].length == 5) {

                    $arrondissement.text('Caluire-et-Cuire');

                } else if (marker.station.substr(0, 2) == 10 && regexNombre[0].length == 5) {

                    $arrondissement.text('Villeurbanne');

                } else if (marker.station.substr(0, 1) >= 2 && marker.station.substr(0, 1) <= 9 && regexNombre[0].length == 4) {

                    $arrondissement.text('Lyon ' + (marker.station.substr(0, 1)) + 'e arrondissement');

                } else if (marker.station.substr(0, 1) == 1 && regexNombre[0].length == 4) {

                    $arrondissement.text('Lyon ' + (marker.station.substr(0, 1)) + 'er arrondissement');

                } else if (marker.station.substr(0, 1) == 0 && regexNombre[0].length == 4) {

                    $arrondissement.text('Lyon ' + (marker.station.substr(1, 1)) + 'e arrondissement');
                }

                $('.name').text('N°' + marker.station);
                $('.address').html(marker.address);


                var nbVelo;
                var nbStand;

                // On vérifie l'existence d'une réservation pour le calcul du nombre de vélo disponible et on update de la dernière mise à jour de la station en cas de réservation
                if (typeof sessionStation != 'undefined' && sessionStation != null && marker.available_bikes != 0 && sessionStation == marker.station) {

                    nbVelo = marker.available_bikes - 1;
                    nbStand = marker.available_bike_stands + 1;
                    marker.last_update = sessionHeure;
    
                } else {

                    nbVelo = marker.available_bikes;
                    nbStand = marker.available_bike_stands;
                }

                // Affichage du nombre de places et de vélos disponibles
                $('.available_bikes').html('Vélo(s) disponible(s) : <strong>' + nbVelo + '</strong>');
                $('.available_bike_stands').html('Place(s) disponible(s) : <strong>' + nbStand + '</strong>');

                if (marker.available_bikes === 0) {
                    $('.boutonReservationActif').attr('disabled','disabled')
                            .attr('title','Vous ne pouvez pas réserver car il n\'y a plus de Vélo\'v disponible')
                            .addClass('boutonReservationInactif')
                            .removeClass('boutonReservationActif');
                } else {
                    $('.boutonReservationInactif').removeAttr('disabled')
                            .removeAttr('title')
                            .addClass('boutonReservationActif')
                            .removeClass('boutonReservationInactif');
                }

                // Modification de la couleur du statut en fonction de celui-ci
                if (marker.status === 'OPEN') {
                    $('.status').html('Cette station est actuellement <span> ouverte </span>');
                    $('.status span').css('color', '#28A745');
                } else {
                    $('.status').html('Cette station est actuellement <span> fermée </span>');
                    $('.status span').css('color', '#FB0000');
                }
                
                var tempsReel = setInterval(function() {

                    var dateUpdate = new Date();
                    var updateStationVelo = Math.round((dateUpdate.getTime() - marker.last_update) / 1000 );

                    var heures = Math.floor(updateStationVelo / 3600);
                    var minutes = Math.floor(updateStationVelo / 60);
                    var secondes = updateStationVelo % 60;
                    
                    if (heures) {
                        $('.last_update').text('Dernière mise à jour il y a ' + heures + ' heures, ' + minutes + ' minutes et ' + secondes + ' secondes');
                    } else if (minutes) {
                        $('.last_update').text('Dernière mise à jour il y a ' + minutes + ' minutes et ' + secondes + ' secondes');
                    } else {
                        $('.last_update').text('Dernière mise à jour il y a ' + secondes + ' secondes');
                    }
                }, 0);

                $('.gmnoprint').click(function() {
                    clearInterval(tempsReel);
                })

            }, 500);

            // Ouverture du volet d'information
            $('#map').animate({width: '75%'}, 'slow', function() {
                $('.fa-times').fadeIn();
                $('#voletInfos').fadeIn();
            });

            // Fermeture du volet d'information au clic sur la croix
            $('.fa-times').on('click', function() {
                reservationInactif('.fa-times');
                $('#voletInfos').fadeOut('fast');
                $('.fa-times').fadeOut('fast', function() {
                    $('#map').animate({width: '100%'}, 'slow');
                });
            });

            // ---------------------------Gestion du canvas-------------------------------

            // Modification du contenu du volet d'information (bouton vers canvas)
            $('.boutonReservationActif').on('click', function() {
                $('.confirmerActif').attr('disabled','disabled')
                    .addClass('confirmerInactif')
                    .removeClass('confirmerActif');
                $('.remplacementCanva').fadeOut('fast', function() {
                    $('.blocCanva').fadeIn();
                });
            });

            // Fonction de modification du contenu du volet d'information (canvas vers bouton)
            function reservationInactif (bouton) {
                $(bouton).on('click', function() {
                    $('.blocCanva').fadeOut('fast', function() {
                        $('.remplacementCanva').fadeIn();
                    });
                });
            }

            reservationInactif('.annuler');
            rafraichirCanvas('.annuler');
            rafraichirCanvas('.fa-times');
            rafraichirCanvas('.boutonReservationActif');


            // --------------------------Gestion de la réservation------------------------

            $('.confirmer').click(function() {

                if ($(this).hasClass('confirmerActif')){

                    // Récupération et stockage des données nécessaire à la réservation
                    heureReservation = new Date().getTime();
                    sessionStorage.setItem('heure', heureReservation);
                    sessionStorage.setItem('station', marker.station);
                   
                    sessionStation = sessionStorage.getItem('station');
                    sessionHeure = sessionStorage.getItem('heure');

                    compteRebour();
                    
                    if (typeof sessionStation != 'undefined') {

                        // On vide le canvas
                        context.clearRect(0, 0, canvas[0].width, canvas[0].height);

                        // On réinitialise le volet d'information de la Google Map
                        $('.blocCanva').fadeOut('fast', function() {
                            $('.remplacementCanva').fadeIn();
                        });
                        $('#voletInfos').fadeOut('fast');
                        $('.fa-times').fadeOut('fast', function() {
                            $('#map').animate({width: '100%'}, 'fast');
                        });

                        // On fait défiler l'utilisateur vers la section des réservations
                        $('html,body').animate({scrollTop: $("#reservationActive").offset().top}, 'slow');
                    }
                }
            });

        });// Fin de la fonction oms listener
    });//Fin de la fonction ajaxGet
}//Fin de la fonction initMap

// Lancement de la fonction initMap au chargement de la page
window.onload = function() {
    initMap(); 
};

// Récupération du contenu des variables de session
sessionStation = sessionStorage.getItem('station');
sessionHeure = sessionStorage.getItem('heure');

compteRebour();