// Fonction pour initialiser le panneau de configuration
function initConfigPanel() {
    const panel = document.getElementById('config-panel');
    const totalDurationInput = document.getElementById('total-duration');
    const initialDelayInput = document.getElementById('initial-delay');
    const maxDelayInput = document.getElementById('max-delay');
    const minDelayInput = document.getElementById('min-delay');
    const transitionDurationInput = document.getElementById('transition-duration');
    const accelerationCurveSelect = document.getElementById('acceleration-curve');
    const applyButton = document.getElementById('apply-config');
    const restartButton = document.getElementById('restart');
    
    // Charger les valeurs actuelles
    totalDurationInput.value = CONFIG.totalDuration;
    initialDelayInput.value = CONFIG.initialDelay;
    maxDelayInput.value = CONFIG.maxDelay;
    minDelayInput.value = CONFIG.minDelay;
    transitionDurationInput.value = CONFIG.transitionDuration;
    accelerationCurveSelect.value = CONFIG.accelerationCurve;
    
    // Appliquer la configuration
    applyButton.addEventListener('click', () => {
        CONFIG.totalDuration = parseInt(totalDurationInput.value);
        CONFIG.initialDelay = parseInt(initialDelayInput.value);
        CONFIG.maxDelay = parseInt(maxDelayInput.value);
        CONFIG.minDelay = parseInt(minDelayInput.value);
        CONFIG.transitionDuration = parseInt(transitionDurationInput.value);
        CONFIG.accelerationCurve = accelerationCurveSelect.value;
        
        // Appliquer la durée de transition aux éléments CSS
        document.documentElement.style.setProperty('--transition-duration', CONFIG.transitionDuration + 'ms');
    });
    
    // Redémarrer l'animation
    restartButton.addEventListener('click', () => {
        startAnimation();
    });
    
    // Afficher/masquer le panneau avec la touche 'c'
    document.addEventListener('keydown', (e) => {
        if (e.key === '!') {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le panneau de configuration
    initConfigPanel();
    
    // Démarrer l'animation
    startAnimation();
});