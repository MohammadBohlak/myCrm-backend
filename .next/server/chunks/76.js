"use strict";
exports.id = 76;
exports.ids = [76];
exports.modules = {

/***/ 76:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// models/User.js

const userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            "admin",
            "customer"
        ],
        default: "customer"
    },
    theme: {
        type: String,
        enum: [
            "light",
            "dark",
            "red",
            "blue",
            "green",
            "yellow"
        ],
        default: "light"
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
            "inactive",
            "member"
        ],
        default: "member"
    }
}, {
    timestamps: true
});
// لمنع تسجيل دخول المستخدمين المحذوفين
userSchema.methods.isActive = function() {
    return !this.isDeleted;
};
// في middleware حذف المستخدم
userSchema.pre("save", function(next) {
    if (this.isModified("isDeleted") && this.isDeleted) {
        // تحديث العملاء المرتبطين
        Customer.updateMany({
            userId: this._id
        }, {
            $set: {
                isDeleted: true
            }
        }).exec();
    }
    next();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.User) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("User", userSchema));


/***/ })

};
;