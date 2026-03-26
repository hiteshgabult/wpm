import fs from 'fs';
import mammoth from 'mammoth';
import { fetchGoogleDoc } from '../services/googleDocsService.js';
import { cleanHTML } from '../services/htmlCleaner.js';
import { formatToWP } from '../services/wpFormatter.js';

// 🔥 HISTORY STORAGE
let history = [];

export const getHistory = (req, res) => {
  res.json(history);
};

export const convertUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const raw = await fetchGoogleDoc(url);
    const clean = cleanHTML(raw);
    const wp = formatToWP(clean);

    fs.writeFileSync('output.html', wp);

    // ✅ add history
    history.unshift({
      date: new Date().toLocaleString(),
      size: wp.length,
      type: 'URL'
    });

    res.json({ data: wp });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const uploadDoc = async (req, res) => {
  try {
    const result = await mammoth.convertToHtml({ path: req.file.path });

    const clean = cleanHTML(result.value);
    const wp = formatToWP(clean);

    fs.writeFileSync('output.html', wp);

    // ✅ add history
    history.unshift({
      date: new Date().toLocaleString(),
      size: wp.length,
      type: 'FILE'
    });

    res.json({ data: wp });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};