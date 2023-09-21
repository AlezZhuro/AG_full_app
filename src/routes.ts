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
];

export type { Route };
export default routes;
