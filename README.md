# Jetpack.js

To use this simply download this library and add the packs you need to the `<head>` of your page:

```html
<!-- Jetpack -->
<script src="libs/jetpack.core.js"></script>
<script src="libs/jetpack.object.js"></script>
<script src="libs/jetpack.array.js"></script>
<script src="libs/jetpack.array.number.js"></script>
<script src="libs/jetpack.array.object.js"></script>
<script src="libs/jetpack.number.js"></script>
<script src="libs/jetpack.string.js"></script>
```

You can now use these extension methods from any of your variables all across your JS app!

### Compatibility

Jetpack is compatible with:

- AngularJS
- Angular 8
- Bootstrap
- jQuery
- Vue.js

### Extensions

Extension methods for Strings:

- string.**equalsCI**
- string.**beginsWith**
- string.**beginsWithCI**
- string.**startsWith**
- string.**startsWithCI**
- string.**smartBeginsWith**
- string.**smartStartsWith**
- string.**endsWith**
- string.**endsWithCI**
- string.**smartEndsWith**
- string.**contains**
- string.**containsCI**
- string.**smartContains**
- string.**upperCase**
- string.**lowerCase**
- string.**firstLetterCaps**
- string.**firstLetterLower**
- string.**indexOfCI**
- string.**lastIndexOfCI**
- string.**after**
- string.**afterLast**
- string.**before**
- string.**beforeLast**

Extension methods for Numbers:

- number.**round**
- number.**ceil**
- number.**floor**
- number.**roundTo**
- number.**limitTo**

Extension methods for Objects:

- any.**isObject**
- any.**isPrimitive**
- any.**isArray**
- any.**isNumber**
- any.**isString**
- any.**isBoolean**
- any.**deepClone**
- any.**cleanBadProps**

Extension methods for Arrays:

- array.**first**
- array.**last**
- array.**removeItem**
- array.**removeIndex**
- array.**removeFirst**
- array.**removeLast**
- array.**startsWith**
- array.**beginsWith**
- array.**endsWith**
- array.**contains**
- array.**startsWithAny**
- array.**beginsWithAny**
- array.**endsWithAny**
- array.**containsAny**
- array.**beginsWithSequence**
- array.**endsWithSequence**
- array.**containsSequence**

Extension methods for Numeric Arrays:

- array.**sum**

Extension methods for Object Arrays:

- array.**props**
- array.**where**
- array.**deepSum**
- array.**deepIndexOfMin**
- array.**deepIndexOfMax**
- array.**deepSetIfZero**
- array.**deepMergeSum**
- array.**cleanBadProps**