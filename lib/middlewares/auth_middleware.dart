/*
  AuthMiddleware handles route protection and authentication checks
*/

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_login/controllers/auth_controller.dart';

class AuthMiddleware extends GetMiddleware {
  @override
  int? get priority => 1;

  @override
  RouteSettings? redirect(String? route) {
    // Get auth controller
    final authController = Get.find<AuthController>();
    
    // If user is not authenticated, redirect to login
    if (authController.authStatus == AuthStatus.unauthenticated) {
      return const RouteSettings(name: '/login');
    }
    
    // If auth status is unknown, wait for it to be determined
    if (authController.authStatus == AuthStatus.unknown) {
      return const RouteSettings(name: '/loading');
    }
    
    // Allow access to the requested route
    return null;
  }
}

class LoginMiddleware extends GetMiddleware {
  @override
  int? get priority => 1;

  @override
  RouteSettings? redirect(String? route) {
    // Get auth controller
    final authController = Get.find<AuthController>();
    
    // If user is already authenticated, redirect to home
    if (authController.authStatus == AuthStatus.authenticated) {
      return const RouteSettings(name: '/home');
    }
    
    // Allow access to login/register pages
    return null;
  }
}