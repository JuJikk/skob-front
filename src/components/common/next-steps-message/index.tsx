const NextSteps = ({ sex }: { sex: string }) => {
  return (
    <div className="max-w-[50rem] flex items-start justify-center flex-col mx-auto w-[90%] space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Вітаю!</h2>
      <p className="text-lg">
            Ти {sex === "MALE" ? "потрапив" : "потрапила"} на сайт онлайн проби.
        Якщо ти {sex === "MALE" ? "юнак" : "юначка"}, то попроси{" "}
        {sex === "MALE" ? "свого виховника" : "свою виховницю"}
        добавити тебе в свій "гурток". Якщо ж ти{" "}
        {sex === "MALE" ? "виховник" : "виховниця"}, то сконтактуй з нами і ми
        все тобі пояснимо)
      </p>
      <span>Ось контакти:</span>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li>Контакти</li>
      </ul>
    </div>
  )
}

export default NextSteps
