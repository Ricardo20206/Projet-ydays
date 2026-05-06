# Déploiement sur Vercel - GOLD FX

## Prérequis

- Compte Vercel (gratuit)
- Git installé
- Projet poussé sur GitHub/GitLab/Bitbucket

## Étapes de déploiement

### 1. Préparer le projet

Le projet est déjà configuré avec :
- `vercel.json` : Configuration Vercel
- `.vercelignore` : Fichiers à exclure
- `.env.example` : Variables d'environnement à configurer

### 2. Installer Vercel CLI (optionnel)

```bash
npm install -g vercel
```

### 3. Déployer via Vercel Dashboard (recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub/GitLab/Bitbucket
3. Cliquez sur "New Project"
4. Importez votre repository
5. Configurez les variables d'environnement (voir section ci-dessous)
6. Cliquez sur "Deploy"

### 4. Déployer via CLI

```bash
cd "projet ydays"
vercel
```

Suivez les instructions interactives.

## Configuration des variables d'environnement

Dans le dashboard Vercel, allez dans **Settings > Environment Variables** et ajoutez :

### Variables obligatoires

- `SECRET_KEY` : Clé secrète Flask (générez-en une aléatoire)
  ```
  python -c "import secrets; print(secrets.token_hex(32))"
  ```

### Variables optionnelles (Email)

- `MAIL_USERNAME` : Votre email Gmail
- `MAIL_PASSWORD` : Mot de passe d'application Gmail
  - Créez un mot de passe d'application : https://support.google.com/accounts/answer/185833

### Variables optionnelles (Kling AI)

- `KLING_API_KEY` : Votre clé API Kling
- `KLING_API_URL` : URL de l'API Kling (par défaut : https://api.klingai.com)
- `PUBLIC_BASE_URL` : URL publique de votre app (ex: https://your-app.vercel.app)

### Variables optionnelles (API externe)

- `API_BASE_URL` : URL de votre API externe (si vous en avez une)

## Limitations Vercel

⚠️ **Important** : Vercel a des limitations pour les applications Flask :

1. **Pas de stockage persistant** : Les fichiers uploadés (images/vidéos) seront perdus après chaque déploiement
   - Solution : Utilisez un service de stockage cloud (AWS S3, Cloudinary, etc.)

2. **Pas de FFmpeg** : La conversion WebM → MP4 ne fonctionnera pas
   - Solution : Utilisez un service externe de conversion vidéo

3. **Timeout de 10 secondes** (plan gratuit) : Les requêtes longues seront interrompues
   - Solution : Passez au plan Pro ou utilisez des workers asynchrones

4. **Pas de base de données** : Le fichier `users.json` sera réinitialisé
   - Solution : Utilisez une base de données externe (PostgreSQL, MongoDB, etc.)

## Solutions recommandées pour la production

### Stockage des fichiers

Utilisez **Cloudinary** (gratuit jusqu'à 25 GB) :

```bash
pip install cloudinary
```

### Base de données

Utilisez **Supabase** ou **PlanetScale** (gratuit) :

```bash
pip install psycopg2-binary  # PostgreSQL
```

### Conversion vidéo

Utilisez **Cloudinary Video API** ou **AWS Lambda** avec FFmpeg layer.

## Structure des fichiers pour Vercel

```
projet ydays/
├── app.py                 # Application Flask principale
├── vercel.json           # Configuration Vercel
├── .vercelignore         # Fichiers à exclure
├── requirements.txt      # Dépendances Python
├── .env.example          # Exemple de variables d'environnement
├── static/               # Fichiers statiques (CSS, JS, images)
├── templates/            # Templates HTML
├── videos/               # ⚠️ Non persistant sur Vercel
├── images/               # ⚠️ Non persistant sur Vercel
└── users.json            # ⚠️ Non persistant sur Vercel
```

## Commandes utiles

### Déploiement en production

```bash
vercel --prod
```

### Voir les logs

```bash
vercel logs
```

### Lister les déploiements

```bash
vercel ls
```

### Supprimer un déploiement

```bash
vercel rm [deployment-url]
```

## Dépannage

### Erreur "Module not found"

Vérifiez que toutes les dépendances sont dans `requirements.txt` :

```bash
pip freeze > requirements.txt
```

### Erreur de timeout

Réduisez la durée des opérations ou passez au plan Pro.

### Fichiers non trouvés

Vérifiez que les fichiers ne sont pas dans `.vercelignore`.

## Support

Pour plus d'informations :
- Documentation Vercel : https://vercel.com/docs
- Documentation Flask : https://flask.palletsprojects.com/
- Support Vercel : https://vercel.com/support

## Auteur

Projet développé dans le cadre de YDays.
