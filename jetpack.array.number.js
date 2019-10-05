
// Array utilities
Jetpack.register(Array.prototype, "array", {

	/* returns the sum of all the values in this array */
	sum: function(){
		var values = this;
		if (values.length == 0){
			return 0;
		}
		var sum = 0;
		for (var a = 0; a < values.length; a++) {
			sum += values[a] || 0;
		}
		return sum;
	},
	
	_: null
});
