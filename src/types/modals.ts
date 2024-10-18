import React, { Dispatch } from "react"

export interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
  pendingChecked: boolean | null
  pendingIndex: number
  currentProbaEmail: string
  currentStep: string
  setIndexesSum: Dispatch<React.SetStateAction<number>>
  item: {
    section: string
    items: string[]
    checked: number[]
    probaType: string
  }
}