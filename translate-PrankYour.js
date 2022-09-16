const googleTranslate = require("@vitalets/google-translate-api");
const chalk = require("chalk");
const fs = require("fs");

let lang = process.argv[2];
let langBold = chalk.bold.cyanBright(`[${lang}]`);
let enFile = JSON.parse(fs.readFileSync("./lang/PrankYour/en.json", "utf8"));

(async () => {
  console.log(`${langBold} Starting PrankYour translation...`);
  await Promise.all(
    enFile.map(async (word, index) => {
      await translate(word, index);
      //console.log(index, word);
    })
  );
  fs.writeFileSync(`./lang/PrankYour/${lang}.json`, JSON.stringify(enFile));
  console.log(`${langBold} Finished PrankYour translation!`);
  async function translate(value, index) {
    let translated = await googleTranslate(value, { from: "en", to: lang });
    console.log(
      `${langBold} PrankYour Translated ${chalk.yellowBright(
        value
      )} to ${chalk.bold.yellowBright(translated.text)}`
    );
    enFile[index] = translated.text;
    return;
  }
})();
