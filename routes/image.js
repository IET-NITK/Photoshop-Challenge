var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var Submission = require('../models/allschema').submission;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.PNG');
    }
})

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)) {
        return cb(new Error('Only Image file'), false);
    }
    return cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter });

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/images/default.PNG'));
})

router.get('/:id', async (req, res, next) => {
    var sub = await Submission.findOne({ userid: req.params.id });
    var exists = 0;

    if (sub)
        if(sub.name.length)
            if (fs.existsSync(path.join(__dirname, '../public/images', sub.name[sub.name.length-1]))) {
                res.sendFile(path.join(__dirname, '../public/images', sub.name[sub.name.length-1]));
                exists = 1;
            }
            
    if(exists == 0) {
        res.sendFile(path.join(__dirname, '../public/images/default.PNG'));
    }
})

router.post('/', upload.single('imageFile'), async (req, res, next) => {
    try{
        var sub = await Submission.findOne({userid : req.body.id});
        if(!sub)
            await Submission.create({userid : require.body.id, name : [req.file.filename]})
        else{
            sub.name.push(req.file.filename)
            await sub.save()
        }
        res.render('index', { message: "Successful submission" })
    }
    catch(e){

    }
})

module.exports = router;
