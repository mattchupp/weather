import React from 'react';

import ClearDay from '../assets/icons/clear-day_icon.svg';
import ClearNight from '../assets/icons/clear-night_icon.svg';
import Rain from '../assets/icons/rain_icon.svg';
import Snow from '../assets/icons/snow_icon.svg';
import Sleet from '../assets/icons/sleet_icon.svg';
import Wind from '../assets/icons/wind_icon.svg';
import Fog from '../assets/icons/cloudy_icon.svg';
import Cloudy from '../assets/icons/cloudy_icon.svg';
import PartlyCloudyDay from '../assets/icons/partly-cloudy-day_icon.svg';
import PartlyCloudyNight from '../assets/icons/partly-cloudy-night_icon.svg';

const icon = {
  width: '40px',
  marginTop: '20px'
}

const weatherIcon = (props) => {
    let iconImage = null;
    switch(props.icon){
        case('clear-day'):
            iconImage = ClearDay;
            break;
        case('clear-night'):
            iconImage = ClearNight;
            break;
        case('rain'):
            iconImage = Rain;
            break;
        case('snow'):
            iconImage = Snow;
            break;
        case('sleet'):
            iconImage = Sleet;
            break;
        case('wind'):
            iconImage = Wind;
            break;
        case('fog'):
            iconImage = Fog;
            break;
        case('cloudy'):
            iconImage = Cloudy;
            break;
        case('partly-cloudy-day'):
            iconImage = PartlyCloudyDay;
            break;
        case('partly-cloudy-night'):
            iconImage = PartlyCloudyNight;
            break;
        default:
            iconImage = null;
            break;
    }

    return (
      <div>
        {iconImage !== null ? <img style={icon} src={iconImage} alt={props.icon} /> : null}
      </div>
    )

}

export default weatherIcon;
