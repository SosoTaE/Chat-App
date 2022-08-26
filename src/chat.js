// import data from "./singIn"
import { createRef, useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./authContext"
import {auth, db} from "./firebase"
import { getDocs,collection, addDoc, onSnapshot, } from "firebase/firestore"
import { orderBy, Timestamp, query, limit} from "firebase/firestore"; 


export default function Chat() {
    const context = useContext(UserContext)
    const [data, setData] = useState("")
    const [message, setMessage] = useState("")
    const [users_data, setUsers_data] = useState([])
    const [chat_id, setChat_id] = useState(null)
    const [second_user, setSecond_user] = useState(null)
    const [messages, setMessages] = useState({})
    const [text, setText] = useState(null)
    const [scroll, setScroll] = useState(true)
    const toScroll = useRef()
    const detectScroll = useRef()
    const [number, setNumber] = useState(10)

    const get_messages = async () => {
        if (!chat_id) return false;
        const chat_messages = collection(db, "chat", chat_id, "messages")
        const q = query(chat_messages, orderBy("createdAt", "desc"),limit(number))
        const querySnapshot = onSnapshot(q, (snapshot) => {
            let obj = messages[chat_id]
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    return obj[change.doc.id] = change.doc.data()
                }
            });
            let new_object = {}
            new_object[chat_id] = obj
            setMessages(Object.assign(new_object,messages))
        })

    }

    const users = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        let array = []
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
        });
        setUsers_data(array)
        
    }

    useEffect(() => {
        document.title = "Chat"
        users()
        get_messages()
        console.log(context)
    }, [data, chat_id, number])

    const send_message = async () => {
        if (!chat_id) return false;
        if (message.length === 0) return false
        // console.log(chat_id)
        await addDoc(collection(db,"chat", chat_id, "messages"), {
            text: message,
            uid: context.uid,
            createdAt: Timestamp.now()
        })

        text.value = ""
        setMessage("")
    }

    if (context) return (<div className="social-box-top-div" id="social-box-top-div">
            <div className="social-box-div">
                <div className="users-box-div">
                <div className="sing-out-button-div"  onClick={() => (auth.signOut())}>exit</div>
                    <div className="me-box-div">
                        <img src={"https://img.icons8.com/bubbles/344/user.png"} className="me-photo"></img>
                        <p className="me-name">{context.email}</p>
                    </div>
                    <div className="search-box-div">
                        <input type="search" className="search-input" placeholder="Search friends"></input>
                    </div>
                    <div className="other-users-div">
                        {users_data.map((user,index) => {   
                            const uid = user.uid
                            if (user.uid !== context.uid) return <div className="user-box-div" key={index} onClick={() => {
                                const ar = Array.from(user.uid + context.uid)
                                const id = ar.sort().join("")
                                let new_object = {}
                                new_object[id] = {}
                                setMessages(Object.assign(new_object,messages))
                                setChat_id(id)
                                setSecond_user(user)
                            }}>
                                <img key={user.uid} src={"https://img.icons8.com/bubbles/344/user.png"} className="user-img"></img>
                                <p key={`${user.email}${user.uid}`} className="user-name">{user.email}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="chat-box-div">
                    {second_user?<div className="user-div">
                        <div className="user-name-and-photo-div">
                            <div className="img-div">
                                <img src={second_user.photoURL?second_user.photoURL:"https://img.icons8.com/bubbles/344/user.png"} className="second-user-img"></img>
                            </div>
                            <p className="second-user-name">{second_user.email}</p>
                        </div>
                    </div>:""}
                    {chat_id? <div className="messages-box" ref={detectScroll}>
                        {Object.keys(messages[chat_id]).sort((a,b) => {return messages[chat_id][a].createdAt - messages[chat_id][b].createdAt}).map((document,index) => {
                            return <div key={index + 'Top'} className="message-box-top-div" style={messages[chat_id][document].uid === context.uid? {justifyContent:"flex-end"}:{justifyContent:"flex-start", }}>
                                        <div key={index} className="message-box" >{messages[chat_id][document].text}</div>
                                    </div>
                        })}
                        <div ref={toScroll}>{scroll?toScroll.current?.scrollIntoView({ behavior: "smooth" }):null   }</div>
                    </div>: null}
                    <div className="to-send-message-box-div">
                        <div className="to-input-message-div">
                            <input className="to-input-message" ref={(values) => {setText(values)}} onChange={(text) => {setMessage(text.currentTarget.value)}} type="text" placeholder="Type messages"></input>
                        </div>
                        <div className="to-send-message">
                            <div className="send-button" onClick={() => send_message()}>Send</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
