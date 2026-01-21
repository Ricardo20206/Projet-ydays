from flask import Flask, request, send_file
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "api_uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/process-video", methods=["POST"])
def process_video():
    video = request.files.get("file")
    if not video:
        return {"error": "Aucune vidéo reçue"}, 400

    filename = secure_filename(video.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    video.save(path)

    # 👉 Ici normalement : traitement vidéo (IA, compression, etc.)
    # Pour la démo : on renvoie la même vidéo

    return send_file(
        path,
        mimetype="video/mp4",
        as_attachment=True,
        download_name="processed_" + filename
    )

if __name__ == "__main__":
    app.run(port=5001, debug=True)
