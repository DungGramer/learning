/*
  App Pages - GetX Routing Configuration
*/

import 'package:get/get.dart';
import 'package:flutter_login/bindings/auth_binding.dart';
import 'package:flutter_login/middlewares/auth_middleware.dart';
import 'package:flutter_login/pages/login/login_page.dart';
import 'package:flutter_login/pages/register/register_page.dart';
import 'package:flutter_login/pages/loading_page.dart';
import 'package:flutter_login/pages/home/home_page.dart';

class AppPages {
  static const initial = '/loading';
  
  static final routes = [
    // Loading Page - Initial route
    GetPage(
      name: '/loading',
      page: () => const LoadingPage(),
      binding: AuthBinding(),
    ),
    
    // Authentication Pages
    GetPage(
      name: '/login',
      page: () => const LoginPage(),
      binding: AuthBinding(),
      middlewares: [LoginMiddleware()],
    ),
    
    GetPage(
      name: '/register',
      page: () => const RegisterPage(),
      binding: AuthBinding(),
      middlewares: [LoginMiddleware()],
    ),
    
    // Protected Pages
    GetPage(
      name: '/home',
      page: () => const HomePage(),
      middlewares: [AuthMiddleware()],
    ),
  ];
}