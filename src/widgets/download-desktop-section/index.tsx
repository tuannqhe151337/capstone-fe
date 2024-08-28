import React, { Suspense } from "react";
import { Button } from "../../shared/button";
import { FaWindows } from "react-icons/fa6";
import { Canvas } from "@react-three/fiber";
import { DesktopModel } from "../../entities/desktop-model";
import { useInView } from "react-intersection-observer";

export const DownloadDesktopSection: React.FC = () => {
  // Use in view
  const { ref, inView } = useInView();

  return (
    <div className="relative bg-primary-50 dark:bg-neutral-800/20 h-[600px] my-100 mx-10 rounded-xl">
      {/* Desktop 3D modal */}
      <div className="absolute top-0 left-0 w-full h-full cursor-grab">
        <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
          <Suspense fallback={null}>
            <DesktopModel inView={inView} />
          </Suspense>
        </Canvas>
      </div>

      {/* 3d model will render if scroll down here */}
      <div ref={ref} className="absolute top-20 h-[400px]"></div>

      <div className="flex flex-col flex-wrap items-center justify-center pt-10 pb-5 w-full h-full">
        <div className="text-center text-2xl font-bold text-primary-500 dark:text-neutral-300">
          <p>Streamline your expense approval process</p>
          <p>
            with our{" "}
            <span className="font-extrabold text-primary-600/80 dark:text-primary-400">
              Desktop application
            </span>
          </p>
        </div>

        <div className="mt-auto">
          <Button
            className="px-5 py-3"
            onClick={() => {
              const link = document.createElement("a");

              link.href = import.meta.env.VITE_WINDOW_APP_URL;
              link.setAttribute("download", `FinPlanning Desktop App.exe`);
              link.target = "_blank";

              link.click();
            }}
          >
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
              <FaWindows className="text-2xl" />
              <div className="font-bold">Download for Windows</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
