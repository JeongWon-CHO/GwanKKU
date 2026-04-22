"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/useEditorStore";

const MESSAGE_MAX = 40;

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

export function MessageSheet({ onConfirm, onClose }: Props) {
  const { message, setMessage } = useEditorStore();
  const [draft, setDraft] = useState(message);

  function handleConfirm() {
    setMessage(draft.trim());
    onConfirm();
  }

  function handleSkip() {
    setMessage("");
    onConfirm();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-background px-6 pt-5"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1.5rem)" }}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />

        <p className="mb-1 text-base font-medium text-primary">
          마지막으로 전하고 싶은 말이 있나요?
        </p>
        <p className="mb-4 text-xs text-caption">입력하지 않아도 괜찮아요</p>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={MESSAGE_MAX}
          rows={3}
          placeholder="짧게 남기고 싶은 말 한 마디"
          className="w-full resize-none rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-primary placeholder:text-caption focus:border-line-strong focus:outline-none"
          autoFocus
        />
        <p className="mb-5 text-right text-xs text-caption">
          {draft.length} / {MESSAGE_MAX}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleSkip}
            className="flex-1 rounded-2xl border border-line py-3.5 text-sm text-body transition-opacity active:opacity-70"
          >
            건너뛰기
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-2xl bg-accent py-3.5 text-sm font-medium text-accent-fg transition-opacity active:opacity-80"
          >
            완성 보기
          </button>
        </div>
      </div>
    </>
  );
}
