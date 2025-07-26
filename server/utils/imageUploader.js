const { cloudinary } = require("../config/cloudinary");

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    
    if (height) {
        options.height = height;
        options.crop = "scale"; 
    }
    if (quality) {
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    console.log("OPTIONS", options);
    
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};
