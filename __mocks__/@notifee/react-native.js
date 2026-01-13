const AndroidImportance = {
  DEFAULT: 3,
  HIGH: 4,
};

const AndroidVisibility = {
  PUBLIC: 1,
};

async function createChannel() {
  return 'default';
}

async function displayNotification() {
  return;
}

async function requestPermission() {
  return true;
}

function onForegroundEvent() {
  return () => {};
}

module.exports = {
  default: {
    createChannel,
    displayNotification,
    requestPermission,
    onForegroundEvent,
  },
  createChannel,
  displayNotification,
  requestPermission,
  onForegroundEvent,
  AndroidImportance,
  AndroidVisibility,
};
