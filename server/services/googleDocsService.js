import axios from 'axios';

export const fetchGoogleDoc = async (url) => {
  const match = url.match(/[-\\w]{25,}/);
  if (!match) throw new Error("Invalid Google Doc URL");

  const docId = match[0];

  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;

  const res = await axios.get(exportUrl);
  return res.data;
};