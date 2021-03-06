const LEP = require("logical-expression-parser");

class Registration {
    static SINGLETON = "SINGLETON";
    static TRANSIENT = "TRANSIENT";
    constructor(ctor, lifecycle, labels, options = {}) {
        const {isCtor} = options;

        if(isCtor === undefined) {
            this.isCtor = true;
        } else {
            this.isCtor = isCtor;
        }
        this.ctor = ctor;
        this.lifecycle = lifecycle;
        // strip and normalize labels for matching
        // this is permissive for bad labels, because external library errors might not manifest until wiring.
        this.labels = labels.map( label => label.toUpperCase().replace(/[^\w]/g, ""));
    }
    match(expression) {
        return LEP.parse(expression, search => this.labels.some( label => label === search.toUpperCase() ));
    }
}

module.exports = {
    Registration
}