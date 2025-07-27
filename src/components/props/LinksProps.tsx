import { Link } from "react-router-dom";
import { getImageSrc } from "../../utils/imageUtils";
import type { Props } from "../../utils/types";

const LinksProps = ({ name, icon, address }: Props) => {
  return (
    <div>
      <Link to={""} className="flex flex-col items-center gap-[8px]">
        <img
          className="w-[24px] aspect-square"
          src={getImageSrc(icon)}
          alt=""
        />

        <span className="text-textSecondary font-medium">{name}</span>
      </Link>
    </div>
  );
};

export default LinksProps;
