"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { COFFIN_CATEGORIES } from "@/constants/editor-coffin";
import { PATTERN_DEFS, getPatternStyle } from "@/constants/editor-patterns";
import { cn, isLight } from "@/lib/utils";
import type { DecorationItemType } from "@/types/editor";

const DECO_PAGE_SIZE = 8;
const MAX_UPLOADS = 5;

const backgroundItems =
  COFFIN_CATEGORIES.find((c) => c.id === "background")?.items ?? [];
const decorationItems =
  COFFIN_CATEGORIES.find((c) => c.id === "decoration")?.items ?? [];

type PanelTab = "background" | "decoration";

const TABS: { id: PanelTab; label: string }[] = [
  { id: "background", label: "배경" },
  { id: "decoration", label: "장식" },
];

type UnifiedItem =
  | { kind: "add" }
  | { kind: "upload"; id: string; dataUrl: string }
  | {
      kind: "preset";
      id: string;
      label: string;
      emoji: string;
      decorationType: DecorationItemType;
    };

async function resizeImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 160;
        const scale = MAX / Math.max(img.naturalWidth, img.naturalHeight);
        const w =
          scale < 1 ? Math.round(img.naturalWidth * scale) : img.naturalWidth;
        const h =
          scale < 1 ? Math.round(img.naturalHeight * scale) : img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target!.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/webp", 0.85));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function DecorationPanel() {
  const [activeTab, setActiveTab] = useState<PanelTab>("background");
  const [decoPage, setDecoPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    backgroundColor,
    backgroundPatternId,
    activeItemId,
    uploadedImages,
    setBackgroundColor,
    setBackgroundPatternId,
    setActiveItem,
    addUploadedImage,
    removeUploadedImage,
  } = useEditorStore();

  const allItems: UnifiedItem[] = [
    { kind: "add" },
    ...uploadedImages.map((img) => ({
      kind: "upload" as const,
      id: img.id,
      dataUrl: img.dataUrl,
    })),
    ...decorationItems.map((item) => ({
      kind: "preset" as const,
      id: item.id,
      label: item.label,
      emoji: item.value,
      decorationType: item.type as DecorationItemType,
    })),
  ];

  const totalPages = Math.ceil(allItems.length / DECO_PAGE_SIZE);
  const pagedItems = allItems.slice(
    decoPage * DECO_PAGE_SIZE,
    (decoPage + 1) * DECO_PAGE_SIZE,
  );

  const presetEmoji = decorationItems.find((i) => i.id === activeItemId)?.value;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || uploadedImages.length >= MAX_UPLOADS) return;
    const dataUrl = await resizeImage(file);
    const id = `upload-${Date.now()}`;
    addUploadedImage({ id, dataUrl });
    setActiveItem(id);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 탭 */}
      <div className="flex gap-1 border-b border-line pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              activeTab === tab.id
                ? "bg-primary font-medium text-background"
                : "text-caption",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="h-50 overflow-y-auto overscroll-contain">
        {/* 배경 */}
        {activeTab === "background" && (
          <div className="flex flex-col gap-4 px-2 py-2">
            {/* 색상 */}
            <div className="grid grid-cols-6 gap-3">
              {backgroundItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBackgroundColor(item.value)}
                  title={item.label}
                  className={cn(
                    "aspect-square rounded-full transition-transform active:scale-90",
                    backgroundColor === item.value
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : "ring-1 ring-line",
                  )}
                  style={{ backgroundColor: item.value }}
                />
              ))}
            </div>

            {/* 무늬 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-caption">무늬</span>
              <div className="grid grid-cols-4 gap-2">
                {PATTERN_DEFS.map((p) => {
                  const pStyle = getPatternStyle(p.id, isLight(backgroundColor));
                  const isSelected = backgroundPatternId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setBackgroundPatternId(p.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl p-1.5 transition-colors",
                        isSelected
                          ? "ring-2 ring-accent ring-offset-1 ring-offset-background"
                          : "",
                      )}
                    >
                      <div
                        className="h-10 w-full rounded-lg"
                        style={{ backgroundColor, ...(pStyle ?? {}) }}
                      />
                      <span className="text-xs leading-none text-caption">
                        {p.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 장식 */}
        {activeTab === "decoration" && (
          <div className="flex flex-col gap-3">
            {/* 힌트 */}
            <div className="flex min-h-6 items-center justify-center">
              {activeItemId ? (
                <p className="text-xs text-caption">
                  {presetEmoji && `${presetEmoji} `}관을 탭해서 붙여보세요
                </p>
              ) : (
                <p className="text-xs text-caption">
                  장식을 고른 뒤 관을 탭해요
                </p>
              )}
            </div>

            {/* 통합 그리드 */}
            <div className="grid grid-cols-4 gap-2">
              {pagedItems.map((item) => {
                if (item.kind === "add") {
                  return (
                    <button
                      key="add"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadedImages.length >= MAX_UPLOADS}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-2xl px-2 py-2 transition-colors bg-surface",
                        uploadedImages.length >= MAX_UPLOADS &&
                          "pointer-events-none opacity-40",
                      )}
                    >
                      <span className="text-2xl leading-none text-caption">
                        +
                      </span>
                      <span className="text-xs leading-none text-caption">
                        추가
                      </span>
                    </button>
                  );
                }

                if (item.kind === "upload") {
                  return (
                    <div key={item.id} className="relative">
                      <button
                        onClick={() =>
                          setActiveItem(
                            activeItemId === item.id ? null : item.id,
                          )
                        }
                        className={cn(
                          "flex w-full flex-col items-center gap-1.5 rounded-2xl px-2 py-2 transition-colors bg-surface",
                          activeItemId === item.id &&
                            "bg-inset ring-1 ring-accent/40",
                        )}
                      >
                        <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                          <img
                            src={item.dataUrl}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover select-none"
                            draggable={false}
                          />
                        </div>
                        <span
                          className={cn(
                            "text-xs leading-none",
                            activeItemId === item.id
                              ? "text-body"
                              : "text-caption",
                          )}
                        >
                          내 이미지
                        </span>
                      </button>
                      <button
                        onClick={() => removeUploadedImage(item.id)}
                        aria-label="삭제"
                        className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none text-background"
                      >
                        ×
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      setActiveItem(activeItemId === item.id ? null : item.id)
                    }
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-2xl px-2 py-2 transition-colors",
                      activeItemId === item.id
                        ? "bg-inset ring-1 ring-accent/40"
                        : "bg-surface",
                    )}
                  >
                    <span className="text-2xl leading-none">{item.emoji}</span>
                    <span
                      className={cn(
                        "text-xs leading-none",
                        activeItemId === item.id ? "text-body" : "text-caption",
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDecoPage((p) => Math.max(0, p - 1))}
                  disabled={decoPage === 0}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full transition-colors",
                    decoPage === 0
                      ? "pointer-events-none text-caption/40"
                      : "text-caption hover:text-primary",
                  )}
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setDecoPage(i)}
                      className={cn(
                        "rounded-full transition-all",
                        i === decoPage
                          ? "size-2 bg-primary"
                          : "size-1.5 bg-line",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setDecoPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={decoPage === totalPages - 1}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full transition-colors",
                    decoPage === totalPages - 1
                      ? "pointer-events-none text-caption/40"
                      : "text-caption hover:text-primary",
                  )}
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
