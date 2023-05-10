import { css } from "@emotion/css";
import dynamic from "next/dynamic.js";
import Image from "next/image.js";
import React, { useEffect, useRef, useState } from "react";
import shortid from "shortid";
const ScrollToBottom = dynamic(() => import("react-scroll-to-bottom"), {
  ssr: false,
});
import io from "socket.io-client";
import AnimationHide from "./AnimationHide";

const socket = io("http://localhost:3004");

const ROOT_CSS = css({
  height: 400,
  minHeight: 400,
  border: "1px solid #e5e5e5",
  backgroundColor: '#ffffff',
});

const Chatbox = () => {
  const [content, setContent] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [listMessage, setListMessage] = useState([]);
  const [hide, setHide] = useState(true);

  useEffect(() => {

    if (!hide) {
      socket.emit("connection");
      socket.emit("join_room_client", { role: true });
      socket.on("roomId", ({ id }) => {
        setRoomId(id);
      });
      if (roomId) {
        socket.emit("list_message_client", { roomId });
        socket.on("receive_message", ({ data }) => {
          setListMessage(data);
        });
      }
    }


  }, [roomId, hide]);

  function renderMessageOptions(data) {
    if (data.state) {
      return (
        <a
          className="text-primary "
          style={{ cursor: "pointer" }}
          onClick={() => {
            socket.emit("send_message_client", {
              roomId,
              data: {
                roomId: data.roomId,
                content: data.content,
                status: false,
                state: true,
              }
            });
          }}
        >
          {data.content}
        </a>
      );
    }
    return data.content;
  }

  return (
    <div className=" bg-white z-50 rounded-full fixed right-4 bottom-4 ">
      {hide ? (
        <button
          className=" bg-teal-500  rounded-xl p-2 z-50 "
          onClick={() => {
            setHide(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      ) : (
        <AnimationHide> <div className="fixed   w-80 z-50  bottom-0 right-6">
          <div className=" bg-teal-400 p-2 flex justify-between text-white z-50">
            <span className="">Trò chuyện trực tuyến </span>
            <a
              onClick={() => {
                setHide(true);
              }}
            >
              <span className="cursor-pointer">Tắt</span>
            </a>
          </div>

          <ScrollToBottom className={ROOT_CSS}>
            {listMessage?.map((item) => {
              if (!item.status) {
                return (
                  <>
                    <div className="flex justify-start my-2">
                      <div className="bg-gray-100 inline-block rounded-t-xl rounded-r-xl  p-3 px-4 mx-4">{item?.content}</div>
                    </div>
                  </>
                );
              } else {
                return (
                  <div className="flex justify-end">
                    <div
                      className="bg-cyan-50 inline-block  p-3 px-4  rounded-t-xl rounded-l-xl mx-4 "

                    >
                      <span className="text-muted">
                        {renderMessageOptions(item)}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </ScrollToBottom>

          <div className="grid grid-cols-5">
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="border p-2 col-span-4 focus:outline-none"
              rows="1"
              placeholder="Tin nhắn ..."
            ></textarea>
            <button
              className="col-span-1 bg-slate-200"
              onClick={() => {
                socket.emit("send_message_client", {
                  roomId,
                  data: {
                    roomId,
                    status: false,
                    content,
                    state: false,
                  }
                });
              }}
            >
              Gửi
            </button>
          </div>
        </div></AnimationHide>

      )}
    </div>
  );
};

export default Chatbox;
