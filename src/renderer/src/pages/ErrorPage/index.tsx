import { Button } from "@nextui-org/react";
import errorIllustration from "../../assets/images/error-illustration.svg";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate()

  return (
    <>
      <div className="py-2">
        <div className="bg-darkmode-700">
          {/* BEGIN: Error Page */}
          <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
            <div className="-intro-x lg:mr-20">
              <img
                alt="Koraland academy"
                className="w-[450px] h-48 lg:h-auto"
                src={errorIllustration}
              />
            </div>
            <div className="mt-10  lg:mt-0">
              <div className="font-medium intro-x text-8xl">404</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                Oops. Cette page n'existe pas.
              </div>
              <div className="mt-3 text-lg intro-x">
                Veuillez revenir en arrière..
              </div>
              <Button
                className="px-4 py-3 mt-10  border-white intro-x dark:border-darkmode-400 dark:text-slate-200"
                onClick={() => navigate('/admin')}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
          {/* END: Error Page */}
        </div>
      </div>
    </>
  );
}

export default Main;
