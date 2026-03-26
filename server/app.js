import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import convertRoutes from './routes/convertRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
  <style>
  body { font-family: Arial; background:#f5f5f5; }
  .container { max-width:900px;margin:auto;background:white;padding:20px;border-radius:10px; }
  input,button,textarea { padding:10px;margin:5px 0;width:100%; }
  button { background:#007bff;color:white;border:none;cursor:pointer; }
  textarea { height:200px; }
  </style>
  </head>

  <body>
  <div class="container">
    <h1>🚀 Doc → WP FINAL</h1>

    <h3>Google Doc URL</h3>
    <input id="url"/>
    <button onclick="convertUrl()">Convert URL</button>

    <h3>Upload DOCX</h3>
    <input type="file" id="file"/>
    <button onclick="convertFile()">Convert File</button>

    <h3>Paste Content</h3>
    <textarea id="paste"></textarea>
    <button onclick="convertPaste()">Convert Paste</button>

    <button onclick="download()">⬇ Download Output</button>

    <h3>Output</h3>
    <textarea id="out"></textarea>

    <h3>History</h3>
    <ul id="history"></ul>
  </div>

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
  loadHistory();
}

async function convertFile(){
  const file = document.getElementById('file').files[0];

  if(!file){
    alert("Select file first");
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
  loadHistory();
}

async function convertPaste(){
  const content = document.getElementById('paste').value;

  const res = await fetch('/api/paste',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({content})
  });

  const data = await res.json();
  document.getElementById('out').value = data.data || data.error;
  loadHistory();
}

function download(){
  window.open('/download');
}

async function loadHistory(){
  const res = await fetch('/api/history');
  const data = await res.json();

  const list = document.getElementById('history');
  list.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item.date + " | " + item.type + " | size: " + item.size;
    list.appendChild(li);
  });
}

loadHistory();
</script>

  </body>
  </html>
  `);
});

app.use('/api', convertRoutes);

// download
app.get('/download', (req, res) => {
  const filePath = path.join(process.cwd(), 'output.html');

  if (!fs.existsSync(filePath)) {
    return res.send("No output generated");
  }

  res.download(filePath, 'wp-output.html');
});

export default app;