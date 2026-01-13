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

module.exports = {
  default: {
    createChannel,
    displayNotification,
  },
  createChannel,
  displayNotification,
  AndroidImportance,
  AndroidVisibility,
};
