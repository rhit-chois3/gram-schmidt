var matrix = [[4, 0, 0], [-2, 3, 0]];
// var matrix = [[1, 2, 0], [8, 1, -6], [0, 0, 1]];
// var matrix = [[0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0]];
var orthoNormVecs = [];

gramSchmidt(matrix[0], 0);

function gramSchmidt(vector, i) {
    while (i < matrix.length) {
        // var currentVec = matrix[i];
        var currentVec = vector;
        var orthoVec = [];

        // orthogonalization
        for (let j = 0; j < i; j++) {
            var prevVectorNorm = orthoNormVecs[j];
            var dotProd = getDotProd(prevVectorNorm, currentVec);
            var resVec = multiply(dotProd, prevVectorNorm);
            orthoVec = subtract(resVec, currentVec);
        }

        var vector = [];
        if (orthoVec.length != 0) {
            vector = orthoVec;
        } else {
            vector = currentVec;
        }

        // normalization
        var multiple = Math.sqrt(getDotProd(vector, vector));
        var normVec = multiply((1/multiple), vector);
        orthoNormVecs.push(normVec);

        if ((i + 1) != matrix.length) {
            return gramSchmidt(matrix[i + 1], (i + 1))
        } else {
            return logResult();
        }
    }
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
