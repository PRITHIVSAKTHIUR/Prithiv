import os
from rembg import remove
from PIL import Image
from flask import Flask, request, render_template, send_file
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        output_filename = 'output_image.png'
        output_folder = 'output_images'  # Directory where processed images will be saved
        output_path = os.path.join(output_folder, output_filename)

        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

        uploaded_image = Image.open(uploaded_file)
        processed_image = remove(uploaded_image)
        processed_image.save(output_path)

        return f'<img src="{output_path}" alt="Processed Image"><br><a href="/download">Download Processed Image</a>'

@app.route('/download')
def download():
    output_filename = 'output_image.png'
    output_path = os.path.join('output_images', output_filename)
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
