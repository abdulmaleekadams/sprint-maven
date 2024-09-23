"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisplayOption, ViewMode } from "gantt-task-react";
import { useState } from "react";

type Props = {};

type TaskTypeItems = "task" | "milestone" | "projects";

const TimelineView = (props: Props) => {
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  // const ganttTasks = useMemo(() => {
  //     return (
  //         tasks?.map(task => ({
  //             start: new Date(task.startDate as string),
  //             end: new Date(task.dueDate as string),
  //             name: task.title,
  //             id: `Task-${task.id}`,
  //             type: "task" as "TaskType",
  //             progress: task.points ? (task.points / 10) * 100 : 0,
  //             isDisabled: false,
  //         })) || []
  //     )
  // }, [tasks])

  const handleViewModeChange = (value: string) => {
    console.log(value);

    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: value as ViewMode,
    }));
  };

  // if(isLoading) return <div>Loading....</div>
  // if(error) return <div>An error occurred while fetching tasks</div>
  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-center gap-2 py-5">
        <h1 className="me-2 text-lg font-bold">Project Tasks Timeline</h1>
        <div className="relative inline-block w-64">
          <Select onValueChange={handleViewModeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-accent">Timeline</SelectLabel>
                <SelectItem value={ViewMode.Day}>Day</SelectItem>
                <SelectItem value={ViewMode.Week}>Week</SelectItem>
                <SelectItem value={ViewMode.Month}>Month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* <div className="overflow-hidden rounded-md bg-background ">
            <div className="timeline">
                <Gantt
                tasks={ganttTasks}
                {...displayOptions}
                columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                listCellWidth="100ox"
                barBackgroundColor=""
                barBackgroundSelectedColor=""
                />
            </div>
        </div> */}
      </div>
    </div>
  );
};

export default TimelineView;
