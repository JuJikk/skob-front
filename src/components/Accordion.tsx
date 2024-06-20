import AccordionItem from "@/components/AccordionItem";
import {firstSample} from "@/components/proba_json";

const AccordionComp = () => {
  return (
    <div>
      {firstSample.map((obj, index) => {
          return <AccordionItem item={obj} key={index} />

      })}
    </div>
  );
};

export default AccordionComp;
