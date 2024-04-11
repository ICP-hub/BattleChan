import "./Skeleton.scss";

type Props = {
  w_h_p: string;
};

const Skeleton = ({ w_h_p }: Props) => {
  return (
    <div className={`custom_skeleton ${w_h_p}`}>
      <div className={`pointer-events-none h-full w-full skeleton`}></div>
    </div>
  );
};

export default Skeleton;
