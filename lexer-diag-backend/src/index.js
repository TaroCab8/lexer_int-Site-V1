export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "POST") {
      try {
        const formData = await request.json();
        const recordId = `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        formData.created_at = new Date().toISOString();
        formData.record_id = recordId;

        await env.LEXER_DIAG_KV.put(recordId, JSON.stringify(formData));

        return new Response(JSON.stringify({ success: true, diagnostic_id: recordId }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { 
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }
    }
    return new Response("Method not allowed", { status: 405 });
  },
};
