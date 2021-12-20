const express = require('express');
const serverless = require('serverless-http');

const crypto = require('crypto');

const app = express();
const router = express.Router();

var boolean = false
const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
    }
});
fs.writeFileSync("private_key.pem", keyPair.privateKey);
fs.writeFileSync("public_key.pem", keyPair.publicKey);
const data = Buffer.from('{"name":"over-18","format":"basic","signature":"0xC05F1284A4C04043379856AAB4B9210FAC7736B36AFD10FD245E5DD0199281E0"}');
const algorithm = "SHA256";
const data = Buffer.from('{"name":"over-18","format":"basic","signature":"0xC05F1284A4C04043379856AAB4B9210FAC7736B36AFD10FD245E5DD0199281E0"}');
const privateKey = fs.readFileSync("private_key.pem", "utf8");
const publicKey = fs.readFileSync("public_key.pem", "utf8");

const signature = crypto.sign(algorithm, data , privateKey);
console.log(signature.toString('base64'))

const isVerified = crypto.verify(algorithm, data, publicKey, signature);
console.log(`Is signature verified: ${isVerified}`);

function comprovarSignature(req){
    return (req.query.name == "over-18" && req.query.format == "basic" && req.query.signature == "0xC05F1284A4C04043379856AAB4B9210FAC7736B36AFD10FD245E5DD0199281E0" /*&& crypto.verify("SHA256", data, req.query.publicKey, req.query.userSignature)*/)
}

router.get('/get', (req,res) =>{
    res.json({
        "url": "/post-credencial",
        "name": "over-18",
        "format": "basic",
    })
    res.end()
})

router.get('/comprovar-credencial', (req,res) =>{
    if(boolean){
        res.json({
            "boolean":"true"
        })
    }
    else{
        res.json({
            "boolean":"false"
        })  
    }
    boolean = false
    res.end()
})

router.post('/post-credencial', (req,res) =>{
    if(comprovarSignature(req))
        boolean = true
    res.status(201)
    res.end()
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
