import { ProbaData } from "../../types/accordion.ts"

type mergeDataProps = {
  items: string[]
  section: string
}

export const mergeDataWithChecked = (
  data: mergeDataProps[],
  checked: ProbaData,
  probaType: string
) => {
  return data.map((sectionObj, index) => {
    const sectionKey = String.fromCharCode(97 + index)
    return {
      section: sectionObj.section,
      items: sectionObj.items,
      checked: checked[sectionKey],
      probaType,
    }
  })
}