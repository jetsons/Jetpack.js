
// Number utilities
Jetpack.register(Number.prototype, "number", {

	/* rounds the given fractional value to the nearest whole number */
	round: function(n) {
		return Math.round(n);
	},
	/* ceiling's the given fractional value to the upper whole number */
	ceil: function(n) {
		return Math.ceil(n);
	},
	/* floor's the given fractional value to the lower whole number */
	floor: function(n) {
		return Math.floor(n);
	},
	/* restricts the given fractional value to the specified amount of digits */
	roundTo: function(n, digits = 2) {
		var negative = false;
		if (n < 0) {
			negative = true;
			n = n * -1;
		}
		var multiplicator = Math.pow(10, digits);
		n = parseFloat((n * multiplicator).toFixed(11));
		n = (Math.round(n) / multiplicator).toFixed(2);
		if (negative) {    
			n = (n * -1).toFixed(2);
		}
		return parseFloat(n);
	},
	/* limits the given value to the specified min and max value */
	limitTo: function(n, min, max) {
		if (n < min){
			return min;
		}
		if (n > max){
			return max;
		}
		return n;
	},
	
	_: null
});
