"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@persepolis";
exports.ids = ["vendor-chunks/@persepolis"];
exports.modules = {

/***/ "(ssr)/./node_modules/@persepolis/slugify/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@persepolis/slugify/dist/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.slugify = void 0;\nfunction slugify(str) {\n    str = str.replace(/^\\s+|\\s+$/g, '');\n    // Make the string lowercase\n    str = str.toLowerCase();\n    // Remove accents, swap ñ for n, etc\n    const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';\n    const to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';\n    for (let i = 0, l = from.length; i < l; i++) {\n        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));\n    }\n    // Remove invalid chars\n    str = str\n        .replace(/[^a-z0-9 -]/g, '')\n        // Collapse whitespace and replace by -\n        .replace(/\\s+/g, '-')\n        // Collapse dashes\n        .replace(/-+/g, '-');\n    return str;\n}\nexports.slugify = slugify;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHBlcnNlcG9saXMvc2x1Z2lmeS9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0hBQW9IO0FBQ3BIO0FBQ0EscUNBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LXByaXNtYS10YWlsd2luZC1lY29tbWVyY2UvLi9ub2RlX21vZHVsZXMvQHBlcnNlcG9saXMvc2x1Z2lmeS9kaXN0L2luZGV4LmpzPzJlYmUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNsdWdpZnkgPSB2b2lkIDA7XG5mdW5jdGlvbiBzbHVnaWZ5KHN0cikge1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgLy8gTWFrZSB0aGUgc3RyaW5nIGxvd2VyY2FzZVxuICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIFJlbW92ZSBhY2NlbnRzLCBzd2FwIMOxIGZvciBuLCBldGNcbiAgICBjb25zdCBmcm9tID0gJ8OBw4TDgsOAw4PDhcSMw4fEhsSOw4nEmsOLw4jDiuG6vMSUyIbDjcOMw47Dj8WHw5HDk8OWw5LDlMOVw5jFmMWUxaDFpMOaxa7DnMOZw5vDncW4xb3DocOkw6LDoMOjw6XEjcOnxIfEj8OpxJvDq8Oow6rhur3ElciHw63DrMOuw6/FiMOxw7PDtsOyw7TDtcO4w7DFmcWVxaHFpcO6xa/DvMO5w7vDvcO/xb7DvsOexJDEkcOfw4ZhwrcvXyw6Oyc7XG4gICAgY29uc3QgdG8gPSAnQUFBQUFBQ0NDREVFRUVFRUVFSUlJSU5OT09PT09PUlJTVFVVVVVVWVlaYWFhYWFhY2NjZGVlZWVlZWVlaWlpaW5ub29vb29vb3Jyc3R1dXV1dXl5emJCRGRCQWEtLS0tLS0nO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZnJvbS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChmcm9tLmNoYXJBdChpKSwgJ2cnKSwgdG8uY2hhckF0KGkpKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIGludmFsaWQgY2hhcnNcbiAgICBzdHIgPSBzdHJcbiAgICAgICAgLnJlcGxhY2UoL1teYS16MC05IC1dL2csICcnKVxuICAgICAgICAvLyBDb2xsYXBzZSB3aGl0ZXNwYWNlIGFuZCByZXBsYWNlIGJ5IC1cbiAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKVxuICAgICAgICAvLyBDb2xsYXBzZSBkYXNoZXNcbiAgICAgICAgLnJlcGxhY2UoLy0rL2csICctJyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmV4cG9ydHMuc2x1Z2lmeSA9IHNsdWdpZnk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@persepolis/slugify/dist/index.js\n");

/***/ })

};
;