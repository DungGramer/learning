import 'package:flutter/material.dart';

class GoogleSignInButton extends StatelessWidget {
  final void Function()? onTap;
  const GoogleSignInButton({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(25),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.secondary,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Theme.of(context).colorScheme.tertiary),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset(
              'lib/assets/google.png',
              height: 32,
              // color: Theme.of(context).colorScheme.inversePrimary,
            ),
            // SizedBox(width: 10),
            // Text(
            //   "Sign in with Google",
            //   style: TextStyle(color: Colors.white, fontSize: 16),
            // ),
          ],
        ),
      ),
    );
  }
}
