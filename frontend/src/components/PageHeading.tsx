interface Props {
  label: string;
}

export default function PageHeading({ label }: Props) {
  return (
    <h2 id="heading" className="text-4xl relative top-[7rem] text-white">
      {label}
    </h2>
  );
}
