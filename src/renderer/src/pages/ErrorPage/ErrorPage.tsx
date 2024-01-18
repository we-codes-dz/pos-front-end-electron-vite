import { Button } from "@nextui-org/react";
import errorIllustration from "../../assets/images/broken.jpg";


function ErrorPage() {

  return (
    <>
      <div className="py-2 !bg-white">
        <div className=" text-black">
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
              <div className="font-medium intro-x text-8xl">Oops !</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                Une erreur s'est produite..
              </div>
              <div className="mt-3 text-lg intro-x">
                Veuillez Nous contacter pour la fixer.
              </div>
              <Button
                className="mt-2 px-6 py-4"
                onClick={() => window.location.reload()}>
                Reconnecter
              </Button>
            </div>
          </div>
          {/* END: Error Page */}
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
