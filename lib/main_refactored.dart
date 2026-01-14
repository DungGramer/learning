import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_login/routes/app_pages.dart';
import 'package:flutter_login/bindings/auth_binding.dart';
import 'package:flutter_login/themes/dark_mode.dart';
import 'package:flutter_login/themes/light_mode.dart';
import 'package:flutter_login/services/auth_service.dart';
import 'package:flutter_login/services/firebase_auth_service.dart';

import 'firebase_options.dart';

void main() async {
  // Initialize Firebase
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Configure Firebase Auth settings for development
  FirebaseAuth.instance.setSettings(
    appVerificationDisabledForTesting: true,
    userAccessGroup: null,
  );

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Flutter Login GetX',
      debugShowCheckedModeBanner: false,
      theme: lightMode,
      darkTheme: darkMode,
      themeMode: ThemeMode.system,
      
      // GetX Routing Configuration
      initialRoute: AppPages.initial,
      getPages: AppPages.routes,
      
      // Initial Binding - This will be executed before any page
      initialBinding: AuthBinding(),
      
      // Default transition for all pages
      defaultTransition: Transition.fade,
      transitionDuration: const Duration(milliseconds: 300),
      
      // Global navigation settings
      enableLog: true,
      logWriterCallback: (String text, {bool isError = false}) {
        if (isError) {
          print('GetX Error: $text');
        } else {
          print('GetX Log: $text');
        }
      },
      
      // Initialize Firebase auth service
      onInit: () async {
        final authService = Get.find<AuthService>();
        if (authService is FirebaseAuthService) {
          await authService.initializeGoogleSignIn();
        }
      },
    );
  }
}