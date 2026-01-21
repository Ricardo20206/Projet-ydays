from flask import Flask, request, send_file
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "api_uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/process-video", methods=["POST"])
def process_video():
    file = request.files.get("file")
    if not file:
        return {"error": "Aucun fichier reçu"}, 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    # 👉 Ici normalement : traitement vidéo/image (IA, compression, etc.)
    # Pour la démo : on renvoie le même fichier
    
    # Détecter le type de fichier
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
    if ext in ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']:
        mimetype = f"image/{ext}" if ext != 'jpg' else "image/jpeg"
    elif ext in ['mp4', 'avi', 'mov', 'mkv', 'webm']:
        mimetype = "video/mp4"
    else:
        mimetype = "application/octet-stream"

    return send_file(
        path,
        mimetype=mimetype,
        as_attachment=True,
        download_name="processed_" + filename
    )

if __name__ == "__main__":
    app.run(port=5001, debug=True)
