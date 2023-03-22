const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./module/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8"
);

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Changing content-type to HTML
  res.writeHead(404, { "Content-type": "text/html" });

  // Routes
  if (pathname === "/" || pathname === "/overview") {
    const cardsUpdated = dataObject
      .map((el) => replaceTemplate(cardTemplate, el))
      .join("");
    const output = overviewTemplate.replace("{PRODUCTS_CARD}", cardsUpdated);
    res.end(output);
  } else if (pathname === "/product") {
    const product = dataObject[query.id];
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
  } else {
    res.end("404 Page Not Found!");
  }
});

server.listen(8000, () => {
  console.log("App is Listening on port 8000...");
});
