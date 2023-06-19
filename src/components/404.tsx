import programLogo from "/src/assets/ProgramLogo.svg";
export default function PageNotFound() {
  return (
    <>
      <div className="bg-base-green h-screen">
        ​
        <div className="h-4/5">
          <div className="h-full flex flex-col md:flex-row items-center justify-center">
            <div className="font-paragraphs text-8xl md:text-16xl xl:text-20xl ">
              404
            </div>
            <div className="mt-10 font-paragraphs ml-8">
              <img
                src={programLogo}
                alt="Logo"
                className="w-[190px] lg:w-[380px]"
              />
              <p className="font-bold">Oooooops!</p>
              <p className="font-bold">Page Not Found!</p>
              <p className="mb-4">
                This page doesn't exist or was removed.
                <br /> We suggest you go back home!
              </p>
              <a
                href="/"
                className="bg-base-pink text-white ml-14 md:ml-0 p-2 px-3"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
        ​ ​
      </div>
      ​
    </>
  );
}
