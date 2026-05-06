# Corrections des problèmes de sauvegarde pour Vercel

## 🔴 Problèmes identifiés

Vercel utilise un système de fichiers **en lecture seule** sauf pour `/tmp`.
Tous les fichiers sauvegardés en dehors de `/tmp` provoquent l'erreur :
```
OSError: [Errno 30] Read-only file system
```

## ✅ Corrections appliquées

### 1. Base de données utilisateurs
**Avant :** `users.json` (lecture seule sur Vercel)
**Après :** SQLite dans `/tmp/users.db`

**Fichiers modifiés :**
- `database.py` (nouveau) : Gestion SQLite
- `app.py` : Utilisation de `database.py` au lieu de `users.json`

### 2. Upload de fichiers (vidéos/images)
**Avant :** Sauvegarde dans `videos/` et `images/`
**Après :** Sauvegarde dans `/tmp/videos/` et `/tmp/images/` sur Vercel

**Fichiers modifiés :**
- `app.py` : Détection automatique de l'environnement Vercel
  ```python
  if os.environ.get('VERCEL'):
      VIDEO_FOLDER = "/tmp/videos"
      IMAGE_FOLDER = "/tmp/images"
  else:
      VIDEO_FOLDER = "videos"
      IMAGE_FOLDER = "images"
  ```

### 3. API externe
**Avant :** Sauvegarde dans `api_uploads/`
**Après :** Sauvegarde dans `/tmp/api_uploads/` sur Vercel

**Fichiers modifiés :**
- `external_api.py` : Détection automatique de l'environnement Vercel

### 4. Fichiers traités par l'API
**Avant :** Sauvegarde dans `videos/` ou `images/`
**Après :** Utilise automatiquement `/tmp/videos/` ou `/tmp/images/` sur Vercel

**Aucune modification nécessaire** : Utilise les variables `VIDEO_FOLDER` et `IMAGE_FOLDER`

### 5. Vidéos Kling AI
**Avant :** Sauvegarde dans `videos/`
**Après :** Utilise automatiquement `/tmp/videos/` sur Vercel

**Aucune modification nécessaire** : Utilise la variable `VIDEO_FOLDER`

## ⚠️ Limitations restantes

### Stockage temporaire
Les fichiers dans `/tmp` sont **temporaires** et seront supprimés :
- Après quelques heures d'inactivité
- Lors des redémarrages du serveur
- Lors des nouveaux déploiements

### Solutions permanentes recommandées

#### Pour les fichiers (images/vidéos)
- **Cloudinary** (gratuit jusqu'à 25 GB)
- **AWS S3** (payant mais fiable)
- **Supabase Storage** (gratuit jusqu'à 1 GB)

#### Pour la base de données
- **Supabase** (PostgreSQL gratuit)
- **PlanetScale** (MySQL gratuit)
- **MongoDB Atlas** (gratuit)

## 🚀 Déploiement

L'application détecte automatiquement si elle tourne sur Vercel grâce à la variable d'environnement `VERCEL` (définie automatiquement par Vercel).

**En local :**
- Utilise `videos/`, `images/`, `api_uploads/`
- Base de données : `/tmp/users.db` (ou configurable via `DATABASE_PATH`)

**Sur Vercel :**
- Utilise `/tmp/videos/`, `/tmp/images/`, `/tmp/api_uploads/`
- Base de données : `/tmp/users.db`

## 📝 Commit

```
fix: Utiliser /tmp pour tous les fichiers sur Vercel

- Remplacer users.json par SQLite dans /tmp
- Détecter automatiquement l'environnement Vercel
- Utiliser /tmp pour videos/, images/ et api_uploads/ sur Vercel
- Conserver les dossiers locaux en développement
- Mettre à jour la documentation
```

## 🧪 Test en local

Pour tester le comportement Vercel en local :

```bash
# Windows
set VERCEL=1
python app.py

# Linux/Mac
export VERCEL=1
python app.py
```

Les fichiers seront sauvegardés dans `/tmp` au lieu des dossiers locaux.
