import axios from 'axios';
export const fetchGoogleDoc = async (url)=>{
 const match = url.match(/[-\w]{25,}/);
 if(!match) throw new Error("Invalid URL");
 const id = match[0];
 const res = await axios.get(`https://docs.google.com/document/d/${id}/export?format=html`);
 return res.data;
};
