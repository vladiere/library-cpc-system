import {
  Loading,
  QSpinnerFacebook,
  QSpinnerHourglass,
  QSpinnerIos,
} from 'quasar';

export const SpinnerFacebook = (loading_state: boolean, message?: string) => {
  if (loading_state) {
    Loading.show({
      message: message,
      spinner: QSpinnerFacebook,
      spinnerColor: 'blue',
      spinnerSize: 120,
      backgroundColor: 'grey-10',
      messageColor: 'grey-11',
    });
  } else {
    Loading.hide();
  }
};

export const SpinnerHourglass = (loading_state: boolean, message?: string) => {
  if (loading_state) {
    Loading.show({
      message: message,
      spinner: QSpinnerHourglass,
      spinnerColor: 'light-green',
      spinnerSize: 120,
      backgroundColor: 'grey-10',
      messageColor: 'grey-11',
    });
  } else {
    Loading.hide();
  }
};

export const SpinnerIos = (loading_state: boolean, message?: string) => {
  if (loading_state) {
    Loading.show({
      message: message,
      spinner: QSpinnerIos,
      spinnerColor: 'yellow',
      spinnerSize: 120,
      backgroundColor: 'grey-10',
      messageColor: 'grey-11',
    });
  } else {
    Loading.hide();
  }
};
