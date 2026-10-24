# Website enquiry delivery — production setup

Sender email: amit@axon.com.sg (user-confirmed verified sender).
Display name: Custom Sports and Leisure Manufacturing Corp.
Staff notifications: Adam and Ben; Amit copied. Current Gmail addresses were verified from recent CSL project correspondence on24 October2026; actual private routing remains only in the server environment.

Customer acknowledgement: submitted customer address, with the configured CSL team and Amit copied. Reply-To is Adam's verified address. Mailtrap's sending API supports one reply-to object, so ordinary Reply targets Adam; Reply All retains team/copied contacts. The acknowledgement includes a Reply to CSL mailto button addressed to Adam and Ben with Amit in CC and the online reference in the subject.

```
MAIL_PROVIDER=mailtrap
MAILTRAP_API_TOKEN=<private server secret>
MAIL_FROM=amit@axon.com.sg
MAIL_FROM_NAME=Custom Sports and Leisure Manufacturing Corp
MAIL_REPLY_TO=<Adam verified address>
ENQUIRY_EMAIL=<Adam verified address>,<Ben verified address>
ENQUIRY_CC=amit@axon.com.sg
CUSTOMER_REPLY_TO=<Adam verified address>,<Ben verified address>
CUSTOMER_ACK_CC=<Adam verified address>,<Ben verified address>,amit@axon.com.sg
```

Do not commit tokens, raw secret files or private recipient lists. The uploaded key was loaded server-side without displaying it; secret files have mode600. axon.com.sg MX/DNS and unrelated services were not changed.

## Templates and references

Both Contact and RFQ use white-background CSL-branded HTML with logo, complete address, phone, heritage dates, summary/brief and plain-text fallback. New submissions get CSL-O-YYYYMMDD-XXXXXXXXXXXX, with the date in Philippine local time. O identifies an online enquiry; it is not a purchase order, booking or production confirmation. Existing references remain unchanged on retries. Attachments remain private and only their filenames are described in email.

Staff reply-to points to the enquirer; acknowledgement reply-to is the configured CSL address. CC recipients are validated and deduplicated; a customer already in the copy list is not addressed twice. Defaults remain customer-only if CUSTOMER_ACK_CC is unset.

## Verification status

Initial authorised Contact test: CSL-O-20261024-D77B1DB0563F. Mailtrap accepted the staff notification and customer acknowledgement. Staff copy received in Amit's Gmail. This test used the earlier Adam company-address route before the user's Gmail-only correction.

The corrected Gmail routing, Reply All/button behavior and fresh Contact/RFQ tests are pending deployment/testing after server sign-in resumes. Provider acceptance is not proof of inbox delivery to every recipient. Inspect delivery logs/bounces before retrying an ambiguous outcome; accepted staff messages must not be resent because only the acknowledgement failed.
