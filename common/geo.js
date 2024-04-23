import { PermissionsAndroid } from 'react-native';


export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Данные геолокации',
        message: 'Приложению необходим доступ к геолокации. Предоставить?',
        buttonNeutral: 'Спросите позже',
        buttonNegative: 'Нет',
        buttonPositive: 'Да',
      },
    );
    console.log('Разрешен', granted);
    if (granted === 'granted') {
      console.log('Пасяб');
      return true;
    } else {
      console.log('На нет и суда нет');
      return false;
    }
  } catch (err) {
    return false;
  }
};


export const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(result);
  }