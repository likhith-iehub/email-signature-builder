const box: React.CSSProperties = {
  background: "#f0ebe3",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "16px 18px",
  marginBottom: 20,
  fontSize: 14,
};

const ol: React.CSSProperties = {
  margin: "10px 0 0",
  paddingLeft: 22,
  lineHeight: 1.55,
};

export function HowToUse() {
  return (
    <div style={box}>
      <strong style={{ display: "block", marginBottom: 6, fontSize: 15 }}>
        How to use this (3 steps)
      </strong>
      <ol style={{ ...ol, listStyleType: "decimal" }}>
        <li style={{ marginBottom: 6 }}>
          Fill in your name, job title, and photo link. Your IT or marketing
          team can give you the correct logo and website links if you are
          unsure.
        </li>
        <li style={{ marginBottom: 6 }}>
          Click <strong>Copy signature HTML</strong> when the preview on the
          right looks correct.
        </li>
        <li>Paste the signature into your email app using the steps below.</li>
      </ol>

      <p style={{ margin: "14px 0 6px", fontWeight: 700, fontSize: 13 }}>
        Gmail (web)
      </p>
      <ol style={{ ...ol, listStyleType: "decimal", fontSize: 13 }}>
        <li>Open Gmail and click the gear icon → See all settings.</li>
        <li>Under General, find Signature.</li>
        <li>
          Create or select a signature, click in the editor, then paste (
          <kbd style={kbd}>Ctrl</kbd> + <kbd style={kbd}>V</kbd> on Windows,{" "}
          <kbd style={kbd}>⌘</kbd> + <kbd style={kbd}>V</kbd> on Mac).
        </li>
        <li>Scroll down and click Save Changes.</li>
      </ol>

      <p style={{ margin: "14px 0 6px", fontWeight: 700, fontSize: 13 }}>
        Outlook (Microsoft 365 on the web)
      </p>
      <ol style={{ ...ol, listStyleType: "decimal", fontSize: 13 }}>
        <li>
          Click the gear → View all Outlook settings → Mail → Compose and
          reply.
        </li>
        <li>Under Email signature, paste into the box.</li>
        <li>Save.</li>
      </ol>

      <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--muted)" }}>
        <strong>Photo link:</strong> The address must start with{" "}
        <code style={code}>https://</code> and point to a picture already on the
        internet (for example a link from your company or from an image host).
        If you only have a file on your computer, ask a colleague to upload it
        and send you the link.
      </p>
    </div>
  );
}

const kbd: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 12,
  padding: "2px 6px",
  borderRadius: 4,
  border: "1px solid #ccc",
  background: "#fff",
};

const code: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 12,
  background: "#fff",
  padding: "1px 6px",
  borderRadius: 4,
  border: "1px solid #ddd",
};
