// -------------------------------Gestion du canvas mobile------------------------------------
// Permet le fonctionnement du canvas sur mobile

// canvas.on('touchmove', function(e) {e.preventDefault()}, false);

$(document).ready(function() {
	
	// Doigt enfoncé sur le canvas, on dessine
	canvas.bind('touchstart', function(e) {
		moveStart(e, true);
	});
	
	// Relachement du doigt sur tout le document, on arrête de dessiner
	$(this).bind('touchend', function() {
		moveEnd();
	});
	
	// Mouvement du doigt sur le canvas
	canvas.bind('touchmove', function(e) {
		move(e, true, this);
	});
});

function move(e, mobile, obj) {
	// Si on dessine (clic souris enfoncé)
	if (painting) {
		if (mobile) {
			// Event mobile
			var ev = e.originalEvent;
			e.preventDefault();
			
			// On défini les coordonées du doigt
			cursorX = (ev.targetTouches[0].pageX - obj.offsetLeft);
			cursorY = (ev.targetTouches[0].pageY - obj.offsetTop);
		}
		else {
			// On défini les coordonées de la souris
			cursorX = (e.pageX - obj.offsetLeft);
			cursorY = (e.pageY - obj.offsetTop);
		}
		
		// On dessine une ligne
		drawLine();
	}
}

// Fonction fin de mouvement
function moveEnd() {
	painting = false;
	started = false;
}

//  Fonction début de mouvement
function moveStart(e, mobile) {
	painting = true;
	
	if (mobile) {
		// Event mobile :
		var ev = e.originalEvent;
		e.preventDefault();
		
		// On défini les coordonées du doigt
		cursorX = (ev.pageX - obj.offsetLeft);
		cursorY = (ev.pageY - obj.offsetTop);
	}
	else {
		// On défini les coordonées de la souris
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
	}
}