> type(scope?): subject

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `chore`: add something without touching production code (Eg: update npm dependencies)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: Reverts a previous commit
- `style`: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

Example:

```sh
$ git commit -m "feat(scope): add scope"
```

```sh
$ git commit -m "chore: lint commit message"
```
