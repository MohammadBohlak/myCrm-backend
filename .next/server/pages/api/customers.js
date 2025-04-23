"use strict";
(() => {
var exports = {};
exports.id = 303;
exports.ids = [303];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 7481:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3285);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var _utils_cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1040);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/customers/route.js





// import { runMiddleware } from '@/utils/cors';
(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET جميع العملاء
handler.get(async (req, res)=>{
    // await runMiddleware(req, res, cors);
    try {
        const { search , status  } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    company: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }
        if (status) {
            query.status = status;
        }
        const customers = await _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
            ...query,
            isDeleted: false
        }).sort({
            createdAt: -1
        });
        res.send(customers);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch customers"
        });
    }
});
// POST إنشاء عميل جديد
handler.post(async (req, res)=>{
    await (0,_utils_cors__WEBPACK_IMPORTED_MODULE_3__/* .runMiddleware */ .U)(req, res, _utils_cors__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
    const { name , email , company , status , userId  } = req.body;
    if (!name || !email) {
        //   await session.abortTransaction();
        return res.status(400).send({
            error: "Name and email are required"
        });
    }
    const newCustomer = new _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
        name,
        email,
        company,
        status: status || "lead",
        userId
    });
    try {
        await newCustomer.save();
        res.status(201).send(newCustomer);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                error: "Email already exists"
            });
        }
    }
    res.status(500).send({
        error: "Failed to create customer"
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1040:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ utils_cors),
  "U": () => (/* binding */ runMiddleware)
});

;// CONCATENATED MODULE: external "cors"
const external_cors_namespaceObject = require("cors");
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_namespaceObject);
;// CONCATENATED MODULE: ./utils/cors.js
// utils/cors.js

// تهيئة CORS للسماح بجميع المصادر
const cors = external_cors_default()({
    origin: "*",
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ]
});
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}
/* harmony default export */ const utils_cors = (cors);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,285], () => (__webpack_exec__(7481)));
module.exports = __webpack_exports__;

})();