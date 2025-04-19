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
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/customers/route.js



// import cors from '@/utils/cors';
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
            query
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
    const { name , email , phone , company , status , userId  } = req.body;
    if (!name || !email) {
        //   await session.abortTransaction();
        return res.status(400).send({
            error: "Name and email are required"
        });
    }
    const newCustomer = new _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
        name,
        email,
        phone,
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