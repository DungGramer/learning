/*
  Auth Page - Using GetX Router
  This page is not needed when using GetX routing, but included for reference
*/

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_login/features/auth/presentation/pages/login_page_getx.dart';
import 'package:flutter_login/features/auth/presentation/pages/register_page_getx.dart';

class AuthPageGetX extends StatefulWidget {
  const AuthPageGetX({super.key});

  @override
  State<AuthPageGetX> createState() => _AuthPageGetXState();
}

class _AuthPageGetXState extends State<AuthPageGetX> {
  // Initially show login page
  final RxBool showLoginPage = true.obs;

  // Toggle between login and register
  void togglePages() {
    showLoginPage.value = !showLoginPage.value;
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() => showLoginPage.value
        ? const LoginPageGetX()
        : const RegisterPageGetX());
  }
}
