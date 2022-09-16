const googleTranslate = require("@vitalets/google-translate-api");
const chalk = require("chalk");
const fs = require("fs");

let lang = process.argv[2];
let langBold = chalk.bold.cyanBright(`[${lang}]`);
let enFile = JSON.parse(fs.readFileSync("./lang/en.json", "utf8"));
let overwrite = fs.existsSync(`./overwrite/${lang}.overwrite.json`)
  ? JSON.parse(fs.readFileSync(`./overwrite/${lang}.overwrite.json`, "utf8"))
  : {};

(async () => {
  console.log(`${langBold} Starting translation...`);
  await Promise.all(
    Object.keys(enFile).map(async (o) => {
      await translate(o);
    })
  );
  fs.writeFileSync(`./lang/${lang}.json`, JSON.stringify(enFile, null, 2));
  console.log(`${langBold} Finished translation!`);
  async function translate(o) {
    let value = enFile[o];

    if (overwrite.hasOwnProperty(o)) {
      enFile[o] = overwrite[o];
      return;
    }

    let translated = await googleTranslate(value, { from: "en", to: lang });
    console.log(
      `${langBold} Translated ${o} (${chalk.yellowBright(
        value
      )}) to ${chalk.bold.yellowBright(translated.text)}`
    );
    enFile[o] = translated.text;
    return;
  }
})();
