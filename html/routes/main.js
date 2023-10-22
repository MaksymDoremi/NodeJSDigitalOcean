import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(function(req,res,next){
	console.log(req.url, "@", Date.now());
	next();
});

router
	.route("/")
	.get((req, res) => {
	
		const filePath = path.join(__dirname, '../registration.html');
        res.sendFile(filePath);
	})
	.post((req, res) => {
		res.send("post hello")
	});

export default router;