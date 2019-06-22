const pages = {
  "404": {
    "title": "Site-seeing?",
    "colors": {
      "hrbg": "rebeccapurple",
      "sidebg": "#4E31B0"
    },
    "content": "Nothing to find here.\n\nUse your imagination instead!"
  },
  "500": {
    "title": "Server Error.",
    "colors": {
      "hrbg": "#327F99",
      "sidebg": "#2EA682"
    },
    "content": "Something went awry on this end.\n\nIf at first, you don't succeed?"
  }
};

const pageAliases = {
  "404": ["403"],
  "500": ["503"]
};

for(base of Object.keys(pageAliases)) {
  for(dest of pageAliases[base]) {
    pages[dest] = pages[base];
  }
}

module.exports = pages;
