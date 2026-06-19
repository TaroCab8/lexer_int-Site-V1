export default {
  async fetch(request, env) {
    // Gestion du CORS pour que ton site web puisse appeler le Worker sans blocage
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
        
        // Génération d'un ID unique et anonyme
        const recordId = `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        
        formData.created_at = new Date().toISOString();
        formData.record_id = recordId;

        // Sauvegarde dans le stockage Cloudflare KV
        await env.LEXER_DIAG_KV.put(recordId, JSON.stringify(formData));

        return new Response(JSON.stringify({ success: true, diagnostic_id: recordId }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Structure JSON invalide" }), { 
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    return new Response("Méthode non autorisée", { status: 405 });
  },
};