const googleTranslate = require("google-translate-api-x");
const chalk = require("chalk");
const fs = require("fs");

let lang = process.argv[2];
let langBold = chalk.bold.cyanBright(`[${lang}]`);
let enFile = JSON.parse(fs.readFileSync("./lang/en.json", "utf8"));
let overwrite = fs.existsSync(`./overwrite/${lang}.json`)
  ? JSON.parse(fs.readFileSync(`./overwrite/${lang}.json`, "utf8"))
  : {};

(async () => {
  //console.log(`${langBold} Starting translation...`);
  await translate(enFile);
  fs.writeFileSync(`./lang/${lang}.json`, JSON.stringify(enFile, null, 2));
  //console.log(`${langBold} Finished translation!`);
  async function translate(o) {
    let translated = await googleTranslate(o, { from: "en", to: lang });
    Object.keys(translated).forEach((u) => {
      let value = translated[u].text;
      if (overwrite[u]) {
        value = overwrite[u];
      }
      console.log(
        `${langBold} Translated ${u} (${chalk.yellowBright(
          enFile[u]
        )}) to ${chalk.bold.yellowBright(value)}`
      );
      enFile[u] = value;
    });
    return;
  }
})();
