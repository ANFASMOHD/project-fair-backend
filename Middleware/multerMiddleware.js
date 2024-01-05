// import multer

const multer= require('multer')


//storage-diskStorage

const storage =multer.diskStorage({
// it have two keys -first one is destination and the second one is filename.
//destination where the file is stored

destination:(req,file,callback)=>{
    callback(null,'./Uploads')
},
// filname the name
filename:(req,file,callback)=>{

const filename =`image-${Date.now()}-${file.originalname}`
callback(null,filename)
}
})
// filefilter
const fileFilter=(req,file,callback)=>{
    if(file.mimetype ==='image/png'||
       file.mimetype ==='image/jpeg'||
         file.mimetype==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Error png,jpeg,jpg files will be allowed !!"))
    }
}



// create multerconfiguration

const multerConfig = multer({
    storage,
    fileFilter
})


// export multer

module.exports=multerConfig