/*
  REGISTER PAGE UI - Using GetX
  This page provides the user interface for registering with reactive state management
*/

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_login/features/auth/presentation/components/my_button.dart';
import 'package:flutter_login/features/auth/presentation/components/my_textfield.dart';
import 'package:flutter_login/features/auth/presentation/controllers/auth_controller.dart';

class RegisterPageGetX extends StatefulWidget {
  const RegisterPageGetX({super.key});

  @override
  State<RegisterPageGetX> createState() => _RegisterPageGetXState();
}

class _RegisterPageGetXState extends State<RegisterPageGetX> {
  // Text Editing Controllers
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  // Get Auth Controller
  final AuthController authController = Get.find<AuthController>();

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }

  // Register button pressed
  void register() {
    final String name = nameController.text.trim();
    final String email = emailController.text.trim();
    final String password = passwordController.text.trim();
    final String confirmPassword = confirmPasswordController.text.trim();

    // Validation
    if (name.isEmpty || email.isEmpty || password.isEmpty || confirmPassword.isEmpty) {
      Get.snackbar(
        'Validation Error',
        'Please complete all fields',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red,
      );
      return;
    }

    // Check password match
    if (password != confirmPassword) {
      Get.snackbar(
        'Password Mismatch',
        'Passwords do not match',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red,
      );
      return;
    }

    // Check password strength
    if (password.length < 6) {
      Get.snackbar(
        'Weak Password',
        'Password must be at least 6 characters',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.orange.withOpacity(0.1),
        colorText: Colors.orange,
      );
      return;
    }

    // Validate email format
    if (!GetUtils.isEmail(email)) {
      Get.snackbar(
        'Invalid Email',
        'Please enter a valid email address',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.red.withOpacity(0.1),
        colorText: Colors.red,
      );
      return;
    }

    // Call register method from AuthController
    authController.registerWithEmailPassword(name, email, password);
  }

  // Navigate to login page
  void goToLogin() {
    Get.toNamed('/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Create Account"),
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
                    Icons.person_add,
                    size: 80,
                    color: Theme.of(context).colorScheme.primary,
                  ),

                  const SizedBox(height: 25),

                  Text(
                    "Create Account",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.inversePrimary,
                    ),
                  ),

                  const SizedBox(height: 10),

                  Text(
                    "Join us today!",
                    style: TextStyle(
                      fontSize: 16,
                      color: Theme.of(context).colorScheme.inversePrimary,
                    ),
                  ),

                  const SizedBox(height: 25),

                  // Name textfield
                  MyTextfield(
                    controller: nameController,
                    hintText: "Full Name",
                    obscureText: false,
                  ),

                  const SizedBox(height: 10),

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
                    hintText: "Password (min 6 characters)",
                    obscureText: true,
                  ),

                  const SizedBox(height: 10),

                  // Confirm Password textfield
                  MyTextfield(
                    controller: confirmPasswordController,
                    hintText: "Confirm Password",
                    obscureText: true,
                  ),

                  const SizedBox(height: 25),

                  // Register button with loading state
                  Obx(() => MyButton(
                    text: authController.isLoading ? "CREATING ACCOUNT..." : "REGISTER",
                    onTap: authController.isLoading ? null : register,
                  )),

                  const SizedBox(height: 25),

                  // Terms and conditions text
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Text(
                      "By creating an account, you agree to our Terms of Service and Privacy Policy",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 12,
                        color: Theme.of(context).colorScheme.primary.withOpacity(0.7),
                      ),
                    ),
                  ),

                  const SizedBox(height: 25),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Already have an account? ',
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                      GestureDetector(
                        onTap: goToLogin,
                        child: Text(
                          'Login now',
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
