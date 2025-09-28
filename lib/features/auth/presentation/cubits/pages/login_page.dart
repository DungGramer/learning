/*
  LOGIN PAGE UI
  This page provides the user interface for logging in.
*/

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_login/features/auth/presentation/components/apple_sign_in_button.dart';
import 'package:flutter_login/features/auth/presentation/components/google_sign_in_button.dart';
import 'package:flutter_login/features/auth/presentation/components/my_button.dart';
import 'package:flutter_login/features/auth/presentation/components/my_textfield.dart';
import 'package:flutter_login/features/auth/presentation/cubits/auth_cubit.dart';

class LoginPage extends StatefulWidget {
  final void Function()? togglePages;

  const LoginPage({super.key, required this.togglePages});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // Text Editing Controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  // Auth cubit
  late final authCubit = context.read<AuthCubit>();

  // Login button pressed
  void login() {
    final String email = emailController.text.trim();
    final String password = passwordController.text.trim();

    if (email.isNotEmpty && password.isNotEmpty) {
      // Call login method from AuthCubit
      authCubit.login(email, password);
    }
    // field(s) are empty
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please complete all fields")),
      );
    }
  }

  void openForgotPassword() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Forgot Password"),
          content: MyTextfield(
            controller: emailController,
            hintText: "Enter your email",
            obscureText: false,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text("Cancel"),
            ),

            TextButton(
              onPressed: () async {
                String message = await authCubit.forgotPassword(
                  emailController.text.trim(),
                );

                if (message == "Password reset email sent! Check your inbox.") {
                  Navigator.of(context).pop();
                  emailController.clear();
                }

                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text(message)));
              },
              child: Text("Reset"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("login")),

      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              // crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Icon(
                  Icons.lock_open,
                  size: 80,
                  color: Theme.of(context).colorScheme.primary,
                ),

                const SizedBox(height: 25),

                Text(
                  "Login Page",
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

                // Login button
                MyButton(text: "LOGIN", onTap: login),

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

                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    AppleSignInButton(
                      onTap: () async => authCubit.signInWithApple(),
                    ),
                    const SizedBox(width: 10),
                    GoogleSignInButton(
                      onTap: () async => authCubit.signInWithGoogle(),
                    ),
                  ],
                ),

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
                      onTap: widget.togglePages,
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
    );
  }
}
