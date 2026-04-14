"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTestStore } from "@/store/useTestStore";
import { calcGuardianType } from "@/lib/calcGuardianType";
import { GUARDIAN_TYPE_MAP } from "@/constants/guardian-types";
import type { GuardianType } from "@/types/guardian";

export function ResultView() {
  const router = useRouter();
  const { answers } = useTestStore();
  const [guardian, setGuardian] = useState<GuardianType | null>(null);

  useEffect(() => {
    if (Object.keys(answers).length === 0) {
      router.replace("/test");
      return;
    }

    const key = calcGuardianType(answers);
    setGuardian(GUARDIAN_TYPE_MAP[key] ?? null);
  }, [answers, router]);

  if (!guardian) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-body">당신의 수호캐릭터</p>
          <h1 className="text-3xl font-semibold tracking-tight text-primary">
            {guardian.name}
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-body">
          {guardian.description}
        </p>

        <p className="text-base italic text-primary">
          &ldquo;{guardian.firstLine}&rdquo;
        </p>

        <Link
          href="/select"
          className="mt-4 rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-80"
        >
          꾸미기 시작하기
        </Link>
      </div>

      <button
        onClick={() => router.push("/test")}
        className="text-xs text-caption hover:opacity-70"
      >
        다시 테스트하기
      </button>
    </main>
  );
}
