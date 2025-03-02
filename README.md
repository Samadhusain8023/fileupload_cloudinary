File Upload and Optimization with Express and Cloudinary
This project provides an efficient file upload system using Express.js. It allows users to upload files to a local server, while images and videos are uploaded to Cloudinary. Additionally, images are optimized (compressed) before being uploaded to Cloudinary, ensuring better performance and reduced storage costs.

Features
📂 Upload Files to Local Server: Supports general file uploads (e.g., PDFs, text files, etc.).
🖼️ Upload Images to Cloudinary: Automatically compresses images before uploading.
🎥 Upload Videos to Cloudinary: Directly uploads videos without compression.
🔧 Image Optimization: Reduces image size using Sharp before uploading to Cloudinary.
🖥️ RESTful API: Provides endpoints for uploading and managing files.
🔒 Error Handling & Validations: Ensures only supported file formats are uploaded.
Tech Stack
Backend: Node.js, Express.js
Cloud Storage: Cloudinary
Image Compression: Sharp
File Handling: Multer
Environment Variables: dotenv
