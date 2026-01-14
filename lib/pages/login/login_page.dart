/*
  LOGIN PAGE UI - Using GetX
  This page provides the user interface for logging in with reactive state management
*/

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_login/features/auth/presentation/components/apple_sign_in_button.dart';
import 'package:flutter_login/features/auth/presentation/components/google_sign_in_button.dart';
import 'package:flutter_login/features/auth/presentation/components/my_button.dart';
import 'package:flutter_login/features/auth/presentation/components/my_textfield.dart';
import 'package:flutter_login/controllers/auth_controller.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // Text Editing Controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final forgotPasswordController = TextEditingController();

  // Get Auth Controller
  final AuthController authController = Get.find<AuthController>();

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    forgotPasswordController.dispose();
    super.dispose();
  }

  // Login button pressed
  void login() {
    final String email = emailController.text.trim();
    final String password = passwordController.text.trim();

    if (email.isNotEmpty && password.isNotEmpty) {
      // Call login method from AuthController
      authController.loginWithEmailPassword(email, password);
    } else {
      Get.snackbar(
        'Validation Error',
        'Please complete all fields',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red,
      );
    }
  }

  // Open forgot password dialog
  void openForgotPassword() {
    forgotPasswordController.clear();

    Get.dialog(
      AlertDialog(
        title: const Text("Forgot Password"),
        content: MyTextfield(
          controller: forgotPasswordController,
          hintText: "Enter your email",
          obscureText: false,
        ),
        actions: [
          TextButton(
            onPressed: () => Get.back(),
            child: const Text("Cancel"),
          ),
          Obx(() => TextButton(
            onPressed: authController.isLoading
              ? null
              : () async {
                  final email = forgotPasswordController.text.trim();
                  if (email.isNotEmpty) {
                    await authController.forgotPassword(email);
                    Get.back();
                    forgotPasswordController.clear();
                  } else {
                    Get.snackbar(
                      'Validation Error',
                      'Please enter your email',
                      snackPosition: SnackPosition.TOP,
                    );
                  }
                },
            child: authController.isLoading
              ? const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Text("Reset"),
          )),
        ],
      ),
    );
  }

  // Navigate to register page
  void goToRegister() {
    Get.toNamed('/register');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.lock_open,
                    size: 80,
                    color: Theme.of(context).colorScheme.primary,
                  ),

                  const SizedBox(height: 25),

                  Text(
                    "Welcome back!",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.inversePrimary,
                    ),
                  ),

                  const SizedBox(height: 10),

                  Text(
                    "Sign in to your account",
                    style: TextStyle(
                      fontSize: 16,
                      color: Theme.of(context).colorScheme.inversePrimary,
                    ),
                  ),

                  const SizedBox(height: 25),

                  // Email textfield
                  MyTextfield(
                    controller: emailController,
                    hintText: "Email",
                    obscureText: false,
                  ),

                  const SizedBox(height: 10),

                  // Password textfield
                  MyTextfield(
                    controller: passwordController,
                    hintText: "Password",
                    obscureText: true,
                  ),

                  const SizedBox(height: 10),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: openForgotPassword,
                        child: Text(
                          "Forgot Password?",
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 25),

                  // Login button with loading state
                  Obx(() => MyButton(
                    text: authController.isLoading ? "SIGNING IN..." : "LOGIN",
                    onTap: authController.isLoading ? null : login,
                  )),

                  const SizedBox(height: 25),

                  Row(
                    children: [
                      Expanded(
                        child: Divider(
                          color: Theme.of(context).colorScheme.tertiary,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text(
                          "Or continue with",
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Divider(
                          color: Theme.of(context).colorScheme.tertiary,
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 25),

                  // Social login buttons
                  Obx(() => Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      AppleSignInButton(
                        onTap: authController.isLoading
                          ? null
                          : () => authController.signInWithApple(),
                      ),
                      const SizedBox(width: 10),
                      GoogleSignInButton(
                        onTap: authController.isLoading
                          ? null
                          : () => authController.signInWithGoogle(),
                      ),
                    ],
                  )),

                  const SizedBox(height: 25),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Don\'t have an account? ',
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                      GestureDetector(
                        onTap: goToRegister,
                        child: Text(
                          'Register now',
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 25),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}