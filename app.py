from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import os
import requests
from werkzeug.utils import secure_filename

app = Flask(__name__)

VIDEO_FOLDER = "videos"
IMAGE_FOLDER = "images"
os.makedirs(VIDEO_FOLDER, exist_ok=True)
os.makedirs(IMAGE_FOLDER, exist_ok=True)

ALLOWED_VIDEO_EXTENSIONS = {"mp4", "avi", "mov", "mkv", "webm"}
ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"}
ALLOWED_EXTENSIONS = ALLOWED_VIDEO_EXTENSIONS | ALLOWED_IMAGE_EXTENSIONS

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def is_image(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

def is_video(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_VIDEO_EXTENSIONS

@app.route("/")
def index():
    # 🔴 Page toujours vide
    video = request.args.get('video')
    image = request.args.get('image')
    processed_video = request.args.get('processed')
    processed_image = request.args.get('processed_image')
    return render_template("index.html", title="Média", video=video, image=image, processed_video=processed_video, processed_image=processed_image)

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file or not allowed_file(file.filename):
        return redirect(url_for("index"))

    filename = secure_filename(file.filename)
    
    if is_image(filename):
        path = os.path.join(IMAGE_FOLDER, filename)
        file.save(path)
        return render_template("index.html", image=filename, title="Média", processed_video=request.args.get('processed'))
    elif is_video(filename):
        path = os.path.join(VIDEO_FOLDER, filename)
        file.save(path)
        return render_template("index.html", video=filename, title="Média", processed_video=request.args.get('processed'))
    else:
        return redirect(url_for("index"))

@app.route("/videos/<filename>")
def serve_video(filename):
    return send_from_directory(VIDEO_FOLDER, filename)

@app.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

@app.route("/delete/<filename>", methods=["POST"])
def delete_file(filename):
    # Essayer de supprimer depuis les vidéos
    video_path = os.path.join(VIDEO_FOLDER, filename)
    if os.path.exists(video_path):
        os.remove(video_path)
        return jsonify({"status": "deleted"})
    
    # Essayer de supprimer depuis les images
    image_path = os.path.join(IMAGE_FOLDER, filename)
    if os.path.exists(image_path):
        os.remove(image_path)
        return jsonify({"status": "deleted"})
    
    return jsonify({"error": "Fichier non trouvé"}), 404

@app.route("/send-to-api/<filename>", methods=["POST"])
def send_to_api(filename):
    """Route proxy pour envoyer une vidéo ou une image à l'API externe de traitement"""
    try:
        # Vérifier si c'est une image ou une vidéo
        is_img = is_image(filename)
        is_vid = is_video(filename)
        
        if is_img:
            file_path = os.path.join(IMAGE_FOLDER, filename)
            folder = IMAGE_FOLDER
            mime_type = f"image/{filename.rsplit('.', 1)[1].lower()}"
            if mime_type == "image/jpg":
                mime_type = "image/jpeg"
        elif is_vid:
            file_path = os.path.join(VIDEO_FOLDER, filename)
            folder = VIDEO_FOLDER
            mime_type = "video/mp4"
        else:
            return jsonify({"error": "Type de fichier non supporté"}), 400
        
        if not os.path.exists(file_path):
            return jsonify({"error": "Fichier non trouvé"}), 404
        
        # Envoyer le fichier à l'API externe
        with open(file_path, 'rb') as media_file:
            files = {'file': (filename, media_file, mime_type)}
            response = requests.post('http://localhost:5001/process-video', files=files, timeout=300)
        
        if response.status_code == 200:
            # Sauvegarder le fichier traité
            processed_filename = f"processed_{filename}"
            processed_path = os.path.join(folder, processed_filename)
            with open(processed_path, 'wb') as f:
                f.write(response.content)
            
            if is_img:
                return jsonify({
                    "status": "success",
                    "message": "Image traitée avec succès",
                    "processed_image": processed_filename
                })
            else:
                return jsonify({
                    "status": "success",
                    "message": "Vidéo traitée avec succès",
                    "processed_video": processed_filename
                })
        else:
            return jsonify({"error": f"Erreur API: {response.status_code}"}), response.status_code
            
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Impossible de se connecter à l'API externe. Assurez-vous qu'elle est démarrée sur le port 5001."}), 503
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
