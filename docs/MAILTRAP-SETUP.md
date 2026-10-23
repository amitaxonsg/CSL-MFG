# Enquiry email — implementation ready, credentials pending

Sender email: amit@axon.com.sg
Sender display name: Custom Sports and Leisure Manufacturing Corp
Staff notification: Adam and Ben (resolved addresses belong only in server environment).
Staff CC: amit@axon.com.sg
Customer acknowledgement: submitted customer address only, with no staff recipient list disclosed.
Reply-To: customer on staff notifications; MAIL_REPLY_TO on acknowledgements (currently requested Amit address).

Use Mailtrap **Email Sending / Transactional**, not an Email Sandbox token. Verify the sender domain axon.com.sg and any linked business domain as required by Mailtrap. Copy the exact DNS records Mailtrap provides; do not replace existing Google Workspace MX or overwrite existing SPF records. A valid token alone does not establish sender verification.

Server-only environment:
```
MAIL_PROVIDER=mailtrap
MAILTRAP_API_TOKEN=<set privately on the confirmed server>
MAIL_FROM=amit@axon.com.sg
MAIL_FROM_NAME=Custom Sports and Leisure Manufacturing Corp
MAIL_REPLY_TO=amit@axon.com.sg
ENQUIRY_EMAIL=<Adam address>,<Ben address>
ENQUIRY_CC=amit@axon.com.sg
SITE_URL=https://csl-mfg.com
```
Do not commit real tokens or staff recipient addresses to this public repository.

Both messages have CSL branding, logo, address, enquiry reference, clean summary, brief and footer, plus plain text fallback. Artwork remains private. Staff and customer acceptance states are recorded separately. Provider acceptance is not delivery confirmation. On an uncertain outcome, inspect Mailtrap logs before retrying; accepted staff messages are not resent merely because the customer acknowledgement failed. The CLI can retry the missing acknowledgement. No marketing subscription is created.

Before activation, preview the template and send a specifically authorised test, checking real delivery, reply behaviour, spam placement and logo rendering. No live test email has been sent during this implementation.
