"use client";

import { forwardRef } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { CoffinPreviewSmall } from "./CoffinBoard";
import { isLight } from "@/lib/utils";

// html-to-image 캡처 대상 — 화면 밖(left: -9999px)에서 렌더링
// Tailwind CSS 변수 대신 inline style만 사용 (직렬화 시 CSS 변수 누락 방지)
export const SaveCard = forwardRef<HTMLDivElement>(function SaveCard(_, ref) {
  const { target, backgroundColor, message } = useEditorStore();
  if (!target) return null;

  const light = isLight(backgroundColor);

  const cardBg = light ? "#d4cec7" : "#ede9e4";
  const textPrimary = "#2a2520";
  const textMuted = light ? "#6b6460" : "#9a9088";
  const msgBg = light ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.06)";

  return (
    <div
      ref={ref}
      style={{
        width: 360,
        height: 560,
        backgroundColor: cardBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "48px 32px 40px",
        boxSizing: "border-box",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* 상단 레이블 */}
      <p
        style={{
          margin: 0,
          fontSize: 12,
          letterSpacing: "0.03em",
          color: textMuted,
        }}
      >
        관꾸
      </p>

      {/* 중앙: 관 + 메시지 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 패딩으로 drop-shadow 클리핑 방지 */}
        <div style={{ padding: "12px 20px 20px" }}>
          <CoffinPreviewSmall backgroundColor={backgroundColor} />
        </div>

        {message && (
          <div
            style={{
              maxWidth: 240,
              backgroundColor: msgBg,
              borderRadius: 12,
              padding: "8px 16px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.65,
                textAlign: "center",
                color: textPrimary,
                wordBreak: "keep-all",
              }}
            >
              {message}
            </p>
          </div>
        )}
      </div>

      {/* 하단 브랜딩 */}
      <p
        style={{
          margin: 0,
          fontSize: 10,
          letterSpacing: "0.03em",
          color: textMuted,
        }}
      >
        나를 기억하는 방식
      </p>
    </div>
  );
});
