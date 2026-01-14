/*
  App Pages - GetX Routing Configuration
  This file defines all the routes and pages for the application
*/

import 'package:get/get.dart';
import 'package:flutter_login/features/auth/presentation/bindings/auth_binding.dart';
import 'package:flutter_login/features/auth/presentation/middlewares/auth_middleware.dart';
import 'package:flutter_login/features/auth/presentation/pages/login_page_getx.dart';
import 'package:flutter_login/features/auth/presentation/pages/register_page_getx.dart';
import 'package:flutter_login/features/auth/presentation/pages/loading_page_getx.dart';
import 'package:flutter_login/features/home/presentation/page/home_page_getx.dart';

class AppPages {
  static const initial = '/loading';

  static final routes = [
    // Loading Page - Initial route
    GetPage(
      name: '/loading',
      page: () => const LoadingPageGetX(),
      binding: AuthBinding(),
    ),

    // Authentication Pages
    GetPage(
      name: '/login',
      page: () => const LoginPageGetX(),
      binding: AuthBinding(),
      middlewares: [LoginMiddleware()],
    ),

    GetPage(
      name: '/register',
      page: () => const RegisterPageGetX(),
      binding: AuthBinding(),
      middlewares: [LoginMiddleware()],
    ),

    // Protected Pages
    GetPage(
      name: '/home',
      page: () => const HomePageGetX(),
      middlewares: [AuthMiddleware()],
    ),
  ];
}
