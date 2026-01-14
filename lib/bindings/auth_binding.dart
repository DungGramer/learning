/*
  AuthBinding handles dependency injection for authentication-related controllers and services
*/

import 'package:get/get.dart';
import 'package:flutter_login/services/auth_service.dart';
import 'package:flutter_login/services/firebase_auth_service.dart';
import 'package:flutter_login/controllers/auth_controller.dart';

class AuthBinding extends Bindings {
  @override
  void dependencies() {
    // Register AuthService implementation
    Get.lazyPut<AuthService>(
      () => FirebaseAuthService(),
      fenix: true, // Keep alive even when not used
    );

    // Register AuthController
    Get.put<AuthController>(
      AuthController(authService: Get.find<AuthService>()),
      permanent: true, // Keep alive for app lifetime
    );
  }
}