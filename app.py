from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

VIDEO_FOLDER = "videos"
os.makedirs(VIDEO_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"mp4", "avi", "mov", "mkv", "webm"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def index():
    # 🔴 Page toujours vide
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_video():
    file = request.files.get("video")
    if not file or not allowed_file(file.filename):
        return redirect(url_for("index"))

    filename = secure_filename(file.filename)
    path = os.path.join(VIDEO_FOLDER, filename)
    file.save(path)

    return render_template("index.html", video=filename)

@app.route("/videos/<filename>")
def serve_video(filename):
    return send_from_directory(VIDEO_FOLDER, filename)

@app.route("/delete/<filename>", methods=["POST"])
def delete_video(filename):
    path = os.path.join(VIDEO_FOLDER, filename)
    if os.path.exists(path):
        os.remove(path)
    return jsonify({"status": "deleted"})

if __name__ == "__main__":
    app.run(debug=True)
