import multer from 'multer';

// stores the image in the memory as buffer 
const Storage = multer.memoryStorage();

// only accepts the image files (jpeg, jpg,png)
const fileFilter = (req, file , cb) =>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error("Only images file are allowed"), false);
    }
}

 const upload = multer({
    storage: Storage,
    fileFilter,
    limits:{
        fileSize: 2 * 1024 * 1024 , // 2 MB
    }
})

export default upload;
