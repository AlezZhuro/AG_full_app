import { SubtaskController } from "./controller/SubtaskController";
import { TaskController } from "./controller/TaskController";


type Route = {
  path: string;
  method: string;
  controller: any;
  action: string;
  public?: boolean;
};

const routes: Route[] = [
  {
    method: "get",
    path: "/tasks",
    controller: TaskController,
    action: "all",
    public:  true,
  },
  {
    method: "post",
    path: "/tasks",
    controller: TaskController,
    action: "save",
    public:  true,
  },
  {
    method: "delete",
    path: "/tasks/:id",
    controller: TaskController,
    action: "remove",
    public:  true,
  },
  {
    method: "get",
    path: "/tasks/:id",
    controller: TaskController,
    action: "one",
    public:  true,
  },
  {
    method: "patch",
    path: "/tasks/:id",
    controller: TaskController,
    action: "patch",
    public:  true,
  },
  {
    method: "get",
    path: "/task/:id/all",
    controller: SubtaskController,
    action: "allSubtask",
    public:  true,
  },
  {
    method: "get",
    path: "/subtask/:id",
    controller: SubtaskController,
    action: "one",
    public:  true,
  },
  {
    method: "post",
    path: "/task/:id/add",
    controller: SubtaskController,
    action: "createSubtask",
    public:  true,
  },
];

export type { Route };
export default routes;
