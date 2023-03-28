import { FC, PropsWithChildren } from "react";

import cn from "classnames";

import s from "./Container.module.scss";

interface Props extends PropsWithChildren {
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={cn(s.root, className)}>{children}</div>;
};

export default Container;
