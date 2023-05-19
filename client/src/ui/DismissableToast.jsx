import { toast, Toaster } from "react-hot-toast";
import toastConfig from '@src/configs/toastConfig'

export default function DismissableToast() {

  const handleToastClick = (t) => {
    console.log(t)
    toast.dismiss()
  }

  return (
    <Toaster { ...toastConfig } onClick={handleToastClick}>

    </Toaster>
  )
}