var FCM = require('fcm-node');
import * as config from "config";
const fcmServerKey = config.get("fcmServerKey");

export class PushNotification {

    sendPushNotification(tokens, data, pushData, send_notification_object = true) {

        try {
            var fcm = new FCM(fcmServerKey);
            let message;

            if (send_notification_object) {
                message = {
                    registration_ids: tokens,
                    data: data,
                    notification: pushData,
                    priority: 'high',
                };
            } else {
                message = {
                    registration_ids: tokens,
                    data: data,
                    priority: 'high',
                };
            }

            fcm.send(message, function (err, response) {

                console.log("Push notification:::" + err);
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}