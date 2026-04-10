import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            관꾸
          </h1>
          <p className="text-base leading-relaxed text-muted">
            내가 준비하는 나의 마지막
            <br />
            마지막은 마음대로 해도 괜찮아요
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted">
          <span>✦ 성향 테스트로 나의 수호캐릭터를 찾고</span>
          <span>✦ 취향에 맞게 나만의 공간을 꾸며보세요</span>
        </div>

        <Link
          href="/test"
          className="mt-4 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          죽음을 장식하러 가기
        </Link>
      </div>

      <p className="text-xs text-subtle">관꾸 · 나를 위한 작은 준비</p>
    </main>
  );
}
