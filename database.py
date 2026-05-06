import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash

# Utiliser /tmp sur Vercel (accessible en écriture)
DB_PATH = os.environ.get('DATABASE_PATH', '/tmp/users.db')

def init_db():
    """Initialise la base de données SQLite"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def get_user(username):
    """Récupère un utilisateur par son nom"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT username, email, password FROM users WHERE username = ?', (username,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {'username': row[0], 'email': row[1], 'password': row[2]}
    return None

def get_user_by_email(email):
    """Récupère un utilisateur par son email"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT username, email, password FROM users WHERE email = ?', (email,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {'username': row[0], 'email': row[1], 'password': row[2]}
    return None

def create_user(username, email, password):
    """Crée un nouvel utilisateur"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    hashed_password = generate_password_hash(password)
    try:
        cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                      (username, email, hashed_password))
        conn.commit()
        conn.close()
        return True
    except sqlite3.IntegrityError:
        conn.close()
        return False

def verify_user(username, password):
    """Vérifie les identifiants d'un utilisateur"""
    user = get_user(username)
    if user and check_password_hash(user['password'], password):
        return True
    return False
