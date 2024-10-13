import { getMyJobs } from "@/api/apijobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import JobCard from "./jobCard";
import { BarLoader } from "react-spinners";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    fn: fnCreatedJobs,
    data: createdJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, [fnCreatedJobs]);

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }

  return (
    <div className="p-4 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {createdJobs?.length ? (
          createdJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
                isMyjob
              />
            );
          })
        ) : (
          <div className="font-bold text-center text-lg">No Jobs Found</div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
