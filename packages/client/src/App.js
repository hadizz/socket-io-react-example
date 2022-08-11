import * as React from "react";
import {io} from "socket.io-client";

const formatDict = [
  {key: 'LOL', value: '😂'},
  {key: 'Clap', value: '👏🏻'},
  {key: 'ez', value: '💤'},
  {key: 'Pog', value: '👻'},
  {key: 'NODDERS', value: '🥺'},
]

const connectTwitchChat = () => {
  const socket = io('http://localhost:4000')

  // socket.onAny((type, message) => console.log(type, message))

  return socket
}

function formatMessage(text) {
  let str = text;
  formatDict.map(item => {
    str = str.replaceAll(item.key, item.value);
  })
  return str;
}

function Message(props) {
  const mappedMessage = formatMessage(props.body)

  return (<div style={{margin: '4px 0'}}><span style={{color: props.user.color}}>{props.user.name}</span>: {mappedMessage}</div>)
}

function App() {
  const [messages, setMessages] = React.useState([])

  React.useEffect(() => {
    const socket = connectTwitchChat()

    // console.log(socket)

    socket.on('chat-message', newMessage => {
      console.log(newMessage)
      setMessages(pre => ([...pre, newMessage]))
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="App">
      {messages?.map(message => <Message {...message} />)}
    </div>
  );
}

export default App;
