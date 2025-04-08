"use strict";
(() => {
var exports = {};
exports.id = 25;
exports.ids = [25];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 1843:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Interaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(809);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/interactions/route.js



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/*

1. إنشاء تفاعل جديد (POST)

POST /api/interactions
Body:
{
  "customerId": "67f2ed8f095b61a2f3b24a53",
  "type": "call",
  "notes": "Customer agreed to schedule a demo"
}

*/ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET - جلب جميع التفاعلات
handler.get(async (req, res)=>{
    try {
        const interactions = await _models_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
            isDeleted: false
        }).sort({
            date: -1
        }).populate("customerId", "name email");
        return res.send(interactions);
    } catch (error) {
        return res.status(500).send({
            error: "Failed to fetch interactions"
        });
    }
});
// POST - إنشاء تفاعل جديد
handler.post(async (req, res)=>{
    try {
        const { customerId , type , date , notes , userId  } = req.body;
        // التحقق من الحقول المطلوبة
        if (!customerId || !type) {
            return res.status(400).send({
                error: "Customer ID and type are required"
            });
        }
        const newInteraction = new _models_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
            customerId,
            type,
            date: date || Date.now(),
            notes,
            userId
        });
        await newInteraction.save();
        return res.status(201).send(newInteraction);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        return res.status(500).send({
            error: "Failed to create interaction"
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
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,809], () => (__webpack_exec__(1843)));
module.exports = __webpack_exports__;

})();