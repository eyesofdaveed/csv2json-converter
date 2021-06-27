const validate = document.querySelector("#validate");
const upload = document.querySelector("#upload");
const convert = document.querySelector("#convert");
const download = document.querySelector("#download");
const csv = document.querySelector("#csv");
const result = document.querySelector("#result");

/* Returns 0 if csv file format is not valid, 1 otherwise */
function isValid(csv_to_check) {
  const lines = csv_to_check.split("\n");
  let res = 1;
  lines.forEach((line) => {
    try {
      single_line = line.split(",");
      single_line.forEach((el) => {
        if (el[0] != '"' || el[el.length - 1] != '"') {
          res = 0;
        }
      });
    } catch {
      res = 0;
    }
  });
  return res;
}

/* Button for validation of csv */
validate.addEventListener("click", () => {
  if (isValid(csv.value.trim()) == 0) {
    result.innerText = "Invalid CSV detected. Please, type the correct format!";
  } else {
    result.innerText = "Valid format, go ahead and convert it to JSON";
  }
});

/* Converts the text into valid JSON format and returns it the result div */
convert.addEventListener("click", () => {
  csv_to_check = csv.value.trim();
  const resultat = [];
  if (isValid(csv_to_check) == 0) {
    result.innerText =
      "CSV can not be converted. Please, type the correct format!";
  } else {
    const lines = csv_to_check.split("\n");
    const keys = lines[0].split(",");
    let id = keys[0];
    let key = keys[1];

    for (let i = 1; i < lines.length; i++) {
      line = lines[i].split(",");
      resultat.push("{" + id + ":" + line[0] + "," + key + ":" + line[1] + "}");
    }
    result.innerText = "[" + resultat + "]";
  }
});

/* Download the available text inside of result div */
function downloadText(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


download.addEventListener("click", () => {
  var text = result.innerText;
  var filename = "csv2json.txt";

  downloadText(filename, text);
});
