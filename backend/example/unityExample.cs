using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using socket.io;
using SimpleJSON;

public class socketIO : MonoBehaviour
{
  string serverUrl = "http://192.168.43.127:4747";
  string data;

  private void Awake()
  {
    DontDestroyOnLoad(gameObject);

  }

  void Start()
  {
    var socket = Socket.Connect(serverUrl);

    // 서버로부터 데이터를 받는 부분

    socket.On("connect", () =>
    {
      socket.Emit("setDevice", "screen"); // 이 디바이스를 게임 화면을 표시하는 'screen'으로 지정
    });

    socket.On("screen:newPlayer", (string data) => // 새로운 플레이어 접속
    {
      var Data = JSON.Parse(data);
      // Data["id"]: String, 플레이어의 socket id

      //// id를 기록해 두는 함수를 호출해주세요.
    });

    socket.On("screen:playerOut", (string data) => // 플레이어 접속 끊김
    {
      var Data = JSON.Parse(data);
      // Data["id"]: String, 플레이어의 socket id

      // 플레이어 배열에서 해당 id를 가진 객체를 삭제해주세요.
    });

    socket.On("screen:gameReady", () =>
    { // 충분한 플레이어(4명)가 접속하여 게임을 진행할 수 있음
      //// 캐릭터 고르기 화면으로 넘어가주세요.
    });

    socket.On("screen:changeCharacter", (string data) =>
    { // 캐릭터 선택 화면에서 캐릭터를 변경함
      var Data = JSON.Parse(data);
      // Data["id"]: String, 플레이어의 socket id
      // Data["characterIndex"]: Integer, 선택한 캐릭터의 번호 (0~3)

      //// 캐릭터 선택 화면에서 캐릭터가 변경될 수 있도록 함수 호출해주세요.
    });

    socket.On("screen:playerReady", (string data) =>
    { // 플레이어가 캐릭터 선택 후 준비 상태를 변경함
      var Data = JSON.Parse(data);
      // Data["id"]: String, 플레이어의 socket id
      // Data["status"]: Boolean, 플레이어 준비 여부, True or False

      //// 플레이어 배열에 준비 여부를 기록하고 모든 플레이어가 준비했으면 게임 화면으로 넘어가주세요.

    });

    socket.On("screen:keyDown", (string data) =>
    { // 게임 화면에서 플레이어가 키를 누름
      var Data = JSON.Parse(data);
      // Data["id"]: String, 플레이어의 socket id
      // Data["key"]: String, 플레이어가 누른 키 ["left", "top", "right", "bottom", Null]

      //// 플레이어 배열에서 플레이어가 누른 키를 기록해서 해당 방향으로 나아갈 수 있게 해주세요.
    });

    socket.On("screen:keyUp", (string data) =>
    { // 게임 화면에서 플레이어가 키를 뗌
      var Data = JSON.Parse(data);
      // Data["id"]: String, 플레이어의 socket id
      // Data["key"]: String, 플레이어가 키를 떼기 전에 마지막으로 눌렀던 키 ["left", "top", "right", "bottom", Null]

      //// 필요한 경우 플레이어 배열에서 플레이어가 키를 누르고 있지 않다는 것을 설정해주세요.

    });

    // 서버에 응답, 상태, 데이터 등을 보내는 부분

    // 코드를 복사해서 원하는 곳에 사용하세요.

    socket.Emit("screen:recruit"); // 게임에서 참가자를 모집할 준비가 되었을 때 호출

    socket.Emit("screen:gameStart"); // 캐릭터 고르기 화면에서 플레이어가 모두 준비 하였을 때 게임 시작을 알림(62번째 줄에서 게임 화면으로 넘어갈 때 호출해줘야 합니다.)

    socket.Emit("screen:gameEnd"); // 게임이 끝났음을 알립니다.

    socket.EmitJson("screen:playSound", @"{ ""id"": ""String"", ""soundName"": ""String"" }"); // 게임패드에서 사운드를 재생합니다. id를 삽입하면 특정 디바이스에서 소리가 나오고 생략할 경우 모든 디바이스에서 재생됩니다.

    socket.EmitJson("screen:vibrate", @"{ ""id"": ""String"", ""pattern"": Number }"); // 게임패드에서 진동을 발생합니다. id를 삽입하면 특정 디바에스에서 진동이 울리고 생략할 경우 모든 디바이스에서 발생됩니다.

  }
}