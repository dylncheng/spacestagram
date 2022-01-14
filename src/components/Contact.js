import './Contact.css';

const Contact = () => {
    return(
        <div className="contact" id="contact">
            <h2>Links</h2>
            <ul>
                <li className="email"><a href={"mailto:chengdylan02@gmail.com"} target="_blank">email</a></li>
                <li className="linkedin"><a href={"https://linkedin.com/in/dylnchng"} target="_blank">linkedin</a></li>
                <li className="github"><a href={"https://github.com/dylncheng"} target="_blank">github</a></li>
            </ul>
        </div>
    );
}

export default Contact;