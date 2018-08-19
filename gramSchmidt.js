var matrix = [[4, 0, 0], [-2, 3, 0]];
// var matrix = [[1, 2, 0], [8, 1, -6], [0, 0, 1]];
// var matrix = [[0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0]];
var orthoNormVecs = [];

gramSchimdt(matrix);

function gramSchimdt(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        var currentVec = matrix[i];
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
    }

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
