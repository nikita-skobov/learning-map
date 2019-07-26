# learning-map

## Usage:
Make sure you have node and npm installed. I recommend using [nvm](https://github.com/nvm-sh/nvm) for its easy installation script, and version management.

```sh
git clone https://github.com/nikita-skobov/learning-map.git
cd learning-map
npm install
node src/data/parseLessons.js
# this parses the src/data/lessons folder and generates json
# objects from the lesson yaml files.
npm run start
```

Every time you add a .yml or .yaml file to src/data/lessons/ you will need to
re-run `node src/data/parseLessons.js` to generate a new network graph.

## KaTeX fonts:
This project uses [KaTeX](https://github.com/KaTeX/KaTeX) which is a really nice library that allows latex-like rendering directly in the browser. It needs katex css and katex fonts to work properly, and those are not included in the katex npm package. I have solved this problem temporarily by downloading the `katex.min.css` file and all the fonts files from https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/
where 0.10.2 is the latest version at the time of writing this. If you want to build this project from source, you will want to download `katex.min.css` from there and place it in the public directory, and download all the fonts and place them in a folder called `fonts` which is also in the public directory.
