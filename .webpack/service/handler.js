(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handler.ts":
/*!********************!*\
  !*** ./handler.ts ***!
  \********************/
/*! exports provided: dailydoggo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dailydoggo\", function() { return dailydoggo; });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-fetch */ \"node-fetch\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var twit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! twit */ \"twit\");\n/* harmony import */ var twit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(twit__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction getFlickrURL(apiKey, date) {\n    return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&min_taken_date=${date}&format=json&nojsoncallback=1`;\n}\nfunction getDate() {\n    const date = new Date();\n    date.setDate(date.getDate() - 1);\n    return date.getTime() / 1000.0;\n}\nfunction buildPhotoURL(result) {\n    console.log('results');\n    const farm = result.photos.photo[0].farm;\n    const server = result.photos.photo[0].server;\n    const id = result.photos.photo[0].id;\n    const secret = result.photos.photo[0].secret;\n    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_c.jpg`;\n}\nfunction buildTweetText() {\n    return `Would you just LOOK at this doggo!`;\n}\nasync function sendTweet(text, image) {\n    const T = new twit__WEBPACK_IMPORTED_MODULE_2___default.a({\n        consumer_key: process.env.TWITTER_CONSUMER_KEY,\n        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,\n        access_token: process.env.TWITTER_ACCESS_TOKEN,\n        access_token_secret: process.env.TWITTER_ACCESS_SECRET,\n        timeout_ms: 60 * 1000,\n    });\n    console.log('Starting photo upload', image);\n    let upload = await T.post('media/upload', { media_data: image });\n    const params = { status: text, media_ids: [upload.data.media_id_string] };\n    return await T.post('statuses/update', params);\n}\nasync function getPhoto(url) {\n    let data = await node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(url).then(response => response.buffer());\n    return data.toString('base64');\n}\nconst dailydoggo = async (event, _context) => {\n    console.log(\"I am running....\");\n    const flickrURL = getFlickrURL(process.env.FLICKR_API_KEY, getDate());\n    const photoDetails = await node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(flickrURL).then(res => res.json());\n    const photoURL = buildPhotoURL(photoDetails);\n    const photo = await getPhoto(photoURL);\n    const status = buildTweetText();\n    await sendTweet(status, photo);\n    return { body: 'Success', statusCode: 200 };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9oYW5kbGVyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaGFuZGxlci50cz8zNmI5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUhhbmRsZXIgfSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBUd2l0IGZyb20gJ3R3aXQnXG5cbmZ1bmN0aW9uIGdldEZsaWNrclVSTChhcGlLZXk6IHN0cmluZywgZGF0ZTogbnVtYmVyKSB7XG4gIHJldHVybiBgaHR0cHM6Ly9hcGkuZmxpY2tyLmNvbS9zZXJ2aWNlcy9yZXN0Lz9tZXRob2Q9ZmxpY2tyLnBob3Rvcy5zZWFyY2gmYXBpX2tleT0ke2FwaUtleX0mdGFncz1kb2cmbWluX3Rha2VuX2RhdGU9JHtkYXRlfSZmb3JtYXQ9anNvbiZub2pzb25jYWxsYmFjaz0xYFxufVxuXG5mdW5jdGlvbiBnZXREYXRlKCkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gMSk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKS8xMDAwLjA7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUGhvdG9VUkwocmVzdWx0KSB7XG4gIGNvbnNvbGUubG9nKCdyZXN1bHRzJylcblxuICBjb25zdCBmYXJtID0gcmVzdWx0LnBob3Rvcy5waG90b1swXS5mYXJtO1xuICBjb25zdCBzZXJ2ZXIgPSByZXN1bHQucGhvdG9zLnBob3RvWzBdLnNlcnZlcjtcbiAgY29uc3QgaWQgPSByZXN1bHQucGhvdG9zLnBob3RvWzBdLmlkO1xuICBjb25zdCBzZWNyZXQgPSByZXN1bHQucGhvdG9zLnBob3RvWzBdLnNlY3JldDtcblxuICByZXR1cm4gYGh0dHBzOi8vZmFybSR7ZmFybX0uc3RhdGljZmxpY2tyLmNvbS8ke3NlcnZlcn0vJHtpZH1fJHtzZWNyZXR9X2MuanBnYFxufVxuXG5mdW5jdGlvbiBidWlsZFR3ZWV0VGV4dCgpIHtcbiAgLy8gVE9ETzogQnVpbGQgaW4gY3JlZGl0IGZvciBhdXRob3JcbiAgLy8gVE9ETzogVXNlIGEgc2FtcGxlIG9mIHBvc3RpbmdzXG4gIHJldHVybiBgV291bGQgeW91IGp1c3QgTE9PSyBhdCB0aGlzIGRvZ2dvIWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlbmRUd2VldCh0ZXh0LCBpbWFnZSkge1xuICBjb25zdCBUID0gbmV3IFR3aXQoe1xuICAgIGNvbnN1bWVyX2tleTogICAgICAgICBwcm9jZXNzLmVudi5UV0lUVEVSX0NPTlNVTUVSX0tFWSxcbiAgICBjb25zdW1lcl9zZWNyZXQ6ICAgICAgcHJvY2Vzcy5lbnYuVFdJVFRFUl9DT05TVU1FUl9TRUNSRVQsXG4gICAgYWNjZXNzX3Rva2VuOiAgICAgICAgIHByb2Nlc3MuZW52LlRXSVRURVJfQUNDRVNTX1RPS0VOLFxuICAgIGFjY2Vzc190b2tlbl9zZWNyZXQ6ICBwcm9jZXNzLmVudi5UV0lUVEVSX0FDQ0VTU19TRUNSRVQsXG4gICAgdGltZW91dF9tczogICAgICAgICAgIDYwKjEwMDAsICAvLyBvcHRpb25hbCBIVFRQIHJlcXVlc3QgdGltZW91dCB0byBhcHBseSB0byBhbGwgcmVxdWVzdHMuXG4gIH0pO1xuXG4gIGNvbnNvbGUubG9nKCdTdGFydGluZyBwaG90byB1cGxvYWQnLCBpbWFnZSk7XG5cbiAgbGV0IHVwbG9hZCA9IGF3YWl0IFQucG9zdCgnbWVkaWEvdXBsb2FkJywgeyBtZWRpYV9kYXRhOiBpbWFnZSB9KTtcbiAgLy9AdHMtaWdub3JlIC8vVHdpdCBoYXMgbGF6eSB0eXBpbmdzPyA6L1xuICBjb25zdCBwYXJhbXMgPSB7IHN0YXR1czogdGV4dCwgbWVkaWFfaWRzOiBbdXBsb2FkLmRhdGEubWVkaWFfaWRfc3RyaW5nXSB9XG5cbiAgcmV0dXJuIGF3YWl0IFQucG9zdCgnc3RhdHVzZXMvdXBkYXRlJywgcGFyYW1zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0UGhvdG8odXJsOiBzdHJpbmcpIHtcbiAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYnVmZmVyKCkpXG4gIHJldHVybiBkYXRhLnRvU3RyaW5nKCdiYXNlNjQnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRhaWx5ZG9nZ28gPSBhc3luYyAoZXZlbnQsIF9jb250ZXh0KSA9PiB7XG4gY29uc29sZS5sb2coXCJJIGFtIHJ1bm5pbmcuLi4uXCIpXG4gY29uc3QgZmxpY2tyVVJMID0gZ2V0RmxpY2tyVVJMKHByb2Nlc3MuZW52LkZMSUNLUl9BUElfS0VZLCBnZXREYXRlKCkpXG4gXG4gY29uc3QgcGhvdG9EZXRhaWxzID0gYXdhaXQgZmV0Y2goZmxpY2tyVVJMKS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiBjb25zdCBwaG90b1VSTCA9IGJ1aWxkUGhvdG9VUkwocGhvdG9EZXRhaWxzKTtcblxuIGNvbnN0IHBob3RvID0gYXdhaXQgZ2V0UGhvdG8ocGhvdG9VUkwpO1xuIGNvbnN0IHN0YXR1cyA9IGJ1aWxkVHdlZXRUZXh0KCk7XG4gYXdhaXQgc2VuZFR3ZWV0KHN0YXR1cywgcGhvdG8pXG5cbiByZXR1cm4ge2JvZHk6ICdTdWNjZXNzJywgc3RhdHVzQ29kZTogMjAwfTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./handler.ts\n");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-fetch\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1mZXRjaC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtZmV0Y2hcIj81Y2Q1Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///node-fetch\n");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"source-map-support/register\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCI/ZGExNiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXJcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///source-map-support/register\n");

/***/ }),

/***/ "twit":
/*!***********************!*\
  !*** external "twit" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"twit\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInR3aXRcIj8yZmJmIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aXRcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///twit\n");

/***/ })

/******/ })));