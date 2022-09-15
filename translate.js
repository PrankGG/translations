const translate = require("@vitalets/google-translate-api");
const fs = require("fs");

let lang = process.argv[2];
let enFile = JSON.parse(fs.readFileSync("./lang/en.json", "utf8"));
let overwrite = fs.existsSync(`./overwrite/${lang}.overwrite.json`)
  ? JSON.parse(fs.readFileSync(`./overwrite/${lang}.overwrite.json`, "utf8"))
  : {};
let newTrans = {};

Object.keys(enFile).forEach((o) => {
  let value = enFile[o];

  if (overwrite.hasOwnProperty(o)) {
    newTrans[o] = overwrite[o];
    fs.writeFileSync(
      `./lang/${lang}.json`,
      JSON.stringify(newTrans, null, 2)
    );
    return;
  }
  translate(value, { from: "en", to: lang }).then((res) => {
    console.log(`Translated ${o} (${value}) to ${res.text}`);
    newTrans[o] = res.text;
    fs.writeFileSync(
      `./lang/${lang}.json`,
      JSON.stringify(newTrans, null, 2)
    );
  });
});
