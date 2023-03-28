import { FC } from "react";

import cn from "classnames";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 grid place-items-center backdrop-blur-sm",
        className,
      )}
    >
      <Dimmer active>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    </div>
  );
};

export default Loading;
