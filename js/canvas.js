// -------------------------------Gestion du canvas------------------------------------

// On déclare les variables
var canvas  = $('#canvas');
var container = $('.canvasZone');
var context = canvas[0].getContext('2d');

var color = "#000";
var painting = false;
var started = false;
var width_brush = 1;
var cursorX, cursorY;
var restoreCanvasArray = [];
var restoreCanvasIndex = 0;


//Redimentionnement du canvas (responsive)
$(window).resize(canvasResponsive);

function canvasResponsive() {
    canvas.attr('width', canvas.width());
    canvas.attr('height', canvas.height());

   $('.confirmer').attr('disabled','disabled')
		.attr('title','Signez dans le cadre pour pouvoir confirmer la réservation')
		.addClass('confirmerInactif')
		.removeClass('confirmerActif');
}

// Trait arrondi
context.lineJoin = 'round';
context.lineCap = 'round';

// Clic souris enfoncé sur le canvas, on dessine
canvas.mousedown(function(e) {

	painting = true;
	// Coordonnées de la souris
	cursorX = (e.pageX - this.offsetLeft);
	cursorY = (e.pageY - this.offsetTop);
});


// Relachement du clic sur tout le document, on arrête de dessiner
$(this).mouseup(function() {
	painting = false;
	started = false;
});


// Mouvement de la souris sur le canvas
canvas.mousemove(function(e) {
	// Si on est en train de dessiner (clic souris enfoncé)
	if (painting) {
		// On défini les coordonnées de la souris
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);

		// On dessine une ligne
		drawLine();
	}
});


// Fonction qui dessine une ligne
function drawLine() {
	// Si c'est le début, on initialise
	if (!started) {
		// On place le curseur pour la première fois
		context.beginPath();
		context.moveTo(cursorX, cursorY);
		started = true;
	} 
	// Sinon on dessine
	else {
		context.lineTo(cursorX, cursorY);
		context.strokeStyle = color;
		context.lineWidth = width_brush;
		context.stroke();
	}
}


// Fonction bouton Reset
function rafraichirCanvas (bouton) {
	$(bouton).click(function() {
		context.clearRect(0, 0, canvas[0].width, canvas[0].height);
	});
}
rafraichirCanvas('.rafraichir');


// En cas d'abandon avant avoir remplis le canvas
$('.fa-times, .rafraichir, .annuler').click(function() {
	$('.confirmer').attr('disabled','disabled')
		.attr('title','Signez dans le cadre pour pouvoir confirmer la réservation')
		.addClass('confirmerInactif')
		.removeClass('confirmerActif');
})

// Un clic sur le canvas permet à l'utilisateur de confirmer la réservation
canvas.on('click touchend', function() {
	$('.confirmer').removeAttr('disabled')
	.removeAttr('title')
	.addClass('confirmerActif')
	.removeClass('confirmerInactif');
})