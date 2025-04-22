"use strict";
exports.id = 414;
exports.ids = [414];
exports.modules = {

/***/ 2414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// models/Sale.js

const saleSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    // المعلومات الأساسية
    amount: {
        type: Number,
        required: [
            true,
            "Amount is required"
        ],
        min: [
            0,
            "Amount cannot be negative"
        ]
    },
    status: {
        type: String,
        enum: [
            "pending",
            "completed",
            "canceled",
            "refunded"
        ],
        default: "completed",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Sale) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Sale", saleSchema)); // // models/Sale.js
 // import mongoose from "mongoose";
 // const saleSchema = new mongoose.Schema(
 //   {
 //     customerId: {
 //       type: mongoose.Schema.Types.ObjectId,
 //       ref: "Customer",
 //       required: [true, "Customer ID is required"],
 //     },
 //     productId: {
 //       type: mongoose.Schema.Types.ObjectId,
 //       ref: "Product",
 //       required: [true, "Product ID is required"],
 //     },
 // amount: {
 //   type: Number,
 //   required: [true, "Amount is required"],
 //   min: [0, "Amount cannot be negative"],
 // },
 //     date: {
 //       type: Date,
 //       default: Date.now,
 //     },
 //     createdAt: {
 //       type: Date,
 //       default: Date.now,
 //     },
 //     isDeleted: {
 //       type: Boolean,
 //       default: false,
 //     },
 //     deletedAt: {
 //       type: Date,
 //     },
 //   },
 //   { timestamps: true }
 // );
 // // saleSchema.pre(/^find/, function () {
 // //   this.where({ isDeleted: false });
 // // });
 // export default mongoose.models.Sale || mongoose.model("Sale", saleSchema);


/***/ })

};
;