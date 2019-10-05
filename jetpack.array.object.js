
// Array utilities
Jetpack.register(Array.prototype, "array", {

	/* returns an array of the given props extracted from all the objects in this array */
	props: function(prop){
		var objects = this;
		if (objects.length == 0){
			return [];
		}
		var values = [];
		for (var a = 0; a < objects.length; a++) {
			values.push(objects[a][prop]);
		}
		return values;
	},
	/* filters the objects by the given condition and returns an array of matched objects.
		Condition method must return true/false and taken exactly one input, the object. */
	where: function(condition){
		var objects = this;
		if (objects.length == 0){
			return [];
		}
		var filtered = [];
		for (var a = 0; a < objects.length; a++) {
			var obj = objects[a];
			if (obj != null && condition(obj, a) == true){
				filtered.push(obj);
			}
		}
		return filtered;
	},
	/* sums up the given properties of all the objects in the array and returns the sum total value */
	deepSum: function(prop, prop2){
		var objects = this;
		if (objects.length == 0){
			return 0;
		}
		var sum = 0;
		for (var a = 0; a < objects.length; a++) {
			sum += objects[a][prop] || 0;
		}
		return sum;
	},
	/* returns the index of the object which has the lowest value in the given property */
	deepIndexOfMin: function(prop){
		var objects = this;
		if (objects.length == 0){
			return -1;
		}
		var minSlot = 0;
		var minRate = objects[0][prop];
		for (var a = 0; a<objects.length; a++){
			var rate = objects[a][prop];
			if (rate != null && rate < minRate){
				minRate = rate;
				minSlot = a;
			}
		}
		return minSlot;
	},
	/* returns the index of the object which has the highest value in the given property */
	deepIndexOfMax: function(prop){
		var objects = this;
		if (objects.length == 0){
			return -1;
		}
		var maxSlot = 0;
		var maxRate = objects[0][prop];
		for (var a = 0; a<objects.length; a++){
			var rate = objects[a][prop];
			if (rate != null && rate > maxRate){
				maxRate = rate;
				maxSlot = a;
			}
		}
		return minSlot;
	},
	/* checks if the given property is zero on all the objects,
	and if so then sets all the properties to the given value */
	deepSetIfZero: function(prop, setToValue){
		var objects = this;
		
		// exit if even one of the values are non-zero
		for (var a = 0; a<objects.length; a++){
			var rate = objects[a][prop];
			if (rate > 0 && rate != null){
				return;
			}
		}
		
		// if all are zero, reset all the values to the given value
		for (var a = 0; a < objects.length; a++) {
			objects[a][prop] = setToValue;
		}
	},
	
	/* merges all the given objects into one summed object,
	 * by recursively going through the objects and arrays within it,
	 * and totally each property and slot individually
	 *
	 * - `objects` MUST be an array of objects or array of arrays
	 * - `roundToDigits` specifies how many digits you want to round off the values to, after summing them up
	*/
	deepMergeSum: function(roundToDigits){
		var objects = this;
		var isArray = objects[0].isArray();
		var sums = isArray ? [] : {};
		for (var r = 0; r < objects.length; r++) {
			if (isArray){
				sums.deepMergeSum_Array(objects[r], roundToDigits);
			}else{
				sums.deepMergeSum_Object(objects[r], roundToDigits);
			}
		}
		return sums;
	},
	/* sums the values from readArray into mainArray.
	Does not modify readArray.
	Creates a matching structure into mainArray to match readArray.
	If a value already exists in mainArray, it is added with the corresponding value in readArray and saved back.*/
	deepMergeSum_Array: function(readArray, roundToDigits){
		var mainArray = this;
		
		// per slot in the source object
		for (var r = 0; r < readArray.length; r++) {
			var prop = readArray[r];
			
			// copy primitive values straight
			if (prop == null || prop.isPrimitive()){
				
				// sum up numeric values only, skip all other types of primitives
				if (prop != null && prop.isNumber()){
					mainArray[r] = ((mainArray[r] || 0) + prop).roundTo(roundToDigits);
				}
				
			}else{
				
				// recurse for child arrays or objects
				if (this.isArray(prop)){
					if (mainArray[r] == null){
						mainArray[r] = [];
					}
					mainArray[r].deepMergeSum_Array(prop, roundToDigits);
				}else{
					if (mainArray[r] == null){
						mainArray[r] = {};
					}
					mainArray[r].deepMergeSum_Object(prop, roundToDigits);
				}
			}
		}
	},
	
	/* delete all the object properties beginning with an '_' character
	 * as those are for tracking state and should not be saved */
	cleanBadProps: function() {
		var array = this;
		
		// go thru array
		for (var a = 0; a < array.length; a++) {
			var item = array[a];
			if (item != null && item.isObject()){
				
				// recurse for array items that are objects
				item.cleanBadProps();
			}
		}
	},
	
	_: null
});
