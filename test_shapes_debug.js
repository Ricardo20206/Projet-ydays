// Script de test pour déboguer les formes
// À exécuter dans la console du navigateur après avoir chargé une image

console.log('=== TEST DES FORMES ===');

// Test 1: Vérifier que window.selectShape existe
console.log('Test 1: window.selectShape existe?', typeof window.selectShape === 'function');

// Test 2: Vérifier que le canvas existe
const canvas = document.getElementById('editingCanvas');
console.log('Test 2: Canvas existe?', !!canvas);
if (canvas) {
    console.log('  - Canvas width:', canvas.width);
    console.log('  - Canvas height:', canvas.height);
    console.log('  - Canvas style.display:', canvas.style.display);
    console.log('  - Canvas style.visibility:', canvas.style.visibility);
    console.log('  - Canvas style.zIndex:', canvas.style.zIndex);
}

// Test 3: Vérifier que le contexte existe
const ctx = canvas ? canvas.getContext('2d') : null;
console.log('Test 3: Contexte existe?', !!ctx);

// Test 4: Vérifier window.canvas et window.ctx
console.log('Test 4: window.canvas existe?', !!window.canvas);
console.log('Test 4: window.ctx existe?', !!window.ctx);

// Test 5: Vérifier window.drawShape
console.log('Test 5: window.drawShape existe?', typeof window.drawShape === 'function');

// Test 6: Vérifier window.redrawCanvas
console.log('Test 6: window.redrawCanvas existe?', typeof window.redrawCanvas === 'function');

// Test 7: Vérifier window.addedElements
console.log('Test 7: window.addedElements existe?', Array.isArray(window.addedElements));
console.log('  - Nombre d\'éléments:', window.addedElements ? window.addedElements.length : 0);

// Test 8: Vérifier l'image
const image = document.getElementById('editableImage');
console.log('Test 8: Image existe?', !!image);
if (image) {
    console.log('  - Image naturalWidth:', image.naturalWidth);
    console.log('  - Image naturalHeight:', image.naturalHeight);
    const rect = image.getBoundingClientRect();
    console.log('  - Image rect:', rect);
}

// Test 9: Tester l'appel de selectShape
console.log('\n=== TEST D\'APPEL DE selectShape ===');
if (typeof window.selectShape === 'function') {
    console.log('Appel de window.selectShape("square")...');
    try {
        window.selectShape('square');
        console.log('Appel réussi!');
    } catch (error) {
        console.error('Erreur lors de l\'appel:', error);
    }
} else {
    console.error('window.selectShape n\'est pas une fonction!');
}

// Attendre un peu et vérifier le résultat
setTimeout(() => {
    console.log('\n=== VÉRIFICATION APRÈS APPEL ===');
    console.log('Nombre d\'éléments après appel:', window.addedElements ? window.addedElements.length : 0);
    if (window.addedElements && window.addedElements.length > 0) {
        console.log('Dernier élément:', window.addedElements[window.addedElements.length - 1]);
    }
}, 1000);
