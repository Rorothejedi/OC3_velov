
// --------------------------  CARROUSEL  -------------------------------

// Création de l'objet carrouselOrigin à partir du prototype carrousel

var carrouselOrigin = Object.create(carrousel);

// Lancement de la méthode d'initialisation du carrousel

carrouselOrigin.init();



// --------------------------  SIGNATURE  -------------------------------

var signatureOrigin = Object.create(signature);

signatureOrigin.init();



// -----------------------  COMPTE A REBOURS  ----------------------------

var countdownOrigin = Object.create(countdown);

countdownOrigin.init();


// ----------------------------  SCROLLS  --------------------------------

var navigationOrigin = Object.create(navigation);

navigationOrigin.init();

//----

var defilementFluideOrigin = Object.create(defilementFluide);

defilementFluideOrigin.init();


// ----------------------------  CARTE  --------------------------------

var carteOrigin = Object.create(carte);

carteOrigin.initMap();





// présentation rapide du html
// puis présenter des généralité sur les objets (carrousel, autres)


// si on attend le carrousel reprend le défilement automatique

// validateur html css ok
// https que google aime bien
// balise meta