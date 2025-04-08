"use strict";
(() => {
var exports = {};
exports.id = 143;
exports.ids = [143];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 4937:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3285);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var _models_Sale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2414);
/* harmony import */ var _models_Interaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(809);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/customers/[id]/route.js





// الاتصال بقاعدة البيانات
(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET - جلب بيانات عميل معين
handler.get(async (req, res)=>{
    try {
        const customer = await _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(req.query.id);
        if (!customer) {
            return res.status(404).send({
                error: "Customer not found"
            });
        }
        return res.send(customer);
    } catch (error) {
        return res.status(500).send({
            error: "Failed to fetch customer"
        });
    }
});
// PUT - تحديث بيانات العميل
handler.put(async (req, res)=>{
    try {
        const updateData = req.body;
        const updatedCustomer = await _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, {
            ...updateData,
            updatedAt: Date.now()
        }, {
            new: true,
            runValidators: true
        });
        if (!updatedCustomer) {
            return res.status(404).send({
                error: "Customer not found"
            });
        }
        return res.send(updatedCustomer);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        return res.status(500).send({
            error: "Failed to update customer"
        });
    }
});
// DELETE - حذف العميل بشكل فعلي
// handler.delete(async (req, res) => {
//   try {
//     const deletedCustomer = await Customer.findByIdAndDelete(req.query.id);
//     if (!deletedCustomer) {
//       return res.status(404).send({ error: 'Customer not found' });
//     }
//     return res.send({ message: 'Customer deleted successfully' });
//   } catch (error) {
//     return res.status(500).send({ error: 'Failed to delete customer' });
//   }
// });
//////////////////////////////
handler.delete(async (req, res)=>{
    try {
        //   const customer = await Customer.findById(req.query.id);
        const customer = await _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, {
            isDeleted: true
        }, {
            new: true,
            runValidators: true
        });
        if (!customer) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }
        customer.isDeleted = true;
        customer.deletedAt = new Date();
        await customer.save();
        // حذف ناعم للبيانات المرتبطة
        await _models_Interaction__WEBPACK_IMPORTED_MODULE_4__/* ["default"].updateMany */ .Z.updateMany({
            customerId: customer._id
        }, {
            $set: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        await _models_Sale__WEBPACK_IMPORTED_MODULE_3__/* ["default"].updateMany */ .Z.updateMany({
            customerId: customer._id
        }, {
            $set: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        res.json({
            message: "Customer and related data soft deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete customer"
        });
    }
});
// export default async function handlerWrapper(req, res) {
//   // نمرر الـ id كـ query parameter
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
var __webpack_exports__ = __webpack_require__.X(0, [762,414,285,809], () => (__webpack_exec__(4937)));
module.exports = __webpack_exports__;

})();