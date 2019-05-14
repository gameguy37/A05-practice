// write String.prototype.mySlice. It should take a start index and an
// (optional) end index.

String.prototype.mySlice = function (start, end) {
    let slice = "";

    if (typeof end === 'undefined') {
        end = this.length;
    }

    for (let i = start; i < end && i < this.length; i++) {
        slice += this[i];
    }

    return slice;
};

// write Array.prototype.myReduce (analogous to Ruby's Array#inject).

Array.prototype.myReduce = function (callback) {

    let acc = this[0];

    this.slice(1).forEach( el => {
        acc = callback(acc, el);
    });

    return acc;
};

// write Array.prototype.quickSort(comparator). Here's a quick refresher if
// you've forgotten how quickSort works:
//   - choose a pivot element from the array (usually the first)
//   - for each remaining element of the array:
//     - if the element is less than the pivot, put it in the left half of the
//     array.
//     - otherwise, put it in the right half of the array.
//   - recursively call quickSort on the left and right halves, and return the
//   full sorted array.

Array.prototype.quickSort = function (comparator) {

    if (this.length <= 1) { return this; }

    const left = [];
    const right = [];
    const pivot = this[0];

    if (typeof comparator !== 'function') {
        comparator = function(x,y) {
            if (x === y) {
                return 0;
            } else if (x < y) {
                return -1;
            } else {
                return 1;
            }
        };
    }

    this.slice(1).forEach( el => {
        if (comparator(el, pivot) === 1) {
            right.push(el);
        } else {
            left.push(el);
        }
    });

    return left.quickSort(comparator).concat([pivot]).concat(right.quickSort(comparator));

};

// write myFind(array, callback). It should return the first element for which
// callback returns true, or undefined if none is found.

myFind = function(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return array[i];
        }
    }
};

// write sumNPrimes(n)

sumNPrimes = function(n) {
    let sum = 0;
    let count = 0;

    for (let i = 2; count < n; i++) {
        if (isPrime(i)) {
            count += 1;
            sum += i;
        }
    }

    return sum;
};

isPrime = function(num) {

    if (num <= 1) {
        return false;
    }

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
};

// write Function.prototype.myBind.

Function.prototype.myBind = function(ctx, ...bindArgs) {
    return (...callArgs) => {
        return this.apply(ctx, bindArgs.concat(callArgs));
    };
};


// write Function.prototype.inherits.

Function.prototype.inherits = function(parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate();
    this.constructor = this;
};
