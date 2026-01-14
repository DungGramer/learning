# Flutter Authentication với GetX

## Tổng quan

Dự án này triển khai hệ thống xác thực sử dụng GetX thay thế cho Bloc/Cubit. GetX cung cấp state management, dependency injection, và routing trong một package duy nhất.

## Cấu trúc Auth Context với GetX

### 1. **AuthController** (thay thế AuthCubit)
- **Vị trí**: `lib/features/auth/presentation/controllers/auth_controller.dart`
- **Chức năng**: Quản lý state xác thực với reactive programming
- **Tính năng**:
  - Reactive state với `Rx` variables
  - Auto UI updates khi state thay đổi
  - Built-in loading states
  - Error handling với snackbars
  - Observable patterns

```dart
class AuthController extends GetxController {
  // Observable states
  final Rx<AuthStatus> _authStatus = AuthStatus.unknown.obs;
  final Rxn<AppUser> _currentUser = Rxn<AppUser>();
  final RxBool _isLoading = false.obs;

  // Getters for UI binding
  bool get isAuthenticated => _authStatus.value == AuthStatus.authenticated;

  // Methods
  Future<void> loginWithEmailPassword(String email, String password) async {
    // Implementation with reactive state updates
  }
}
```

### 2. **AuthBinding** (Dependency Injection)
- **Vị trí**: `lib/features/auth/presentation/bindings/auth_binding.dart`
- **Chức năng**: Quản lý dependencies và injection
- **Tính năng**:
  - Lazy loading dependencies
  - Singleton pattern for controllers
  - Automatic disposal

```dart
class AuthBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AuthRepo>(() => FirebaseAuthRepo());
    Get.put<AuthController>(AuthController(authRepo: Get.find()));
  }
}
```

### 3. **AuthMiddleware** (Route Protection)
- **Vị trí**: `lib/features/auth/presentation/middlewares/auth_middleware.dart`
- **Chức năng**: Bảo vệ routes và điều hướng
- **Tính năng**:
  - Automatic redirects based on auth status
  - Route guards
  - Middleware chaining

```dart
class AuthMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    final authController = Get.find<AuthController>();
    if (authController.authStatus == AuthStatus.unauthenticated) {
      return const RouteSettings(name: '/login');
    }
    return null;
  }
}
```

### 4. **Reactive Pages**
- **LoginPageGetX**: `lib/features/auth/presentation/pages/login_page_getx.dart`
- **RegisterPageGetX**: `lib/features/auth/presentation/pages/register_page_getx.dart`
- **HomePageGetX**: `lib/features/home/presentation/page/home_page_getx.dart`

**Tính năng**:
- `Obx()` widgets for reactive UI updates
- Automatic loading states
- Built-in validation
- Snackbar notifications

```dart
// Reactive UI binding
Obx(() => MyButton(
  text: authController.isLoading ? "SIGNING IN..." : "LOGIN",
  onTap: authController.isLoading ? null : login,
))
```

### 5. **GetX Routing System**
- **Vị trí**: `lib/core/routes/app_pages.dart`
- **Tính năng**:
  - Declarative routing
  - Named routes
  - Middleware support
  - Transition animations

```dart
static final routes = [
  GetPage(
    name: '/login',
    page: () => const LoginPageGetX(),
    binding: AuthBinding(),
    middlewares: [LoginMiddleware()],
  ),
];
```

## So sánh Bloc vs GetX

| Aspect | Bloc/Cubit | GetX |
|--------|------------|------|
| **State Management** | BlocBuilder, BlocListener | Obx, GetBuilder |
| **Dependency Injection** | RepositoryProvider, BlocProvider | Get.put, Get.lazyPut |
| **Routing** | Navigator.pushNamed | Get.toNamed |
| **Performance** | Rebuild widgets selectively | Minimal rebuilds with Obx |
| **Code Boilerplate** | More verbose | Less boilerplate |
| **Learning Curve** | Moderate | Easy |

## Cách sử dụng

### 1. Chạy ứng dụng với GetX
Thay đổi trong `main.dart`:

```dart
void main() {
  runApp(MyAppGetX()); // Thay vì MyApp()
}
```

Hoặc sử dụng `main_getx.dart`:

```dart
// Chạy file main_getx.dart thay vì main.dart
```

### 2. Truy cập AuthController trong UI

```dart
class SomeWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();

    return Obx(() => Text(
      authController.isAuthenticated ? 'Logged In' : 'Not Logged In'
    ));
  }
}
```

### 3. Navigation

```dart
// Navigate to login
Get.toNamed('/login');

// Navigate and replace all previous routes
Get.offAllNamed('/home');

// Go back
Get.back();
```

### 4. Reactive State Listening

```dart
// Listen to state changes
ever(authController.authStatusObs, (status) {
  if (status == AuthStatus.authenticated) {
    Get.offAllNamed('/home');
  }
});

// Listen once
once(authController.currentUserObs, (user) {
  print('User logged in: ${user?.email}');
});
```

## Lợi ích của GetX

1. **Performance**: Minimal rebuilds, chỉ cập nhật widgets cần thiết
2. **Productivity**: Ít boilerplate code, phát triển nhanh hơn
3. **Memory Management**: Automatic disposal của controllers
4. **Route Management**: Powerful routing với middleware support
5. **Dependency Injection**: Simple và powerful DI system
6. **Reactive Programming**: Easy reactive state management

## Cấu trúc thư mục với GetX

```
lib/
├── core/
│   └── routes/
│       └── app_pages.dart
├── features/
│   └── auth/
│       ├── data/
│       │   └── firebase_auth_repo.dart
│       ├── domain/
│       │   ├── entities/
│       │   │   └── app_user.dart
│       │   └── repos/
│       │       └── auth_repo.dart
│       └── presentation/
│           ├── bindings/
│           │   └── auth_binding.dart
│           ├── controllers/
│           │   └── auth_controller.dart
│           ├── middlewares/
│           │   └── auth_middleware.dart
│           ├── pages/
│           │   ├── login_page_getx.dart
│           │   ├── register_page_getx.dart
│           │   └── loading_page_getx.dart
│           └── components/
│               └── ... (các components tái sử dụng)
├── main_getx.dart
└── ...
```

## Best Practices

1. **Controllers**: Sử dụng một controller cho mỗi feature
2. **Bindings**: Tách biệt dependencies trong các Binding classes
3. **Reactive Variables**: Sử dụng `Rx` cho states, `Rxn` cho nullable objects
4. **Obx Usage**: Chỉ wrap những widgets cần reactive updates
5. **Memory Management**: GetX tự động dispose controllers, nhưng hãy dispose TextEditingControllers
6. **Error Handling**: Sử dụng try-catch và Get.snackbar cho user feedback

## Kết luận

GetX cung cấp một giải pháp toàn diện cho Flutter app development với:
- State management đơn giản và mạnh mẽ
- Dependency injection tự động
- Routing system linh hoạt
- Performance optimization
- Ít code boilerplate

Đây là một alternative tuyệt vời cho Bloc/Cubit, đặc biệt phù hợp với các dự án cần phát triển nhanh và maintain đơn giản.
