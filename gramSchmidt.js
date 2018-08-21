var matrix = [[4, 0, 0], [-2, 3, 0]];
// var matrix = [[1, 2, 0], [8, 1, -6], [0, 0, 1]];
// var matrix = [[0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0]];

var orthoNormVecs = gramSchmidt(matrix);
for (let i = 0; i < orthoNormVecs.length; i++) {
    console.log(orthoNormVecs[i]);
}

function gramSchmidt(matrix) {
    if (matrix.length == 0) {
        return matrix;
    } else {
        var newVec = matrix[0];
        var restVecs = matrix.slice(1);
        var rest = gramSchmidt(restVecs);

        // orthogonalization
        if (rest.length > 0) {
            for (let i = 0; i < rest.length; i++) {
                newVec = project(newVec, rest[i]);
            }
        }
        var newNormVec = [normalize(newVec)];
        var newArray = newNormVec.concat(rest);

        // normalization
        return (newArray);
    }
}

function project(newVec, vector) {
    var dotProd = getDotProd(newVec, vector);
    var resVec = multiply(dotProd, newVec);
    var orthoVec = subtract(resVec, vector);
    return orthoVec;
}

function normalize(vector) {
    var multiple = Math.sqrt(getDotProd(vector, vector));
    var normVec = multiply((1/multiple), vector);
    return normVec;
}

function logResult() {
    for (var i = 0; i < orthoNormVecs.length; i++) {
        console.log(matrix[i]);
        console.log(orthoNormVecs[i]);
    }
}

function getDotProd(vec1, vec2) {
    var prod = 0;
    for (let i = 0; i < vec1.length; i++)
        prod += vec1[i] * vec2[i];
    return prod
}

function multiply(dotProd, vec) {
    var resVec = [];
    for (let i = 0; i < vec.length; i++)
        resVec.push(dotProd * vec[i]);
    return resVec;
}

function subtract(resVec, currentVec) {
    var orthoVec = [];
    for (let i = 0; i < currentVec.length; i++)
        orthoVec.push(currentVec[i] - resVec[i])
    return orthoVec;
}
