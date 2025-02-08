const {google} = require('googleapis')
const path = require('path');
const fs = require('fs');


const CLIENT_ID = '238579266302-4m63o80soqd9ie6bgj7ki8npmlfi0qtp.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04DJ-0Fl4MHsqCgYIARAAGAQSNgF-L9Irhfnbh0qqN2oLk-B37JrUeNhcNJLSA8H0ihxUHazTsZ_ULiVHaZdaup1BWh2FPKE06g';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const filepath = path.join(__dirname, 'girl.jpeg');

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'girl1.jpg',
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filepath),
            }
        })
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }

}

async function deleteFile(id) {
    try {
        const response = await drive.files.delete({
            fileId: id,
        })        
    } catch (error) {
        console.log(error.message);
    }
}

async function generatePublicURL(id) {
    try {
        await drive.permissions.create({
            fileId: id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

async function getFile(id) {
    try {
        const response = await drive.files.get({
            fileId: id,
            fields: 'webContentLink'
        })
        return response.data.webContentLink;
    } catch (error) {
        console.log(error);
        return null;
    }
}


