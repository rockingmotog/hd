const awssdk = require('aws-sdk');
AWS.config.udpate({ region: 'us-east-1' });

module.exports.email = function (senderEmailId, userEmailId, fdCode) {
    var params = {
        Destination: {

            ToAddresses: [
                userEmailId,

            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "HTML_FORMAT_BODY"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: fdCode
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Email Verification'
            }
        },
        Source: senderEmailId,
        ReplyToAddresses: [
            senderEmailId,

        ],
    };

    const sendmail = new awssdk.SES({ apiVersion: '2010-12-01' })
    sendmail.sendEmail(params, (err, data) => {
        if (err)
            console.log('Failed to Send Email')
        console.log(data)
    })
}