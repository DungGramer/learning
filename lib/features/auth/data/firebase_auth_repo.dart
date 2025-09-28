/*
 FIREBASE IS OUR BACKEND - You can swap out any backend here...
*/

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_login/features/auth/domain/entities/app_user.dart';
import 'package:flutter_login/features/auth/domain/repos/auth_repo.dart';

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
}
