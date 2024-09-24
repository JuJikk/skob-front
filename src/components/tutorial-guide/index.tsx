import Joyride from "react-joyride"
import { generateSteps } from "../../lib/generate-steps"
import { editGuideShown } from "../../lib/data"

const TourGuide = ({ email }: {email?: string}) => {

  if (email) {
    editGuideShown(email)
  }

  return (
    <Joyride
      continuous
      run={true}
      steps={generateSteps()}
      scrollToFirstStep
      hideCloseButton={false}
      disableCloseOnEsc
      disableOverlayClose
      spotlightPadding={10}
      showProgress
      showSkipButton
      styles={{
        buttonClose: {
          marginTop: "5px",
          marginRight: "5px",
          width: "12px",
        },
        buttonNext: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          backgroundColor: "black",
          borderRadius: "5px",
          color: "white",
        },
        tooltipFooter: {
          margin: "0px 16px 10px 10px",
        },
        buttonBack: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          color: "black",
        },
        options: {
          zIndex: 100,
          arrowColor: "#1F1F1F",
          backgroundColor: "white",
          textColor: "black",
          primaryColor: "#1c7bd4",
        },
      }}
      locale={{
        last: <span>Кінець</span>,
        next: <span>Далі</span>,
        back: <span>Назад</span>,
      }}
    />
  )
}

export default TourGuide
