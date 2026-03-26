import fs from 'fs';
import mammoth from 'mammoth';
import { fetchGoogleDoc } from '../services/googleDocsService.js';
import { cleanHTML } from '../services/htmlCleaner.js';
import { formatToWP } from '../services/wpFormatter.js';

let history = [];

export const getHistory = (req, res) => {
  res.json(history);
};

const process = (html, type) => {
  const clean = cleanHTML(html);
  const wp = formatToWP(clean);

  fs.writeFileSync('output.html', wp);

  history.unshift({
    date: new Date().toLocaleString(),
    size: wp.length,
    type
  });

  return wp;
};

export const convertUrl = async (req, res) => {
  try {
    const raw = await fetchGoogleDoc(req.body.url);
    const wp = process(raw, 'URL');
    res.json({ data: wp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const uploadDoc = async (req, res) => {
  try {
    const result = await mammoth.convertToHtml({ path: req.file.path });
    const wp = process(result.value, 'FILE');
    res.json({ data: wp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const convertPaste = async (req, res) => {
  try {
    const wp = process(req.body.content, 'PASTE');
    res.json({ data: wp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};