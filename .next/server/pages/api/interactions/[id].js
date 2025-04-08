"use strict";
(() => {
var exports = {};
exports.id = 823;
exports.ids = [823];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 434:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Interaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(809);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/interactions/[id]/route.js



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/*

1. إنشاء تفاعل جديد (POST)

POST /api/interactions
Body:
{
  "customerId": "507f1f77bcf86cd799439011",
  "type": "call",
  "notes": "Customer agreed to schedule a demo"
}


2. جلب تفاعلات عميل معين (GET)

GET /api/interactions?customerId=507f1f77bcf86cd799439011



3. تحديث تفاعل (PUT)

PUT /api/interactions/507f1f77bcf86cd799439022
Body:
{
  "notes": "Updated notes after follow up"
}


4. حذف تفاعل (DELETE)

DELETE /api/interactions/507f1f77bcf86cd799439022
*/ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET - جلب تفاعل معين
handler.get(async (req, res)=>{
    try {
        const interaction = await _models_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(req.query.id).populate("customerId", "name email");
        if (!interaction) {
            return res.status(404).send({
                error: "Interaction not found"
            });
        }
        return res.send(interaction);
    } catch (error) {
        return res.status(500).send({
            error: "Failed to fetch interaction"
        });
    }
});
// PUT - تحديث تفاعل
handler.put(async (req, res)=>{
    try {
        const updatedInteraction = await _models_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedInteraction) {
            return res.status(404).send({
                error: "Interaction not found"
            });
        }
        return res.send(updatedInteraction);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        return res.status(500).send({
            error: "Failed to update interaction"
        });
    }
});
// DELETE - حذف تفاعل
// handler.delete(async (req, res) => {
//   try {
//     const deletedInteraction = await Interaction.findByIdAndDelete(req.query.id);
//     if (!deletedInteraction) {
//       return res.status(404).send({ error: 'Interaction not found' });
//     }
//     return res.send({ message: 'Interaction deleted successfully' });
//   } catch (error) {
//     return res.status(500).send({ error: 'Failed to delete interaction' });
//   }
// });
// /////////////////////////////
handler.delete(async (req, res)=>{
    try {
        const interaction = await _models_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(req.query.id);
        if (!interaction) {
            return res.status(404).json({
                error: "Interaction not found"
            });
        }
        interaction.isDeleted = true;
        interaction.deletedAt = new Date();
        await interaction.save();
        res.json({
            message: "Interaction soft deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete interaction"
        });
    }
});
// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }
const config = {
    api: {
        externalResolver: true
    }
};
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
var __webpack_exports__ = __webpack_require__.X(0, [762,809], () => (__webpack_exec__(434)));
module.exports = __webpack_exports__;

})();