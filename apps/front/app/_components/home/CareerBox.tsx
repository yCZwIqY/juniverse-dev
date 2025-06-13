interface CareerBoxProps {
  title: string;
  period: string;
  contents: string[];
}

const CareerBox = ({ title, period, contents }: CareerBoxProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{period}</div>
      <ul>
        {contents.map((item, index) => (
          <li key={`${title}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CareerBox;
