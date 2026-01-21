# Projet Flask - Gestion de Vidéos

Application web Flask permettant l'upload, la visualisation et la gestion de vidéos.

## 📋 Description

Ce projet est une application Flask qui permet de :
- Uploader des vidéos (formats supportés : mp4, avi, mov, mkv, webm)
- Visualiser les vidéos uploadées
- Supprimer les vidéos
- Intégrer une API externe pour le traitement de vidéos

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

### API vidéo (optionnelle)

Pour utiliser l'API vidéo qui sert une vidéo spécifique :
```bash
python api_video.py
```

L'API sera accessible sur le port 5001 : `http://localhost:5001/video`

### API externe de traitement (optionnelle)

Pour utiliser l'API externe de traitement de vidéos :
```bash
python external_api.py
```

L'API sera accessible sur le port 5001 : `http://localhost:5001/process-video`

## 📁 Structure du projet

```
projet ydays/
├── app.py                 # Application Flask principale
├── api_video.py          # API simple pour servir une vidéo
├── external_api.py       # API externe de traitement de vidéos
├── requirements.txt      # Dépendances Python
├── videos/               # Dossier de stockage des vidéos uploadées
├── uploads/              # Dossier de stockage des uploads
├── api_uploads/          # Dossier de stockage de l'API externe
├── static/               # Fichiers statiques (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── img/
└── templates/            # Templates HTML
    ├── base.html
    ├── index.html
    ├── contact.html
    ├── home.html
    ├── header.html
    └── footer.html
```

## 🔌 Routes disponibles

### Application principale (app.py)

- `GET /` : Page d'accueil avec formulaire d'upload
- `POST /upload` : Upload d'une vidéo
- `GET /videos/<filename>` : Accès à une vidéo spécifique
- `POST /delete/<filename>` : Suppression d'une vidéo

### API vidéo (api_video.py)

- `GET /video` : Télécharge la vidéo `clean.mp4`

### API externe (external_api.py)

- `POST /process-video` : Traite une vidéo uploadée et la renvoie

## 🛠️ Fonctionnalités

- ✅ Upload de vidéos avec validation des formats
- ✅ Visualisation des vidéos uploadées
- ✅ Suppression de vidéos
- ✅ Interface utilisateur simple et intuitive
- ✅ Sécurisation des noms de fichiers avec `secure_filename`
- ✅ Support de multiples formats vidéo

## 📝 Notes

- Les vidéos sont stockées dans le dossier `videos/`
- Le mode debug est activé par défaut (à désactiver en production)
- Les formats vidéo autorisés sont : mp4, avi, mov, mkv, webm

## 🔒 Sécurité

⚠️ **Important pour la production** :
- Désactiver le mode debug (`debug=False`)
- Configurer un serveur WSGI (comme Gunicorn)
- Ajouter une authentification si nécessaire
- Limiter la taille des fichiers uploadés
- Implémenter une validation plus stricte des fichiers

## 📄 Licence

Ce projet est fourni tel quel, sans garantie.

## 👤 Auteur

Projet développé dans le cadre de YDays.
