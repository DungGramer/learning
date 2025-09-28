/*
  Auth Page - Decides whether to show Login or Register Page
*/

import 'package:flutter/material.dart';
import 'package:flutter_login/features/auth/presentation/cubits/pages/login_page.dart';
import 'package:flutter_login/features/auth/presentation/cubits/pages/register_page.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({super.key});

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  // initially show login page
  bool showLoginPage = true;

  // toggle between login and register
  void togglePages() {
    setState(() {
      showLoginPage = !showLoginPage;
    });
  }

  @override
  Widget build(BuildContext context) {
    return showLoginPage
        ? LoginPage(togglePages: togglePages)
        : RegisterPage(togglePages: togglePages);
  }
}
