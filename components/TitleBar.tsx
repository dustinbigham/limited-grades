import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

import LinkOut from "components/LinkOut";
import Modal from "components/Modal";

const TitleBar = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="flex px-8 py-4 items-center">
      <div className="mr-2">
        <Image
          src="/apple-touch-icon.png"
          alt="Limited Grades"
          height={32}
          width={32}
        />
      </div>
      <h1 className="text-2xl font-belerenSmallCaps flex-auto">
        Limited Grades
      </h1>

      <button
        onClick={() => setShowInfoModal(true)}
        className="hover:text-blue-500 flex gap-1 justify-center items-center"
      >
        <FaInfoCircle />
        <span className="hidden md:inline">About this project</span>
      </button>

      {showInfoModal && (
        <Modal
          title="About this project"
          onClose={() => setShowInfoModal(false)}
        >
          <div className="max-w-[80ch]">
            <p className="mb-4">
              This page uses{" "}
              <LinkOut url="https://www.17lands.com/card_ratings">
                17Lands
              </LinkOut>{" "}
              Premier Draft data to assign letter grades to cards. It infers a
              normal distribution from the{" "}
              <LinkOut url="https://www.17lands.com/metrics_definitions#:~:text=Games%20in%20Hand%20Win%20Rate%20(GIH%20WR)">
                Games in Hand Win Rate
              </LinkOut>{" "}
              statistic and uses that distribution to assign a grade to each
              card. For example, a card with a win rate that is one standard
              deviation higher than the mean would get a B. Cards drawn fewer
              than 200 times are not included.
            </p>
            <p className="mb-4">
              You can hover over cards to see card previews and click on cards
              to get a breakdown of how well the card does in different
              archetypes.
            </p>
            <p>
              The source code for this site can be found at{" "}
              <LinkOut url="https://github.com/youssefm/limited-grades">
                https://github.com/youssefm/limited-grades
              </LinkOut>
              .
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TitleBar;