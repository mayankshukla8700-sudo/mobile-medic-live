import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, model, price, date, address } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Missing Telegram Config" }, { status: 500 });
    }

    // formatting the message
    const message = `
🚨 *NEW REPAIR ORDER!* 🚨

👤 *Customer:* ${name}
📞 *Phone:* ${phone}
📱 *Device:* ${model}
💰 *Est. Price:* ₹${price}
📅 *Date:* ${date}
📍 *Address:* ${address}

_Check Admin Dashboard for full details._
    `;

    // Sending to Telegram
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram Error:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}