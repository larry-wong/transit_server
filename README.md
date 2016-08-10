This is the first part of my smart home project. With it, you can connect all your devices (pc, phone, mcu) together. Then you can send messages between them.

Before start, you have have [nodejs](https://nodejs.org/) installed.

To deploy it on your own server, clone this project and run:
```
npm i --production
npm run build
```
Copy config.json.template to config.json and modify it.
```
cp config.json{.template,}
```
- TCP_PORT:

The port for your tcp connection.
- HTTP_PORT:

The port for your restful api and web access.
- API_VERSION:

Current restful api version. Change it when you update the apis.
- JWT_SECRET

String for encrypt web token, pass a random string.
- MONGODB_URL

Your mongodb url.

After configuration, run
```
npm start
```

To access the server, visit
```
http://yourdomain:HTTP_PORT
```
Sign up, and you will find your token on
```
http://yourdomain:HTTP_PORT/account
```
Connect your device to yourdomain:TCP_PORT by tcp protocol & send a verification message immediately.
Messages transferred between your devices and the server look like:
```
* -------------------------------------------------------------
* |         |         byte0          |     byte1   |   body   |
* |   msg   |-------------------------------------------------|
* |         |   3   |       5        |      8      |   n * 8  |
* |-----------------------------------------------------------|
* |   send  |  cmd  |  to_device_id  | body_length | msg_body |
* |-----------------------------------------------------------|
* | receive |  cmd  | from_devicd_id | body_length | msg_body |
* -------------------------------------------------------------
cmd:
AUTH_SEND: 0b100
AUTH_SUCC: 0b101
AUTH_FAIL: 0b110
MSG_SEND: 0b010
MSG_RECE: 0b011
```
To send a verification message, fill <cmd> with '100', <to_device_id> with the device_id(0 - 2^5-1) of this device, <msg_body> with your token, and <body_length> with your token's length.

Note:
- You can keep 32(2^5) devices online at the same time at most.
- If 2 devices registered with the same device_id successfully, the previous one will be disconnected by the server automatically.
- After your verification message, the server will return AUTH_SUCC if success or AUTH_FAIL with error message in <msg_body> encoded by utf8.

When two or more devices registered successfully, they can communicate to each other.

For convenience, your can send messages from web client. Just visit
```
http://yourdomain:HTTP_PORT/message
```
Note:
- Messages sent form web client will filled <from_devicd_id> with 0.
- Web client can't receive any message currently, don't send messages to it.
