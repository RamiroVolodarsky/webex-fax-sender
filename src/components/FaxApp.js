import React from 'react';
import styles from "../styles/FaxApp.module.css"
import { useLocation } from 'react-router-dom';

function FaxApp() {

    const location = useLocation();
    const loginId = location.search.split("=")[1];

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            "NSX": {
                "SendMessage": {
                    "Subject": document.getElementById('subject').value,
                    "SenderName": document.getElementById('senderName').value,
                    "Recipient": {
                        "Address": document.getElementById('recipientAddress').value
                    },
                    "Document": {
                        "ContentText": document.getElementById('contentText').value,
                        "DocumentPart": document.getElementById('documentPart').value,
                        "DocumentType": document.getElementById('documentType').value,
                        // "ContentData": contentData
                    }
                }
            }
        }

        alert(JSON.stringify(data))
        alert("LoginId" + loginId)

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://cloud.faxback.net/rest/Messages/SendMessage?LoginId=' + loginId, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Todo ok: " + data);
            })
            .catch(error => {
                console.log("Error" + error);
            });
    }

    return (
        <div className={styles.textCenter}>
            <div className={styles.container}>
                <h2 className={styles.textCenter}>Fax Sender</h2>
                <form id="form" onSubmit={handleSubmit}>
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Sender Name</label>
                        <input type="text" className={styles.formControl} id="senderName" />
                    </div>
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Recipient address</label>
                        <input type="text" className={styles.formControl} id="recipientAddress" required />
                    </div>
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Subject</label>
                        <input type="text" className={styles.formControl} id="subject" />
                    </div>styles.formText
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Content Text</label>
                        <textarea className={styles.formControl} id="contentText" rows="3"></textarea>
                    </div>
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Document part</label>
                        <select className={styles.formSelect} id="documentPart">
                            <option selected>Open this select menu</option>
                            <option value="0">Cover message</option>
                            <option value="1">Document</option>
                        </select>
                        <div className={styles.formText}>Specifies how the document is to be treated.</div>
                    </div>
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Document type</label>
                        <select className={styles.formSelect} id="documentType">
                            <option selected>Open this select menu</option>
                            <option value="0">Unknown</option>
                            <option value="1">TIFF</option>
                            <option value="2">RTF</option>
                            <option value="3">PDF</option>
                            <option value="4">HTML</option>
                            <option value="5">TEXT</option>
                        </select>
                        <div className={styles.formText}>Specifies the type of document being supplied.</div>
                    </div>
                    <div className={styles.mb-3}>
                        <label className={styles.formLabel}>Attachment</label>
                        <input type="file" className={styles.formControl} id="attachment" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FaxApp;