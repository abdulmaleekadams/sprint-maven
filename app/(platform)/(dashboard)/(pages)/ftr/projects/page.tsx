import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateProjectModal from "./_components/CreateProjectModal";

const ProjectsPages = () => {
  return (
    <div className="space-y-10">
      <div className="flex gap-4 justify-between items-center">
        <div className="">
          <h2 className="text-2xl font-semibold ">Projects</h2>
        </div>
        <CreateProjectModal />
      </div>

      <div>
        {/* Project Card */}
        <Card className="w-96">
          <CardHeader>
            <CardTitle>SprintMaven</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              nihil officiis voluptatem provident veniam consequatur possimus
              quisquam dolorum hic repudiandae enim rerum, in aliquid debitis
              quae delectus tempore nisi est.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex  gap-6 justify-between flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground">
                  Client: <br />
                  <span className="text-white">Tajmal</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Type: <br />
                  <span className="text-white">Web App, Mobile App</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Assigned teams: <br />
                  <span className="text-white">Ninja, Militant</span>
                </p>
              </div>
            </div>
            <div className="flex  gap-6 justify-between">
              <p className="text-sm text-green-500">
                Created: <br />
                <span>12th Sept., 2024</span>
              </p>
              <p className="text-sm text-rose-500">
                Due date: <br />
                <span>12th Dec., 2024</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsPages;
