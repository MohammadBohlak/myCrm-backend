"use strict";
exports.id = 809;
exports.ids = [809];
exports.modules = {

/***/ 809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// models/Interaction.js

const interactionSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    userId: {
        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
        ref: "User",
        required: true
    },
    customerId: {
        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
        ref: "Customer",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            "call",
            "email",
            "meeting"
        ],
        default: "call"
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    },
    createdAt: {
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
});
// interactionSchema.pre(/^find/, function () {
//   this.where({ isDeleted: false });
// });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Interaction) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Interaction", interactionSchema));


/***/ })

};
;