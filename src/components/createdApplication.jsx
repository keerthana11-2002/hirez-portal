import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./applicationCard";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, [fnApplications]);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }

  return (
    <div className="p-4 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {applications.map((application) => {
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate
            />
          );
        })}
      </div>
    </div>
  );
};

export default CreatedApplications;
