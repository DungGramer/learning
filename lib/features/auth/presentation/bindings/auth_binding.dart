/*
  AuthBinding handles dependency injection for authentication-related controllers and services
  This is where we configure all dependencies needed for the auth module
*/

import 'package:get/get.dart';
import 'package:flutter_login/features/auth/data/firebase_auth_repo.dart';
import 'package:flutter_login/features/auth/domain/repos/auth_repo.dart';
import 'package:flutter_login/features/auth/presentation/controllers/auth_controller.dart';

class AuthBinding extends Bindings {
  @override
  void dependencies() {
    // Register AuthRepo implementation
    Get.lazyPut<AuthRepo>(
      () => FirebaseAuthRepo(),
      fenix: true, // Keep alive even when not used
    );

    // Register AuthController
    Get.put<AuthController>(
      AuthController(authRepo: Get.find<AuthRepo>()),
      permanent: true, // Keep alive for app lifetime
    );
  }
}
