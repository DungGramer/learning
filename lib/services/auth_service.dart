/*
  AuthService - Authentication service interface
*/

import '../models/app_user.dart';

abstract class AuthService {
  Future<AppUser?> loginWithEmailPassword(String email, String password);
  Future<AppUser?> registerWithEmailPassword(String name, String email, String password);
  Future<void> logout();
  Future<AppUser?> getCurrentUser();
  Future<String> sendPasswordResetEmail(String email);
  Future<void> deleteAccount();
  Future<AppUser?> signInWithGoogle();
  Future<AppUser?> signInWithApple();
}