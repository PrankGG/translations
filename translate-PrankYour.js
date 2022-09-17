const googleTranslate = require("google-translate-api-x");
const chalk = require("chalk");
const fs = require("fs");

let lang = process.argv[2];
let langBold = chalk.bold.cyanBright(`[${lang}]`);
let enFile = JSON.parse(fs.readFileSync("./lang/PrankYour/en.json", "utf8"));

(async () => {
  console.log(`${langBold} Starting PrankYour translation...`);
  fs.writeFileSync(
    `./lang/PrankYour/${lang}.json`,
    JSON.stringify(await translate(enFile), null, 2)
  );
  console.log(`${langBold} Finished PrankYour translation!`, enFile);
  async function translate(o) {
    let translated = await googleTranslate(o, { from: "en", to: lang });
    return translated.map((a) => a.text);
  }
})();
