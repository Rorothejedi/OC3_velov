// -----------------------OBJET signature : PROPRIETES ET METHODES---------------------------

// Création de l'objet signature
var signature = {

	canvas  	: $('#canvas'),
	context 	: $('#canvas')[0].getContext('2d'),

	painting 	: false,
	started 	: false,
	
	cursorX 	: '',
	cursorY 	: '',
	
	// Méthode d'initialisation de l'objet signature
	init 		: function () {

		// Trait arrondi
		this.context.lineJoin = 'round';
		this.context.lineCap  = 'round';

		// Lancement méthode de Reset
		this.rafraichirCanvas('.rafraichir');


		// ---- Gestion mouvements à la souris ----

		// Clic souris enfonce sur le canvas
		this.canvas.mousedown(function(e) {
			signature.moveStart(e, false);
		});
			
		// Relachement du clic sur tout le document
		this.canvas.mouseup(function() {
			signature.moveEnd();
		});
			
		// Mouvement de la souris sur le canvas
		this.canvas.mousemove(function(e) {
			signature.move(e, false, this);
		});


		// ---- Gestion mouvements tactiles ----

		// Doigt enfoncé sur le canvas, on dessine
		this.canvas.bind('touchstart', function(e) {
			signature.moveStart(e, true, this);
		});

		// Relachement du doigt sur tout le document, on arrête de dessiner
		this.canvas.bind('touchend', function() {
			signature.moveEnd();
		});

		// Mouvement du doigt sur le canvas
		this.canvas.bind('touchmove', function(e) {
			signature.move(e, true, this);
		});


		// ---- Evenements du canvas ----

		// En cas d'abandon avant avoir remplis le canvas
		$('.fa-times, .rafraichir, .annuler').click(function() {
			$('.confirmer').attr('disabled','disabled')
						   .attr('title','Signez dans le cadre pour pouvoir confirmer la réservation')
						   .addClass('confirmerInactif')
						   .removeClass('confirmerActif');
		});

		// Un clic sur le canvas permet à l'utilisateur de confirmer la réservation
		this.canvas.on('click touchend', function() {
			$('.confirmer').removeAttr('disabled')
						   .removeAttr('title')
						   .addClass('confirmerActif')
						   .removeClass('confirmerInactif');
		});
	},

	// Redimentionnement du canvas (responsive)
	canvasResponsive : function() {
		this.canvas.attr('width', this.canvas.width());
		this.canvas.attr('height', this.canvas.height());

		$('.confirmer').attr('disabled','disabled')
				       .attr('title','Signez dans le cadre pour pouvoir confirmer la réservation')
				   	   .addClass('confirmerInactif')
				   	   .removeClass('confirmerActif');
	},

	// Méthode bouton Reset
	rafraichirCanvas : function (bouton) {
		$(bouton).click(function() {
			signature.context.clearRect(0, 0, signature.canvas[0].width, signature.canvas[0].height);
		});
	},

	// Méthode qui dessine une ligne
	drawLine : function () {
		// Si c'est le début, on initialise
		if (!this.started) {
			// On place le curseur pour la première fois
			this.context.beginPath();
			this.context.moveTo(this.cursorX, this.cursorY);
			this.started = true;
		} 
		// Sinon on dessine
		else {
			this.context.lineTo(this.cursorX, this.cursorY);
			this.context.strokeStyle =  '#000';
			this.context.lineWidth 	 = 1;
			this.context.stroke();
		}
	},

	// Méthode de detection des mouvement (souris ou tactile)
	move : function(e, mobile, obj) {
		// Si on dessine (clic souris enfoncé)
		if (this.painting) {
			if (mobile) {
				// Event mobile
				var ev = e.originalEvent;
				e.preventDefault();
				
				// On défini les coordonées du doigt
				this.cursorX = (ev.targetTouches[0].pageX - obj.offsetLeft);
				this.cursorY = (ev.targetTouches[0].pageY - obj.offsetTop);
			}
			else {
				// On défini les coordonées de la souris
				this.cursorX = (e.pageX - obj.offsetLeft);
				this.cursorY = (e.pageY - obj.offsetTop);
			}
			
			// On dessine une ligne
			this.drawLine();
		}
	},

	//  Méthode début de mouvement
	moveStart : function(e, mobile, obj) {
		this.painting = true;

		if (mobile) {
			// Event mobile
			var ev = e.originalEvent;
			e.preventDefault();
			
			// On défini les coordonées du doigt
			this.cursorX = (ev.pageX - obj.offsetLeft);
			this.cursorY = (ev.pageY - obj.offsetTop);
		}
		else {
			// On défini les coordonées de la souris
			this.cursorX = (e.pageX - this.offsetLeft);
			this.cursorY = (e.pageY - this.offsetTop);
		}
	},

	// Méthode fin de mouvement
	moveEnd : function() {
		this.painting = false;
		this.started  = false;
	}
};

// Lancement de la méthode d'initialisation du canvas
signature.init();