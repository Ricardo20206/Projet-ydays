// Gestion de la barre de recherche globale
document.addEventListener('DOMContentLoaded', function() {
    const globalSearchInput = document.getElementById('globalSearchInput');
    const sendToApiBtn = document.getElementById('sendToApiBtn');
    const apiStatusGlobal = document.getElementById('apiStatusGlobal');
    
    // Afficher le bouton si un média est présent
    if (sendToApiBtn && window.currentMedia) {
        if (window.currentMedia.video || window.currentMedia.image) {
            sendToApiBtn.style.display = 'block';
        }
    }
    
    // Gestion de la recherche
    if (globalSearchInput) {
        globalSearchInput.addEventListener('keypress', async function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Envoyer la requête à l'API externe
                    if (apiStatusGlobal) {
                        apiStatusGlobal.innerHTML = '<div class="status-message status-loading">⏳ Envoi de la requête à l\'API...</div>';
                    }
                    
                    try {
                        const response = await fetch('/send-query-to-api', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ query: query })
                        });
                        
                        const data = await response.json();
                        
                        if (response.ok) {
                            if (apiStatusGlobal) {
                                apiStatusGlobal.innerHTML = `<div class="status-message status-success">✅ ${data.response || 'Requête traitée avec succès'}</div>`;
                            }
                            // Rediriger vers la page de recherche après un court délai
                            setTimeout(() => {
                                window.location.href = `/search?q=${encodeURIComponent(query)}`;
                            }, 1000);
                        } else {
                            if (apiStatusGlobal) {
                                apiStatusGlobal.innerHTML = `<div class="status-message status-error">❌ Erreur : ${data.error || 'Erreur lors du traitement'}</div>`;
                            }
                            // Rediriger quand même vers la page de recherche
                            setTimeout(() => {
                                window.location.href = `/search?q=${encodeURIComponent(query)}`;
                            }, 2000);
                        }
                    } catch (error) {
                        if (apiStatusGlobal) {
                            apiStatusGlobal.innerHTML = '<div class="status-message status-error">❌ Erreur de connexion. Assurez-vous que l\'API externe est démarrée (port 5001).</div>';
                        }
                        // Rediriger quand même vers la page de recherche
                        setTimeout(() => {
                            window.location.href = `/search?q=${encodeURIComponent(query)}`;
                        }, 2000);
                        console.error('Erreur:', error);
                    }
                }
            }
        });
    }
    
    // Gestion du bouton "Envoyer à l'API"
    if (sendToApiBtn) {
        sendToApiBtn.addEventListener('click', async function() {
            const currentMedia = window.currentMedia;
            let filename = null;
            let isVideo = false;
            
            if (currentMedia && currentMedia.video) {
                filename = currentMedia.video;
                isVideo = true;
            } else if (currentMedia && currentMedia.image) {
                filename = currentMedia.image;
                isVideo = false;
            }
            
            if (!filename) {
                alert('Aucun média à envoyer. Veuillez d\'abord charger une vidéo ou une image.');
                return;
            }
            
            // Afficher le statut de chargement
            if (apiStatusGlobal) {
                apiStatusGlobal.innerHTML = '<div class="status-message status-loading">⏳ Envoi en cours...</div>';
            }
            sendToApiBtn.disabled = true;
            sendToApiBtn.style.opacity = '0.6';
            
            try {
                const response = await fetch(`/send-to-api/${filename}`, {
                    method: 'POST'
                });
                const data = await response.json();
                
                if (response.ok) {
                    if (apiStatusGlobal) {
                        const mediaType = isVideo ? 'vidéo' : 'image';
                        apiStatusGlobal.innerHTML = `<div class="status-message status-success">✅ ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} envoyée et traitée avec succès !</div>`;
                    }
                    
                    // Recharger la page pour afficher le média traité
                    setTimeout(() => {
                        const currentPath = window.location.pathname;
                        if (isVideo) {
                            if (currentPath === '/video') {
                                window.location.href = `/video?video=${filename}&processed=${data.processed_video}`;
                            } else {
                                window.location.href = `/?video=${filename}&processed=${data.processed_video}`;
                            }
                        } else {
                            if (currentPath === '/image') {
                                window.location.href = `/image?image=${filename}&processed_image=${data.processed_image}`;
                            } else {
                                window.location.href = `/?image=${filename}&processed_image=${data.processed_image}`;
                            }
                        }
                    }, 1500);
                } else {
                    if (apiStatusGlobal) {
                        apiStatusGlobal.innerHTML = `<div class="status-message status-error">❌ Erreur : ${data.error || 'Erreur lors du traitement'}</div>`;
                    }
                    sendToApiBtn.disabled = false;
                    sendToApiBtn.style.opacity = '1';
                }
            } catch (error) {
                if (apiStatusGlobal) {
                    apiStatusGlobal.innerHTML = '<div class="status-message status-error">❌ Erreur de connexion. Assurez-vous que l\'API externe est démarrée (port 5001).</div>';
                }
                sendToApiBtn.disabled = false;
                sendToApiBtn.style.opacity = '1';
                console.error('Erreur:', error);
            }
        });
    }
    
    // Gestion des icônes microphone et son
    const micIcon = document.querySelector('.mic-icon');
    const soundIcon = document.querySelector('.sound-icon');
    
    if (micIcon) {
        micIcon.addEventListener('click', function() {
            alert('Fonctionnalité microphone en cours de développement');
        });
    }
    
    if (soundIcon) {
        soundIcon.addEventListener('click', function() {
            alert('Fonctionnalité audio en cours de développement');
        });
    }
});
