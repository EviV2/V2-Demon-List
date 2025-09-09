export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // POST /submitPending
    if (url.pathname === "/submitPending" && request.method === "POST") {
      const data = await request.json();
      let pending = JSON.parse(await env['V2-DemonList'].get("pending") || "[]");
      pending.push(data);
      await env['V2-DemonList'].put("pending", JSON.stringify(pending));
      return new Response("Submission received!", { status: 200 });
    }

    // GET /pending
    if (url.pathname === "/pending" && request.method === "GET") {
      let pending = await env['V2-DemonList'].get("pending");
      return new Response(pending || "[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // POST /approveRecord
    if (url.pathname === "/approveRecord" && request.method === "POST") {
      const auth = request.headers.get("Authorization") || "";
      const password = auth.replace("Bearer ", "");
      if (password !== env.ADMIN_PASS) {
        return new Response("Unauthorized", { status: 401 });
      }
      const { index } = await request.json();
      let pending = JSON.parse(await env['V2-DemonList'].get("pending") || "[]");
      if (pending[index]) {
        pending.splice(index, 1);
        await env['V2-DemonList'].put("pending", JSON.stringify(pending));
        return new Response("Record approved!", { status: 200 });
      } else {
        return new Response("Not found", { status: 404 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};