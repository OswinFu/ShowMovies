import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";

export default function Document() {
  return (
    <Html lang="zh-TW">
      <Head />
      <body>
        <div
          style={{
            position: "absolute",
            zIndex: -1,
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src="/background.png"
            fill
            alt="背景"
            style={{ opacity: "0.1", objectFit: "cover" }}
          />
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
