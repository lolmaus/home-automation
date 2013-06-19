var path = require("path");
var fs = require("fs");
var async = require("async");

AutomationModule = function (id, controller) {
    this.id = id;
    this.actions = {};
    this.metrics = {};
    this.config = {};
    this.controller = controller;
};

module.exports = exports = AutomationModule;

AutomationModule.prototype.init = function (config) {
    var self = this;
    Object.keys(config).forEach(function (key) {
        self.config[key] = config[key];
    });
};

AutomationModule.prototype.getModuleBasePath = function () {
    return ".";
};

AutomationModule.prototype.runAction = function (meta, args, callback) {
    if (callback) {
        callback(new Error("Not implemented yet"));
    }
};

AutomationModule.prototype.runActionSync = function (meta, args, callback) {
    async.series([function (callback) {
        this.runAction(meta, args, callback);
    }], callback);
};

AutomationModule.prototype.getResource = function (name) {
    var resourceFilename = path.resolve(path.join(this.getModuleBasePath(), "resources", name));
    return fs.existsSync(resourceFilename) ? resourceFilename : this.controller.getResource(name);
};

AutomationModule.prototype.getMeta = function () {
    return require("./module.js");
    // var resourceFilename = path.resolve(path.join(this.getModuleBasePath(), "resources", name));
    // return fs.existsSync(resourceFilename) ? resourceFilename : this.controller.getResource(name);
};

AutomationModule.prototype.getModuleInstanceMetrics = function () {
    return null;
};
