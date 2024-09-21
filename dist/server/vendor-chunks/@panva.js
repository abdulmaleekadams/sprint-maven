"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@panva";
exports.ids = ["vendor-chunks/@panva"];
exports.modules = {

/***/ "(rsc)/./node_modules/@panva/hkdf/dist/node/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@panva/hkdf/dist/node/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hkdf),\n/* harmony export */   hkdf: () => (/* binding */ hkdf)\n/* harmony export */ });\n/* harmony import */ var _runtime_hkdf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./runtime/hkdf.js */ \"(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js\");\n\nfunction normalizeDigest(digest) {\n    switch (digest) {\n        case 'sha256':\n        case 'sha384':\n        case 'sha512':\n        case 'sha1':\n            return digest;\n        default:\n            throw new TypeError('unsupported \"digest\" value');\n    }\n}\nfunction normalizeUint8Array(input, label) {\n    if (typeof input === 'string')\n        return new TextEncoder().encode(input);\n    if (!(input instanceof Uint8Array))\n        throw new TypeError(`\"${label}\"\" must be an instance of Uint8Array or a string`);\n    return input;\n}\nfunction normalizeIkm(input) {\n    const ikm = normalizeUint8Array(input, 'ikm');\n    if (!ikm.byteLength)\n        throw new TypeError(`\"ikm\" must be at least one byte in length`);\n    return ikm;\n}\nfunction normalizeInfo(input) {\n    const info = normalizeUint8Array(input, 'info');\n    if (info.byteLength > 1024) {\n        throw TypeError('\"info\" must not contain more than 1024 bytes');\n    }\n    return info;\n}\nfunction normalizeKeylen(input, digest) {\n    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {\n        throw new TypeError('\"keylen\" must be a positive integer');\n    }\n    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;\n    if (input > 255 * hashlen) {\n        throw new TypeError('\"keylen\" too large');\n    }\n    return input;\n}\nasync function hkdf(digest, ikm, salt, info, keylen) {\n    return (0,_runtime_hkdf_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLE1BQU07QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNERBQU07QUFDakI7QUFDaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmVsbG8tY2xvbmUvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9pbmRleC5qcz9kNTg3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXJpdmUgZnJvbSAnLi9ydW50aW1lL2hrZGYuanMnO1xuZnVuY3Rpb24gbm9ybWFsaXplRGlnZXN0KGRpZ2VzdCkge1xuICAgIHN3aXRjaCAoZGlnZXN0KSB7XG4gICAgICAgIGNhc2UgJ3NoYTI1Nic6XG4gICAgICAgIGNhc2UgJ3NoYTM4NCc6XG4gICAgICAgIGNhc2UgJ3NoYTUxMic6XG4gICAgICAgIGNhc2UgJ3NoYTEnOlxuICAgICAgICAgICAgcmV0dXJuIGRpZ2VzdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Vuc3VwcG9ydGVkIFwiZGlnZXN0XCIgdmFsdWUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBub3JtYWxpemVVaW50OEFycmF5KGlucHV0LCBsYWJlbCkge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGlucHV0KTtcbiAgICBpZiAoIShpbnB1dCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7bGFiZWx9XCJcIiBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXkgb3IgYSBzdHJpbmdgKTtcbiAgICByZXR1cm4gaW5wdXQ7XG59XG5mdW5jdGlvbiBub3JtYWxpemVJa20oaW5wdXQpIHtcbiAgICBjb25zdCBpa20gPSBub3JtYWxpemVVaW50OEFycmF5KGlucHV0LCAnaWttJyk7XG4gICAgaWYgKCFpa20uYnl0ZUxlbmd0aClcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgXCJpa21cIiBtdXN0IGJlIGF0IGxlYXN0IG9uZSBieXRlIGluIGxlbmd0aGApO1xuICAgIHJldHVybiBpa207XG59XG5mdW5jdGlvbiBub3JtYWxpemVJbmZvKGlucHV0KSB7XG4gICAgY29uc3QgaW5mbyA9IG5vcm1hbGl6ZVVpbnQ4QXJyYXkoaW5wdXQsICdpbmZvJyk7XG4gICAgaWYgKGluZm8uYnl0ZUxlbmd0aCA+IDEwMjQpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdcImluZm9cIiBtdXN0IG5vdCBjb250YWluIG1vcmUgdGhhbiAxMDI0IGJ5dGVzJyk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplS2V5bGVuKGlucHV0LCBkaWdlc3QpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihpbnB1dCkgfHwgaW5wdXQgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wia2V5bGVuXCIgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcbiAgICB9XG4gICAgY29uc3QgaGFzaGxlbiA9IHBhcnNlSW50KGRpZ2VzdC5zdWJzdHIoMyksIDEwKSA+PiAzIHx8IDIwO1xuICAgIGlmIChpbnB1dCA+IDI1NSAqIGhhc2hsZW4pIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJrZXlsZW5cIiB0b28gbGFyZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0O1xufVxuYXN5bmMgZnVuY3Rpb24gaGtkZihkaWdlc3QsIGlrbSwgc2FsdCwgaW5mbywga2V5bGVuKSB7XG4gICAgcmV0dXJuIGRlcml2ZShub3JtYWxpemVEaWdlc3QoZGlnZXN0KSwgbm9ybWFsaXplSWttKGlrbSksIG5vcm1hbGl6ZVVpbnQ4QXJyYXkoc2FsdCwgJ3NhbHQnKSwgbm9ybWFsaXplSW5mbyhpbmZvKSwgbm9ybWFsaXplS2V5bGVuKGtleWxlbiwgZGlnZXN0KSk7XG59XG5leHBvcnQgeyBoa2RmLCBoa2RmIGFzIGRlZmF1bHQgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@panva/hkdf/dist/node/esm/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js":
/*!********************************************************************!*\
  !*** ./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((digest, ikm, salt, info, keylen) => {\n    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;\n    const prk = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)(digest, salt.byteLength ? salt : new Uint8Array(hashlen))\n        .update(ikm)\n        .digest();\n    const N = Math.ceil(keylen / hashlen);\n    const T = new Uint8Array(hashlen * N + info.byteLength + 1);\n    let prev = 0;\n    let start = 0;\n    for (let c = 1; c <= N; c++) {\n        T.set(info, start);\n        T[start + info.byteLength] = c;\n        T.set((0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)(digest, prk)\n            .update(T.subarray(prev, start + info.byteLength + 1))\n            .digest(), start);\n        prev = start;\n        start += hashlen;\n    }\n    return T.slice(0, keylen);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9ydW50aW1lL2ZhbGxiYWNrLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW9DO0FBQ3BDLGlFQUFlO0FBQ2Y7QUFDQSxnQkFBZ0Isa0RBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLGNBQWMsa0RBQVU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJlbGxvLWNsb25lLy4vbm9kZV9tb2R1bGVzL0BwYW52YS9oa2RmL2Rpc3Qvbm9kZS9lc20vcnVudGltZS9mYWxsYmFjay5qcz82MTVjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUhtYWMgfSBmcm9tICdjcnlwdG8nO1xuZXhwb3J0IGRlZmF1bHQgKGRpZ2VzdCwgaWttLCBzYWx0LCBpbmZvLCBrZXlsZW4pID0+IHtcbiAgICBjb25zdCBoYXNobGVuID0gcGFyc2VJbnQoZGlnZXN0LnN1YnN0cigzKSwgMTApID4+IDMgfHwgMjA7XG4gICAgY29uc3QgcHJrID0gY3JlYXRlSG1hYyhkaWdlc3QsIHNhbHQuYnl0ZUxlbmd0aCA/IHNhbHQgOiBuZXcgVWludDhBcnJheShoYXNobGVuKSlcbiAgICAgICAgLnVwZGF0ZShpa20pXG4gICAgICAgIC5kaWdlc3QoKTtcbiAgICBjb25zdCBOID0gTWF0aC5jZWlsKGtleWxlbiAvIGhhc2hsZW4pO1xuICAgIGNvbnN0IFQgPSBuZXcgVWludDhBcnJheShoYXNobGVuICogTiArIGluZm8uYnl0ZUxlbmd0aCArIDEpO1xuICAgIGxldCBwcmV2ID0gMDtcbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIGZvciAobGV0IGMgPSAxOyBjIDw9IE47IGMrKykge1xuICAgICAgICBULnNldChpbmZvLCBzdGFydCk7XG4gICAgICAgIFRbc3RhcnQgKyBpbmZvLmJ5dGVMZW5ndGhdID0gYztcbiAgICAgICAgVC5zZXQoY3JlYXRlSG1hYyhkaWdlc3QsIHByaylcbiAgICAgICAgICAgIC51cGRhdGUoVC5zdWJhcnJheShwcmV2LCBzdGFydCArIGluZm8uYnl0ZUxlbmd0aCArIDEpKVxuICAgICAgICAgICAgLmRpZ2VzdCgpLCBzdGFydCk7XG4gICAgICAgIHByZXYgPSBzdGFydDtcbiAgICAgICAgc3RhcnQgKz0gaGFzaGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIFQuc2xpY2UoMCwga2V5bGVuKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js":
/*!****************************************************************!*\
  !*** ./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var _fallback_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fallback.js */ \"(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js\");\n\n\nlet hkdf;\nif (typeof crypto__WEBPACK_IMPORTED_MODULE_0__.hkdf === 'function' && !process.versions.electron) {\n    hkdf = async (...args) => new Promise((resolve, reject) => {\n        crypto__WEBPACK_IMPORTED_MODULE_0__.hkdf(...args, (err, arrayBuffer) => {\n            if (err)\n                reject(err);\n            else\n                resolve(new Uint8Array(arrayBuffer));\n        });\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (digest, ikm, salt, info, keylen) => (hkdf || _fallback_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(digest, ikm, salt, info, keylen));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9ydW50aW1lL2hrZGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWlDO0FBQ0k7QUFDckM7QUFDQSxXQUFXLHdDQUFXO0FBQ3RCO0FBQ0EsUUFBUSx3Q0FBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxpRUFBZSxvREFBb0Qsb0RBQVEsa0NBQWtDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmVsbG8tY2xvbmUvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9ydW50aW1lL2hrZGYuanM/NDBkOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBmYWxsYmFjayBmcm9tICcuL2ZhbGxiYWNrLmpzJztcbmxldCBoa2RmO1xuaWYgKHR5cGVvZiBjcnlwdG8uaGtkZiA9PT0gJ2Z1bmN0aW9uJyAmJiAhcHJvY2Vzcy52ZXJzaW9ucy5lbGVjdHJvbikge1xuICAgIGhrZGYgPSBhc3luYyAoLi4uYXJncykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjcnlwdG8uaGtkZiguLi5hcmdzLCAoZXJyLCBhcnJheUJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGRpZ2VzdCwgaWttLCBzYWx0LCBpbmZvLCBrZXlsZW4pID0+IChoa2RmIHx8IGZhbGxiYWNrKShkaWdlc3QsIGlrbSwgc2FsdCwgaW5mbywga2V5bGVuKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js\n");

/***/ })

};
;