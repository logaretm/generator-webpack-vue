const generators = require("yeoman-generator");
const mkdirp = require("mkdirp");
const devDependencies = require("./install/dev");
const dependencies = require("./install/deps");

module.exports = generators.Base.extend({
    install: function () {
        console.log("Installing dependencies.");
        this.npmInstall(devDependencies.join(" "), { "saveDev": true });
        this.npmInstall(dependencies.join(" "), { "save": true });
    },

    writing: function () {
        mkdirp(this.destinationRoot() + "/build");
        this.copy("package.json", "package.json");
        this.copy(".babelrc", ".babelrc");
        this.copy("webpack.config.js", "webpack.config.js");
        this.copy("build/base.config.js", "build/base.config.js");
        this.copy("build/dev.config.js", "build/dev.config.js");
        this.copy("build/prod.config.js", "build/prod.config.js");
        this.copy("build/util.js", "build/util.js");
    }
});
