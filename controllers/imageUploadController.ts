import Image from "../models/image";
import fs from "fs";

export const uploadFiles = async (req: any, res: any) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(__dirname + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image: any) => {
      fs.writeFileSync(__dirname + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

