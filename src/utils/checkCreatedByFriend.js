export default function checkCreatedByFriend(user, createdBy) {
  if (!user || !createdBy) return;
  return user?._id === createdBy ? "targetID" : "sourceID";
}
