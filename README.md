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
- ✅ Envoi à l'API externe pour traitement via bouton "GOLD"
- ✅ Téléchargement des médias traités

### Interface utilisateur
- ✅ Design moderne avec fond doré et motifs
- ✅ Header avec logo "G" et navigation
- ✅ **Barre de recherche globale** disponible sur toutes les pages
- ✅ **Bouton "GOLD"** visible dans toutes les barres de recherche pour envoyer les médias à l'API
- ✅ **Page d'accueil** avec titre "BIENVENUE SUR CHÂTEAU GOLD" en or et gras
- ✅ **Liens de navigation** en jaune et gras sur la page d'accueil
- ✅ Interface responsive (desktop et mobile)
- ✅ Zone média avec bordure bleue (orange sur mobile)
- ✅ Messages de statut (succès, erreur, chargement)

### Fonctionnalités avancées
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
- Jinja2 3.1.6
- Et autres dépendances Flask

## 🚀 Démarrage rapide

1. Installer les dépendances : `pip install -r requirements.txt`
2. Lancer l'application : `python app.py`
3. (Optionnel) Lancer l'API externe : `python external_api.py`
4. Ouvrir `http://localhost:5000` dans votre navigateur

## 📄 Licence

Ce projet est fourni tel quel, sans garantie.

## 👤 Auteur

Projet développé dans le cadre de YDays.

## 🔄 Changelog

### Version 2.1
- ✨ **Fonctionnalité de zoom** pour images et vidéos (boutons +/-, molette souris, double-clic)
- ✨ **Bouton "GOLD"** visible sur toutes les barres de recherche
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
