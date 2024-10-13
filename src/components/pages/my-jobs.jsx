import CreatedJobs from "@/components/createdjobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import CreatedApplications from "../createdApplication";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }

  return (
    <div className="lg:ml-80 sm:ml-10 md:ml-20 px-4">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
