"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { buildSignatureHtmlFragment } from "@/lib/build-signature-html";
import {
  defaultSignatureConfig,
  type SignatureConfig,
} from "@/lib/signature-types";
import { HowToUse } from "@/components/HowToUse";

function previewDoc(fragment: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;padding:20px;background:#eae6df;font-family:Arial,sans-serif;}</style></head><body>${fragment}</body></html>`;
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "url" | "color";
  rows?: number;
  hint?: string;
};

function Field({ label, value, onChange, type = "text", rows, hint }: FieldProps) {
  const id = label.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
  return (
    <label
      style={{ display: "block", marginBottom: 14, fontSize: 13 }}
      htmlFor={id}
    >
      <span
        style={{
          display: "block",
          fontWeight: 600,
          marginBottom: 4,
          color: "var(--muted)",
          fontSize: 11,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {rows ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          style={inputStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
      {hint ? (
        <span
          style={{
            display: "block",
            marginTop: 5,
            fontSize: 12,
            color: "var(--muted)",
            lineHeight: 1.4,
          }}
        >
          {hint}
        </span>
      ) : null}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "#fff",
  fontSize: 14,
  fontFamily: "inherit",
};

const detailsStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "12px 14px",
  marginBottom: 12,
  background: "#fff",
};

const summaryStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  listStyle: "none",
};

export function SignatureBuilder() {
  const [config, setConfig] = useState<SignatureConfig>(defaultSignatureConfig);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fragment = useMemo(() => buildSignatureHtmlFragment(config), [config]);
  const iframeSrc = useMemo(() => previewDoc(fragment), [fragment]);

  const set = useCallback(<K extends keyof SignatureConfig>(
    key: K,
    value: SignatureConfig[K],
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setBar = useCallback(
    (key: keyof SignatureConfig["accentBar"], value: string) => {
      setConfig((prev) => ({
        ...prev,
        accentBar: { ...prev.accentBar, [key]: value },
      }));
    },
    [],
  );

  const copyHtml = useCallback(async () => {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(fragment);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(
        "Your browser blocked automatic copy. Use the gray box below: click Select all, then copy.",
      );
    }
  }, [fragment]);

  const selectAllHtml = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, []);

  const reset = useCallback(() => {
    setConfig(defaultSignatureConfig);
    setCopied(false);
    setCopyError(null);
  }, []);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 20px 56px" }}>
      <header style={{ marginBottom: 22, textAlign: "center" }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            margin: "0 0 8px",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Email signature builder
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            color: "var(--muted)",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.5,
          }}
        >
          Make your team signature here. No coding needed—fill in the boxes,
          copy, and paste into Gmail or Outlook.
        </p>
      </header>

      <HowToUse />

      <div
        className="builder-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 400px) 1fr",
          gap: 28,
          alignItems: "start",
        }}
      >
        <aside
          style={{
            background: "var(--panel)",
            borderRadius: 14,
            padding: "22px 20px",
            border: "1px solid var(--border)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <details open style={detailsStyle}>
            <summary style={summaryStyle}>Your name and photo</summary>
            <div style={{ marginTop: 14 }}>
              <Field
                label="Closing line"
                value={config.closingLine}
                onChange={(v) => set("closingLine", v)}
                hint='Example: "Best regards" or "Kind regards".'
              />
              <Field
                label="Full name"
                value={config.fullName}
                onChange={(v) => set("fullName", v)}
              />
              <Field
                label="Job title"
                value={config.jobTitle}
                onChange={(v) => set("jobTitle", v)}
              />
              <Field
                label="Photo link (URL)"
                value={config.photoUrl}
                onChange={(v) => set("photoUrl", v)}
                type="url"
                hint="Must be an https:// link to a .jpg or .png on the web."
              />
              <Field
                label="Photo description (for accessibility)"
                value={config.photoAlt}
                onChange={(v) => set("photoAlt", v)}
                hint="Usually your full name. Helps screen readers."
              />
            </div>
          </details>

          <details open style={detailsStyle}>
            <summary style={summaryStyle}>Company logo and links</summary>
            <div style={{ marginTop: 14 }}>
              <Field
                label="Company logo link (URL)"
                value={config.companyLogoUrl}
                onChange={(v) => set("companyLogoUrl", v)}
                type="url"
              />
              <Field
                label="Logo description"
                value={config.companyLogoAlt}
                onChange={(v) => set("companyLogoAlt", v)}
                hint="Usually your company name."
              />
              <Field
                label="Website address (URL)"
                value={config.websiteUrl}
                onChange={(v) => set("websiteUrl", v)}
                type="url"
              />
              <Field
                label="Website text shown in the signature"
                value={config.websiteLabel}
                onChange={(v) => set("websiteLabel", v)}
                hint='Example: "dynamatix.com"—what people see as the link text.'
              />
              <Field
                label="LinkedIn address (URL)"
                value={config.linkedinUrl}
                onChange={(v) => set("linkedinUrl", v)}
                type="url"
              />
              <Field
                label="LinkedIn text shown in the signature"
                value={config.linkedinLabel}
                onChange={(v) => set("linkedinLabel", v)}
              />
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>Brand colours (optional)</summary>
            <p
              style={{
                margin: "10px 0 12px",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.45,
              }}
            >
              Only change these if your brand team gave you new colours. Most
              people leave this section closed.
            </p>
            <fieldset
              style={{ border: "none", margin: 0, padding: 0, marginBottom: 8 }}
            >
              <legend
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  marginBottom: 10,
                }}
              >
                Top colour bar
              </legend>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <Field
                  label="Teal"
                  value={config.accentBar.teal}
                  onChange={(v) => setBar("teal", v)}
                  type="color"
                />
                <Field
                  label="Orange"
                  value={config.accentBar.orange}
                  onChange={(v) => setBar("orange", v)}
                  type="color"
                />
                <Field
                  label="Lime"
                  value={config.accentBar.lime}
                  onChange={(v) => setBar("lime", v)}
                  type="color"
                />
                <Field
                  label="Brown"
                  value={config.accentBar.brown}
                  onChange={(v) => setBar("brown", v)}
                  type="color"
                />
              </div>
            </fieldset>
            <Field
              label="Brand teal (headings and small icons)"
              value={config.brandTeal}
              onChange={(v) => set("brandTeal", v)}
              type="color"
            />
          </details>

          <details open style={detailsStyle}>
            <summary style={summaryStyle}>Legal and confidentiality</summary>
            <div style={{ marginTop: 14 }}>
              <Field
                label="Legal — company name"
                value={config.legalCompanyName}
                onChange={(v) => set("legalCompanyName", v)}
              />
              <Field
                label="Legal — registration line"
                value={config.legalRegistrationLine}
                onChange={(v) => set("legalRegistrationLine", v)}
                hint="Example: Registered in England & Wales · No. 1234567"
              />
              <Field
                label="Legal — address"
                value={config.legalAddressLine}
                onChange={(v) => set("legalAddressLine", v)}
              />
              <Field
                label="Confidentiality heading"
                value={config.confidentialityTitle}
                onChange={(v) => set("confidentialityTitle", v)}
              />
              <Field
                label="Confidentiality paragraph"
                value={config.confidentialityBody}
                onChange={(v) => set("confidentialityBody", v)}
                rows={3}
              />
            </div>
          </details>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 4,
            }}
          >
            <button type="button" onClick={copyHtml} style={btnPrimary}>
              {copied ? "Copied! You can paste in your email app now." : "Copy signature HTML"}
            </button>
            <button type="button" onClick={reset} style={btnGhost}>
              Reset form to the sample
            </button>
          </div>
          {copyError ? (
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 13,
                color: "#b45309",
                lineHeight: 1.45,
              }}
            >
              {copyError}
            </p>
          ) : null}

          <div
            style={{
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontWeight: 700,
                fontSize: 13,
                color: "var(--muted)",
              }}
            >
              If the copy button does not work
            </p>
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--muted)" }}>
              Click <strong>Select all</strong>, then press{" "}
              <kbd style={kbd}>Ctrl</kbd>+<kbd style={kbd}>C</kbd> (Windows) or{" "}
              <kbd style={kbd}>⌘</kbd>+<kbd style={kbd}>C</kbd> (Mac). Paste that
              into your signature settings.
            </p>
            <textarea
              ref={textareaRef}
              readOnly
              value={fragment}
              spellCheck={false}
              style={{
                ...inputStyle,
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                lineHeight: 1.35,
                minHeight: 120,
                resize: "vertical",
              }}
            />
            <button
              type="button"
              onClick={selectAllHtml}
              style={{ ...btnGhost, marginTop: 10, width: "100%" }}
            >
              Select all HTML in the box above
            </button>
          </div>
        </aside>

        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              Preview (updates as you type)
            </h2>
          </div>
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "#eae6df",
              minHeight: 280,
            }}
          >
            <iframe
              title="Signature preview"
              srcDoc={iframeSrc}
              sandbox="allow-same-origin"
              style={{
                width: "100%",
                height: 460,
                border: "none",
                display: "block",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  cursor: "pointer",
  border: "none",
  borderRadius: 10,
  padding: "14px 18px",
  fontWeight: 700,
  fontSize: 16,
  background: "#2ba2b8",
  color: "#fff",
  width: "100%",
};

const btnGhost: React.CSSProperties = {
  cursor: "pointer",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: 14,
  background: "#fff",
  color: "var(--ink)",
};

const kbd: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 12,
  padding: "2px 6px",
  borderRadius: 4,
  border: "1px solid #ccc",
  background: "#fafafa",
};
