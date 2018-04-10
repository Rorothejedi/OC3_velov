
// -----------------------OBJET carrousel : PROPRIETES ET METHODES---------------------------

// Création de l'objet carrousel
var carrousel = {

	$img 			: $('#carrousel ul li img'),
	indexImg 		: $('#carrousel ul li img').length - 1,

	numeroImage 	: 0,
	compteurZindex 	: 1,
	arriereImage 	: '',
	animEnCours 	: false,
	play			: '',

	height 			: $(window).height(),
	width 			: $(window).width(),

	// Méthode d'initialisation du carrousel
	init 			: function () {

		this.$img.eq(this.numeroImage).css('z-index', this.compteurZindex)
		  							  .css('display', 'block');
		this.couleurPuces();
		this.barreProgression($('.barreChargementCarrousel'));
		this.textImage();
		this.autoplay();

		// ---- Evenements ----

		var that = this;
		// Utiliser ça à la place de l'appelle de l'objet

		// image suivante au clic
		$('.next').on('click', function() { 
			that.suivant();
		});

		// image précédente au clic
		$('.prev').on('click', function() { 
		 	that.precedent();
		});

		// Possibilité d'action avec les touches du clavier (suivant ou précédent)
		$('body').keydown(function(e) {

			switch (e.which) {

				case 37	: // fleche gauche
				case 100: // pavé num 4
				case 81	: // touche q
					that.precedent();
					break;

				case 39	: // fleche droite
				case 102: // pavé num 6
				case 68 : // touche d
					that.suivant();
					break;
			}
		});

		// Evenements d'interaction avec les puces (vignettes)
		$('#pucesCarrousel li').on('click', function() {

			var indexLi = $("#pucesCarrousel li" ).index(this);

			if (that.numeroImage > indexLi) {

				that.numeroImage = indexLi + 1;
				that.precedent();

			} else if (that.numeroImage < indexLi) {

				that.numeroImage = indexLi - 1;
				that.suivant();
			}
		});
	},

	// Méthode d'autoplay (défilement automatique des images)
	autoplay 		: function() {

		var that = this;

		this.play = setInterval(function() { 
			that.suivant(); 
		}, 10000);
	},

	// Méthode de passage à l'image suivant incluant l'autoplay
	suivant 		: function () {

		clearInterval(this.play);
		this.barreProgression($('.barreChargementCarrousel'));
	   	this.imageSuiv(this.$img.eq(this.numeroImage));
	   	this.textImage();
	   	this.couleurPuces();
	   	this.autoplay();

	},

	// Méthode de retour à l'image précédente incluant l'autoplay
	precedent 		: function() {

		clearInterval(this.play);
		this.barreProgression($('.barreChargementCarrousel'));
	 	this.imagePrec(this.$img.eq(this.numeroImage));
	 	this.textImage();
	 	this.couleurPuces();
	 	this.autoplay();
	},

	
	// Méthode de mise en avant de chacun des textes
	textImage		: function() {

		var numText = this.numeroImage + 1;
		var text = '#carrouselContenu li:nth-of-type(' + numText + ') div';

		$('#carrouselContenu li div').removeClass('textActif');
		$(text).addClass('textActif');
	},

	// Méthode de l'animation de la barre de progression
	barreProgression : function(element) {

		element.stop(false,true);

		// Animation uniquement pour les écrans de plus de 1024px de largeur
		if (this.width > 1024) {
			element.animate({width: '100%'}, 10000, function() {
				element.animate({opacity: '0'}, 800, function() {
					element.css('width', '0%')
						  .css('opacity', '1');
				}); 
			});
		}
	},

	// Méthode de modifiation de la couleur des puces
	couleurPuces : function() {

		var vignette = this.numeroImage + 1;
		var $imgVignette = '#pucesCarrousel li:nth-of-type(' + vignette + ')';

		$('#pucesCarrousel li').removeClass();
		$($imgVignette).addClass('puceActive');
	},

	// Méthode pour passer à l'image suivante 
	imageSuiv : function(imageCourante) {

		var that = this;

		if(this.animEnCours === false){

    		this.animEnCours = true;

			if(this.numeroImage < this.indexImg){

			    this.numeroImage++;
			    var backImg 	  = this.$img.eq(this.numeroImage - 2);
			    this.arriereImage = this.$img.eq(this.numeroImage - 1);
			    imageCourante  	  = this.$img.eq(this.numeroImage);

			} else {
			    this.numeroImage  = 0;
			    this.arriereImage = this.$img.eq(this.indexImg);
			    imageCourante     = this.$img.eq(this.numeroImage);
			}

			// On initialise l'image en cours et l'image derrière
			imageCourante.css('display', 'block')
					  	 .css('left', '0%');

			this.arriereImage.css('display', 'block');

			// Supression de l'animation pour les tablettes et mobiles
			if (this.width > 1024) {

				// On lance l'animation de l'image
				that.arriereImage.animate({left: '100%'}, 800, function() {

					// Après l'animation, on incrémente le z-index pour que l'image en cours toujours soit devant
					that.compteurZindex++;

					imageCourante.css('left', '0%')
								.css('z-index', that.compteurZindex);

					if (backImg) { 
						backImg.css('display', 'none');
					}

					that.arriereImage.css('display', 'none');
					// On indique dans la variable que l'animation est terminée
					that.animEnCours = false;
					
				});

			// Mode paysage mobile
			} else if (this.width <= 740 && this.height < this.width) {

				this.compteurZindex++;
				imageCourante.css('left', '0%')
							 .css('z-index', this.compteurZindex);
				this.arriereImage.css('display', 'none');
				this.animEnCours = false;

			} else if (this.width <= 768 && this.width > 414) {

				this.compteurZindex++;
				imageCourante.css('left', '-50%')
							 .css('z-index', this.compteurZindex);
				this.arriereImage.css('display', 'none');
				this.animEnCours = false;

			} else if (this.width <= 414) {

				this.compteurZindex++;
				imageCourante.css('left', '-85%')
							 .css('z-index', this.compteurZindex);
				this.arriereImage.css('display', 'none');
				this.animEnCours = false;

			} else {

				this.compteurZindex++;
				imageCourante.css('left', '-8%')
							 .css('z-index', this.compteurZindex);
				this.arriereImage.css('display', 'none');
				this.animEnCours = false;
			}
		}
	},

	// Méthode pour passer à l'image précédente (fonctionnement similaire à la méthode 'imageSuiv')
	imagePrec : function(imageCourante) {

		var that = this;

		if(this.animEnCours === false) {

    		this.animEnCours = true; 

			if ( this.numeroImage === 0 ) {

				this.numeroImage  = this.indexImg;
				this.arriereImage = this.$img.eq(0);
			    imageCourante 	  = this.$img.eq(this.numeroImage);
			    var backImgC 	  = this.$img.eq(4);

			} else {
				this.numeroImage--;
			    this.arriereImage = that.$img.eq(this.numeroImage + 1);
			    var backImg 	  = this.$img.eq(this.numeroImage + 2);
			    var backImgB 	  = this.$img.eq(this.numeroImage + 3);
			    imageCourante 	  = this.$img.eq(this.numeroImage);
			}

			imageCourante.css('display', 'block')
					  	 .css('left', '0%');

			this.arriereImage.css('display', 'block');

			// Supression de l'animation pour les tablettes et mobiles
			if (this.width > 1024) {

				that.arriereImage.animate({left: '-100%'}, 800, function() {

					that.compteurZindex++;
					imageCourante.css('left', '0%')
							  	 .css('z-index', that.compteurZindex);

					if (backImg) {
						backImg.css('display', 'none');
						backImgB.css('display', 'none');
					} else if(backImgC) {
						backImgC.css('display', 'none');
					}

					that.arriereImage.css('display', 'none');
					that.animEnCours = false;
				});

			// Mode paysage mobile
			} else if (this.width <= 740 && this.height < this.width) {

				that.compteurZindex++;
				imageCourante.css('left', '0%')
							 .css('z-index', that.compteurZindex);
				that.arriereImage.css('display', 'none');
				that.animEnCours = false;

			} else if (this.width <= 768 && this.width > 414) {

				that.compteurZindex++;
				imageCourante.css('left', '-50%')
							 .css('z-index', that.compteurZindex);
				that.arriereImage.css('display', 'none');
				that.animEnCours = false;

			} else if (this.width <= 414) {

				that.compteurZindex++;
				imageCourante.css('left', '-85%')
							 .css('z-index', that.compteurZindex);
				that.arriereImage.css('display', 'none');
				that.animEnCours = false;

			} else {

				that.compteurZindex++;
				imageCourante.css('left', '-8%')
							 .css('z-index', that.compteurZindex);
				that.arriereImage.css('display', 'none');
				that.animEnCours = false;
			}
		}
	}
};