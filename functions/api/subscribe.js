/**
 * Newsletter 订阅接口
 *
 * POST /api/subscribe  { email }
 * - 校验邮箱格式
 * - 可选：通过 RESEND_API_KEY 往 longmanup21312@gmail.com 发通知
 * - 返回 { ok, msg }
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, msg: "请求格式错误" }, { status: 400 });
  }

  const email = (body.email || "").trim();

  // 校验
  if (!email) {
    return Response.json({ ok: false, msg: "请输入邮箱地址" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, msg: "邮箱格式不正确" }, { status: 400 });
  }

  // TODO: 正式环境建议将邮箱存入 D1 / KV 去重
  // 示例（需在 Cloudflare 绑定 KV namespace）：
  // await env.MY_KV.put(`sub:${email}`, JSON.stringify({ at: Date.now(), ip: request.headers.get('CF-Connecting-IP') }));

  // 可选：发邮件通知站长
  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: ["longmanup21312@gmail.com"],
          subject: "📬 新的 Newsletter 订阅",
          html: `<p>有新用户订阅了你的 Newsletter：</p>
            <p><strong>${escapeHtml(email)}</strong></p>
            <p style="color:#888;font-size:12px">来自 Huaxa125 AI Builder 站点</p>`,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Resend subscribe notify error:", err);
      }
    } catch (e) {
      console.error("Resend subscribe notify exception:", e);
    }
  }

  return Response.json({
    ok: true,
    msg: "订阅成功！感谢关注，后续更新会第一时间送达 📬",
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
