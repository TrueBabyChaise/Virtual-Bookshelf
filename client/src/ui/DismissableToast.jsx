import { toast, ToastBar, Toaster } from 'react-hot-toast';
import toastConfig from '@src/configs/toastConfig'

export default function DismissableToast() {

  const handleToastClick = (e) => {
    console.log(e)
    toast.dismiss(t.id)
  }

  return (
    <div>
      <Toaster { ...toastConfig }>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className='flex flex-row' onClick={() => toast.dismiss(t.id)}>
                {icon}
                {message}
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  )
}