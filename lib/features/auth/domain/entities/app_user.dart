class AppUser {
  final String uid;
  final String email;

  AppUser({required this.uid, required this.email});

  Map<String, dynamic> toJson() {
    return {'uid': uid, 'email': email};
  }

  factory AppUser.fromJson(Map<String, dynamic> jsonUser) {
    return AppUser(uid: jsonUser['uid'], email: jsonUser['email']);
  }
}
