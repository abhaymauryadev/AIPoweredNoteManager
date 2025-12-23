export function canEditNote(user, note) {
  return user.id === note.userId.toString();
}

export function canDeleteNote(user, note) {
  return user.id === note.userId.toString();
}

// export function isAdmin(user) {
//   return user.role === "admin";
// }