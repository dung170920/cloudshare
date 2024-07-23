import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "@/assets/icons.json";
import { IconName } from "@/types/icon-types";

type Props = {
  icon: IconName;
  className?: string
} & IconProps

const Icon = ({ size = 24, ...props }: Props) => {
  return <IcoMoon iconSet={iconSet} size={size} {...props} />
};

export default Icon;
