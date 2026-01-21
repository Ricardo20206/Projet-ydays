from flask import Flask, send_file

app = Flask(__name__)

@app.route("/video")
def video():
    return send_file(
        "videos/clean.mp4",
        mimetype="video/mp4",
        as_attachment=False
    )

if __name__ == "__main__":
    app.run(port=5001)
