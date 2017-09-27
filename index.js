console.log('simple-node-package started');

module.exports = function (coefficient) {
    // no coefficient means coefficient of 1
    if (!coefficient && coefficient !== 0) {
        coefficient = 1;
    }
    console.log('moduleArgument coefficient is', coefficient);
    this.coefficient = coefficient;
    return {
        addition: addition.bind(this),
        multiplication: multiplication.bind(this)
    }
};

function addition(x, y) {
    return this.coefficient * (x + y);
}

function multiplication(x, y) {
    return this.coefficient * x * y;
}