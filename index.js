const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const app = express();
const client = new textToSpeech.TextToSpeechClient();

app.use(express.json({ extended: false }));
app.get("/server", function (req, res) {
  console.log("Item recieved");
});

app.post("/server", async (req, res) => {
  try {
    const { texts } = req.body;
    console.log(texts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

(async function () {
  // The text to synthesize
  var text = fs.readFileSync("./txt.txt", "utf8");
  var newArr = text.match(/[^\.]+\./g);

  var charCount = 0;
  var textChunk = "";
  var index = 0;

  for (var n = 0; n < newArr.length; n++) {
    charCount += newArr[n].length;
    textChunk = textChunk + newArr[n];

    console.log(charCount);

    if (charCount > 4600 || n == newArr.length - 1) {
      console.log(textChunk);

      // Construct the request
      const request = {
        input: {
          text: textChunk,
        },
        // Select the language and SSML voice gender (optional)
        voice: {
          languageCode: "en-IN",
          ssmlGender: "FEMALE",
          name: "en-US-Wavenet-B",
        },
        // select the type of audio encoding
        audioConfig: {
          effectsProfileId: ["headphone-class-device"],
          pitch: -2,
          speakingRate: 1.1,
          audioEncoding: "MP3",
        },
      };

      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);

      console.log(response);

      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(
        "User given text" + index + ".mp3",
        response.audioContent,
        "binary"
      );
      console.log("Audio content written to file: output.mp3");

      index++;

      charCount = 0;
      textChunk = "";

      console.log("Playing file: " + fileName);
      playInRealTime &&(index==1)&&player.play('./'+fileName,function(err){
        console.log(err);
      });
    }
  }
})();

app.listen(5000);
