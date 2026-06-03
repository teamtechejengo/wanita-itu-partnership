exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { brand, name, email, phone, category, tier, message } = JSON.parse(event.body);

  const text =
    `🌸 *New Partnership Interest*\n\n` +
    `🏢 *Brand:* ${brand}\n` +
    `👤 *Name:* ${name}\n` +
    `📧 *Email:* ${email}\n` +
    `📱 *Phone:* ${phone}\n` +
    `🗂 *Category:* ${category}\n` +
    `💎 *Tier:* ${tier || 'Not specified'}\n` +
    `💬 *Message:* ${message || '-'}`;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const RECIPIENTS = [420840444, 594522714];

  await Promise.all(RECIPIENTS.map(chat_id =>
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, parse_mode: 'Markdown' })
    })
  ));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
