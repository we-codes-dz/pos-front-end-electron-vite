import { Button } from "@nextui-org/react";
import errorIllustration from "../../assets/images/unauthorized.jpg";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <>
      <div className="py-2 !bg-white">
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
              <div className="font-medium intro-x text-8xl">401</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                Oops. Vous n'avez pas accés à cette page.
              </div>
              <div className="mt-3 text-lg intro-x">
                Veuillez revenir en arrière..
              </div>
              <Button
                className="px-4 py-3 mt-10"
                onClick={() => navigate("/")}
              >
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
