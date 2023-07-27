const svgson = require("svgson");
const prompt = require("prompt");
const fs = require("fs");

// Schema for user input
const schema = {
  properties: {
    color: {
      description: "Enter the color",
      pattern: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      message: "Must be a valid color hex value",
      required: true,
    },
    shape: {
      description: "Enter the shape (circle or rectangle)",
      pattern: /^(circle|rectangle)$/,
      message: "Shape must be either circle or rectangle",
      required: true,
    },
    text: {
      description: "Enter the text for the logo",
      required: true,
    },
  },
};

// Start prompt
prompt.start();

// Get user input from users
prompt.get(schema, function (err, result) {
  if (err) {
    console.log(err);
    return;
  }

  // Create SVG based on user input
  const svgObj = {
    name: "svg",
    type: "element",
    value: "",
    attributes: {
      width: "500",
      height: "500",
      xmlns: "http://www.w3.org/2000/svg",
    },
    children: [
      {
        name: result.shape,
        type: "element",
        value: "",
        attributes: {
          fill: result.color,
          ...(result.shape === "circle"
            ? { cx: "250", cy: "250", r: "100" }
            : { x: "100", y: "100", width: "200", height: "100" }),
        },
        children: [],
      },
      {
        name: "text",
        type: "element",
        value: result.text,
        attributes: {
          x: "50%",
          y: "50%",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
        },
        children: [],
      },
    ],
  };

  // Convert the JSON structure to SVG
  const svgString = svgson.stringify(svgObj);

  // SVG to file
  fs.writeFile("logo.svg", svgString, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("SVG saved as logo.svg");
    }
  });
});
