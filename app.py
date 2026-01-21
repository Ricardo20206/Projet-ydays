import os
from flask import Flask, render_template, request, redirect, url_for, send_from_directory

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        files = request.files.getlist("videos")

        for file in files:
            if file.filename:
                file.save(os.path.join(UPLOAD_FOLDER, file.filename))

        return redirect(url_for("index"))

    videos = os.listdir(UPLOAD_FOLDER)
    return render_template("index.html", videos=videos)

@app.route("/video/<filename>")
def video(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, mimetype="video/mp4")

if __name__ == "__main__":
    app.run(debug=True)
