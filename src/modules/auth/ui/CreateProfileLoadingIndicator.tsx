import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Micromodal from "micromodal";
import { useInterval } from "usehooks-ts";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useModal } from "@/components";

const progressDuration = 12;
const interval = (progressDuration * 1000) / 100;

type CreateProfileLoadingIndicatorProps = {
  id: string;
  opened?: boolean;
};

export const CreateProfileLoadingIndicator: React.FC<
  CreateProfileLoadingIndicatorProps
> = ({ opened, id }) => {
  const [percentage, setPercentage] = useState(0);
  const { close } = useModal();

  useInterval(
    () => {
      if (opened) setPercentage((percentage) => percentage + 1);
    },
    opened && percentage < 90 ? interval : null
  );

  useEffect(() => {
    if (percentage >= 90) {
      close(id);
    }
  }, [percentage]);

  useEffect(() => {
    Micromodal.init();
  }, []);

  return ReactDOM.createPortal(
    <div
      className="create-profile-indicator-modal modal micromodal-slide"
      id={id}
      aria-hidden="true"
    >
      <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
        <div
          className="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
        >
          <main className="modal__content" id={`${id}-content`}>
            <div className="create-profile-indicator-container">
              <CircularProgressbarWithChildren
                value={percentage}
                maxValue={90}
                strokeWidth={2}
                styles={buildStyles({
                  pathColor: "#ed819e",
                  textColor: "#000",
                })}
              >
                <h4 className="create-profile-indicator-progress">
                  {percentage} %
                </h4>
              </CircularProgressbarWithChildren>
            </div>
            <h2 className="create-profile-indicator-title">Creating profile</h2>
          </main>
        </div>
      </div>
    </div>,
    document.body
  );
};
