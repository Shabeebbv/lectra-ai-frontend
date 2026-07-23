import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { getValidAccessToken } from "../utils/getValidAccessToken";

const LectureSocketContext = createContext(null);

const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL;

const RECONNECT_DELAY_MS = 3000;

const AUTH_FAILED_CLOSE_CODE = 4401;

export function LectureSocketProvider({
  children,
}) {

  const [statusUpdates,
    setStatusUpdates] =
    useState({});

  const [isConnected,
    setIsConnected] =
    useState(false);

  const socketRef =
    useRef(null);

  const reconnectTimeoutRef =
    useRef(null);

  const connect =
    useCallback(async () => {

      try {

        const accessToken =
          await getValidAccessToken();

        if (
          !accessToken ||
          !WS_BASE_URL
        ) {
          console.log(
            "No valid token"
          );
          return;
        }

        // prevent duplicate sockets
        if (
          socketRef.current &&
          (
            socketRef.current.readyState === WebSocket.OPEN ||
            socketRef.current.readyState === WebSocket.CONNECTING
          )
        ) {
          return
        }

        const url =
          `${WS_BASE_URL}/ws/notifications/?token=${accessToken}`;

        console.log(
          "Opening websocket:",
          url
        );

        const socket =
          new WebSocket(url);

        socketRef.current =
          socket;

        socket.onopen =
          () => {

            console.log(
              "WS CONNECTED"
            );

            setIsConnected(
              true
            );
          };

        socket.onmessage =
          (event) => {

            try {

              const data =
                JSON.parse(
                  event.data
                );

              console.log(
                "WS MESSAGE:",
                data
              );

              if (
                data.type ===
                "lecture_status_update"
              ) {

                setStatusUpdates(
                  prev => ({
                    ...prev,

                    [data.lecture_id]:
                      data.status,
                  })
                );
              }

            } catch (error) {

              console.error(
                "Parse error:",
                error
              );
            }
          };

        socket.onerror =
          error => {

            console.error(
              "Socket error:",
              error
            );
          };

        socket.onclose =
          async event => {

            console.log(
              "Socket closed:",
              event.code
            );

            setIsConnected(
              false
            );

            // auth expired
            if (
              event.code ===
              AUTH_FAILED_CLOSE_CODE
            ) {

              console.log(
                "Refreshing token..."
              );

              const token =
                await getValidAccessToken();

              if (!token) {

                console.log(
                  "Session expired"
                );

                localStorage.clear();

                window.location.href =
                  "/";

                return;
              }

              reconnectTimeoutRef.current =
                setTimeout(
                  connect,
                  1000
                );

              return;
            }

            // reconnect normally
            reconnectTimeoutRef.current =
              setTimeout(
                connect,
                RECONNECT_DELAY_MS
              );
          };

      } catch (error) {

        console.error(
          "WebSocket connect failed:",
          error
        );
      }

    }, []);

  const reconnect = useCallback(() => {
  clearTimeout(reconnectTimeoutRef.current);

  if (socketRef.current) {
    socketRef.current.onclose = null;
    socketRef.current.close();
    socketRef.current = null;
  }

  setIsConnected(false);
  connect();
}, [connect]);

  useEffect(() => {

    connect();

    return () => {

      clearTimeout(
        reconnectTimeoutRef.current
      );

      if (socketRef.current) {
        socketRef.current.close();
      }
    };

  }, [connect]);

  return (
    <LectureSocketContext.Provider
      value={{
        statusUpdates,
        isConnected,
        reconnect,
      }}
    >
      {children}
    </LectureSocketContext.Provider>
  );
}

export function useLectureSocket() {

  const context =
    useContext(
      LectureSocketContext
    );

  if (!context) {
    throw new Error(
      "useLectureSocket must be used within LectureSocketProvider"
    );
  }

  return context;
}