function applyVote({
  upVotesBy,
  downVotesBy,
  userId,
  voteType,
}) {
  let newUpVotesBy = [...upVotesBy];
  let newDownVotesBy = [...downVotesBy];

  if (voteType === 1) {
    if (!newUpVotesBy.includes(userId)) {
      newUpVotesBy.push(userId);
    }
    newDownVotesBy = newDownVotesBy.filter((id) => id !== userId);
  }

  if (voteType === -1) {
    if (!newDownVotesBy.includes(userId)) {
      newDownVotesBy.push(userId);
    }
    newUpVotesBy = newUpVotesBy.filter((id) => id !== userId);
  }

  if (voteType === 0) {
    newUpVotesBy = newUpVotesBy.filter((id) => id !== userId);
    newDownVotesBy = newDownVotesBy.filter((id) => id !== userId);
  }

  return {
    upVotesBy: newUpVotesBy,
    downVotesBy: newDownVotesBy,
  };
}

export { applyVote };
