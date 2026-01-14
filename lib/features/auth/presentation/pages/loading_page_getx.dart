/*
  Loading Page - GetX version
  This page shows while checking authentication status
*/

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_login/features/auth/presentation/controllers/auth_controller.dart';

class LoadingPageGetX extends StatelessWidget {
  const LoadingPageGetX({super.key});

  @override
  Widget build(BuildContext context) {
    // Listen for auth status changes and navigate accordingly
    final authController = Get.find<AuthController>();

    // Listen to auth status changes
    ever(authController.authStatusObs, (status) {
      switch (status) {
        case AuthStatus.authenticated:
          Get.offAllNamed('/home');
          break;
        case AuthStatus.unauthenticated:
          Get.offAllNamed('/login');
          break;
        case AuthStatus.unknown:
          // Stay on loading page
          break;
      }
    });

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // App logo or icon
            Icon(
              Icons.lock_outline,
              size: 80,
              color: Theme.of(context).colorScheme.primary,
            ),

            const SizedBox(height: 32),

            // Loading indicator
            CircularProgressIndicator(
              color: Theme.of(context).colorScheme.primary,
            ),

            const SizedBox(height: 32),

            // Loading text
            Text(
              'Loading...',
              style: TextStyle(
                fontSize: 16,
                color: Theme.of(context).colorScheme.onSurface,
              ),
            ),

            const SizedBox(height: 16),

            // App name or subtitle
            Text(
              'Checking authentication status',
              style: TextStyle(
                fontSize: 14,
                color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
