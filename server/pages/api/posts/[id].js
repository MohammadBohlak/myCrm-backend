"use strict";
(() => {
var exports = {};
exports.id = 789;
exports.ids = [789];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 6631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mongoose = __webpack_require__(1185);
const postSchema = new mongoose.Schema({
    name: String,
    value: Number,
    price: Number,
    cost: Number
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose.models.Post || mongoose.model("Post", postSchema));


/***/ }),

/***/ 107:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6631);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4405);
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5616);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_2__]);
next_connect__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_2__["default"])().delete(async (req, res)=>{
    try {
        const posts = await _models_Post__WEBPACK_IMPORTED_MODULE_0__/* ["default"].findOneAndDelete */ .Z.findOneAndDelete({
            _id: req.query.id
        });
        res.send({
            message: "Deleted Successfuly"
        });
    } catch (error) {
        return res.status(400).json({
            message: "Sorry something went wrong !"
        });
    }
}).put(async (req, res)=>{
    try {
        const post = await _models_Post__WEBPACK_IMPORTED_MODULE_0__/* ["default"].findOne */ .Z.findOne({
            _id: req.query.id
        });
        post.name = req.body.name;
        post.value = req.body.value;
        post.price = Number(post.value) / 1000 * 1250;
        post.cost = Number(post.value) / 1000 * 1043;
        await post.save();
        res.send({
            satus: 200,
            message: "successful",
            customer: post
        });
    } catch (error) {
        return res.status(400).json({
            message: "Sorry something went wrong !"
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ dbConnect)
/* harmony export */ });
const mongoose = __webpack_require__(1185);
async function dbConnect() {
    try {
        await mongoose.connect("mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/mydata", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected successfully !");
    } catch (error) {
        console.log("field connected");
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(107));
module.exports = __webpack_exports__;

})();