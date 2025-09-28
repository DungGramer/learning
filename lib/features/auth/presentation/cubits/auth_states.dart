/*
  AuthStates is a sealed class that represents the different states of authentication in the app.
  It can be either AuthInitial, AuthAuthenticated, or AuthUnauthenticated.
*/
import 'package:flutter_login/features/auth/domain/entities/app_user.dart';

abstract class AuthStates {}

class AuthInitial extends AuthStates {}

class AuthLoading extends AuthStates {}

class Authenticated extends AuthStates {
  final AppUser user;
  Authenticated(this.user);
}

class Unauthenticated extends AuthStates {}

class AuthError extends AuthStates {
  final String message;
  AuthError(this.message);
}
