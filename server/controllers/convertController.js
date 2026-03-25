import fs from 'fs';
import path from 'path';
import { fetchGoogleDoc } from '../services/googleDocsService.js';
import { cleanHTML } from '../services/htmlCleaner.js';
import { formatToWP } from '../services/wpFormatter.js';

export const convertDoc = async (req,res)=>{
 try{
  const {url} = req.body;
  const html = await fetchGoogleDoc(url);
  const clean = cleanHTML(html);
  const wp = formatToWP(clean);

  const dir = path.join('src/html');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, 'output.html');
  fs.writeFileSync(filePath, wp);

  res.json({message: "Saved to src/html/output.html"});
 }catch(e){
  res.status(500).json({error:e.message});
 }
};
