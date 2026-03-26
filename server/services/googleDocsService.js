import axios from 'axios';

export const fetchGoogleDoc = async (url) => {
  try {
    // ✅ Proper doc ID extract
    const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);

    if (!match || !match[1]) {
      throw new Error("Invalid Google Doc URL");
    }

    const docId = match[1];

    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;

    const res = await axios.get(exportUrl);

    return res.data;

  } catch (err) {
    throw new Error("Google Doc fetch failed (Make sure doc is public)");
  }
};