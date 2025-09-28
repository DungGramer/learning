import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_login/features/auth/data/firebase_auth_repo.dart';
import 'package:flutter_login/features/auth/presentation/components/loading.dart';
import 'package:flutter_login/features/auth/presentation/cubits/auth_cubit.dart';
import 'package:flutter_login/features/auth/presentation/cubits/auth_states.dart';
import 'package:flutter_login/features/auth/presentation/cubits/pages/auth_page.dart';
import 'package:flutter_login/features/home/presentation/page/home_page.dart';
import 'package:flutter_login/themes/dark_mode.dart';
import 'package:flutter_login/themes/light_mode.dart';

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

  // Auth repo
  final firebaseAuthRepo = FirebaseAuthRepo();

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      // Provide cubits to app
      providers: [
        // Auth Cubit
        BlocProvider<AuthCubit>(
          create: (context) =>
              AuthCubit(authRepo: firebaseAuthRepo)..checkAuth(),
        ),
      ],

      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: lightMode,
        darkTheme: darkMode,
        home: BlocConsumer<AuthCubit, AuthStates>(
          builder: (context, state) {
            print("Auth State: $state");

            // Unauthenticated -> Auth Page (Login/Register)
            if (state is Unauthenticated) {
              return const AuthPage();
            }
            // Authenticated -> Home Page
            else if (state is Authenticated) {
              return const HomePage();
            }
            // Loading -> Loading indicator
            else {
              return const LoadingScreen();
            }
          },
          // Listen to state changes
          listener: (context, state) {
            if (state is AuthError) {
              // Show error message
              final snackBar = SnackBar(content: Text(state.message));
              ScaffoldMessenger.of(context).showSnackBar(snackBar);
            }
          },
        ),
      ),
    );
  }
}
