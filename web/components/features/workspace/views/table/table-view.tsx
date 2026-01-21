"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Task } from "../../store/mock-data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TableViewProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

export function TableView({ tasks, onTaskClick }: TableViewProps) {
  return (
    <div className="h-full w-full overflow-auto bg-background p-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">이름</TableHead>
              <TableHead className="w-[120px]">상태</TableHead>
              <TableHead className="w-[120px]">우선순위</TableHead>
              <TableHead className="w-[150px]">담당자</TableHead>
              <TableHead>마감일</TableHead>
              <TableHead>태그</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onTaskClick(task.id)}
              >
                <TableCell className="font-medium group">
                  <div className="flex items-center gap-2">{task.title}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="capitalize font-normal text-muted-foreground"
                  >
                    {task.status || "No Status"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {task.priorityId ? (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 h-5"
                      >
                        {task.priorityId}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px]">
                          {task.assignee.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {task.assignee}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs text-muted-foreground/50">
                      미할당
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {task.dueDate ? (
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(task.dueDate), "MMM d")}
                    </span>
                  ) : (
                    <span className="text-muted-foreground/30 text-xs">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {task.tags &&
                      task.tags.map((tag) => (
                        <div
                          key={tag}
                          className="w-2 h-2 rounded-full bg-blue-400"
                          title={tag}
                        />
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  테스크가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
