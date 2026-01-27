# Projet Flask - Gestion de Médias (Vidéos & Images)

Application web Flask moderne permettant l'upload, la visualisation et la gestion de vidéos et d'images avec intégration d'une API externe de traitement.

## 📋 Description

Ce projet est une application Flask complète qui permet de :
- Uploader des vidéos et des images (formats multiples supportés)
- Visualiser les médias uploadés avec une interface moderne
- Envoyer les médias à une API externe pour traitement
- Rechercher et interagir via une barre de recherche intelligente
- Gérer vos fichiers avec une interface intuitive et responsive

## 🚀 Installation

### Prérequis

- Python 3.7 ou supérieur
- pip (gestionnaire de paquets Python)

### Étapes d'installation

1. **Cloner ou télécharger le projet**

2. **Créer un environnement virtuel** (recommandé)
```bash
python -m venv env
```

3. **Activer l'environnement virtuel**

   Sur Windows :
   ```bash
   env\Scripts\activate
   ```

   Sur Linux/Mac :
   ```bash
   source env/bin/activate
   ```

4. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

## 🎯 Utilisation

### Application principale

Lancer l'application principale :
```bash
python app.py
```

L'application sera accessible à l'adresse : `http://localhost:5000`

### Utilisation du microphone

La reconnaissance vocale permet de dicter vos recherches directement dans la barre de recherche :

1. **Activer le micro** : Cliquez sur l'icône microphone dans la barre de recherche
2. **Parler** : Le texte transcrit apparaît automatiquement dans le champ de recherche
3. **Arrêter** : Cliquez à nouveau sur le micro pour arrêter l'écoute
4. **Envoyer** : Utilisez le bouton "ENVOYER" ou appuyez sur Entrée pour envoyer votre requête

**Note** : La reconnaissance vocale nécessite un navigateur moderne (Chrome, Edge, Safari) et l'autorisation d'accès au microphone.

### Édition d'images

L'application permet d'éditer vos images avec de nombreux outils :

1. **Accéder aux outils** : Cliquez sur le bouton "🔧 Outils" sur la page Image
2. **Ajouter des formes** :
   - Cliquez sur "📐 Formes" dans le menu
   - Sélectionnez une forme (carré, rond, triangle, etc.)
   - La forme apparaît au centre de l'image
   - Utilisez la molette de la souris pour redimensionner
   - Cliquez et glissez pour déplacer
3. **Dessiner sur l'image** :
   - Cliquez sur "🖌️ Dessin" dans le menu
   - Choisissez une couleur parmi les 20 disponibles
   - Cliquez sur "🖍️ Feutre" pour activer le dessin
   - Dessinez directement sur l'image avec la souris
   - Utilisez "🧹 Gomme" pour effacer vos dessins
   - Cliquez sur "✋ Désactiver" pour désactiver les outils de dessin
4. **Sauvegarder l'image modifiée** :
   - Cliquez sur "💾 Sauvegarder l'image modifiée" pour télécharger l'image sur votre appareil
   - Le fichier sera nommé avec la date et l'heure pour éviter les écrasements
5. **Envoyer à l'API** :
   - (Optionnel) Saisissez du texte dans la barre de recherche
   - Cliquez sur "ENVOYER" dans la barre intelligente
   - L'image modifiée et le texte seront envoyés simultanément à l'API externe

### API externe de traitement (requise pour certaines fonctionnalités)

Pour utiliser l'API externe de traitement de médias et de requêtes :
```bash
python external_api.py
```

L'API sera accessible sur le port 5001 avec les endpoints :
- `POST /process-video` : Traite une vidéo ou une image
- `POST /process-query` : Traite une requête texte

## 📁 Structure du projet

```
projet ydays/
├── app.py                 # Application Flask principale
├── api_video.py          # API simple pour servir une vidéo (optionnel)
├── external_api.py       # API externe de traitement de médias et requêtes
├── requirements.txt      # Dépendances Python
├── videos/               # Dossier de stockage des vidéos uploadées
├── images/               # Dossier de stockage des images uploadées
├── uploads/              # Dossier de stockage des uploads
├── api_uploads/          # Dossier de stockage de l'API externe
├── static/               # Fichiers statiques (CSS, JS, images)
│   ├── css/
│   │   └── style.css     # Styles CSS avec design moderne
│   ├── js/
│   │   ├── script.js     # JavaScript pour interactions
│   │   └── zoom.js       # Fonctionnalité de zoom pour médias
│   └── img/
└── templates/            # Templates HTML
    ├── base.html         # Template de base avec header/footer
    ├── home.html         # Page d'accueil
    ├── video.html        # Page de gestion des vidéos
    ├── image.html        # Page de gestion des images
    ├── information.html   # Page d'informations
    ├── contact.html      # Page de contact
    ├── search.html       # Page de recherche
    ├── header.html       # Header avec navigation
    └── footer.html       # Footer
```

## 🔌 Routes disponibles

### Application principale (app.py)

**Pages :**
- `GET /` : Page d'accueil avec zone de média et barre de recherche
- `GET /video` : Page de gestion des vidéos
- `GET /image` : Page de gestion des images
- `GET /information` : Page d'informations sur l'application
- `GET /contact` : Page de contact
- `GET /search?q=<query>` : Page de recherche

**API :**
- `POST /upload` : Upload d'un fichier (vidéo ou image)
- `GET /videos/<filename>` : Accès à une vidéo spécifique
- `GET /images/<filename>` : Accès à une image spécifique
- `POST /delete/<filename>` : Suppression d'un fichier
- `POST /send-to-api/<filename>` : Envoi d'un média à l'API externe
- `POST /send-query-to-api` : Envoi d'une requête texte à l'API externe

### API externe (external_api.py)

- `POST /process-video` : Traite une vidéo ou une image uploadée et la renvoie
- `POST /process-query` : Traite une requête texte et renvoie une réponse

## 🛠️ Fonctionnalités

### Gestion des médias
- ✅ Upload de vidéos (MP4, AVI, MOV, MKV, WEBM)
- ✅ Upload d'images (JPG, JPEG, PNG, GIF, BMP, WEBP, SVG)
- ✅ Visualisation des médias avec lecteur intégré
- ✅ **Zoom interactif** sur les images et vidéos (boutons +/-, molette souris, double-clic)
- ✅ Suppression de fichiers
- ✅ Drag & drop pour l'upload
- ✅ Envoi à l'API externe pour traitement via bouton "ENVOYER"
- ✅ **Envoi de l'image modifiée** : export automatique et envoi de l'image modifiée avec toutes les annotations
- ✅ **Envoi simultané** : envoi de l'image modifiée et du texte de la barre de recherche en une seule requête
- ✅ Téléchargement des médias traités
- ✅ **Téléchargement local** : sauvegarde de l'image modifiée directement sur l'appareil

### Interface utilisateur
- ✅ Design moderne avec fond doré et motifs
- ✅ Header avec logo "G" et navigation
- ✅ **Barre de recherche globale** disponible sur toutes les pages
- ✅ **Bouton "ENVOYER"** visible dans toutes les barres de recherche pour envoyer les médias à l'API
- ✅ **Microphone** : reconnaissance vocale avec transcription en temps réel dans la barre de recherche
- ✅ **Page d'accueil** avec titre "BIENVENUE SUR CHÂTEAU GOLD" en or et gras
- ✅ **Navigation colorée** : liens en couleur selon la page active (bleu pour Vidéo, vert pour Image, rouge pour Information, orange pour Contact, jaune pour Accueil)
- ✅ **Mise en page optimisée** : tous les éléments visibles sans défilement lors du chargement d'un média
- ✅ Interface responsive (desktop et mobile)
- ✅ Zone média avec bordure bleue (orange sur mobile)
- ✅ Messages de statut (succès, erreur, chargement)
- ✅ Indicateurs visuels pour le microphone actif (animation dorée)

### Page de contact
- ✅ **Formulaire de contact** avec champs Nom, Email et Message
- ✅ **Envoi d'email automatique** vers ricardo.mbesob@ynov.com
- ✅ **Bordures neutres** : champs de formulaire sans bordures colorées au focus
- ✅ Messages de confirmation et d'erreur
- ✅ Validation des champs obligatoires

### Édition d'images
- ✅ **Menu Outils** : menu déroulant accessible depuis la page Image avec un seul clic
- ✅ **Sous-menu Formes** : 7 formes disponibles (carré, carré arrondi, rond, triangle isocèle, triangle isocèle inversé, losange, hexagone)
- ✅ **Sous-menu Lignes** : 3 types de lignes (flèche, courbe, ligne torsadée)
- ✅ **Sous-menu Dessin** : palette de 20 couleurs avec outil feutre pour dessiner sur l'image
- ✅ **Feutre** : outil de dessin avec couleur personnalisable et taille ajustable
- ✅ **Gomme** : outil pour effacer les dessins au feutre sur l'image
- ✅ **Désactivation des outils** : bouton pour désactiver le feutre et la gomme
- ✅ **Ajout de formes** : clic sur une forme pour l'ajouter directement sur l'image au centre de l'écran
- ✅ **Déplacement et redimensionnement** : formes et éléments déplaçables et redimensionnables avec la molette de la souris
- ✅ **Suppression** : clic droit sur un élément pour le supprimer
- ✅ **Bouton Retour** : retour au menu principal depuis tous les sous-menus
- ✅ **Canvas interactif** : édition en temps réel avec Canvas API
- ✅ **Sauvegarde locale** : bouton "Sauvegarder l'image modifiée" pour télécharger l'image modifiée sur l'ordinateur/téléphone
- ✅ **Export automatique** : export automatique de l'image modifiée avant envoi à l'API
- ✅ **Envoi simultané** : envoi de l'image modifiée et du texte de la barre de recherche simultanément à l'API externe via le bouton "ENVOYER"

### Fonctionnalités avancées
- ✅ **Reconnaissance vocale** : transcription en temps réel de la voix dans la barre de recherche
- ✅ Envoi de requêtes texte à l'API externe
- ✅ Traitement automatique des médias
- ✅ Gestion des erreurs et messages utilisateur
- ✅ Navigation intuitive entre les pages

## 📝 Formats supportés

**Vidéos :** MP4, AVI, MOV, MKV, WEBM

**Images :** JPG, JPEG, PNG, GIF, BMP, WEBP, SVG

## 🎨 Design

L'application dispose d'un design moderne et professionnel :
- Header sombre avec logo "G" dans un carré jaune
- Fond avec motifs dorés subtils
- Zone média avec coins arrondis et bordures colorées
- Barre de recherche intégrée avec icônes
- Design responsive adapté aux mobiles

## 🔒 Sécurité

⚠️ **Important pour la production** :
- Désactiver le mode debug (`debug=False`)
- Configurer un serveur WSGI (comme Gunicorn)
- Ajouter une authentification si nécessaire
- Limiter la taille des fichiers uploadés
- Implémenter une validation plus stricte des fichiers
- Utiliser HTTPS en production
- Configurer CORS si nécessaire

## 📦 Dépendances

Les dépendances principales sont listées dans `requirements.txt` :
- Flask 3.1.2
- Werkzeug 3.1.3
- requests 2.31.0
- Flask-Mail 0.10.0 (pour l'envoi d'emails)
- Jinja2 3.1.6
- Et autres dépendances Flask

## 🚀 Démarrage rapide

1. Installer les dépendances : `pip install -r requirements.txt`
2. (Optionnel) Configurer l'envoi d'email :
   - Définir les variables d'environnement `MAIL_USERNAME` et `MAIL_PASSWORD`
   - Pour Gmail, utiliser un [mot de passe d'application](https://support.google.com/accounts/answer/185833)
3. Lancer l'application : `python app.py`
4. (Optionnel) Lancer l'API externe : `python external_api.py`
5. Ouvrir `http://localhost:5000` dans votre navigateur

## 📄 Licence

Ce projet est fourni tel quel, sans garantie.

## 👤 Auteur

Projet développé dans le cadre de YDays.

## 🔄 Changelog

### Version 2.6
- ✨ **Feutre et Gomme** : outils de dessin et d'effacement pour modifier l'image
- ✨ **Bouton "Sauvegarder l'image modifiée"** : téléchargement de l'image modifiée sur l'ordinateur/téléphone
- ✨ **Export automatique** : export automatique de l'image modifiée avant envoi à l'API
- ✨ **Envoi simultané** : envoi de l'image modifiée et du texte de la barre de recherche simultanément à l'API externe
- ✨ **Désactivation des outils** : bouton pour désactiver le feutre et la gomme après utilisation
- ✨ **Amélioration du menu Outils** : ouverture avec un seul clic (plus besoin de maintenir)
- ✨ **Gestion améliorée** : meilleure détection de l'image modifiée et messages de statut plus clairs
- 🐛 **Corrections** : résolution des problèmes de détection de l'image modifiée lors de l'envoi à l'API

### Version 2.5
- ✨ **Menu Outils d'édition** : menu déroulant accessible depuis la page Image
- ✨ **Sous-menu Formes** : 7 formes disponibles (carré, carré arrondi, rond, triangle isocèle, triangle isocèle inversé, losange, hexagone)
- ✨ **Sous-menu Lignes** : 3 types de lignes (flèche droite avec flèche, courbe, ligne torsadée/zigzag)
- ✨ **Sous-menu Dessin** : palette de 20 couleurs avec outil feutre pour colorier l'image
- ✨ **Édition interactive** : ajout, déplacement, redimensionnement et suppression d'éléments sur l'image
- ✨ **Canvas API** : édition en temps réel avec Canvas HTML5
- ✨ **Bouton Retour** : navigation entre menu principal et sous-menus
- ✨ **Interface intuitive** : menus déroulants depuis la droite de l'écran avec animations

### Version 2.4
- ✨ **Page de contact améliorée** : envoi d'email automatique vers ricardo.mbesob@ynov.com
- ✨ **Formulaire de contact** avec validation et messages de confirmation
- ✨ **Bordures neutres** : suppression des bordures noires au focus, bordures grises constantes
- ✨ Intégration de Flask-Mail pour l'envoi d'emails
- ✨ Gestion des erreurs d'envoi d'email avec messages utilisateur

### Version 2.3
- ✨ **Navigation colorée** : liens de navigation en couleur selon la page active (bleu pour Vidéo, vert pour Image, rouge pour Information, orange pour Contact)
- ✨ **Mise en page optimisée** : tous les éléments de la page visibles sans défilement lors du chargement d'un média
- ✨ Ajustement automatique de la taille des médias selon la hauteur de la fenêtre
- ✨ Réduction des espacements pour une meilleure utilisation de l'espace écran

### Version 2.2
- ✨ **Reconnaissance vocale** : transcription en temps réel de la voix dans la barre de recherche
- ✨ **Microphone interactif** : activation/désactivation par clic, indicateurs visuels (animation dorée)
- ✨ Support de la Web Speech API pour la dictée vocale
- ✨ Transcription continue avec résultats intermédiaires et finaux
- ✨ Gestion des erreurs et permissions microphone

### Version 2.1
- ✨ **Fonctionnalité de zoom** pour images et vidéos (boutons +/-, molette souris, double-clic)
- ✨ **Bouton "ENVOYER"** visible sur toutes les barres de recherche
- ✨ **Barre de recherche globale** disponible sur toutes les pages
- ✨ **Page d'accueil** simplifiée avec titre "BIENVENUE SUR CHÂTEAU GOLD"
- ✨ **Liens de navigation** en jaune et gras sur la page d'accueil
- ✨ Taille d'affichage des médias optimisée
- ✨ Centrage amélioré des médias

### Version 2.0
- ✨ Nouveau design avec interface moderne
- ✨ Support des images en plus des vidéos
- ✨ Barre de recherche globale avec envoi à l'API
- ✨ Pages dédiées (Vidéo, Image, Information, Contact)
- ✨ Envoi de requêtes texte à l'API externe
- ✨ Design responsive amélioré
- ✨ Logo et navigation améliorés

### Version 1.0
- Version initiale avec support vidéo de base
