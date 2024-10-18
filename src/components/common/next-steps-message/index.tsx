const NextSteps = ({ sex }: { sex: string }) => {
  const messageText = {
    got: sex === "MALE" ? "потрапив" : "потрапила",
    scout: sex === "MALE" ? "юнак" : "юначка",
    your_foreman: sex === "MALE" ? "свого виховника" : "свою виховницю",
    foreman: sex === "MALE" ? "виховник" : "виховниця",
  }

  return (
    <div className="max-w-[50rem] mt-8 flex items-start justify-center flex-col mx-auto w-[90%] space-y-2">
      <span className="text-lg">Ти {messageText.got} на сайт онлайн проби</span>
      <span>
        Якщо ти {messageText.scout}, то попроси {messageText.your_foreman}{" "}
        добавити тебе в свій "гурток"
      </span>
      <span>
        Якщо ж ти {messageText.foreman}, то сконтактуй з нами і ми все тобі
        пояснимо)
      </span>
      <span>Ось пошта, на яку можете написати:</span>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li>office@lvivplast.org</li>
      </ul>
    </div>
  )
}

export default NextSteps
