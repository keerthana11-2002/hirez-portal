import { BriefcaseBusiness, Download, Boxes, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { updateApplications } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(
    updateApplications,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = ({ status }) => {
    fnHiringStatus(status);
  };
  return (
    <Card>
      {loadingHiringStatus && (
        <BarLoader className="mb-20" width={"100%"} color="blue" />
      )}
      <CardHeader>
        <CardTitle className="flex  ">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white  text-black rounded-full h-8 w-8 p-1.5 cursor-pointer ml-40 sm:ml-28 lg:ml-[1000px]"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="flex gap-2 items-center py-2 ">
            <BriefcaseBusiness size={15} />
            {application?.experience}Years of Experience
          </div>
          <div className="flex gap-2 items-center py-2">
            <Boxes size={15} />
            Skills:{application?.skills}
          </div>
          <div className="flex gap-2 items-center py-2">
            <School size={15} />
            {application?.education}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between  ">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status:{application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="hiring">Hiring</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
