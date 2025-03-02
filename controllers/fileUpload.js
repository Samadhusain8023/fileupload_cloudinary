const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.samad;//file ka name samad hai j ki postman me body me for-data me key me likha hai
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion add file to the path
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

// localfileupload khatam ho gy hai


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// // file jo upload krna hai folder name cloudinary pr jisme upload hogi or quality optional hai ki agr image ki quality reduse krna ho upload se phle to
// async function uploadFileToCloudinary(file, folder, quality) {
//     // optiona name ka object -> { folder: 'Codehelp' }
//     // { } iski vjh se object bn rha hai nhi to direct me ek variable bangta
//     // console.log("folder=>", folder );
//     const options ={ folder } ;//option name ka object banaya hai same folder name ka hi
//     console.log("optiona name ka object ->",options);
//     // console.log("folder=>",{ folder })
//     console.log("temp file path", file.tempFilePath);//server pr temp me jha file store rhti hai na vo path lane k liye

//     if(quality) {
//         options.quality = quality;
//     }

//     options.resource_type = "auto";  //automatic detect krega file type image hai ya video ya or kuch
//     console.log("optiona name ka object ->",options);
//     // const result = await cloudinary.uploader.upload(file.tempFilePath, options);
//     // console.log("result ye hai beta->",result);
//     // return result;
//     // ye bhi kr sakte hai
//     return await cloudinary.uploader.upload(file.tempFilePath, {
//         folder: folder,
//         quality: quality,
//         resource_type: "auto"
//     });
    
// }

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka hadnler
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log("jo response aaya hai vo->",response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            url:response.secure_url,
        });

        res.json({
            success:true,
            url:response.secure_url,
            message:'Image Successfully Uploaded ho gai beta',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}


//video upload ka handler

exports.videoUpload = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);
        
        const file = req.files.videoFile;

         //Validation
         const supportedTypes = ["mp4", "mov"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("File Type:", fileType);
 
         //TODO: add a upper limit of 5MB for Video
         if(!isFileTypeSupported(fileType, supportedTypes)) {
             return res.status(400).json({
                 success:false,
                 message:'File format not supported',
             })
         }

          //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "salmankhan");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            url:response.secure_url,
        });

        res.json({
            success:true,
            url:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}


// //imageSizeReducer

exports.imageSizeReducer = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //TODO: add a upper limit of 5MB for Video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        //TODO: height attribute-> COMPRESS
        const response = await uploadFileToCloudinary(file, "salmankhan", 30);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            url:response.secure_url,
        });

        res.json({
            success:true,
            url:response.secure_url,
            message:'Image Successfully Uploaded after compresion',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}