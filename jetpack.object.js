
// Object utilities
Jetpack.register(Object.prototype, "object", {

	/* checks if this is an object with properties */
	isObject: function() {
		return Object.prototype.toString.call(this) === "[object Object]";
	},
	
	/* checks if this is a primitive type (String, Number or Boolean) */
	isPrimitive: function() {
		var cons = this.__proto__.constructor;
		return cons === String || cons === Number || cons === Boolean;
	},
	
	/* checks if this is an Array type */
	isArray: function() {
		return this.__proto__.constructor === Array;
	},
	
	/* checks if this is a Number literal */
	isNumber: function() {
		return this.__proto__.constructor === Number;
	},
	
	/* checks if this is a String literal */
	isString: function() {
		return this.__proto__.constructor === String;
	},
	
	/* checks if this is a Boolean literal */
	isBoolean: function() {
		return this.__proto__.constructor === Boolean;
	},
	
	/* deep clones this object by serializing and de-serializing into JSON */
	deepClone: function() {
		return JSON.parse(JSON.stringify(this));
	},
	
	/* sums the values from readObj into mainObj.
	Does not modify readObj.
	Creates a matching structure into mainObj to match readObj.
	If a value already exists in mainObj, it is added with the corresponding value in readObj and saved back.*/
	deepMergeSum_Object: function(readObj, roundToDigits){
		var mainObj = this;
		
		// per prop in the source object
		for (var property in readObj) {
			if (readObj.hasOwnProperty(property)) {
				var prop = readObj[property];
				
				// copy primitive values straight
				if (prop == null || prop.isPrimitive()){
					
					// sum up numeric values only, skip all other types of primitives
					if (prop != null && prop.isNumber()){
						mainObj[property] = ((mainObj[property] || 0) + prop).roundTo(roundToDigits);
					}
					
				}else{
					
					// recurse for child arrays or objects
					if (this.isArray(prop)){
						if (mainObj[property] == null){
							mainObj[property] = [];
						}
						mainObj[property].deepMergeSum_Array(prop, roundToDigits);
					}else{
						if (mainObj[property] == null){
							mainObj[property] = {};
						}
						mainObj[property].deepMergeSum_Object(prop, roundToDigits);
					}
				}
			}
		}
	},
	
	/* delete all the properties beginning with an '_' character
	 * as those are for tracking state and should not be saved */
	cleanBadProps: function() {
		var obj = this;
		for (var property in obj) {
			if (obj.hasOwnProperty(property)) {
				if (property.charAt(0) === '_'){
					
					// remove the bad property
					delete obj[property];
					
					// repeat the process with this var again
					obj.cleanBadProps();
					
					// exit because this object has already been checked
					return;
					
				}else{
					var prop = obj[property];
					if (prop.isArray()){
						var array = prop;
						
					}
					else if (prop.isObject()){
						
						// recurse for props that are objects
						prop.cleanBadProps();
					}
				}
			}
		}
	},
	
	_: null
});