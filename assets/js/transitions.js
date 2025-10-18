// Éléments DOM
const screen1 = document.querySelector('.screen-1');
const screen2 = document.querySelector('.screen-2');

// Configuration des écrans
const screens = [
    { element: screen1, bgColor: '#050505', logo: 'assets/images/logo2white.png' },
    { element: screen2, bgColor: '#f5f5f5', logo: 'assets/images/logo2.png' }
];

// Index de l'écran actuellement visible et direction de la diagonale
let currentScreenIndex = 0;
let diagonalDirection = 0;

// Variables pour le timing
let startTime;
let isRunning = false;

// Définitions des diagonales
const diagonals = [
    { // Haut-droite à bas-gauche
        top: {
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            transform: 'translate(-100%, -100%)'
        },
        bottom: {
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            transform: 'translate(100%, 100%)'
        }
    },
    { // Haut-gauche à bas-droite
        top: {
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            transform: 'translate(-100%, 100%)'
        },
        bottom: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
            transform: 'translate(100%, -100%)'
        }
    }
];

// Fonction pour créer une transition avec scission du logo
function createTransition(fromScreen, toScreen) {
    if (!isRunning) return;
    
    // Créer le conteneur de masques
    const maskContainer = document.createElement('div');
    maskContainer.className = 'mask-container';
    
    // Obtenir les définitions de la diagonale actuelle
    const diagonal = diagonals[diagonalDirection];
    
    // Créer les deux masques avec la couleur de l'écran actuel et le logo
    maskContainer.innerHTML = `
        <div class="mask mask-top" style="clip-path: ${diagonal.top.clipPath}; background-color: ${fromScreen.bgColor}; transition: transform ${CONFIG.transitionDuration}ms ease-in-out;">
            <div class="logo-container">
                <img src="${fromScreen.logo}" alt="Logo" class="logo">
            </div>
        </div>
        <div class="mask mask-bottom" style="clip-path: ${diagonal.bottom.clipPath}; background-color: ${fromScreen.bgColor}; transition: transform ${CONFIG.transitionDuration}ms ease-in-out;">
            <div class="logo-container">
                <img src="${fromScreen.logo}" alt="Logo" class="logo">
            </div>
        </div>
    `;
    
    // Ajouter le conteneur au body
    document.body.appendChild(maskContainer);
    
    // S'assurer que l'écran de destination est derrière les masques
    screens.forEach(screen => {
        screen.element.style.zIndex = '1';
    });
    toScreen.element.style.zIndex = '2';
    
    // Cacher brièvement l'écran de départ pour éviter la duplication
    fromScreen.element.style.opacity = '0';
    
    // Animation des masques après un court délai
    setTimeout(() => {
        const masks = maskContainer.querySelectorAll('.mask');
        masks[0].style.transform = diagonal.top.transform;
        masks[1].style.transform = diagonal.bottom.transform;
        
        // Nettoyer après la fin de l'animation
        setTimeout(() => {
            maskContainer.remove();
            screens.forEach(screen => {
                screen.element.style.opacity = '1';
            });
            
            // Vérifier si le temps total est écoulé
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < CONFIG.totalDuration && isRunning) {
                // Calculer la progression (0 à 1)
                let progress = elapsedTime / CONFIG.totalDuration;
                
                // Calculer le délai jusqu'à la prochaine transition en utilisant la courbe configurée
                const nextDelay = CONFIG.calculateDelay(progress);
                
                // Planifier la prochaine transition
                setTimeout(() => {
                    // Alterner les écrans
                    currentScreenIndex = (currentScreenIndex + 1) % 2;
                    
                    // Alterner la direction de la diagonale
                    diagonalDirection = (diagonalDirection + 1) % 2;
                    
                    createTransition(
                        screens[currentScreenIndex],
                        screens[(currentScreenIndex + 1) % 2]
                    );
                }, nextDelay);
            } else {
                // Animation terminée
                isRunning = false;
            }
        }, CONFIG.transitionDuration);
    }, 30);
}

// Fonction pour démarrer/redémarrer l'animation
function startAnimation() {
    // Réinitialiser l'état
    currentScreenIndex = 0;
    diagonalDirection = 0;
    
    // Définir l'état initial des écrans
    screen1.style.zIndex = '2';
    screen2.style.zIndex = '1';
    screen1.style.opacity = '1';
    screen2.style.opacity = '1';
    
    // Supprimer tous les masques existants
    document.querySelectorAll('.mask-container').forEach(container => {
        container.remove();
    });
    
    // Enregistrer le temps de départ
    startTime = Date.now();
    isRunning = true;
    
    // Démarrer le cycle
    setTimeout(() => {
        createTransition(screens[0], screens[1]);
    }, CONFIG.initialDelay);
}