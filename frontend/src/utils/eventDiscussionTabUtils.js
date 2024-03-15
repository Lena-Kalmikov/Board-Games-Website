export const getUserInfo = (users, userId) => {
  return users?.find((user) => user.id === userId);
};

// mapping over the content data from the event discussion board.
// comparing userId from content to userId in users and extracting the username and image.
export const getContentData = (users, eventDiscussionBoard) => {
  return eventDiscussionBoard?.map((content) => {
    const userInfo = getUserInfo(users, content.userId);
    return {
      avatarSrc: userInfo?.profilePicture,
      userName: `${userInfo?.firstName} ${userInfo?.lastName}`,
      userId: content.userId,
      message: content.message,
      creationTime: content.creationTime,
      messageId: content.messageId,
    };
  });
};

// comparing eventId from url param to the eventId in the discussionboards array and getting it's content.
export const getEventBoard = (discussionBoards, eventId) => {
  return discussionBoards?.find(
    (discussionBoard) => discussionBoard.eventId === eventId
  )?.content;
};

export const handleEnterKeyDown = (handler) => (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handler();
  }
};
