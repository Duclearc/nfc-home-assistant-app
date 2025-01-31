type EventMessage = {
  type: "event";
  event?: {
    event_type?: string;
    data?: {
      entity_id?: string;
      new_state?: {
        entity_id?: string;
        state?: string; // value (12°C, 50%, on/off)
        attributes?: {
          friendly_name?: string;
          device_class?: string; // "temperature", "humidity"
          unit_of_measurement?: string; // "°C" , "%"
          state_class?: string; // "measurement"
        };
      };
    };
  };
};

export const createWebsocket = (
  key: string,
  url: string,
  callback: (event: EventMessage) => void
) => {
  const ws = new WebSocket(
    `${process.env.EXPO_PUBLIC_HOME_ASSISTANT_URL}/api/websocket`
  );

  ws.onopen = () => {
    console.log("connection opened");
  };

  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);

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

    if (message.type === "event") {
      const eventMessage = message as EventMessage;

      callback(eventMessage);
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

  return ws;
};
