import React ,{ useState }from 'react'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import{BsEmojiSmile} from 'react-icons/bs'
import ReactDOM from 'react-dom'
import "./ChatInput.css"
export default function ChatInput({handleSendMessage}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg,setMsg] = useState("")

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };


  return (
    <>

  {showEmojiPicker && ReactDOM.createPortal(
        <div className="emoji-picker">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>,
        document.body // Renders the emoji picker in the body, outside normal flow
      )}
      
        <div className="emoji">
          <BsEmojiSmile onClick={handleEmojiPickerHideShow}/>
         
        </div>
     
      <form className='input-container' onSubmit={sendChat}>
          <input type="text" placeholder='Type your message here...'  value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
          <button type='submit'><IoMdSend/></button>
      </form>
    </>
  )
}
