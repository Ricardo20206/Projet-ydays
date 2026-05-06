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
- **FFmpeg** (optionnel) : pour exporter la vidéo avec annotations en MP4 avec bande-son. Sans FFmpeg, l’enregistrement est téléchargé en WebM.
- **Docker + Docker Compose** (optionnel) : pour lancer l’application sans installer Python/FFmpeg localement.

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

### Lancer avec Docker (recommandé)

Le projet inclut :
- `docker-compose.yml` (2 services : `web` sur 5000 et `api` sur 5001)
- `Dockerfile.web` (inclut **FFmpeg** dans l’image)
- `Dockerfile.api`

1. (Optionnel) Créer un fichier `.env` à la racine pour l’envoi d’emails (page Contact) :

```bash
MAIL_USERNAME=...
MAIL_PASSWORD=...
```

2. Démarrer l’application :

```bash
docker compose up --build
```

3. Accéder à l’app :
- **Web** : `http://localhost:5000`
- **API externe** : `http://localhost:5001`

Les dossiers `images/`, `videos/` et `uploads/` sont montés en volumes dans le conteneur `web` (les fichiers restent sur votre machine).

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

L'application permet d'éditer vos images avec de nombreux outils. **Les objets ajoutés (formes, lignes, texte, dessins) restent fixés à l'image et défilent avec elle** lorsque vous parcourez la page.

1. **Accéder aux outils** : Cliquez sur le bouton "🔧 Outils" sur la page Image
2. **Ajouter des formes** :
   - Cliquez sur "📐 Formes" dans le menu
   - Sélectionnez une forme (carré, rond, triangle, etc.)
   - La forme apparaît au centre de l'image
   - Utilisez la molette de la souris pour redimensionner, ou les poignées en la sélectionnant
   - Cliquez et glissez pour déplacer
3. **Ajouter des lignes** :
   - Cliquez sur "📏 Lignes" puis choisissez un type (flèche, courbe, zigzag)
   - La ligne apparaît au centre de l'image ; déplacez les poignées de début et de fin pour l’ajuster
   - Cliquez et glissez pour déplacer la ligne entière
4. **Ajouter du texte** :
   - Cliquez sur "📝 Texte", saisissez votre texte et réglez la taille, puis cliquez sur l’image pour le placer
5. **Dessiner sur l'image** :
   - Cliquez sur "🖌️ Dessin" dans le menu
   - Choisissez une couleur parmi les 20 disponibles
   - Cliquez sur "🖍️ Feutre" pour activer le dessin
   - Dessinez directement sur l'image avec la souris
   - Utilisez "🧹 Gomme" pour effacer vos dessins
   - Cliquez sur "✋ Désactiver" pour désactiver les outils de dessin
6. **Sauvegarder l'image modifiée** :
   - Cliquez sur "💾 Sauvegarder l'image modifiée" pour télécharger l'image sur votre appareil
   - Le fichier sera nommé avec la date et l'heure pour éviter les écrasements
7. **Envoyer à l'API** :
   - (Optionnel) Saisissez du texte dans la barre de recherche
   - Cliquez sur "ENVOYER" dans la barre intelligente
   - L'image modifiée et le texte seront envoyés simultanément à l'API externe

**Suppression** : Clic droit sur une forme, une ligne ou un texte pour afficher le menu et le supprimer.

### Édition et enregistrement vidéo

Sur la page **Vidéo**, les mêmes outils d’édition que sur l’image sont disponibles (formes, lignes, texte, dessin), plus des **objets 3D**. Les annotations sont dessinées sur un calque au-dessus de la vidéo.

1. **Outils** : Cliquez sur « 🔧 Outils » puis choisissez Formes, Lignes, Dessin ou **Objets 3D** (Cube, Bille, Hexagone 3D). L’hexagone 3D est ajouté en **70×70** pixels ; le cube et la bille en 80×80.
2. **Rotation des objets 3D** : Une fois un objet 3D placé, maintenez **Maj** (Shift) ou **Alt** puis glissez pour le faire tourner et l’observer sous tous les angles. Vous pouvez aussi faire un **clic droit** sur l’objet → « 🔄 Faire tourner », puis glisser pour tourner.
3. **Contrôle vidéo (pause / play)** : Même avec la vidéo à 100 % et des annotations posées, vous pouvez toujours contrôler la lecture :
   - **Clic sur la barre de contrôle** (en bas) : affiche la barre et permet Play/Pause.
   - **Clic sur la zone vidéo** (en dehors de toute annotation) : met en pause ou relance la lecture. Un clic sur une forme, une ligne, un texte ou un objet 3D sert à le sélectionner/déplacer, pas à lancer la vidéo.
4. **Enregistrer la vidéo avec annotations** :
   - Cliquez sur « 🎬 Enregistrer la vidéo avec annotations ».
   - La **vidéo entière** est enregistrée du début à la fin (l’enregistrement ne s’arrête qu’à la fin de la vidéo, pas à la pause).
   - La vidéo se lit avec le son ; toutes les **modifications** (formes, lignes, texte, objets 3D) sont enregistrées. Chaque modification n’apparaît dans la vidéo exportée **qu’à partir de l’instant où vous l’avez ajoutée** ; si vous supprimez un élément, il disparaît à partir de cet instant.
   - Un **badge jaune** affiche le **pourcentage d’avancement** de l’enregistrement (0 % → 100 %).
   - À la fin, le fichier est converti en **MP4** (avec bande-son) si FFmpeg est installé sur le serveur, sinon il est téléchargé en WebM.
5. **Moment d’apparition des annotations** : Les **formes, lignes, texte et objets 3D** n’apparaissent dans la vidéo exportée **qu’à partir du moment où vous les avez ajoutés** ; les éléments supprimés (clic droit → Supprimer) disparaissent à partir de l’instant de suppression. Le dessin au feutre n’est pas inclus dans l’export vidéo.

**Note** : Pour obtenir un fichier MP4 avec le son, installez FFmpeg sur la machine qui exécute le serveur Flask (par ex. `winget install ffmpeg` sous Windows) et ajoutez le dossier `bin` de FFmpeg au PATH.

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
│   │   ├── zoom.js       # Fonctionnalité de zoom pour médias
│   │   └── media-editor.js  # Édition image/vidéo (formes, lignes, dessin, enregistrement)
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
- `POST /api/convert-webm-to-mp4` : Conversion WebM → MP4 (pour l’enregistrement vidéo avec annotations)
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

### Page Vidéo (édition et enregistrement)
- ✅ **Menu Outils** sur la page Vidéo (formes, lignes, dessin, **objets 3D**) comme sur la page Image
- ✅ **Objets 3D** : Cube, Bille et Hexagone 3D ; rotation avec **Maj** ou **Alt** + glisser, ou clic droit → « Faire tourner »
- ✅ **Taille par défaut** : hexagone 3D en 70×70, cube et bille en 80×80
- ✅ **Style des menus Formes/Lignes/Objets 3D** : prévisualisations en bleu foncé et noms en jaune pour une interface cohérente
- ✅ **Zoom vidéo** : le bouton ⟲ réinitialise le zoom et remet la vidéo à 0 (reprise de lecture)
- ✅ **Enregistrement de la vidéo entière** : la vidéo est enregistrée du début à la fin ; l’enregistrement ne s’arrête qu’à la fin de la vidéo (pas à la pause)
- ✅ **Toutes les modifications enregistrées avec timing** : formes, lignes, texte et objets 3D sont inclus ; chaque élément n’apparaît qu’à partir de l’instant où il a été ajouté et disparaît après suppression
- ✅ **Lecture fluide** : capture synchronisée sur la timeline vidéo et débit adapté pour une lecture fluide du fichier exporté
- ✅ **Indicateur de progression** : badge jaune affichant le pourcentage d'avancement (0 % à 100 %) pendant l'enregistrement
- ✅ **Contrôle vidéo** : à 100 %, avec annotations, pause/play possible en cliquant sur la barre de contrôle ou sur la zone vidéo vide (pas sur une annotation)
- ✅ **Lignes et formes stables** : déplacement et redimensionnement sans disparition

### Interface utilisateur
- ✅ Design moderne avec fond doré et motifs
- ✅ Header avec logo **GOLD FX** et navigation (sur toutes les pages)
- ✅ **Barre de recherche globale** disponible sur toutes les pages
- ✅ **Bouton "ENVOYER"** visible dans toutes les barres de recherche pour envoyer les médias à l'API
- ✅ **Microphone** : reconnaissance vocale avec transcription en temps réel dans la barre de recherche (sans duplication des mots dictés)
- ✅ **Page d'accueil** : titre « BIENVENUE SUR GOLD FX » centré au milieu de la page
- ✅ **Logo (toutes pages)** : « GOLD FX » avec **fond noir**, **GOLD** en or et **FX** en blanc
- ✅ **Bouton ENVOYER** : fond vert + texte jaune (sur toutes les pages)
- ✅ **Navigation (header)** : liens en jaune (sur toutes les pages)
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
- ✅ **Sous-menu Lignes** : 3 types de lignes (flèche, courbe, zigzag) ; déplacement et redimensionnement par les poignées début/fin
- ✅ **Sous-menu Texte** : ajout de texte sur l'image avec taille réglable
- ✅ **Sous-menu Dessin** : palette de 20 couleurs avec outil feutre pour dessiner sur l'image
- ✅ **Feutre** : outil de dessin avec couleur personnalisable et taille ajustable
- ✅ **Gomme** : outil pour effacer les dessins au feutre sur l'image
- ✅ **Désactivation des outils** : bouton pour désactiver le feutre et la gomme
- ✅ **Ajout de formes/lignes** : clic pour ajouter au centre de l'image ; formes et lignes déplaçables et redimensionnables (poignées ou molette)
- ✅ **Objets liés à l'image** : le canvas d’édition est calé sur l’image ; formes, lignes, texte et dessins défilent avec l’image lors du défilement de la page
- ✅ **Suppression** : clic droit sur un élément (forme, ligne, texte) pour le supprimer
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
- Header sombre avec logo **GOLD FX** sur fond noir
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
2. (Optionnel) Installer **FFmpeg** pour l’export vidéo en MP4 avec son : par ex. `winget install ffmpeg` (Windows) ou depuis [ffmpeg.org](https://ffmpeg.org/download.html), et ajouter le dossier `bin` au PATH.
3. (Optionnel) Configurer l'envoi d'email :
   - Définir les variables d'environnement `MAIL_USERNAME` et `MAIL_PASSWORD`
   - Pour Gmail, utiliser un [mot de passe d'application](https://support.google.com/accounts/answer/185833)
4. Lancer l'application : `python app.py`
5. (Optionnel) Lancer l'API externe : `python external_api.py`
6. Ouvrir `http://localhost:5000` dans votre navigateur

## 📄 Licence

Ce projet est fourni tel quel, sans garantie.

## 👤 Auteur

Projet développé dans le cadre de YDays.

## 🔄 Changelog

### Version 2.13
- ✨ **Menus vidéo harmonisés** : noms des formes/lignes/objets 3D en jaune, prévisualisations en bleu foncé
- ✨ **Zoom vidéo** : bouton ⟲ de réinitialisation qui remet aussi la vidéo à 0 et relance la lecture
- ✨ **Reconnaissance vocale** : correction de la duplication des mots dictés (ex. “bonjour bonjour”)

### Version 2.12
- ✨ **Accueil** : titre « BIENVENUE SUR GOLD FX » centré, suppression du sous-titre
- ✨ **Logo global** : remplacement du “G” par « GOLD FX » sur toutes les pages (fond noir, GOLD or, FX blanc)
- ✨ **UI globale** : bouton ENVOYER fond vert + texte jaune sur toutes les pages, liens de navigation du header en jaune sur toutes les pages

### Version 2.11
- ✨ **Page d'accueil** : taille de police du titre augmentée (titre > sous-titre)

### Version 2.10
- ✨ **Vidéo entière enregistrée** : l’enregistrement ne s’arrête qu’à la fin de la vidéo (plus à la pause), pour obtenir systématiquement la vidéo complète
- ✨ **Toutes les modifications enregistrées avec timing** : chaque annotation (forme, ligne, texte, objet 3D) n’apparaît dans la vidéo exportée qu’à partir de l’instant où elle a été ajoutée ; les éléments supprimés disparaissent à partir de l’instant de suppression
- ✨ **Lecture fluide** : capture des images synchronisée sur la timeline vidéo et débit vidéo augmenté pour une lecture fluide du fichier enregistré

### Version 2.9
- ✨ **Objets 3D sur la vidéo** : sous-menu « Objets 3D » dans le menu Outils (Cube, Bille, Hexagone 3D)
- ✨ **Rotation 3D** : Maj ou Alt + glisser pour faire tourner un objet 3D ; ou clic droit → « Faire tourner » puis glisser
- ✨ **Taille hexagone 3D** : ajout en 70×70 pixels par défaut (cube et bille en 80×80)
- ✨ **Contrôle vidéo avec annotations** : à 100 %, pause/play possible en cliquant sur la barre de contrôle ou sur la zone vidéo vide (hors annotations)

### Version 2.8
- ✨ **Page Vidéo – Édition** : menu Outils (formes, lignes, dessin) sur la page Vidéo, comme sur la page Image
- ✨ **Enregistrement vidéo avec annotations** : bouton « Enregistrer la vidéo avec annotations » pour exporter la vidéo entière avec les annotations en MP4 (bande-son incluse si FFmpeg est installé) ou WebM
- ✨ **Indicateur de progression** : badge jaune affichant le pourcentage d’avancement pendant l’enregistrement
- ✨ **Annotations avec timing** : les formes, lignes et texte n’apparaissent dans la vidéo exportée qu’à partir du moment où ils ont été ajoutés (pause à un instant, ajout, puis enregistrement)
- ✨ **Contrôles vidéo** : affichage de la barre de contrôle au clic ; Play/Pause utilisables sans déclencher le déplacement des annotations
- ✨ **Conversion WebM → MP4** : route `POST /api/convert-webm-to-mp4` et utilisation de FFmpeg pour fournir un MP4 avec bande-son
- 🐛 **Lignes stables** : les lignes ne disparaissent plus au déplacement ; redessin correct après déplacement et redimensionnement

### Version 2.7
- ✨ **Objets qui défilent avec l'image** : le canvas d’édition est positionné exactement sur l’image ; formes, lignes, texte et dessins restent fixés à l’image et se déplacent avec elle lors du défilement de la page
- ✨ **Coordonnées en espace image** : toutes les annotations sont stockées en coordonnées relatives à l’image pour un comportement cohérent au scroll et au redimensionnement
- ✨ **Sous-menu Texte** : ajout de texte sur l’image avec taille réglable
- 🐛 **Stabilité** : évitement du dépassement de pile (Maximum call stack size exceeded) lors du clic sur une forme ; exécution différée de `redrawCanvas` et `updateCanvasPointerEvents`, garde anti-réentrance sur le clic canvas

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
