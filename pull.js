(async () => {
    const fs = require("fs-jetpack");
    const path = require("path");
    const axios = require("axios");
    const mime = require('mime-types');
    const RegexEscape = require("regex-escape");
    
    require("log-timestamp");
    
    let htmlPath = path.resolve(process.argv[process.argv.length - 1]);
    console.log(`Reading ${htmlPath}...`);
    
    let html = fs.read(htmlPath);

    const matcher = /<img[^>]+?src="(.+?)"/g;
    let img = [];

    let match;
    while ((match = matcher.exec(html)) != null) {
        if (!img.includes(match[1])) {
            img.push(match[1]);
        }
    }

    console.log(img);
    fs.dir("images");
    for (const image of img) {
        console.log(`Downloading image ${image}...`);
        if (!image.startsWith("http")) {
            console.log(`Local. Skipping...`);
            continue;
        }
        
        const response = (await axios.get(image, {responseType: "arraybuffer"}));
        console.log(`Downloaded.`);
        
        const name = require("crypto").createHash("md5").update(response.data.toString("utf-8")).digest("hex");
        const target = path.join("images", `${name}.${mime.extension(response.headers["content-type"])}`);
        console.log(`Saving image to ${target}...`);
        fs.write(target, response.data);
        
        console.log(image + " >> " + target);
        html = html.replace(new RegExp(RegexEscape(image), "g"), `images/${name}.${mime.extension(response.headers["content-type"])}`);
        fs.write(htmlPath, html);
    }
})();