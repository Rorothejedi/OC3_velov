$(document).ready(function() {
    
	var $img 			= $('#carrousel ul li img');
	var indexImg 		= $img.length - 1;
	var numeroImage 	= 0;
	var currentImg 		= $img.eq(numeroImage);
	var compteurZindex 	= 1;
	var arriereImage;

	// Autoplay
	var autoplay 	= setInterval(function() { Suivant(); }, 10000);
	var animEnCours = false;
	
	currentImg.css('z-index', compteurZindex)
			  .css('display', 'block');

	couleurPuces();
	barreProgression();
	textImage();


	// -----------------------EVENEMENTS---------------------------

	// image suivante au clic
	$('.next').on('click', function() { 
		Suivant();
	});

	// image précédente au clic
	$('.prev').on('click', function() { 
	 	Precedent();
	});

	// Possibilité d'action avec les touches du clavier (suivant ou précédent)
	$('body').keydown(function(e) {

		switch (e.which) {
			case 37	: // fleche gauche
			case 100: // pavé num 4
			case 81	: // touche q
				Precedent();
				break;
			case 39	: // fleche droite
			case 102: // pavé num 6
			case 68 : // touche d
				Suivant();
				break;
		}
	});

	// Evenenments d'interaction avec les puces (vignettes)
	$('#pucesCarrousel li').on('click', function() {

		var indexLi = $("#pucesCarrousel li" ).index(this);

		if (numeroImage > indexLi) {
			numeroImage = indexLi + 1;
			Precedent();
		} else if (numeroImage < indexLi) {
			numeroImage = indexLi - 1;
			Suivant();
		}
	});

	// ----------------------FONCTIONS-----------------------------

	// Fonction de mise en avant de chacun des textes
	function textImage() {
	
		var numText = numeroImage + 1;
		var text = '#carrouselContenu li:nth-of-type(' + numText + ') div';

		$('#carrouselContenu li div').removeClass('textActif');
		$(text).addClass('textActif');
		
	};

	// Fonction de l'animation de la barre de progression
	function barreProgression() {

		var $barre = $('.barreChargementCarrousel');
		$barre.stop(false,true);

		$barre.animate({width: '100%'}, 10000, function() {
			$barre.animate({opacity: '0'}, 800, function() {
				$barre.css('width', '0%')
					  .css('opacity', '1');
			}); 
		});
	}

	// Modification de la couleur des puces
	function couleurPuces() {

		var vignette = numeroImage + 1;
		var $imgVignette = '#pucesCarrousel li:nth-of-type(' + vignette + ')';

		$('#pucesCarrousel li').removeClass();
		$($imgVignette).addClass('puceActive');
	}

	// Fonction de passage à l'image suivant incluant l'autoplay
	function Suivant() {
		clearInterval(autoplay);
		barreProgression();
	   	imageSuiv();
	   	textImage();
	   	couleurPuces();
	   	autoplay = setInterval(function() { Suivant(); }, 10000);
	}

	// Fonction de retour à l'image précédente incluant l'autoplay
	function Precedent() {
		clearInterval(autoplay);
		barreProgression();
	 	imagePrec();
	 	textImage();
	 	couleurPuces();
	 	autoplay = setInterval(function() { Suivant(); }, 10000);
	}

	// Fonction pour passer à l'image suivante 
	function imageSuiv() {

		if(animEnCours === false){
    		animEnCours = true; 

			if( numeroImage < indexImg ){

			    numeroImage++;
			    backImg 	 = $img.eq(numeroImage - 2);
			    arriereImage = $img.eq(numeroImage - 1);
			    currentImg   = $img.eq(numeroImage);

			} else {
			    numeroImage  = 0;
			    arriereImage = $img.eq(indexImg);
			    currentImg   = $img.eq(numeroImage);
			}

			// On initialise l'image en cours et l'image derrière
			currentImg.css('display', 'block')
					  .css('left', '0%');
			arriereImage.css('display', 'block');

			// On lance l'animation de l'image
			arriereImage.animate({left: '100%'}, 800, function() {

				// Après l'animation, on incrémente le z-index pour que l'image en cours toujours soit devant
				compteurZindex++;

				currentImg.css('left', '0%')
							.css('z-index', compteurZindex);

				if (backImg) { backImg.css('display', 'none');}
				arriereImage.css('display', 'none');
				// On indique dans la variable que l'animation est terminée
				animEnCours = false;
			});
		}
	}

	// Fonction pour passer à l'image précédente (fonctionnement similaire à la fonction 'imageSuiv')
	function imagePrec() {

		if(animEnCours === false){
    		animEnCours = true; 

			if ( numeroImage === 0 ) {

				numeroImage  = indexImg;
				arriereImage = $img.eq(0);
			    currentImg   = $img.eq(numeroImage);
			    var backImgC = $img.eq(4); // A réparer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! <--- todo

			} else {
				numeroImage--;
			    arriereImage = $img.eq(numeroImage + 1);
			    var backImg  = $img.eq(numeroImage + 2);
			    var backImgB = $img.eq(numeroImage + 3);
			    currentImg   = $img.eq(numeroImage);
			}

			currentImg.css('display', 'block')
					  .css('left', '0%');
			arriereImage.css('display', 'block');

			arriereImage.animate({left: '-100%'}, 800, function() {

				compteurZindex++;
				currentImg.css('left', '0%')
						  .css('z-index', compteurZindex);

				if (backImg) {
					backImg.css('display', 'none');
					backImgB.css('display', 'none');
				} else if(backImgC) {
					backImgC.css('display', 'none'); // A réparer !!!!!!!!!!!!!!!!!!!!!!!!!!  <---- todo
				}

				arriereImage.css('display', 'none');
				animEnCours = false;
			});
		}
	}

});

// todo list
//-----------------------------------------------------------------

// BUG
// réparer soucis au niveau du display block quand on passe de la dernière image 
// à celle d'avant en venant à la base de la premiere

// CORRECTION
// Selectionner des images définitives

// AJOUT
// Faire le responsive du carrousel
