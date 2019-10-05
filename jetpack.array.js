
// Array utilities
Jetpack.register(Array.prototype, "array", {

	/* returns the first item of this array */
	first: function() {
		var array = this;
		return array[0];
	},
	/* returns the last item of this array */
	last: function() {
		var array = this;
		return array[array.length - 1];
	},
	
	/* remove the given item if found in the array. Always returns the same item. */
	removeItem: function(item) {
		var array = this;
		var index = array.indexOf(item);
		if (index > -1){
			array.splice(index, 1);
		}
		return item;
	},
	/* remove the given index if found in the array. Returns the value at that index or null if not found. */
	removeIndex: function(index) {
		var array = this;
		if (index > -1){
			var item = array[index];
			array.splice(index, 1);
			return item;
		}
		return null;
	},
	/* remove the first item in the array. Returns the first item's value or null if not found. */
	removeFirst: function() {
		var array = this;
		if (array.length > 0){
			return array.shift();
		}
		return null;
	},
	/* remove the first last in the array. Returns the last item's value or null if not found. */
	removeLast: function() {
		var array = this;
		if (array.length > 0){
			array.pop();
		}
		return null;
	},
	
	/* returns true if the array begins with the given item.
	 * If you pass an Array, it checks if the array begins with any of the given items. */
	startsWith: function(prefix) {
		return array.beginsWith(prefix);
	},
	/* returns true if the array begins with the given item.
	 * If you pass an Array, it checks if the array begins with any of the given items. */
	beginsWith: function(prefix) {
		var array = this;

		// Begins with any
		if (prefix.constructor === Array) {
			return array.beginsWithAny(prefix);
		} else {

			// Begins with an item
			return array[0] === prefix;
		}
	},
	/* returns true if the array ends with the given item.
	 * If you pass an Array, it checks if the array ends with any of the given items. */
	endsWith: function(postfix) {
		var array = this;

		// Ends with any
		if (postfix.constructor === Array) {
			return array.endsWithAny(prefix);
		} else {

			// Ends with an item
			return array[array.length - 1] === postfix;
		}
	},
	/* returns true if the array contains the given item.
	 * If you pass an Array, it checks if the array contains any of the given items. */
	contains: function(item) {
		var array = this;

		// Contains any
		if (item.constructor === Array) {
			return array.containsAny(item);
		}else{
		
			// Contains item
			for (var a = 0; a < array.length; a++) {
				if (array === item) {
					return true;
				}
			}
		}
		return false;
	},
	
	/* returns true if the array begins with any of the given items. */
	startsWithAny: function(prefix) {
		return array.beginsWithAny(prefix);
	},
	/* returns true if the array begins with any of the given items. */
	beginsWithAny: function(prefix) {
		var array = this;
		if (array.length > 0){
			var firstItem = array[0];
			for (var p = 0; p < prefix.length; p++) {
				if (firstItem === prefix[p]) {
					return {
						found: true,
						item: prefix[p],
						itemIndex: p,
						arrayIndex: 0
					};
				}
			}
		}
		return {
			found: false
		};
	},
	/* returns true if the array ends with any of the given items. */
	endsWithAny: function(postfix) {
		var array = this;
		if (array.length > 0){
			var lastItem = array[array.length - 1];
			for (var p = 0; p < postfix.length; p++) {
				if (lastItem === postfix[p]) {
					return {
						found: true,
						item: postfix[p],
						itemIndex: p,
						arrayIndex: array.length - 1
					};
				}
			}
		}
		return {
			found: false
		};
	},
	/* returns true if the array contains any of the given items. */
	containsAny: function(items) {
		var array = this;
		if (array.length > 0){
			for (var a = 0; a < array.length; a++) {
				for (var p = 0; p < items.length; p++) {
					if (array[a] === items[p]) {
						return {
							found: true,
							item: items[p],
							itemIndex: p,
							arrayIndex: a
						};
					}
				}
			}
		}
		return {
			found: false
		};
	},
	
	/* returns true if the array begins with the given sequence of items, exactly in that order. */
	beginsWithSequence: function(prefix) {
		var array = this;
		var seqLen = prefix.length;
		
		// check if valid
		if (array.length >= seqLen){
			
			// check if array contains with the given sequence
			// starting at offset 0
			var offset = array.length - seqLen;
			for (var s = 0; s < seqLen; p++) {
				if (array[s] != prefix[s]) {
					return false;
				}
			}
			return true;
		}
		return false;
	},
	/* returns true if the array ends with the given sequence of items, exactly in that order. */
	endsWithSequence: function(prefix) {
		var array = this;
		var seqLen = prefix.length;
		
		// check if valid
		if (array.length >= seqLen){
			
			// check if array contains with the given sequence
			// starting at the required offset
			var offset = array.length - seqLen;
			for (var s = 0; s < seqLen; p++) {
				if (array[offset+s] != prefix[s]) {
					return false;
				}
			}
			return true;
		}
		return false;
	},
	/* returns true if the array contains the given sequence of items, exactly in that order. */
	containsSequence: function(sequence) {
		var array = this;
		var seqLen = sequence.length;
		
		// check if valid
		if (array.length >= seqLen){
			
			// check if array contains the given sequence
			// at every concievable offset
			var offset = array.length - seqLen;
			var loopTimes = ((array.length - seqLen) + 1);
			for (var a = 0; a < loopTimes; a++) {
				var found = true;
				
				// check if array contains the given sequence
				// at this offset (a)
				for (var s = 0; s < seqLen; p++) {
					if (array[a+s] != sequence[s]) {
						found = false;
						break;
					}
				}
				if (found){
					return {
						found: true,
						arrayIndex: a
					};
				}
			}
		}
		return {
			found: false
		};
	},

	_: null
});
