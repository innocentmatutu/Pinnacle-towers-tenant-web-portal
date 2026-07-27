import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';

export default function Messages({ message, setMessage, attachment, setAttachment, fileInput, sent, sendMessage }) {
  const [selected, setSelected] = useState(0);
  const threads = [
    { name: 'Property Management', text: 'Your parking access card is ready for collection.', time: '10:14 AM', initials: 'PM' },
    { name: 'Esther Wanjiku', text: 'A technician has been assigned to your request.', time: 'Yesterday', initials: 'EW' },
    { name: 'Finance Office', text: 'Your payment receipt is available to download.', time: '18 Jul', initials: 'FO' }
  ];

  return (
    <div className="messages-page">
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">COMMUNICATION CENTRE</p>
          <h1>Messages</h1>
        </div>
        <button className="primary-button" onClick={() => document.querySelector('.message-compose textarea')?.focus()}>
          <Icon name="message" size={16} /> New inquiry
        </button>
      </div>
      <div className="messages-layout">
        <Card className="thread-list">
          <div className="thread-header">
            <h3>Conversations</h3>
            <button className="icon-button"><Icon name="search" size={17} /></button>
          </div>
          {threads.map((thread, index) => (
            <button key={thread.name} className={`thread ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)}>
              <span className="thread-avatar">{thread.initials}</span>
              <span><b>{thread.name}</b><small>{thread.text}</small></span>
              <time>{thread.time}</time>
              {index === 0 && <i />}
            </button>
          ))}
        </Card>
        <Card className="conversation">
          <div className="conversation-header">
            <span className="thread-avatar">{threads[selected].initials}</span>
            <div>
              <h3>{threads[selected].name}</h3>
              <p>Typically replies within one business day</p>
            </div>
          </div>
          <div className="chat">
            <div className="date-divider">Today</div>
            <div className="bubble incoming">Hello Rose, your parking access card is ready for collection from the management office.<small>10:14 AM</small></div>
            <div className="bubble outgoing">Thank you. I will collect it this afternoon.<small>10:22 AM</small></div>
            <div className="bubble incoming">You are welcome. Please carry your tenant ID when collecting it.<small>10:24 AM</small></div>
          </div>
          <form className="message-compose" onSubmit={sendMessage}>
            {attachment && (
              <div className="attached-file">
                <Icon name="file" size={15} />{attachment}
                <button type="button" onClick={() => setAttachment('')}><Icon name="close" size={13} /></button>
              </div>
            )}
            <textarea rows="2" value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a message..." />
            <div>
              <input ref={fileInput} type="file" hidden onChange={e => setAttachment(e.target.files?.[0]?.name || '')} />
              <button type="button" className="attach-button" onClick={() => fileInput.current?.click()}>
                <Icon name="paperclip" size={18} /> Attach file
              </button>
              <button className="send-button" aria-label="Send message"><Icon name="send" size={18} /></button>
            </div>
            {sent && <p className="sent-confirmation"><Icon name="check" size={15} /> Message sent</p>}
          </form>
        </Card>
      </div>
    </div>
  );
}
