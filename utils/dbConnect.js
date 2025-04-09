// utils/dbConnect.js
// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/myCrm';

// // تحذير أمني: لا تخزن كلمات المرور مباشرة في الكود
// // الأفضل استخدام متغيرات البيئة (process.env)

// let cachedConnection = null;

// async function dbConnect() {
//   if (cachedConnection) {
//     return cachedConnection;
//   }

//   try {
//     // إعدادات اتصال محسنة
//     const options = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       maxPoolSize: 10, // زيادة عدد الاتصالات المتزامنة
//       serverSelectionTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//     };

//     mongoose.set('strictQuery', true); // مهم للحذف المتتالي
//     mongoose.set('bufferCommands', false); // تحسين الأداء

//     const connection = await mongoose.connect(MONGODB_URI, options);
    
//     console.log('Connected to MongoDB successfully!');
//     cachedConnection = connection;
    
//     return connection;
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     throw error; // إعادة الخطأ للتعامل معه في الطبقات الأعلى
//   }
// }

// // Middleware للاتصال التلقائي (اختياري)
// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connected to DB');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Mongoose connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose disconnected');
// });

// // إغلاق الاتصال عند إنهاء التطبيق
// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   process.exit(0);
// });

// export default dbConnect;


const mongoose = require('mongoose');

export default  async function dbConnect() {
    try {
      await mongoose.connect('mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/myCrm' ,
      {useUnifiedTopology:true , useNewUrlParser:true});

      console.log('Connected successfully !')

    } catch (error) {
        console.log("field connected\n" , error) 
    }
}
// mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/
 