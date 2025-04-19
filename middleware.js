// ملف: middleware.js (في الجذر الرئيسي)
import { NextResponse } from 'next/server';

export default function middleware(request) {
  // إنشاء كائن Headers جديد للاستجابة
  const headers = new Headers();
  
  // إعدادات الـ CORS
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // معالجة طلبات OPTIONS (Preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: headers
    });
  }

  // للطلبات العادية (GET, POST, etc.)
  const response = NextResponse.next();
  
  // إضافة الـ headers إلى الاستجابة
  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/api/:path*',
};