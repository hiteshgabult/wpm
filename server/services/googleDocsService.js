import axios from 'axios';

export const fetchGoogleDoc = async (url) => {
  const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);

  if (!match) {
    throw new Error("Invalid Google Doc URL");
  }

  // ✅ FIXED (no backslash, proper template string)
  const exportUrl = `https://docs.google.com/document/d/${match[1]}/export?format=html`;

  const res = await axios.get(exportUrl);

  return res.data;
};