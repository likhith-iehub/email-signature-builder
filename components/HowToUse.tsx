import type { CSSProperties } from "react";

const box: CSSProperties = {
  background: "#f0ebe3",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "16px 18px",
  marginBottom: 20,
  fontSize: 14,
};

const ol: CSSProperties = {
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
          Fill in your name and title, then use <strong>Upload photo from this computer</strong>{" "}
          for your headshot (JPG or PNG). You do not need another website for that step.
        </li>
        <li style={{ marginBottom: 6 }}>
          Click <strong>Copy signature HTML</strong> when the preview looks right.
        </li>
        <li>Paste into Gmail or Outlook using the steps below.</li>
      </ol>

      <p style={{ margin: "14px 0 6px", fontWeight: 700, fontSize: 13 }}>
        Gmail / Google Workspace (web)
      </p>
      <ol style={{ ...ol, listStyleType: "decimal", fontSize: 13 }}>
        <li>Open Gmail → Settings (gear) → See all settings.</li>
        <li>Under General, find Signature.</li>
        <li>
          Click in the signature box, then paste (
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
          Settings → View all Outlook settings → Mail → Compose and reply.
        </li>
        <li>Under Email signature, paste into the box and save.</li>
      </ol>

      <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--muted)", lineHeight: 1.55 }}>
        <strong>Images in Gmail:</strong> If photos look hidden at first, choose{" "}
        <strong>Always display images from this sender</strong> (or enable images in Gmail
        settings). Your company logo loads from this tool’s site; your headshot loads from
        secure storage—both use normal <code style={code}>https://</code> links, which Google
        Workspace and Outlook support.
      </p>
    </div>
  );
}

const kbd: CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 12,
  padding: "2px 6px",
  borderRadius: 4,
  border: "1px solid #ccc",
  background: "#fff",
};

const code: CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 12,
  background: "#fff",
  padding: "1px 6px",
  borderRadius: 4,
  border: "1px solid #ddd",
};
