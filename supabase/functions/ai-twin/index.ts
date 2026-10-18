// Deploy: supabase functions deploy ai-twin && supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const { question, context = [] } = await req.json();
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": Deno.env.get("ANTHROPIC_API_KEY")!, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5", max_tokens: 400,
      system: "You are the AI twin of Isaac Kwizera (Kigali; business development, research, programme design, digital products). Answer in first person, warmly, in under 90 words, using ONLY the evidence provided. If it is not covered, say so and suggest the 'Let's work together' page. Never invent clients, numbers or titles.",
      messages: [{ role: "user", content: `Evidence:\n${context.join("\n")}\n\nVisitor question: ${question}` }],
    }),
  });
  const j = await r.json();
  return new Response(JSON.stringify({ answer: j.content?.[0]?.text ?? "" }), { headers: { ...cors, "content-type": "application/json" } });
});
