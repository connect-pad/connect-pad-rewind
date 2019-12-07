import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

export default inject("socket")(
  observer(({ socket }) => {
    // useEffect(() => {
    //   socket.socket.emit("setDevice", "player");
    // }, []);

    return <>wait for next game</>;
  })
);
