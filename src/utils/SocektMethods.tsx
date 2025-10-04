export const setUserName = (socket: any, userName: string): void => {
    if (!userName) return;
    socket.emit("message", JSON.stringify({ event: "setUserName", userName }));
};

export const createRoom = (socket: any, roomName: string): void => {
    if (!roomName) return;
    socket.emit("message", JSON.stringify({ event: "createRoom", roomName }));
};

export const joinRoom = (socket: any, roomName: string): void => {
    if (!roomName) return;
    socket.emit("message", JSON.stringify({ event: "joinRoom", roomName }));
    socket.on("message", JSON.stringify({ event: "joinRoom", roomName }));
};

export const leaveRoom = (socket: any, roomName: string): void => {
    if (!roomName) return;
    socket.emit("message", JSON.stringify({ event: "leaveRoom", roomName }));
};

export const deleteRoom = (socket: any, roomName: string): void => {
    if (!roomName) return;
    socket.emit("message", JSON.stringify({ event: "deleteRoom", roomName }));
};

export const sendMessage = (
    socket: any,
    roomName: string,
    message: string,
    lotID: string,
    clientId: string,
    amount: number
): void => {
    if (!roomName || !message || !lotID || !clientId || !amount) return;

    const messageData = {
        event: "sendMessageToRoom",
        roomName,
        message,
        lotID,
        clientId,
        amount,
    };

    socket.emit("message", JSON.stringify(messageData));
};
