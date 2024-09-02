import { Spinner } from "@nextui-org/react"

const Loader = ({ label }: { label: string }) => {
  return (
    <div className="max-w-[68rem] mt-12 flex items-center justify-center flex-col mx-auto w-[90%]">
      <Spinner
        className="text-black"
        label={label}
        color="default"
        size="lg"
        labelColor="foreground"
      />
    </div>
  )
}

export default Loader
