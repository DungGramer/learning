/*
 FIREBASE IS OUR BACKEND - You can swap out any backend here...
*/

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_login/features/auth/domain/entities/app_user.dart';
import 'package:flutter_login/features/auth/domain/repos/auth_repo.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

class FirebaseAuthRepo implements AuthRepo {
  // Access to firebase
  final FirebaseAuth firebaseAuth = FirebaseAuth.instance;

  // Google Sign-In singleton instance
  final GoogleSignIn _googleSignIn = GoogleSignIn.instance;

  // Flag to track if GoogleSignIn has been initialized
  bool _googleSignInInitialized = false;

  // Initialize Google Sign-In (call this once when the app starts)
  Future<void> initializeGoogleSignIn() async {
    if (!_googleSignInInitialized) {
      await _googleSignIn.initialize();
      _googleSignInInitialized = true;
    }
  }

  // Clear Google Sign-In authorization tokens and cache
  Future<void> clearGoogleSignInCache() async {
    try {
      if (_googleSignInInitialized) {
        // First try to sign out, which should clear most cache
        await _googleSignIn.signOut();

        // If we have a way to get current access tokens, we could clear them specifically
        // But for now, signing out should be sufficient
      }
    } catch (e) {
      print('Failed to clear Google Sign-In cache: $e');
    }
  }

  @override
  Future<AppUser?> loginWithEmailPassword(String email, String password) async {
    try {
      UserCredential userCredential = await firebaseAuth
          .signInWithEmailAndPassword(email: email, password: password);

      AppUser user = AppUser(uid: userCredential.user!.uid, email: email);

      return user;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  @override
  Future<AppUser?> registerWithEmailPassword(
    String name,
    String email,
    String password,
  ) async {
    try {
      // Disable app verification for development
      firebaseAuth.setSettings(appVerificationDisabledForTesting: true);

      UserCredential userCredential = await firebaseAuth
          .createUserWithEmailAndPassword(email: email, password: password);

      AppUser user = AppUser(uid: userCredential.user!.uid, email: email);

      return user;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  @override
  Future<void> deleteAccount() async {
    try {
      final user = firebaseAuth.currentUser;

      if (user == null) throw Exception('No user is currently signed in.');

      await user.delete();

      await logout();
    } catch (e) {
      throw Exception('Delete account failed: $e');
    }
  }

  @override
  Future<AppUser?> getCurrentUser() async {
    try {
      final firebaseUser = firebaseAuth.currentUser;

      if (firebaseUser == null) return null;

      return AppUser(uid: firebaseUser.uid, email: firebaseUser.email!);
    } catch (e) {
      throw Exception('Get current user failed: $e');
    }
  }

  @override
  Future<void> logout() async {
    try {
      // Sign out from Google Sign-In if initialized
      if (_googleSignInInitialized) {
        await _googleSignIn.signOut();
      }

      // Sign out from Firebase
      await firebaseAuth.signOut();
    } catch (e) {
      throw Exception('Logout failed: $e');
    }
  }

  @override
  Future<String> sendPasswordResetEmail(String email) async {
    try {
      await firebaseAuth.sendPasswordResetEmail(email: email);
      return 'Password reset email sent! Check your inbox.';
    } catch (e) {
      throw Exception('Send password reset email failed: $e');
    }
  }

  @override
  Future<AppUser?> signInWithApple() async {
    try {
      // Request Apple ID credential
      final appleCredential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );

      final oAuthCredential = OAuthProvider("apple.com").credential(
        idToken: appleCredential.identityToken,
        accessToken: appleCredential.authorizationCode,
      );

      // Sign in to Firebase with the Apple credential
      UserCredential userCredential = await firebaseAuth.signInWithCredential(
        oAuthCredential,
      );

      // Firebase user
      final firebaseUser = userCredential.user;

      if (firebaseUser == null) return null;

      return AppUser(uid: firebaseUser.uid, email: firebaseUser.email ?? '');
    } catch (e) {
      throw Exception('Sign in with Apple failed: $e');
    }
  }

  @override
  Future<AppUser?> signInWithGoogle() async {
    try {
      // Initialize Google Sign-In if not already initialized
      await initializeGoogleSignIn();

      GoogleSignInAccount? gUser;

      // Try lightweight authentication first
      final lightweightResult = _googleSignIn.attemptLightweightAuthentication();
      if (lightweightResult != null) {
        try {
          await lightweightResult;
          // Check if we have a current user after lightweight auth
          // In 7.x, we should listen to authenticationEvents, but for simplicity
          // we'll proceed to explicit authentication
        } catch (e) {
          print('Lightweight authentication failed: $e');
        }
      }

      // Check platform support and authenticate
      if (!_googleSignIn.supportsAuthenticate()) {
        throw Exception('This platform does not support the authenticate method. You may need platform-specific implementation.');
      }

      // Attempt authentication with error handling
      try {
        final GoogleSignInAccount? authenticatedUser = await _googleSignIn.authenticate();

        // Check if user cancelled
        if (authenticatedUser == null) {
          print('User cancelled Google Sign-In');
          return null;
        }

        gUser = authenticatedUser;
      } on GoogleSignInException catch (e) {
        // Handle authentication re-auth failure specifically
        if (e.code == GoogleSignInExceptionCode.canceled) {
          print('Authentication cancelled or re-auth failed. Attempting to clear cache and retry...');

          // Try to clear the cache to fix re-auth issues
          await clearGoogleSignInCache();

          // Return null to indicate user cancellation/failure
          return null;
        }
        print('GoogleSignInException during authentication: $e');
        rethrow;
      } catch (e) {
        print('Authentication failed: $e');
        rethrow;
      }

      // Get authentication data
      final GoogleSignInAuthentication gAuth = gUser.authentication;

      if (gAuth.idToken == null) {
        throw Exception('Failed to get ID token from Google Sign-In');
      }

      // Create Firebase credential with just the ID token initially
      // The access token might not be needed for Firebase authentication
      final credential = GoogleAuthProvider.credential(
        idToken: gAuth.idToken,
        // accessToken can be null for Firebase auth if we only need ID token
        accessToken: null,
      );

      // Sign in with Firebase
      UserCredential userCredential = await firebaseAuth.signInWithCredential(
        credential,
      );

      final firebaseUser = userCredential.user;
      if (firebaseUser == null) {
        throw Exception('Firebase authentication failed');
      }

      return AppUser(
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
      );

    } on GoogleSignInException catch (e) {
      if (e.code == GoogleSignInExceptionCode.canceled) {
        print('User cancelled Google Sign-In');
        return null;
      }
      print('GoogleSignInException: $e');
      throw Exception('Google Sign-In failed: ${e.toString()}');
    } catch (e) {
      print('Sign-in error: $e');
      throw Exception('Sign in with Google failed: $e');
    }
  }
}
