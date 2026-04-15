/**
 * 🚀 EXEMPLES D'UTILISATION - PromptGenerator & APIIntegration
 */

// ============================================
// EXEMPLE 1: Récupérer le résumé simple
// ============================================

function afficherResume() {
    const summary = PromptGenerator.generateSummary(window.addedElements);
    console.log(summary);
    // Output: ✨ Composition actuelle:
    //         • 2 formes
    //         • 1 texte
    //         • 1 ligne
    //         Total: 4 éléments
}


// ============================================
// EXEMPLE 2: Générer une description complète
// ============================================

function afficherDescription() {
    const mediaEl = document.getElementById('editableImage');
    const mediaInfo = {
        type: 'image',
        width: mediaEl.naturalWidth,
        height: mediaEl.naturalHeight
    };

    const description = PromptGenerator.generateElementsDescription(
        window.addedElements,
        mediaInfo
    );

    console.log('Description des éléments:');
    console.log(description.description);
    
    // Les données structurées aussi disponibles:
    console.log('Données structurées:', description.elements);
}


// ============================================
// EXEMPLE 3: Générer un prompt complet
// ============================================

function genererPromptComplet(intentionUtilisateur) {
    const mediaEl = document.getElementById('editableImage');
    const mediaInfo = {
        type: 'image',
        width: mediaEl.naturalWidth,
        height: mediaEl.naturalHeight
    };

    const fullPrompt = PromptGenerator.generateFullPrompt(
        window.addedElements,
        intentionUtilisateur,
        mediaInfo
    );

    console.log('Prompt complet:');
    console.log(fullPrompt);
    
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(fullPrompt);
    alert('✅ Prompt copié!');
}

// Utilisation:
// genererPromptComplet('Ajouter des lumières subtiles autour des formes');


// ============================================
// EXEMPLE 4: Envoyer à l'API (avec média)
// ============================================

async function envoyerAuRunway() {
    // Récupérer le média à traiter
    const mediaEl = document.getElementById('editableImage');
    const mediaFile = null; // Optionnel - le média on peut le prendre depuis l'UI
    
    // Infos du média
    const mediaInfo = {
        type: 'image',
        width: mediaEl.naturalWidth,
        height: mediaEl.naturalHeight
    };

    // L'intention de l'utilisateur
    const userDescription = "Ajouter des effets lumineux gradués autour de chaque élément";

    try {
        // Traiter et envoyer
        const response = await APIIntegration.processElements(
            window.addedElements,
            userDescription,
            mediaFile,
            mediaInfo
        );

        console.log('✅ Réponse API:', response);
        
        // Traiter la réponse (à adapter selon l'API)
        if (response.data) {
            // Appliquer les effets générés
            appliquerEffetsGeneres(response.data);
        }
    } catch (error) {
        console.error('❌ Erreur:', error);
    }
}


// ============================================
// EXEMPLE 5: Export JSON pour sauvegarde
// ============================================

function exporterEnJSON() {
    const mediaEl = document.getElementById('editableImage');
    const mediaInfo = {
        type: 'image',
        width: mediaEl.naturalWidth,
        height: mediaEl.naturalHeight
    };

    const json = PromptGenerator.exportAsJSON(
        window.addedElements,
        mediaInfo
    );

    console.log('JSON structuré:');
    console.log(json);
    
    // Télécharger le fichier
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `composition_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}


// ============================================
// EXEMPLE 6: Intégration avec un formulaire
// ============================================

function setupPromptForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px; max-width: 500px;">
            <h2>Configuration des effets</h2>
            
            <label>
                Quel type d'effet désirez-vous?
                <select id="effectType" style="width: 100%; padding: 8px; margin: 10px 0;">
                    <option value="">-- Sélectionnez --</option>
                    <option value="lighting">Éclairage et ombres</option>
                    <option value="animation">Animations</option>
                    <option value="particles">Effets de particules</option>
                    <option value="glitch">Effets glitch/digital</option>
                    <option value="depth">Effet de profondeur 3D</option>
                </select>
            </label>

            <label>
                Description détaillée:
                <textarea id="effectDescription" 
                          style="width: 100%; height: 100px; padding: 8px; margin: 10px 0;"
                          placeholder="Ex: 'Ajouter une lumière bleue directionnelle depuis le haut...'"></textarea>
            </label>

            <button type="button" onclick="traiterFormulaireEffets();" 
                    style="width: 100%; padding: 12px; background: #FF6B35; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Générer le prompt
            </button>
        </div>
    `;
    document.body.appendChild(form);
}

function traiterFormulaireEffets() {
    const effectType = document.getElementById('effectType').value;
    const description = document.getElementById('effectDescription').value;
    const combinedIntent = `Type: ${effectType}\n${description}`;
    
    genererPromptComplet(combinedIntent);
}


// ============================================
// EXEMPLE 7: Créer un historique de prompts
// ============================================

class HistoriquePrompts {
    constructor() {
        this.prompts = JSON.parse(localStorage.getItem('prompts_history')) || [];
    }

    ajouter(prompt, elements, userIntent) {
        const entry = {
            timestamp: new Date().toISOString(),
            prompt: prompt,
            elementCount: elements.length,
            userIntent: userIntent
        };
        this.prompts.push(entry);
        this.sauvegarder();
    }

    sauvegarder() {
        localStorage.setItem('prompts_history', JSON.stringify(this.prompts));
    }

    afficherHistorique() {
        console.log('Historique des prompts généré:');
        this.prompts.forEach((entry, idx) => {
            console.log(`\n[${idx + 1}] ${entry.timestamp}`);
            console.log(`Éléments: ${entry.elementCount}`);
            console.log(`Intention: ${entry.userIntent}`);
        });
    }

    exporterHistorique() {
        return JSON.stringify(this.prompts, null, 2);
    }
}

// Utilisation:
const historique = new HistoriquePrompts();
// historique.ajouter(prompt, window.addedElements, userIntent);


// ============================================
// EXEMPLE 8: Analyser la composition
// ============================================

function analyserComposition() {
    const elements = window.addedElements;
    
    const analysis = {
        // Densité d'éléments
        density: (elements.length / (1280 * 720)) * 100000, // éléments par million de pixels
        
        // Distribution
        distribution: {
            left: elements.filter(el => el.x < 426.67).length,
            center: elements.filter(el => el.x >= 426.67 && el.x < 853.33).length,
            right: elements.filter(el => el.x >= 853.33).length,
        },
        
        // Tailles moyenne
        avgSize: elements.reduce((sum, el) => sum + (el.width * el.height || 0), 0) / elements.length,
        
        // Types
        typeBreakdown: {
            shapes: elements.filter(el => el.type === 'shape').length,
            texts: elements.filter(el => el.type === 'text').length,
            lines: elements.filter(el => el.type === 'line').length,
        }
    };
    
    console.log('Analyse de composition:', analysis);
    return analysis;
}


// ============================================
// EXEMPLE 9: Générer des prompts contextuels
// ============================================

function genererPromptsContextuels() {
    const analysis = analyserComposition();
    
    let contextualPrompt = 'En fonction de la composition:\n';
    
    // Analyse de la densité
    if (analysis.density < 5) {
        contextualPrompt += '- La composition est aérée. Ajoute un éclairage ambiant doux.\n';
    } else {
        contextualPrompt += '- La composition est dense. Crée des contrastes clairs entre éléments.\n';
    }
    
    // Analyse de la distribution
    const maxDist = Math.max(
        analysis.distribution.left,
        analysis.distribution.center,
        analysis.distribution.right
    );
    
    if (analysis.distribution.left === maxDist) {
        contextualPrompt += '- Les éléments sont groupés à gauche. Ajoute un contre-éclairage depuis la droite.\n';
    }
    
    // Taille moyen
    contextualPrompt += `- Taille moyenne des éléments: ${Math.round(analysis.avgSize)} pixels\n`;
    contextualPrompt += 'Ajuste les effets proportionnellement à cette taille.\n';
    
    return contextualPrompt;
}


// ============================================
// EXEMPLE 10: Hook pour mise à jour automatique
// ============================================

// Appeler ceci après chaque modification d'éléments
function notifierMiseAJourElements() {
    // Dispatcher un événement personnalisé
    const event = new CustomEvent('elementsUpdated', {
        detail: {
            addedElements: window.addedElements,
            timestamp: Date.now()
        }
    });
    window.dispatchEvent(event);
    
    // Écouter dans une autre partie du code:
    // window.addEventListener('elementsUpdated', (e) => {
    //     console.log('Éléments mis à jour:', e.detail.addedElements);
    //     window.updatePromptPreview?.();
    // });
}


// ============================================
// UTILITÉ - Appeler depuis la console
// ============================================

/*
// Dans la console de dev (F12), tu peux faire:

// 1. Afficher le résumé
afficherResume();

// 2. Afficher la description complète
afficherDescription();

// 3. Générer et copier le prompt
genererPromptComplet('Ajouter des ombres dynamiques');

// 4. Analyser la composition
analyserComposition();

// 5. Générer des prompts contextuels
genererPromptsContextuels();

// 6. Exporter en JSON
exporterEnJSON();
*/
