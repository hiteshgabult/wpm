import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import convertRoutes from './routes/convertRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FINAL UI
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
    <button onclick="convertFile()">Convert File</button>

    <p id="filename"></p>

    <br/>
    <button onclick="download()">Download Output</button>

    <h3>Output</h3>
    <textarea id="out" rows="20" cols="100"></textarea>

    <script>
      const fileInput = document.getElementById('file');

      // ✅ show file name
      fileInput.addEventListener('change', () => {
        document.getElementById('filename').innerText =
          fileInput.files[0]?.name || '';
      });

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

      async function convertFile(){
        const file = fileInput.files[0];

        if(!file){
          document.getElementById('out').value = "Please select file";
          return;
        }

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

// download
app.get('/download', (req, res) => {
  const filePath = path.resolve('output.html');

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.send("No file generated yet");
  }
});

export default app;