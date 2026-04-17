import dynamic from "next/dynamic";

const SignatureBuilder = dynamic(() => import("@/components/SignatureBuilder"), {
  loading: () => (
    <div
      style={{
        padding: 48,
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
        color: "#555",
      }}
    >
      Loading signature builder…
    </div>
  ),
});

export default function Home() {
  return <SignatureBuilder />;
}
