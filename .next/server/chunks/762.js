"use strict";
exports.id = 762;
exports.ids = [762];
exports.modules = {

/***/ 4405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// utils/dbConnect.js

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/myCrm";
// تحذير أمني: لا تخزن كلمات المرور مباشرة في الكود
// الأفضل استخدام متغيرات البيئة (process.env)
let cachedConnection = null;
async function dbConnect() {
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        // إعدادات اتصال محسنة
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        };
        mongoose__WEBPACK_IMPORTED_MODULE_0___default().set("strictQuery", true); // مهم للحذف المتتالي
        mongoose__WEBPACK_IMPORTED_MODULE_0___default().set("bufferCommands", false); // تحسين الأداء
        const connection = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, options);
        console.log("Connected to MongoDB successfully!");
        cachedConnection = connection;
        return connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; // إعادة الخطأ للتعامل معه في الطبقات الأعلى
    }
}
// Middleware للاتصال التلقائي (اختياري)
mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on("connected", ()=>{
    console.log("Mongoose connected to DB");
});
mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on("error", (err)=>{
    console.error("Mongoose connection error:", err);
});
mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on("disconnected", ()=>{
    console.log("Mongoose disconnected");
});
// إغلاق الاتصال عند إنهاء التطبيق
process.on("SIGINT", async ()=>{
    await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.close();
    process.exit(0);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect); // const mongoose = require('mongoose');
 // export default  async function dbConnect() {
 //     try {
 //       await mongoose.connect('mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/myCrm' ,
 //       {useUnifiedTopology:true , useNewUrlParser:true});
 //       console.log('Connected successfully !')
 //     } catch (error) {
 //         console.log("field connected\n" , error) 
 //     }
 // }
 // // mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/


/***/ })

};
;