
// String utilities
Jetpack.register(String.prototype, "string", {

	/* checks if the string is equal to the given value, using case-insensitive comparison */
	equalsCI: function(value) {
		return this.toLowerCase() == value.toLowerCase();
	},
	/* checks if the string begins with the given value */
	beginsWith: function(prefix, length = 0) {
		return this.smartStartsWith(prefix, length, true);
	},
	/* checks if the string begins with the given value, using case-insensitive comparison */
	beginsWithCI: function(prefix, length = 0) {
		return this.smartStartsWith(prefix, length, false);
	},
	/* checks if the string begins with the given value */
	startsWith: function(prefix, length = 0) {
		return this.smartStartsWith(prefix, length, true);
	},
	/* checks if the string begins with the given value, using case-insensitive comparison */
	startsWithCI: function(prefix, length = 0) {
		return this.smartStartsWith(prefix, length, false);
	},
	/* checks if the string begins with the given value, using case-sensitive or case-insensitive comparison */
	smartBeginsWith: function(prefix, length = 0, caseSensitive = true) {
		return this.smartStartsWith(prefix, length, caseSensitive);
	},
	/* checks if the string begins with the given value, using case-sensitive or case-insensitive comparison */
	smartStartsWith: function(prefix, length = 0, caseSensitive = true) {
		var text = this;

		// "starts with any"
		if (prefix.constructor === Array) {
			for (var p = 0; p < prefix.length; p++) {
				if (text.smartStartsWith(prefix[p], length, caseSensitive)) {
					return true;
				}
			}
			return false;
		} else {

			// JS startsWith() API support
			if (length > 0 && prefix.length > length) {
				prefix = prefix.substr(0, length);
			}

			// "starts with"
			if (text.length < prefix.length) {
				return false;
			}
			if (caseSensitive) {
				return text.lastIndexOf(prefix, 0) === 0;
			} else {
				return text.substr(0, prefix.length).toLowerCase() === prefix.toLowerCase();
			}
		}
	},
	/* checks if the string ends with the given value */
	endsWith: function(postfix, length = 0) {
		return this.smartEndsWith(postfix, length, true);
	},
	/* checks if the string ends with the given value, using case-insensitive comparison */
	endsWithCI: function(postfix, length = 0) {
		return this.smartEndsWith(postfix, length, false);
	},
	/* checks if the string ends with the given value, using case-sensitive or case-insensitive comparison */
	smartEndsWith: function(postfix, length = 0, caseSensitive = true) {
		var text = this;

		// "ends with any"
		if (postfix.constructor === Array) {
			for (var p = 0; p < postfix.length; p++) {
				if (text.smartEndsWith(postfix[p], length, caseSensitive)) {
					return true;
				}
			}
			return false;
		} else {

			// JS endsWith() API support
			if (length > 0 && postfix.length > length) {
				postfix = postfix.substr(0, length);
			}

			// "ends with"
			if (text.length < postfix.length) {
				return false;
			}
			if (caseSensitive) {
				var index = text.length - postfix.length;
				return text.indexOf(postfix, index) === index;
			} else {
				return text.substr(text.length - postfix.length, postfix.length).toLowerCase() === postfix.toLowerCase();
			}
		}
	},
	/* checks if the string contains the given value */
	contains: function(substring) {
		return this.smartContains(substring, true);
	},
	/* checks if the string contains the given value, using case-insensitive comparison */
	containsCI: function(substring) {
		return this.smartContains(substring, false);
	},
	/* checks if the string contains the given value, using case-sensitive or case-insensitive comparison */
	smartContains: function(substring, caseSensitive = true) {
		var text = this;

		// "contains any"
		if (substring.constructor === Array) {
			for (var s = 0; s < substring.length; s++) {
				if (text.smartContains(substring[s], caseSensitive)) {
					return true;
				}
			}
			return false;
		}

		// "contains"
		if (text.length < substring.length) {
			return false;
		}
		if (caseSensitive) {
			return text.indexOf(substring) != -1;
		} else {
			return text.toLowerCase().indexOf(substring.toLowerCase()) != -1;
		}
	},
	
	/* converts all characters in the string to UPPERCASE */
	upperCase: function() {
		var text = this;
		return text.toUpperCase();
	},
	/* converts all characters in the string to lowercase */
	lowerCase: function() {
		var text = this;
		return text.toLowerCase();
	},
	/* capitalizes the first character in the string */
	firstLetterCaps: function() {
		var text = this;
		if (text.length == 0){
			return text;
		}
		return text.substring(0, 1).toUpperCase() + text.substring(1);
	},
	/* lower-cases the first character in the string */
	firstLetterLower: function() {
		var text = this;
		if (text.length == 0){
			return text;
		}
		return text.substring(0, 1).toLowerCase() + text.substring(1);
	},
	/* returns the index of the search term in the string, using case-insensitive comparison */
	indexOfCI: function(search) {
		var text = this;
		if (text.length > 0 && search.length > 0 && text.length >= search.length){
			text = text.toLowerCase();
			search = search.toLowerCase();
			return text.indexOf(search);
		}
		return -1;
	},
	/* returns the last index of the search term in the string, using case-insensitive comparison */
	lastIndexOfCI: function(search) {
		var text = this;
		if (text.length > 0 && search.length > 0 && text.length >= search.length){
			text = text.toLowerCase();
			search = search.toLowerCase();
			return text.lastIndexOf(search);
		}
		return -1;
	},
	/* returns the substring after the first occurance of the search term */
	after: function(search, caseSensitive = true, returnAll = false) {
		var text = this;
		if (text.length > 0 && search.length > 0){
			var i = caseSensitive ? text.indexOf(search) : text.indexOfCI(search);
			if (i > -1){
				return text.substring(i + search.length);
			}
		}
		return returnAll ? text : "";
	},
	/* returns the substring after the first occurance of the search term */
	afterLast: function(search, caseSensitive = true, returnAll = false) {
		var text = this;
		if (text.length > 0 && search.length > 0){
			var i = caseSensitive ? text.lastIndexOf(search) : text.lastIndexOfCI(search);
			if (i > -1){
				return text.substring(i + search.length);
			}
		}
		return returnAll ? text : "";
	},
	/* returns the substring before the first occurance of the search term */
	before: function(search, caseSensitive = true, returnAll = false) {
		var text = this;
		if (text.length > 0 && search.length > 0){
			var i = caseSensitive ? text.indexOf(search) : text.indexOfCI(search);
			if (i > -1){
				return text.substring(0, i);
			}
		}
		return returnAll ? text : "";
	},
	/* returns the substring before the first occurance of the search term */
	beforeLast: function(search, caseSensitive = true, returnAll = false) {
		var text = this;
		if (text.length > 0 && search.length > 0){
			var i = caseSensitive ? text.lastIndexOf(search) : text.lastIndexOfCI(search);
			if (i > -1){
				return text.substring(0, i);
			}
		}
		return returnAll ? text : "";
	},

	_: null
});
