export default function Contact({contacts}) {
    return (
        <>
          
                {contacts.map((contact, index) => (
                    <div className="contact-card" key={index}>
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="Avatar" />
                        <h3>{contact.username}</h3>
                    </div>
                ))}
            
        </>
    );
}