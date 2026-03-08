const RESEND_API_KEY = 're_gTcmRhd1_8WTQvU6tcWkQYzcQfwnPRdg1';

function generateInvoiceHTML(customer, order, items) {
  const ref = 'ORD-' + String(order.id).padStart(6, '0');
  const date = new Date().toLocaleDateString('en-GB');
  const subtotal = items.reduce((s, i) => s + (Number(i.price)||0) * (Number(i.qty)||0), 0);

  const rows = items.map((i, idx) => `
    <tr style="background:${idx%2===0?'#f7f9ff':'#fff'}">
      <td style="padding:10px 12px;color:#333;border-bottom:1px solid #eee;">${idx+1}</td>
      <td style="padding:10px 12px;color:#1B3A6B;font-weight:bold;border-bottom:1px solid #eee;">${i.num||''}</td>
      <td style="padding:10px 12px;color:#333;border-bottom:1px solid #eee;">${i.desc||''}</td>
      <td style="padding:10px 12px;text-align:center;color:#333;border-bottom:1px solid #eee;">${i.qty||0}</td>
      <td style="padding:10px 12px;text-align:right;color:#333;border-bottom:1px solid #eee;">SAR ${Number(i.price||0).toFixed(2)}</td>
      <td style="padding:10px 12px;text-align:right;font-weight:bold;color:#1B3A6B;border-bottom:1px solid #eee;">SAR ${((Number(i.price)||0)*(Number(i.qty)||0)).toFixed(2)}</td>
    </tr>`).join('');

  const baseUrl = 'https://spzones.com';
  const acceptUrl = `${baseUrl}/functions/quote-action?orderId=${order.id}&action=accept&customerName=${encodeURIComponent((customer.first_name||'')+' '+(customer.last_name||''))}&customerEmail=${encodeURIComponent(customer.email||'')}&total=${subtotal.toFixed(2)}`;
  const changesUrl = `${baseUrl}/functions/quote-action?orderId=${order.id}&action=changes&customerName=${encodeURIComponent((customer.first_name||'')+' '+(customer.last_name||''))}&customerEmail=${encodeURIComponent(customer.email||'')}&total=${subtotal.toFixed(2)}`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:30px 10px;">
<table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
<tr><td style="background:#1B3A6B;padding:28px 36px;">
  <table width="100%"><tr>
    <td><div style="color:#F5B800;font-size:26px;font-weight:900;letter-spacing:3px;">SP ZONE</div>
    <div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:3px;">Safe Drive Auto Parts  |  CR: 4650285717  |  VAT: 310627914800003</div>
    <div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:2px;">2881 Al Madinah Al Munawwarah, KSA  |  spzones.com</div></td>
    <td align="right"><div style="color:#fff;font-size:18px;font-weight:bold;">PRICE QUOTATION</div>
    <div style="color:#F5B800;font-size:14px;margin-top:4px;">${ref}</div>
    <div style="color:rgba(255,255,255,0.5);font-size:11px;margin-top:2px;">${date}</div></td>
  </tr></table>
</td></tr>
<tr><td style="background:#F5B800;height:3px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:24px 36px;">
  <table width="100%"><tr>
    <td width="55%">
      <div style="font-size:10px;font-weight:bold;color:#999;letter-spacing:1px;margin-bottom:8px;">BILL TO</div>
      <div style="font-size:15px;font-weight:bold;color:#1B3A6B;">${customer.first_name||''} ${customer.last_name||''}</div>
      <div style="font-size:13px;color:#555;margin-top:3px;">${customer.business||''}</div>
      <div style="font-size:12px;color:#888;margin-top:3px;">${customer.email||''}</div>
      <div style="font-size:12px;color:#888;margin-top:2px;">${customer.mobile||''}</div>
    </td>
    <td width="45%" align="right">
      <div style="background:#f7f9ff;border-radius:8px;padding:14px 18px;display:inline-block;text-align:left;">
        <div style="font-size:10px;color:#999;font-weight:bold;margin-bottom:4px;">VALIDITY</div>
        <div style="font-size:12px;color:#333;">30 days from issue</div>
        <div style="font-size:10px;color:#999;font-weight:bold;margin-top:8px;margin-bottom:4px;">STATUS</div>
        <div style="background:#FFF3CD;color:#856404;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:12px;display:inline-block;">⏳ Pending Approval</div>
      </div>
    </td>
  </tr></table>
</td></tr>
<tr><td style="padding:0 36px 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8edf5;">
    <tr style="background:#1B3A6B;">
      <td style="padding:11px 12px;color:#fff;font-weight:bold;font-size:11px;">#</td>
      <td style="padding:11px 12px;color:#fff;font-weight:bold;font-size:11px;">PART NO.</td>
      <td style="padding:11px 12px;color:#fff;font-weight:bold;font-size:11px;">DESCRIPTION</td>
      <td style="padding:11px 12px;color:#fff;font-weight:bold;font-size:11px;text-align:center;">QTY</td>
      <td style="padding:11px 12px;color:#fff;font-weight:bold;font-size:11px;text-align:right;">UNIT PRICE</td>
      <td style="padding:11px 12px;color:#fff;font-weight:bold;font-size:11px;text-align:right;">TOTAL</td>
    </tr>
    ${rows}
  </table>
</td></tr>
<tr><td style="padding:0 36px 24px;">
  <table width="100%"><tr><td align="right">
    <div style="background:#1B3A6B;color:#fff;border-radius:8px;padding:14px 24px;display:inline-block;">
      <span style="font-size:13px;">TOTAL AMOUNT: </span>
      <span style="font-size:20px;font-weight:bold;color:#F5B800;margin-left:8px;">SAR ${subtotal.toFixed(2)}</span>
    </div>
  </td></tr></table>
</td></tr>
${order.note ? `<tr><td style="padding:0 36px 24px;"><div style="background:#FFF8E1;border-left:4px solid #F5B800;padding:14px 18px;border-radius:0 8px 8px 0;"><div style="font-weight:bold;color:#1B3A6B;font-size:12px;margin-bottom:4px;">NOTE:</div><div style="color:#555;font-size:13px;">${order.note}</div></div></td></tr>` : ''}
<tr><td style="padding:0 36px 32px;">
  <div style="background:#f7f9ff;border-radius:10px;padding:24px;text-align:center;">
    <div style="font-size:14px;font-weight:bold;color:#1B3A6B;margin-bottom:6px;">Please review your quotation and take action:</div>
    <div style="font-size:12px;color:#888;margin-bottom:20px;">Clicking a button will notify our team automatically</div>
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="48%" align="center">
        <a href="${acceptUrl}" style="display:block;background:#22c55e;color:#fff;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">✅ I Accept the Quote</a>
      </td>
      <td width="4%"></td>
      <td width="48%" align="center">
        <a href="${changesUrl}" style="display:block;background:#f59e0b;color:#fff;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">🔄 Request Changes</a>
      </td>
    </tr></table>
  </div>
</td></tr>
<tr><td style="background:#1B3A6B;padding:20px 36px;text-align:center;">
  <div style="color:rgba(255,255,255,0.5);font-size:10px;">Safe Drive Auto Parts  |  CR: 4650285717  |  VAT: 310627914800003</div>
  <div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:4px;">2881 Al Madinah Al Munawwarah, KSA  |  spzones.com  |  info@spzones.com</div>
  <div style="color:#F5B800;font-size:11px;font-weight:bold;margin-top:8px;">Thank you for choosing SP Zone!</div>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { to, subject, html, customer, order, items, type } = await context.request.json();

    let finalHtml = html;
    if (type === 'order_confirmation' && customer && order && items) {
      finalHtml = generateInvoiceHTML(customer, order, items);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SP Zone <info@spzones.com>',
        to,
        subject,
        html: finalHtml
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
