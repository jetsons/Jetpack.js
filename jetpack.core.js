Jetpack = {};

// add the funcs into the given prototype object
Jetpack.register = function(proto, objectName, funcs) {
	
	// per func
	for (var funcName in funcs) {
		var func = funcs[funcName];
		if (func) {
			if (funcs.hasOwnProperty(funcName)) {

				// skip if already has it
				if (proto[funcName] != null) {
					if (Jetpack.enableWarnings) {
						console.log("Skipped '" + funcName);
					}
					continue;
				}

				// add functions into Object.prototype such that it works with jQuery as well
				if (Object.defineProperty != null) {
					Object.defineProperty(proto, funcName, {
						value: func,
						enumerable: false
					});
				} else {

					// fallback method for older browsers
					proto[funcName] = func;
				}

			}
		}
	}

}
