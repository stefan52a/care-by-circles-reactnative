import {
    AsyncStorage
} from 'react-native';

import Cache from './cache'
import * as config from '../config'

class UtilService {

    static getPastDateTime(ts) {
        if (ts == null || ts == "")
            return "";

        var mins = Math.floor((Date.now() / 1000 - ts / 1000000000) / 60);

        if (mins <= 0) {
            return "just now";
        } else if (mins < 60) {

            if (mins == 1)
                return mins + " minute ago";
            else
                return mins + " minutes ago";
        } else if (mins < 24 * 60) {

            var hours = Math.floor(mins / 60)

            if (hours == 1)
                return hours + " hour ago";
            else
                return hours + " hours ago";
        } else if (mins >= 24 * 60) {

            var days = Math.floor(mins / (24 * 60))

            if (days == 1)
                return days + " day ago";
            else
                return days + " days ago";
        }
    }

    static convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }

    static getPositionString(pos) {
        if (!pos)
            return "—"

        return this.ordinal_suffix_of(pos);
    }

    static deg2rad(angle) {
        return (angle * Math.PI / 180);
    }

    static getDistanceFromLatLonInMile(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Number((d / 1.6093).toFixed(1));
    }

    static getBackColor(imageObj) {
        if (!imageObj)
            return 'rgb(255,255,255)';

        var backgroundColor = imageObj._env ? 'rgb(' + imageObj._env['input-md-average'].r + ','
            + imageObj._env['input-md-average'].g + ','
            + imageObj._env['input-md-average'].b + ')' : 'rgb(255,255,255)'

        return backgroundColor;
    }

    static capitalizeFirstLetter(string) {
        if (string === undefined) {
            return null;
        }

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static isValid(data) {
        if (!data) return false

        if (data == '') return false

        return true
    }

    static isValidURL(data) {
        if (!this.isValid(data))
            return false

        if (data == 'http://')
            return false

        return true
    }

    static fixUrl(url) {
        if (this.isValidURL(url)) {
            url = url.toLowerCase()
            //if ((url.indexOf("http://") == -1) && (url.indexOf("https://") == -1)) {
            if (url.indexOf(":") == -1) {
                url = "http://" + url
            }
            return url;
        }

        return null;
    }

    static ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    static async saveLocalStringData(key, strValue) {
        await AsyncStorage.setItem('@gogo:' + key, strValue);
        return true;
    }

    static async saveLocalObjectData(key, obj) {
        await AsyncStorage.setItem('@gogo:' + key, JSON.stringify(obj));
    }

    static async getLocalStringData(key) {
        let ret = await AsyncStorage.getItem('@gogo:' + key);

        return ret
    }

    static async getLocalObjectData(key) {
        let ret = await AsyncStorage.getItem('@gogo:' + key);
        if (ret != null) {
            return JSON.parse(ret)
        } else {
            return null
        }
    }

    static async removeLocalObjectData(key) {
        let ret = await AsyncStorage.removeItem('@gogo:' + key);
        return true
    }
}

export default UtilService
