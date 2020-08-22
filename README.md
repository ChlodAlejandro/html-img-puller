# HTML `img` Puller
Made this while archiving  Disord messages. Basically just pulls images into a folder named "images", and then replaces the content of the HTML file to point to the downloaded version.

## Usage
1. Download the dependencies using npm.
   ```bash
   npm i
   ```

2. Pass a path to the HTML file as a parameter.
   ```bash
   node pull.js <html-file>
   ```
   
I was too lazy to implement validation, so the last argument passed will be the HTML file. You can theoretically have no arguments, or a hundred arguments, but it's only ever going to read the JS file itself (`pull.js`) or the last provided HTML file, respectively.

## License
Apache License 2.0. Go have fun.
