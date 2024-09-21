import { application } from "../../assets/homePageButton";
import Button from "./Button";
import { Link } from "react-router-dom";
const ApplicationNow = () => {
  return (
    <div className="relative">
      {/* Image */}
      <img
        src={application}
        alt="Application"
        className="w-full lg:p-20 md:p-10 sm:p-5 p-2"
      />

      {/* Button */}
      <Link to="/applicationForm">
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2">
          <Button
            color="#6CBF2A"
            textColor="#093761"
            className="lg:mt-4 md:mt-2 w-[120px] sm:w-[150px] md:w-[200px] lg:w-[230px]"
          >
            Apply Now
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ApplicationNow;
