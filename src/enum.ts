enum Role {
  ADMIN,
  USER = 4,
  READ_ONLY,
}

const user = Role.ADMIN;

if (user === Role.ADMIN) {
  console.log('is admin');
}

