# Build media-editor.js from image.html script blocks (image + video support)
import re

with open('templates/image.html', 'r', encoding='utf-8') as f:
    content = f.read()

start1 = content.find('<script>') + len('<script>')
end1 = content.find('</script>', start1)
script1 = content[start1:end1].strip()

start2 = content.find('<script>', end1) + len('<script>')
end2 = content.find('</script>', start2)
script2 = content[start2:end2].strip()

helper = """
function getMediaEl() { return document.getElementById('editableImage') || document.getElementById('editableVideo'); }
function isMediaReady(el) { if (!el) return false; if (el.tagName === 'IMG') return el.complete && el.naturalWidth > 0; return el.readyState >= 2 && el.videoWidth > 0; }
function getMediaNaturalSize(el) { if (el.tagName === 'IMG') return { w: el.naturalWidth, h: el.naturalHeight }; return { w: el.videoWidth, h: el.videoHeight }; }
"""

script1 = re.sub(r"document\.getElementById\s*\(\s*['\"]editableImage['\"]\s*\)", 'getMediaEl()', script1)
script2 = re.sub(r"document\.getElementById\s*\(\s*['\"]editableImage['\"]\s*\)", 'getMediaEl()', script2)

script2 = re.sub(r'!imageElement\.complete\s*\|\|\s*imageElement\.naturalWidth\s*===\s*0(?:\s*\|\|\s*imageElement\.naturalHeight\s*===\s*0)?', '!isMediaReady(imageElement)', script2)
script2 = re.sub(r'imageElement\.complete\s*&&\s*imageElement\.naturalWidth\s*===\s*0', '!isMediaReady(imageElement)', script2)
script2 = re.sub(r'!imageElement\.complete\s*\|\|\s*imageElement\.naturalWidth\s*===\s*0', '!isMediaReady(imageElement)', script2)

# Export canvas size
script2 = re.sub(
    r"exportCanvas\.width\s*=\s*imageElement\.naturalWidth;\s*\n\s*exportCanvas\.height\s*=\s*imageElement\.naturalHeight;",
    "var _ns = getMediaNaturalSize(imageElement); exportCanvas.width = _ns.w; exportCanvas.height = _ns.h;",
    script2
)
script2 = script2.replace('imageElement.naturalWidth', 'getMediaNaturalSize(imageElement).w')
script2 = script2.replace('imageElement.naturalHeight', 'getMediaNaturalSize(imageElement).h')

combined = helper + "\n\n" + script1 + "\n\n" + script2
with open('static/js/media-editor.js', 'w', encoding='utf-8') as out:
    out.write(combined)
print('media-editor.js created, length:', len(combined))
