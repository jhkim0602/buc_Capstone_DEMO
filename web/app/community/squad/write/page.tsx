import SquadForm from "@/components/features/community/squad-form";

export const dynamic = "force-dynamic";

export default function SquadWritePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          팀원 모집하기
        </h1>
        <p className="text-muted-foreground">
          함께 성장할 동료를 모아보세요. 프로젝트, 스터디, 공모전 등 목적에 맞는
          팀을 만들 수 있습니다.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <SquadForm />
      </div>
    </div>
  );
}
