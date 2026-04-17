"use client";

import { useCallback, useRef, useState } from "react";

type Props = {
  onUploaded: (httpsUrl: string) => void;
  onError: (message: string) => void;
};

export function ProfilePhotoUpload({ onUploaded, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pickFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      onError("");
      if (!file) return;

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        onError("Please choose a JPG or PNG photo (works best in Gmail and Outlook).");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        onError("That file is larger than 2 MB. Try a smaller image or export as JPG.");
        return;
      }

      setBusy(true);
      try {
        const body = new FormData();
        body.set("file", file);
        const res = await fetch("/api/upload-photo", { method: "POST", body });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok) {
          onError(data.error ?? "Upload failed. Try again.");
          return;
        }
        if (data.url) onUploaded(data.url);
      } catch {
        onError("Could not reach the server. Check your connection and try again.");
      } finally {
        setBusy(false);
      }
    },
    [onError, onUploaded],
  );

  return (
    <div style={{ marginBottom: 14 }}>
      <span
        style={{
          display: "block",
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--muted)",
          fontSize: 11,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Profile photo
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        style={{ display: "none" }}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={pickFile}
        disabled={busy}
        style={{
          ...btn,
          opacity: busy ? 0.75 : 1,
          cursor: busy ? "wait" : "pointer",
        }}
      >
        {busy ? "Uploading your photo…" : "Upload photo from this computer"}
      </button>
      <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
        JPG or PNG, up to 2 MB. Your photo is stored on our side and the signature uses a
        normal web link so it shows in Google Workspace and Outlook.
      </p>
    </div>
  );
}

const btn: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "#fff",
  fontWeight: 600,
  fontSize: 14,
  fontFamily: "inherit",
  color: "var(--ink)",
};
