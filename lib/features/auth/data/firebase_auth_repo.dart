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
      // Begin the interactive sign-in process
      final GoogleSignInAccount? gUser = await GoogleSignIn().signIn();

      // user cancelled the sign-in
      if (gUser == null) return null;

      // Obtain the auth details from the request
      final GoogleSignInAuthentication gAuth = await gUser.authentication;

      // Create a credential for the user
      final credential = GoogleAuthProvider.credential(
        accessToken: gAuth.accessToken,
        idToken: gAuth.idToken,
      );

      // Sign in with these credentials
      UserCredential userCredential = await firebaseAuth.signInWithCredential(
        credential,
      );

      // Firebase user
      final firebaseUser = userCredential.user;

      // User cancelled the sign-in
      if (firebaseUser == null) return null;

      AppUser user = AppUser(
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
      );

      return user;
    } catch (e) {
      throw Exception('Sign in with Google failed: $e');
    }
  }
}
