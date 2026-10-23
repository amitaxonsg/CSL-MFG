# Assistant and CSL Studio

## Phase 1 — included

A floating accessible assistant answers common product and ordering questions, identifies guided versus AI-assisted mode, and offers permanent links to RFQ and Contact Us. Without both server environment variables, no OpenAI request is made. With a key/model, the Responses API adapter supplies bounded company knowledge and conversation history. Errors and timeouts fall back to guided answers.

Approved facts are maintained in `lib/content.mjs`. Model output is rendered as text, never executable HTML. The key is never returned to the client. Chat has per-IP and global rate limits, a three-request concurrency cap and a bounded output. Configure project-level API budgets and alerts when connecting the account. No private enquiry attachments are provided to the model.

The adapter has mocked contract and failure tests. Live-account permissions, model support, billing, answer quality and operational spend require testing after keys are supplied. Do not claim a live AI integration before that step.

Official implementation reference: https://developers.openai.com/api/docs/guides/text

## Phase 2 — public Coming Soon page only

Planned visitor journey:

1. Select a T-shirt or other supported garment range, fit and colour base.
2. Upload logos, graphics or reference images the visitor has permission to use.
3. Describe a concept to an AI assistant or use manual design tools.
4. Place and scale artwork on supported garment views; inspect front/back concepts.
5. Save a concept with its garment, colours, placement, prompt and file references.
6. Submit it as an RFQ with quantity, sizes, destination and deadline.
7. CSL reviews artwork feasibility, manufacturing specifications and commercial terms before production.

No editor, AI image generation, live mockup, account system or print-ready output is claimed in Phase 1. Do not silently enable those features. Phase 2 needs product templates, placement rules, asset permissions, persistent project storage, generation cost limits, moderation, production export specifications and staff approval design. A generated visual is a concept, not an approved production file.
