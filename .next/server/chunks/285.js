"use strict";
exports.id = 285;
exports.ids = [285];
exports.modules = {

/***/ 3285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// models/Customer.js

const customerSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    userId: {
        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: [
            true,
            "Name is required"
        ],
        trim: true
    },
    email: {
        type: String,
        required: [
            true,
            "Email is required"
        ],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /.+\@.+\..+/,
            "Please enter a valid email"
        ]
    },
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: [
            "lead",
            "active",
            "inactive"
        ],
        default: "lead"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
// تحديث حقل updatedAt قبل الحفظ
// customerSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });
// customerSchema.pre(/^find/, function() {
//     this.where({ isDeleted: false });
//   });
// في middleware حذف العميل
customerSchema.pre("save", function(next) {
    if (this.isModified("isDeleted") && this.isDeleted) {
        // تحديث المبيعات المرتبطة
        Sale.updateMany({
            customerId: this._id
        }, {
            isDeleted: true,
            deletedAt: new Date()
        }).exec();
        // تحديث التفاعلات المرتبطة
        Interaction.updateMany({
            customerId: this._id
        }, {
            isDeleted: true,
            deletedAt: new Date()
        }).exec();
    }
    next();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Customer) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Customer", customerSchema));


/***/ })

};
;