"use strict";
(() => {
var exports = {};
exports.id = 204;
exports.ids = [204];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 748:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/users/route.js



// Connect to database
(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
/**
POST /api/users/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "simplepassword",
  "role": "customer"
  "userName" : "kajsdkwh"
}
 */ handler.post(async (req, res)=>{
    try {
        const { userName , email , password , role ="customer"  } = req.body;
        // Validation
        if (!email) {
            return res.status(400).send({
                error: "Email is required"
            });
        }
        if (!password) {
            return res.status(400).send({
                error: "Password is required"
            });
        }
        if (!userName) {
            return res.status(400).send({
                error: "User Name is required"
            });
        }
        // Check if user exists
        const exists = await _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            email
        });
        if (exists) {
            return res.status(400).send({
                error: "Email is already exists"
            });
        }
        const existsName = await _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            userName
        });
        if (existsName) {
            return res.status(400).send({
                error: "User Name is already exists"
            });
        }
        // Create user (password stored in plaintext - FOR TESTING ONLY)
        const user = new _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
            email,
            password,
            userName,
            role
        });
        await user.save();
        // Return user without password (even though it's plaintext)
        const userData = user.toObject();
        delete userData.password;
        return res.status(201).send(userData);
    } catch (error) {
        return res.status(500).send({
            error: "User registration failed"
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,76], () => (__webpack_exec__(748)));
module.exports = __webpack_exports__;

})();