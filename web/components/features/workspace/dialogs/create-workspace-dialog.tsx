"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "워크스페이스 이름은 2글자 이상이어야 합니다.")
    .max(50),
  description: z
    .string()
    .max(200, "설명은 200자 이내로 입력해주세요.")
    .optional(),
});

interface CreateWorkspaceDialogProps {
  children?: React.ReactNode;
  fromSquadId?: string;
}

export function CreateWorkspaceDialog({
  children,
  fromSquadId,
}: CreateWorkspaceDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const payload = {
        ...values,
        fromSquadId, // Add squad ID if present
      };

      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("워크스페이스 생성에 실패했습니다.");
      }

      const data = await response.json();

      toast.success(
        fromSquadId
          ? "스쿼드가 워크스페이스로 전환되었습니다."
          : "워크스페이스가 생성되었습니다.",
      );
      setOpen(false);
      form.reset();

      // Refresh list
      mutate("/api/workspaces");

      // Navigate to new workspace
      router.push(`/workspace/${data.id}`);
    } catch (error) {
      toast.error("오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 새 워크스페이스
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {fromSquadId ? "워크스페이스로 전환" : "새 워크스페이스 만들기"}
          </DialogTitle>
          <DialogDescription>
            {fromSquadId
              ? "스쿼드 멤버들이 자동으로 워크스페이스 멤버로 초대됩니다."
              : "팀원들과 함께할 새로운 협업 공간을 만듭니다."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        fromSquadId
                          ? "스쿼드 이름 그대로 사용 가능"
                          : "예: 졸업작품 A팀"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명 (선택)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="프로젝트에 대한 간단한 설명을 적어주세요."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fromSquadId && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-600 dark:text-blue-400">
                💡 <strong>전환 시 혜택</strong>
                <br />
                모든 스쿼드 팀원에게 <i>워크스페이스 생성 알림</i>이 발송되며,
                별도의 초대 없이 바로 협업을 시작할 수 있습니다.
              </div>
            )}

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {fromSquadId ? "전환하기" : "생성하기"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
