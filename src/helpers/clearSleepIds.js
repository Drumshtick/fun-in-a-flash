const clearSleepIds = (sleepIds) => {
  if (!sleepIds || sleepIds.length === 0) {
    return;
  }
  for (var i = 0; i < sleepIds.length; i++) {
      clearTimeout(sleepIds[i]);
  }
};

export default clearSleepIds;
