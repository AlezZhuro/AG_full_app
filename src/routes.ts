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
];

export type { Route };
export default routes;
