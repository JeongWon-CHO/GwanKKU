"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Share2, ImageDown, RotateCcw, ArrowLeft } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { useTestStore } from "@/store/useTestStore";
import { useAuth } from "@/hooks/useAuth";
import { EDITOR_PRESETS } from "@/constants/editor-presets";
import { calcGuardianType } from "@/lib/calcGuardianType";
import { saveSnapshot, loadSnapshots } from "@/lib/snapshot";
import { saveSnapshotToServer } from "@/lib/snapshot-server";
import { signInWithGoogle } from "@/lib/auth";
import {
  savePendingAction,
  getPendingAction,
  clearPendingAction,
} from "@/lib/pending-action";
import { CoffinPreviewSmall } from "./CoffinBoard";
import { SaveCard } from "./SaveCard";
import { AuthPromptSheet } from "@/components/auth/AuthPromptSheet";
import { cn, isLight } from "@/lib/utils";
import type { CoffinSnapshot } from "@/types/snapshot";

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
  const { user, loading: authLoading } = useAuth();
  const {
    target,
    backgroundColor,
    backgroundPatternId,
    faceGrids,
    message,
    messageStyle,
    uploadedImages,
    hasPublished,
    loadFromSnapshot,
    setActiveSnapshotId,
    setHasPublished,
    reset,
  } = useEditorStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const hasSavedRef = useRef(false);
  const hasResumedRef = useRef(false);

  const [snapshotId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("sid") || Date.now().toString(36);
  });
  const fromArchive =
    new URLSearchParams(window.location.search).get("from") === "archive";
  const [isEditMode] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    return p.get("sid") !== null && p.get("from") !== "archive";
  });

  const answers = useTestStore((s) => s.answers);
  const guardianKey =
    Object.keys(answers).length > 0 ? calcGuardianType(answers) : undefined;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [serverSaveStatus, setServerSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [serverSaveError, setServerSaveError] = useState<string | null>(null);

  // 자동 localStorage 저장
  useEffect(() => {
    if (hasSavedRef.current || !target) return;
    if (fromArchive || isEditMode) return;
    hasSavedRef.current = true;
    saveSnapshot({
      version: 1,
      id: snapshotId,
      createdAt: new Date().toISOString(),
      target,
      backgroundColor,
      backgroundPatternId,
      faceGrids,
      message,
      messageStyle,
      uploadedImages,
      guardianKey,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // OAuth 복귀 후 pending action 자동 실행
  useEffect(() => {
    if (authLoading) return;
    if (hasResumedRef.current) return;
    if (new URLSearchParams(window.location.search).get("resume") !== "1")
      return;

    hasResumedRef.current = true;

    if (!user) {
      clearPendingAction();
      router.replace("/complete");
      return;
    }

    const pending = getPendingAction();
    if (!pending) {
      router.replace("/complete");
      return;
    }

    const snapshot = loadSnapshots().find((s) => s.id === pending.snapshotId);
    if (!snapshot) {
      clearPendingAction();
      router.replace("/complete");
      return;
    }

    loadFromSnapshot(snapshot);
    setServerSaveStatus("saving");

    saveSnapshotToServer(snapshot, true, undefined, user.id)
      .then(() => {
        setServerSaveStatus("success");
        setHasPublished();
        clearPendingAction();
        router.replace("/complete");
      })
      .catch(() => {
        setServerSaveStatus("error");
        setServerSaveError("저장에 실패했어요. 다시 시도해 주세요.");
        clearPendingAction();
        router.replace("/complete");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user]);

  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareError, setShareError] = useState(false);

  if (!target) return null;

  const preset = EDITOR_PRESETS[target];
  const light = isLight(backgroundColor);
  const isExporting = isSaving || isSharing;

  async function handlePublish() {
    if (serverSaveStatus === "saving" || authLoading || !target) return;

    const currentSnapshot: CoffinSnapshot = {
      version: 1,
      id: snapshotId,
      createdAt: new Date().toISOString(),
      target,
      backgroundColor,
      backgroundPatternId,
      faceGrids,
      message,
      messageStyle,
      uploadedImages,
      guardianKey,
    };

    // archive 진입 또는 edit mode: 스냅샷이 이미 localStorage에 있으므로 재저장하지 않음
    if (!hasSavedRef.current && !fromArchive && !isEditMode) {
      saveSnapshot(currentSnapshot);
      hasSavedRef.current = true;
    }

    if (!user) {
      savePendingAction(snapshotId);
      setIsSheetOpen(true);
      return;
    }

    setServerSaveStatus("saving");
    setServerSaveError(null);
    try {
      const previewBlob = cardRef.current
        ? await cardToBlob(cardRef.current).catch(() => undefined)
        : undefined;
      await saveSnapshotToServer(currentSnapshot, true, previewBlob, user.id);
      setServerSaveStatus("success");
      setHasPublished();
    } catch {
      setServerSaveStatus("error");
      setServerSaveError("저장에 실패했어요. 다시 시도해 주세요.");
    }
  }

  function handleConfirmLogin() {
    setIsSheetOpen(false);
    signInWithGoogle("/complete?resume=1");
  }

  async function handleSave() {
    if (!cardRef.current || isExporting) return;
    setIsSaving(true);
    try {
      const blob = await cardToBlob(cardRef.current);
      triggerDownload(blob, "gwankku.png");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {
      // 실패 시 무시
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
        <button
          onClick={() => router.push("/archive")}
          className="ml-auto text-xs text-caption underline-offset-2 hover:underline"
        >
          나의 보관함
        </button>
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
        {/* 온라인 관짝함 등재 */}
        {(() => {
          const isPublished = isEditMode
            ? serverSaveStatus === "success"
            : hasPublished || serverSaveStatus === "success";
          if (isPublished) {
            return (
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-surface py-4">
                <p className="text-sm font-medium text-primary">
                  {isEditMode ? "변경사항이 저장됐어요" : "명예의 전당에 올라갔어요"}
                </p>
                <button
                  onClick={() => router.push("/gallery")}
                  className="text-sm text-caption underline-offset-2 hover:underline"
                >
                  온라인 관짝함에서 보기
                </button>
              </div>
            );
          }
          return (
            <>
              <button
                onClick={handlePublish}
                disabled={serverSaveStatus === "saving" || authLoading}
                className="flex w-full items-center justify-center rounded-2xl bg-accent py-4 text-base font-medium text-accent-fg transition-opacity active:opacity-80 disabled:opacity-50"
              >
                {serverSaveStatus === "saving"
                  ? (isEditMode ? "저장 중..." : "등재 중...")
                  : (isEditMode ? "변경사항 저장하기" : "명예의 전당에 공개하기")}
              </button>
              {serverSaveError && (
                <p className="text-center text-xs text-caption">
                  {serverSaveError}
                </p>
              )}
            </>
          );
        })()}

        {/* 구분 */}
        <div className="my-1 h-px bg-line" />

        {/* 이미지 저장 + 공유하기 */}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isExporting}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-line bg-background py-3.5 text-sm font-medium text-primary transition-opacity active:opacity-80 disabled:opacity-50"
          >
            <ImageDown className="size-4" />
            {isSaving ? "저장 중..." : "이미지 저장"}
          </button>
          <button
            onClick={handleShare}
            disabled={isExporting}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-line bg-background py-3.5 text-sm font-medium text-primary transition-opacity active:opacity-80 disabled:opacity-50"
          >
            <Share2 className="size-4" />
            {isSharing ? "준비 중..." : "공유하기"}
          </button>
        </div>
        {saveSuccess && (
          <p className="text-center text-xs text-caption">
            이미지가 저장됐어요
          </p>
        )}
        {shareError && (
          <p className="text-center text-xs text-caption">
            이 브라우저에서는 공유가 지원되지 않아요
          </p>
        )}
      </section>

      {/* 하단 보조 액션 */}
      <div className="flex flex-col items-center gap-10 pb-10">
        <button
          onClick={() => {
            setActiveSnapshotId(snapshotId);
            router.push("/editor/coffin");
          }}
          className="text-sm text-caption underline-offset-2 hover:underline"
        >
          다시 꾸미기
        </button>
        <button
          onClick={() => {
            reset();
            router.push("/");
          }}
          className="flex items-center gap-1.5 text-sm text-caption underline-offset-2 hover:underline"
        >
          <RotateCcw className="size-3.5" />
          처음으로 돌아가기
        </button>
      </div>

      {/* 캡처 전용 SaveCard */}
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

      <AuthPromptSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onConfirm={handleConfirmLogin}
      />
    </main>
  );
}
