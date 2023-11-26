const pinataSDK = require("@pinata/sdk");
const fs = require("fs");

const pinataApiKey = `baa15a990fe2a6582396`;
const pinataApiSecret = `7d07dbaf59f3eaed2768df29df1d59153792bc6e8c9d081b500beabad715f950`;
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

const pinFile = async (req, res) => {
  const { name, description, image } = req.body;

  // const buffer = Buffer.from(image, "base64");

  // fs.writeFileSync("new-path.jpeg", buffer);
  // const readableStreamForFile = Readable.from(buffer);

  let base64Image = image.split(";base64,").pop();
  const imageSlice = image.slice(0, 30);

  const extension = imageSlice.includes("jpeg")
    ? "jpeg"
    : imageSlice.includes("png")
    ? "png"
    : imageSlice.includes("svg")
    ? "png"
    : imageSlice.includes("jpg")
    ? "jpg"
    : "";

  console.log(imageSlice);
  console.log(extension);
  // Remove header
  fs.writeFile(
    `image.${extension}`,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );
  const readableStreamForFile = fs.createReadStream(`image.${extension}`);

  try {
    const options = {
      pinataMetadata: {
        name: `File ${extension}: ${name}`,
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    await pinata
      .pinFileToIPFS(readableStreamForFile, options)
      .then(async (result) => {
        const response = await pinMetaData({
          name,
          description,
          image,
          result,
        });
        console.log(response);
        return res
          .status(200)
          .json({ message: "Pinned Json Successfully", result: response });
      })

      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: error });
  }
};

const pinMetaData = async ({ name, description, image, result }) => {
  const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
      {
        trait_type: "Cuteness",
        value: 100,
      },
    ],
  };
  try {
    const options = {
      pinataMetadata: {
        name: name,
      },
    };
    metadataTemplate.name = name;
    metadataTemplate.description = description;
    metadataTemplate.image = `ipfs://${result.IpfsHash}`;

    const response = await pinata.pinJSONToIPFS(metadataTemplate, options);

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  pinFile,
  pinMetaData,
};
