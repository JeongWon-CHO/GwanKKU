"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Share2, ImageDown, RotateCcw, ArrowLeft } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { EDITOR_PRESETS } from "@/constants/editor-presets";
import { CoffinPreviewSmall } from "./CoffinBoard";
import { SaveCard } from "./SaveCard";
import { cn, isLight } from "@/lib/utils";

async function cardToBlob(el: HTMLDivElement): Promise<Blob> {
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(el, { pixelRatio: 2, cacheBust: true });
  if (!blob) throw new Error("캡처 실패");
  return blob;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CompleteView() {
  const router = useRouter();
  const { target, backgroundColor, message, reset } = useEditorStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareError, setShareError] = useState(false);

  if (!target) return null;

  const preset = EDITOR_PRESETS[target];
  const light = isLight(backgroundColor);
  const isExporting = isSaving || isSharing;

  async function handleSave() {
    if (!cardRef.current || isExporting) return;
    setIsSaving(true);
    try {
      const blob = await cardToBlob(cardRef.current);
      triggerDownload(blob, "gwankku.png");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {
      // 실패 시 무시 — 사용자 인지 불필요
    } finally {
      setIsSaving(false);
    }
  }

  async function handleShare() {
    if (!cardRef.current || isExporting) return;
    setIsSharing(true);
    setShareError(false);
    try {
      const blob = await cardToBlob(cardRef.current);
      const shareText = [
        `나만의 ${preset.objectLabel}을 꾸몄어요.`,
        message && `${message}`,
        "관꾸 — 나를 기억하는 방식",
      ]
        .filter(Boolean)
        .join("\n");

      // 이미지 파일 공유 (Web Share API Level 2 — iOS 15+, Android Chrome 86+)
      const file = new File([blob], "gwankku.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText });
      } else if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        setShareError(true);
      }
    } catch {
      // 사용자 취소 포함
    } finally {
      setIsSharing(false);
    }
  }

  function handleRestart() {
    reset();
    router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-4">
        <button
          onClick={() => router.push("/editor/coffin")}
          aria-label="에디터로 돌아가기"
          className="flex size-8 items-center justify-center rounded-full hover:bg-surface"
        >
          <ArrowLeft className="size-4 text-body" />
        </button>
        <h1 className="text-base font-medium text-primary">완성됐어요</h1>
      </header>

      {/* 완성 미리보기 */}
      <section
        className="flex flex-col items-center px-4 pb-12 pt-10"
        style={{ backgroundColor: light ? "#c8c2ba" : "#f0ede9" }}
      >
        <p className="mb-1 text-sm font-semibold text-primary">
          나만의 {preset.objectLabel}이 완성됐어요
        </p>
        <p className="mb-10 text-xs text-caption">
          간직하거나 소중한 사람과 나눠보세요
        </p>

        <CoffinPreviewSmall backgroundColor={backgroundColor} />

        {message && (
          <div
            className={cn(
              "mt-8 max-w-64 rounded-xl px-4 py-2",
              light ? "bg-black/10" : "bg-black/5",
            )}
          >
            <p className="break-keep text-center text-sm leading-relaxed text-primary">
              {message}
            </p>
          </div>
        )}
      </section>

      {/* 액션 영역 */}
      <section className="flex flex-col gap-3 px-4 py-6">
        {/* 1순위: 이미지로 저장 */}
        <button
          onClick={handleSave}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-accent py-4 text-base font-medium text-accent-fg transition-opacity active:opacity-80 disabled:opacity-50"
        >
          <ImageDown className="size-4" />
          {isSaving ? "저장 중..." : "이미지로 저장"}
        </button>
        {saveSuccess && (
          <p className="text-center text-xs text-caption">저장됐어요</p>
        )}

        {/* 2순위: 공유하기 */}
        <button
          onClick={handleShare}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 w-full rounded-2xl border border-line bg-background py-4 text-base font-medium text-primary transition-opacity active:opacity-80 disabled:opacity-50"
        >
          <Share2 className="size-4" />
          {isSharing ? "준비 중..." : "공유하기"}
        </button>
        {shareError && (
          <p className="text-center text-xs text-caption">
            이 브라우저에서는 공유가 지원되지 않아요
          </p>
        )}

        {/* 3순위: 다시 꾸미기 */}
        <button
          onClick={() => router.push("/editor/coffin")}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 w-full rounded-2xl border border-line bg-background py-3.5 text-sm font-medium text-body transition-opacity active:opacity-80 disabled:opacity-50"
        >
          다시 꾸미기
        </button>
      </section>

      <div className="flex justify-center pb-10">
        <button
          onClick={handleRestart}
          className={cn(
            "flex items-center gap-1.5 text-sm text-caption",
            "underline-offset-2 hover:underline",
          )}
        >
          <RotateCcw className="size-3.5" />
          처음으로 돌아가기
        </button>
      </div>

      {/* 저장/공유용 SaveCard — 화면 밖 렌더링, 캡처 전용 */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <SaveCard ref={cardRef} />
      </div>
    </main>
  );
}
