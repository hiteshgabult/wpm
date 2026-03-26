import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import convertRoutes from './routes/convertRoutes.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// 🔥 FINAL UI
app.get('/', (req, res) => {
  res.send(`
    <html>
    <body style="font-family:Arial;padding:40px;">
      <h1>🚀 Doc → WP FINAL</h1>

      <h3>Google Doc URL</h3>
      <input id="url" style="width:400px;padding:10px;" />
      <button onclick="convertUrl()">Convert URL</button>

      <h3>Upload DOCX</h3>
      <input type="file" id="file"/>
      <button onclick="uploadFile()">Upload</button>

      <br/><br/>
      <button onclick="download()">Download Output</button>

      <h3>Output</h3>
      <textarea id="out" rows="20" cols="100"></textarea>

      <script>
        async function convertUrl(){
          const url = document.getElementById('url').value;

          const res = await fetch('/api/convert-url',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({url})
          });

          const data = await res.json();
          document.getElementById('out').value = data.data || data.error;
        }

        async function uploadFile(){
          const file = document.getElementById('file').files[0];

          const fd = new FormData();
          fd.append('file', file);

          const res = await fetch('/api/upload',{
            method:'POST',
            body: fd
          });

          const data = await res.json();
          document.getElementById('out').value = data.data || data.error;
        }

        function download(){
          window.open('/download');
        }
      </script>
    </body>
    </html>
  `);
});

app.use('/api', convertRoutes);

// ✅ Download
app.get('/download', (req, res) => {
  const filePath = path.resolve('output.html');

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.send("No file generated yet");
  }
});

export default app;