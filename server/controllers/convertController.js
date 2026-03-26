import fs from 'fs';
import { fetchGoogleDoc } from '../services/googleDocsService.js';
import { cleanHTML } from '../services/htmlCleaner.js';
import { formatToWP } from '../services/wpFormatter.js';

export const convertDoc = async (req, res) => {
  try {
    const { url } = req.body;

    const rawHTML = await fetchGoogleDoc(url);
    const clean = cleanHTML(rawHTML);
    const wp = formatToWP(clean);

    // Save output
    fs.writeFileSync('output.html', wp);

    res.json({ data: wp });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};