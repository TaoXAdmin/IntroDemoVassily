// Configuration de l'animation
const CONFIG = {
    totalDuration: 7000,          // Durée totale en ms
    initialDelay: 1000,           // Délai avant la première transition (ms)
    maxDelay: 1000,               // Délai maximum entre transitions (ms)
    minDelay: 100,                // Délai minimum entre transitions (ms)
    transitionDuration: 1000,     // Durée d'une transition (ms)
    accelerationCurve: 'exponential', // Type de courbe d'accélération
    
    // Fonction qui calcule le délai basé sur la progression
    calculateDelay: function(progress) {
        let factor;
        
        switch(this.accelerationCurve) {
            case 'linear':
                // Décroissance linéaire
                factor = 1 - progress;
                break;
            case 'quadratic':
                // Décroissance quadratique (par défaut)
                factor = 1 - Math.pow(progress, 2);
                break;
            case 'cubic':
                // Décroissance cubique (plus douce au début)
                factor = 1 - Math.pow(progress, 3);
                break;
            case 'exponential':
                // Décroissance exponentielle (très rapide à la fin)
                factor = Math.pow(0.5, progress * 100);
                break;
            case 'bounce':
                // Effet de rebond (plus chaotique)
                factor = 0.5 + 0.5 * Math.cos(progress * Math.PI * 4);
                factor = Math.max(0, 1 - progress * 1.5 + factor * 0.5);
                break;
            default:
                factor = 1 - Math.pow(progress, 2);
        }
        
        // Calculer le délai entre les valeurs min et max
        return Math.max(this.minDelay, this.maxDelay * factor);
    }
};

// Appliquer la durée de transition aux éléments CSS
document.documentElement.style.setProperty('--transition-duration', CONFIG.transitionDuration + 'ms');