// Cloudflare Pages Function: 处理联系表单提交
// 部署即生效（无需绑定存储）。若配置了 RESEND_API_KEY 环境变量，会同时往你的邮箱发通知邮件。
//
// 在 Cloudflare Pages 后台配置发信（可选，推荐）：
//   Settings → Functions → Add variable
//   名: RESEND_API_KEY   值: re_xxxxxxxx (到 https://resend.com 免费注册获取)
// 不配置也能正常返回成功，只是不会发邮件。

const TO_EMAIL = "longmanup21312@gmail.com";

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "请求格式有误" }, { status: 400 });
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "姓名、邮箱和留言都要填写" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "邮箱格式不正确" }, { status: 400 });
  }
  if (message.length > 5000) {
    return Response.json({ ok: false, error: "留言过长（上限 5000 字）" }, { status: 400 });
  }

  // 可选：通过 Resend 发送通知邮件（配置了密钥才执行）
  if (env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Huaxa Site <onboarding@resend.dev>",
          to: [TO_EMAIL],
          reply_to: email,
          subject: `站点留言 · ${name}`,
          text: `来自 ${name} (${email}) 的留言：\n\n${message}`,
        }),
      });
    } catch {
      // 邮件失败不影响表单提交结果，仅静默忽略
    }
  }

  return Response.json({ ok: true, msg: "已收到，我会尽快回复你" });
}

// 非 POST 直接访问时给出说明，避免 405 暴露细节
export async function onRequest() {
  return Response.json({ ok: false, error: "请通过表单提交" }, { status: 405 });
}
