import multer from "multer"; //multer use kora hoise file upload er jonno


const storage=multer.memoryStorage();
const singleUpload=multer({storage}).single("file"); //note single("file"), ei file name ta hobe courseController.js e addLecture or createCoure er const file=req.file ei command onujaye
export default singleUpload