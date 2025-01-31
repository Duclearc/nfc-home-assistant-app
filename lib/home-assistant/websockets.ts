export const createWebsocket = () => {
  const ws = new WebSocket(
    `${process.env.EXPO_PUBLIC_HOME_ASSISTANT_URL}/api/websocket`
  );

  ws.onopen = () => {
    console.log("connection opened");
  };

  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    console.log("MESSAGE: ", JSON.stringify(message, null, 2));

    if (message.type === "auth_required") {
      ws.send(
        JSON.stringify({
          type: "auth",
          access_token: process.env.EXPO_PUBLIC_HOME_ASSISTANT_API_KEY,
        })
      );
    }

    if (message.type === "auth_invalid") {
      console.error("auth_invalid");
      ws.close();
    }

    if (message.type === "auth_ok") {
      console.log("auth_ok, setting up subscriptions");

      ws.send(
        JSON.stringify({
          id: 1,
          type: "subscribe_events",
        })
      );
    }
  };

  ws.onerror = (e) => {
    // an error occurred
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
  };

  ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };
};
