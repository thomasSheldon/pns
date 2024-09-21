import { doneApplicationHero } from "../../assets/homePageButton";
import Button from "./Button";
import { Link } from "react-router-dom";

const DoneContact = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primaryBackground text-center">
      <p className="italic mb-4 text-[#4478AD] lg:text-[12px] md:text-[10px] sm:text-[9px] text-[8px]">
        We are excited to have you on our Pacific Nursing Solutions team!We are
        looking forward for your feedback and inquiries
      </p>
      <img src={doneApplicationHero} alt="" className="mb-4" />
      <p className="mb-6 lg:px-20 md:px-14 sm:px-10 px-6 text-[#002245] font-medium lg:text-[20px] md:text-[18px] sm:text-[14px] text-[12px] max-w-[881px]">
        Thank you for reaching and contacting us. Please check your email for
        updates. We’ll get back to you soon.
      </p>

      <Link to="/">
        <Button
          color="#093761"
          textColor="#CDECFF"
          className="font-bold lg:mt-4 md:mt-2 w-[120px] sm:w-[150px] md:w-[200px] lg:w-[230px]"
        >
          BACK TO HOME
        </Button>
      </Link>
    </div>
  );
};

export default DoneContact;
