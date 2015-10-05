var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports.__esModule = true;
exports["default"] = AspectCollection;
