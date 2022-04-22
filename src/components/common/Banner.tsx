import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import { IoClose } from "react-icons/io5";

import Collapsible from "components/common/Collapsible";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  id?: string;
  dismissable?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Banner: FC<Props> = ({ id, dismissable, onClose, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Collapsible isExpanded={!isCollapsed} id={id} className="shrink-0">
      <div
        className={clsx(
          "flex items-center py-1.5 px-2 mb-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg lg:px-4",
          TRANSITION_CLASSES
        )}
      >
        <div className="grow">{children}</div>
        {dismissable && (
          <button
            onClick={() => {
              setIsCollapsed(true);
              onClose?.();
            }}
            type="button"
            aria-label="Close Banner"
          >
            <IoClose
              className={clsx("text-2xl", HOVER_CLASSES, TRANSITION_CLASSES)}
            />
          </button>
        )}
      </div>
    </Collapsible>
  );
};

export default Banner;
