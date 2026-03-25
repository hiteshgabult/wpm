import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req,res)=>{
  const {email} = req.body;
  const token = jwt.sign({email}, "secret123");
  res.json({token});
});

export default router;
