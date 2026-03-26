import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import convertRoutes from './routes/convertRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FRONTEND UI
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Doc to WP PRO</title>
    </head>
    <body style="font-family: Arial; padding:40px;">
      <h1>🚀 Doc → WordPress Converter (PRO)</h1>

      <input id="url" type="text" placeholder="Paste Google Doc URL" style="width:400px;padding:10px;" />
      <button onclick="convert()">Convert</button>
      <button onclick="download()">Download</button>

      <h3>Output:</h3>
      <textarea id="output" rows="20" cols="100"></textarea>

      <script>
        async function convert(){
          const url = document.getElementById('url').value;

          const res = await fetch('/api/convert',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({url})
          });

          const data = await res.json();
          document.getElementById('output').value = data.data;
        }

        function download(){
          window.open('/download');
        }
      </script>
    </body>
    </html>
  `);
});

// API
app.use('/api/convert', convertRoutes);

// ✅ Download endpoint
app.get('/download', (req, res) => {
  const filePath = path.resolve('output.html');
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.send("No file generated yet");
  }
});

export default app;