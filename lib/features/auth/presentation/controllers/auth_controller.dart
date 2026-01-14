/*
  AuthController manages authentication state using GetX reactive programming
  This replaces the AuthCubit and provides reactive state management
*/

import 'package:get/get.dart';
import 'package:flutter_login/features/auth/domain/entities/app_user.dart';
import 'package:flutter_login/features/auth/domain/repos/auth_repo.dart';
import 'package:flutter_login/features/auth/data/firebase_auth_repo.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthController extends GetxController {
  final AuthRepo _authRepo;

  AuthController({required AuthRepo authRepo}) : _authRepo = authRepo;

  // Observable states
  final Rx<AuthStatus> _authStatus = AuthStatus.unknown.obs;
  final Rxn<AppUser> _currentUser = Rxn<AppUser>();
  final RxBool _isLoading = false.obs;
  final RxString _errorMessage = ''.obs;

  // Getters for reactive states
  AuthStatus get authStatus => _authStatus.value;
  AppUser? get currentUser => _currentUser.value;
  bool get isLoading => _isLoading.value;
  String get errorMessage => _errorMessage.value;

  // Reactive getters for UI binding
  Rx<AuthStatus> get authStatusObs => _authStatus;
  Rxn<AppUser> get currentUserObs => _currentUser;
  RxBool get isLoadingObs => _isLoading;
  RxString get errorMessageObs => _errorMessage;

  // Computed properties
  bool get isAuthenticated => _authStatus.value == AuthStatus.authenticated;
  bool get isUnauthenticated => _authStatus.value == AuthStatus.unauthenticated;

  @override
  void onInit() {
    super.onInit();
    checkAuthStatus();
  }

  // Check authentication status
  Future<void> checkAuthStatus() async {
    try {
      _setLoading(true);
      final user = await _authRepo.getCurrentUser();

      if (user != null) {
        _setUser(user);
        _setAuthStatus(AuthStatus.authenticated);
      } else {
        _setAuthStatus(AuthStatus.unauthenticated);
      }
    } catch (e) {
      _setError('Failed to check auth status: $e');
      _setAuthStatus(AuthStatus.unauthenticated);
    } finally {
      _setLoading(false);
    }
  }

  // Login with email and password
  Future<void> loginWithEmailPassword(String email, String password) async {
    try {
      _setLoading(true);
      _clearError();

      final user = await _authRepo.loginWithEmailPassword(email, password);

      if (user != null) {
        _setUser(user);
        _setAuthStatus(AuthStatus.authenticated);
        Get.snackbar(
          'Success',
          'Login successful!',
          snackPosition: SnackPosition.TOP,
        );
      } else {
        _setAuthStatus(AuthStatus.unauthenticated);
        _setError('Login failed: Invalid credentials');
      }
    } catch (e) {
      _setError('Login failed: $e');
      _setAuthStatus(AuthStatus.unauthenticated);
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Register with email and password
  Future<void> registerWithEmailPassword(
    String name,
    String email,
    String password,
  ) async {
    try {
      _setLoading(true);
      _clearError();

      final user = await _authRepo.registerWithEmailPassword(
        name,
        email,
        password,
      );

      if (user != null) {
        _setUser(user);
        _setAuthStatus(AuthStatus.authenticated);
        Get.snackbar(
          'Success',
          'Registration successful!',
          snackPosition: SnackPosition.TOP,
        );
      } else {
        _setAuthStatus(AuthStatus.unauthenticated);
        _setError('Registration failed');
      }
    } catch (e) {
      _setError('Registration failed: $e');
      _setAuthStatus(AuthStatus.unauthenticated);
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Sign in with Google
  Future<void> signInWithGoogle() async {
    try {
      _setLoading(true);
      _clearError();

      final user = await _authRepo.signInWithGoogle();

      if (user != null) {
        _setUser(user);
        _setAuthStatus(AuthStatus.authenticated);
        Get.snackbar(
          'Success',
          'Google sign-in successful!',
          snackPosition: SnackPosition.TOP,
        );
      } else {
        _setAuthStatus(AuthStatus.unauthenticated);
        // User might have cancelled, don't show error
      }
    } catch (e) {
      _setError('Google sign-in failed: $e');
      _setAuthStatus(AuthStatus.unauthenticated);
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Sign in with Apple
  Future<void> signInWithApple() async {
    try {
      _setLoading(true);
      _clearError();

      final user = await _authRepo.signInWithApple();

      if (user != null) {
        _setUser(user);
        _setAuthStatus(AuthStatus.authenticated);
        Get.snackbar(
          'Success',
          'Apple sign-in successful!',
          snackPosition: SnackPosition.TOP,
        );
      } else {
        _setAuthStatus(AuthStatus.unauthenticated);
        // User might have cancelled, don't show error
      }
    } catch (e) {
      _setError('Apple sign-in failed: $e');
      _setAuthStatus(AuthStatus.unauthenticated);
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Forgot password
  Future<void> forgotPassword(String email) async {
    try {
      _setLoading(true);
      _clearError();

      final message = await _authRepo.sendPasswordResetEmail(email);
      Get.snackbar('Success', message, snackPosition: SnackPosition.TOP);
    } catch (e) {
      _setError('Failed to send reset email: $e');
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Logout
  Future<void> logout() async {
    try {
      _setLoading(true);
      await _authRepo.logout();
      _clearUser();
      _setAuthStatus(AuthStatus.unauthenticated);
      Get.snackbar(
        'Success',
        'Logged out successfully!',
        snackPosition: SnackPosition.TOP,
      );
    } catch (e) {
      _setError('Logout failed: $e');
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Delete account
  Future<void> deleteAccount() async {
    try {
      _setLoading(true);
      await _authRepo.deleteAccount();
      _clearUser();
      _setAuthStatus(AuthStatus.unauthenticated);
      Get.snackbar(
        'Success',
        'Account deleted successfully!',
        snackPosition: SnackPosition.TOP,
      );
    } catch (e) {
      _setError('Failed to delete account: $e');
      Get.snackbar('Error', errorMessage, snackPosition: SnackPosition.TOP);
    } finally {
      _setLoading(false);
    }
  }

  // Private helper methods
  void _setLoading(bool loading) {
    _isLoading.value = loading;
  }

  void _setError(String error) {
    _errorMessage.value = error;
  }

  void _clearError() {
    _errorMessage.value = '';
  }

  void _setUser(AppUser user) {
    _currentUser.value = user;
  }

  void _clearUser() {
    _currentUser.value = null;
  }

  void _setAuthStatus(AuthStatus status) {
    _authStatus.value = status;
  }

  // Initialize Firebase Auth Repository
  Future<void> initializeAuthRepo() async {
    if (_authRepo is FirebaseAuthRepo) {
      await (_authRepo as FirebaseAuthRepo).initializeGoogleSignIn();
    }
  }
}
