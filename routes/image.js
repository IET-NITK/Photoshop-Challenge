var express = require('express');
var router = express.Router();

var storage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb(null,'public/images');
    }, 
    filename:  (req, file, cb)=>{
        cb(null, req.user.username+'.PNG');
    }
})

var imageFileFilter = (req, file, cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)){
        return cb(new Error('Only Image file'), false);
    }
    return cb(null, true);
};

var upload =  multer({storage: storage, fileFilter: imageFileFilter});

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../public/images/default.PNG'));
})

router.get('/:id',(req,res,next)=>{
    if(fs.existsSync(path.join(__dirname, '../public/images',req.params.id))){
        res.sendFile(path.join(__dirname, '../public/images',req.params.id));
    }
    else{
        res.sendFile(path.join(__dirname, '../public/images/default.PNG'));
    }
})

router.post('/', upload.single('imageFile'), (req, res, next)=>{
	res.render('index', {message : "Successful submission"})
})

module.exports = router;
