// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Return promise to avoid Next error 'api did not send response'
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
