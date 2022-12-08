/* eslint-disable prettier/prettier */
var amqp = require('amqplib/callback_api');
import { sendRegisterMail } from '../utils/user.util';

//Sender
export const sender = (userData) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'register';
            var msg = userData;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(' [x] Sent %s', msg);
        });
    });
}
//Receiver
const receiver = () => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'register';
            channel.assertQueue(queue, {
                durable: false
            });
            // eslint-disable-next-line max-len
            console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
            channel.consume(queue, function (msg) {
                console.log(' [x] Received %s', msg.content.toString());
                var msg1= JSON.parse(msg.content.toString());
                sendRegisterMail(msg1);
            }, {
                noAck: true
            });
        });
    });
}
receiver();